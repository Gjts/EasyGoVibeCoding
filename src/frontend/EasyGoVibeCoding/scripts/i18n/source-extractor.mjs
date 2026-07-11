import { createHash } from "node:crypto"
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises"
import { extname, isAbsolute, join, relative, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import ts from "typescript"

const DEFAULT_ROOTS = ["app", "components", "lib", "data"]
const SOURCE_LOCALE = "zh-CN"
const TARGET_LOCALES = ["ja", "en", "fr", "de"]
const HAN_PATTERN = /\p{Script=Han}/u
const SUPPORTED_EXTENSIONS = new Set([".js", ".jsx", ".json", ".ts", ".tsx"])

function compareText(left, right) {
  if (left < right) return -1
  if (left > right) return 1
  return 0
}

function normalizeFilePath(file) {
  return file.replaceAll("\\", "/").replace(/^\.\//, "")
}

function normalizeMessage(message, collapseWhitespace) {
  const normalized = message.normalize("NFC").replace(/\r\n?/gu, "\n")
  return collapseWhitespace ? normalized.replace(/\s+/gu, " ").trim() : normalized.trim()
}

function createMessageId(message) {
  return createHash("sha256").update(message, "utf8").digest("hex")
}

function createOccurrence({
  file,
  start,
  end,
  kind,
  source,
  expressions = [],
  collapseWhitespace = false,
}) {
  const normalizedSource = normalizeMessage(source, collapseWhitespace)
  if (!HAN_PATTERN.test(normalizedSource)) return null

  return {
    id: createMessageId(normalizedSource),
    file: normalizeFilePath(file),
    start,
    end,
    kind,
    source: normalizedSource,
    expressions,
  }
}

function assertValidSource({ file, source }) {
  if (typeof file !== "string" || file.length === 0) {
    throw new TypeError("file must be a non-empty string")
  }
  if (typeof source !== "string") {
    throw new TypeError(`source for ${file} must be a string`)
  }
}

function formatParseError(sourceFile, diagnostic) {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
  if (typeof diagnostic.start !== "number") return message

  const { line, character } = sourceFile.getLineAndCharacterOfPosition(diagnostic.start)
  return `${line + 1}:${character + 1}: ${message}`
}

function assertNoTypeScriptParseErrors(sourceFile, file) {
  const diagnostics = sourceFile.parseDiagnostics ?? []
  if (diagnostics.length === 0) return

  throw new SyntaxError(`Unable to parse ${file}: ${formatParseError(sourceFile, diagnostics[0])}`)
}

function scriptKindForFile(file) {
  switch (extname(file).toLowerCase()) {
    case ".js":
      return ts.ScriptKind.JS
    case ".jsx":
      return ts.ScriptKind.JSX
    case ".tsx":
      return ts.ScriptKind.TSX
    default:
      return ts.ScriptKind.TS
  }
}

function isDirectivePrologueLiteral(node) {
  const statement = node.parent
  if (!ts.isExpressionStatement(statement) || statement.expression !== node) return false

  const container = statement.parent
  const isDirectiveContainer =
    ts.isSourceFile(container) ||
    (ts.isBlock(container) && container.parent && ts.isFunctionLike(container.parent))
  if (!isDirectiveContainer) return false

  for (const candidate of container.statements) {
    if (candidate === statement) return true
    if (!ts.isExpressionStatement(candidate) || !ts.isStringLiteral(candidate.expression)) {
      return false
    }
  }
  return false
}

function isModulePathLiteral(node) {
  const parent = node.parent
  if (
    (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) &&
    parent.moduleSpecifier === node
  ) {
    return true
  }
  if (ts.isExternalModuleReference(parent) && parent.expression === node) return true
  if (
    ts.isCallExpression(parent) &&
    parent.expression.kind === ts.SyntaxKind.ImportKeyword &&
    parent.arguments.includes(node)
  ) {
    return true
  }
  return false
}

function isPropertyNameLiteral(node) {
  const parent = node.parent
  if (ts.isNamedDeclaration(parent) && parent.name === node) return true
  if (ts.isComputedPropertyName(parent) && parent.expression === node) return true
  if (ts.isElementAccessExpression(parent) && parent.argumentExpression === node) return true
  return false
}

function isTypeOnlyLiteral(node) {
  let current = node.parent
  while (current && !ts.isSourceFile(current)) {
    if (ts.isTypeNode(current)) return true
    if (ts.isExpression(current) || ts.isStatement(current) || ts.isDeclaration(current)) {
      return false
    }
    current = current.parent
  }
  return false
}

function shouldSkipStringLiteral(node) {
  return (
    isDirectivePrologueLiteral(node) ||
    isModulePathLiteral(node) ||
    isPropertyNameLiteral(node) ||
    isTypeOnlyLiteral(node)
  )
}

function trimJsxTextRange(node, source) {
  const raw = source.slice(node.pos, node.end)
  const leadingWhitespace = raw.match(/^\s*/u)?.[0].length ?? 0
  const trailingWhitespace = raw.match(/\s*$/u)?.[0].length ?? 0

  return {
    start: node.pos + leadingWhitespace,
    end: node.end - trailingWhitespace,
    text: raw.slice(leadingWhitespace, raw.length - trailingWhitespace),
  }
}

function extractTypeScriptOccurrences({ file, source }) {
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKindForFile(file),
  )
  assertNoTypeScriptParseErrors(sourceFile, file)
  const occurrences = []

  function addOccurrence(fields) {
    const occurrence = createOccurrence({ file, ...fields })
    if (occurrence) occurrences.push(occurrence)
  }

  function visit(node) {
    if (ts.isJsxText(node)) {
      const range = trimJsxTextRange(node, source)
      if (range.end > range.start) {
        addOccurrence({
          start: range.start,
          end: range.end,
          kind: "jsx-text",
          source: range.text,
          collapseWhitespace: true,
        })
      }
      return
    }

    if (ts.isTemplateExpression(node)) {
      if (isTypeOnlyLiteral(node)) return

      let pattern = node.head.text
      const expressions = []
      for (const [index, span] of node.templateSpans.entries()) {
        pattern += `{p${index}}${span.literal.text}`
        expressions.push(span.expression.getText(sourceFile))
      }
      const occurrence = createOccurrence({
        file,
        start: node.getStart(sourceFile),
        end: node.end,
        kind: "template",
        source: pattern,
        expressions,
      })
      if (occurrence) {
        occurrences.push(occurrence)
        return
      }

      for (const span of node.templateSpans) visit(span.expression)
      return
    }

    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      if (!isTypeOnlyLiteral(node)) {
        addOccurrence({
          start: node.getStart(sourceFile),
          end: node.end,
          kind: "template",
          source: node.text,
        })
      }
      return
    }

    if (ts.isStringLiteral(node)) {
      if (!shouldSkipStringLiteral(node)) {
        addOccurrence({
          start: node.getStart(sourceFile),
          end: node.end,
          kind: "string",
          source: node.text,
        })
      }
      return
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return occurrences.sort((left, right) => left.start - right.start || left.end - right.end)
}

function extractJsonOccurrences({ file, source }) {
  try {
    JSON.parse(source)
  } catch (error) {
    throw new SyntaxError(`Unable to parse ${file}: ${error.message}`, { cause: error })
  }

  const sourceFile = ts.parseJsonText(file, source)
  assertNoTypeScriptParseErrors(sourceFile, file)
  const occurrences = []

  function visitValue(node) {
    if (ts.isStringLiteral(node)) {
      const occurrence = createOccurrence({
        file,
        start: node.getStart(sourceFile),
        end: node.end,
        kind: "json-string",
        source: node.text,
      })
      if (occurrence) occurrences.push(occurrence)
      return
    }

    if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) visitValue(property.initializer)
      }
      return
    }

    if (ts.isArrayLiteralExpression(node)) {
      for (const element of node.elements) visitValue(element)
    }
  }

  const rootExpression = sourceFile.statements[0]?.expression
  if (rootExpression) visitValue(rootExpression)
  return occurrences.sort((left, right) => left.start - right.start || left.end - right.end)
}

export function extractTranslationUnitsFromText({ file, source }) {
  assertValidSource({ file, source })
  return extname(file).toLowerCase() === ".json"
    ? extractJsonOccurrences({ file, source })
    : extractTypeScriptOccurrences({ file, source })
}

function isExcludedPath(relativePath, isDirectory) {
  const normalized = normalizeFilePath(relativePath)
  const parts = normalized.split("/")
  if (["app", "components", "lib"].includes(parts[0]) && parts[1] === "ja") {
    return true
  }
  if (parts.some((part) => part === "__tests__" || part === "node_modules")) return true
  if (parts.some((part) => part === "generated" || part === ".next" || part === "out")) {
    return true
  }
  if (isDirectory) return false

  const fileName = parts.at(-1) ?? ""
  return (
    /(?:^|\.)(?:spec|test)\.[^.]+$/u.test(fileName) ||
    /\.generated\.[^.]+$/u.test(fileName) ||
    /\.d\.ts$/u.test(fileName)
  )
}

async function collectSourceFiles({ projectRoot, roots }) {
  const absoluteProjectRoot = resolve(projectRoot)
  const files = []

  async function walk(absoluteDirectory) {
    const entries = await readdir(absoluteDirectory, { withFileTypes: true })
    entries.sort((left, right) => compareText(left.name, right.name))

    for (const entry of entries) {
      const absolutePath = join(absoluteDirectory, entry.name)
      const relativePath = normalizeFilePath(relative(absoluteProjectRoot, absolutePath))
      if (isExcludedPath(relativePath, entry.isDirectory())) continue

      if (entry.isDirectory()) {
        await walk(absolutePath)
      } else if (
        entry.isFile() &&
        SUPPORTED_EXTENSIONS.has(extname(entry.name).toLowerCase())
      ) {
        files.push({ absolutePath, relativePath })
      }
    }
  }

  for (const root of roots) {
    const absoluteRoot = resolve(absoluteProjectRoot, root)
    const relativeRoot = relative(absoluteProjectRoot, absoluteRoot)
    if (relativeRoot.startsWith("..") || isAbsolute(relativeRoot)) {
      throw new Error(`Extraction root must stay inside projectRoot: ${root}`)
    }
    await walk(absoluteRoot)
  }

  return files.sort((left, right) => compareText(left.relativePath, right.relativePath))
}

async function collectExtraction({ projectRoot, roots = DEFAULT_ROOTS }) {
  if (typeof projectRoot !== "string" || projectRoot.length === 0) {
    throw new TypeError("projectRoot must be a non-empty string")
  }
  if (!Array.isArray(roots) || roots.length === 0) {
    throw new TypeError("roots must be a non-empty array")
  }

  const files = await collectSourceFiles({ projectRoot, roots })
  const occurrences = []
  for (const file of files) {
    const source = await readFile(file.absolutePath, "utf8")
    occurrences.push(
      ...extractTranslationUnitsFromText({ file: file.relativePath, source }),
    )
  }
  occurrences.sort(
    (left, right) =>
      compareText(left.file, right.file) || left.start - right.start || left.end - right.end,
  )

  if (occurrences.length === 0) {
    throw new Error("No translatable Chinese messages were found")
  }

  const entriesById = new Map()
  for (const occurrence of occurrences) {
    const existing = entriesById.get(occurrence.id)
    if (existing && existing !== occurrence.source) {
      throw new Error(`Content-addressed message ID collision for ${occurrence.id}`)
    }
    entriesById.set(occurrence.id, occurrence.source)
  }
  const entries = Object.fromEntries(
    [...entriesById.entries()].sort(([left], [right]) => compareText(left, right)),
  )

  return {
    files,
    sourceCatalog: {
      sourceLocale: SOURCE_LOCALE,
      targetLocales: [...TARGET_LOCALES],
      glossary: {},
      entries,
    },
    occurrences,
  }
}

export async function extractTranslationUnits({ projectRoot, roots = DEFAULT_ROOTS }) {
  const { sourceCatalog, occurrences } = await collectExtraction({ projectRoot, roots })
  return { sourceCatalog, occurrences }
}

function createSummary({ files, sourceCatalog, occurrences }) {
  const hanCharacters = Object.values(sourceCatalog.entries).reduce(
    (total, message) => total + (message.match(/\p{Script=Han}/gu)?.length ?? 0),
    0,
  )

  return {
    files: files.length,
    uniqueMessages: Object.keys(sourceCatalog.entries).length,
    occurrences: occurrences.length,
    hanCharacters,
  }
}

export async function writeExtractionOutputs({
  projectRoot,
  roots = DEFAULT_ROOTS,
  outputDir = join(projectRoot, "i18n", "catalog"),
}) {
  const extraction = await collectExtraction({ projectRoot, roots })
  await mkdir(outputDir, { recursive: true })
  await writeFile(
    join(outputDir, "source.zh-CN.json"),
    `${JSON.stringify(extraction.sourceCatalog, null, 2)}\n`,
    "utf8",
  )
  await writeFile(
    join(outputDir, "occurrences.json"),
    `${JSON.stringify(extraction.occurrences, null, 2)}\n`,
    "utf8",
  )
  return createSummary(extraction)
}

async function runCli() {
  const projectRoot = resolve(process.cwd())
  const summary = await writeExtractionOutputs({ projectRoot, roots: DEFAULT_ROOTS })
  console.log(
    `Extracted ${summary.uniqueMessages} unique messages from ${summary.files} files ` +
      `(${summary.occurrences} occurrences, ${summary.hanCharacters} Han characters).`,
  )
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : ""
if (invokedPath === import.meta.url) {
  runCli().catch((error) => {
    console.error(error instanceof Error ? error.stack : error)
    process.exitCode = 1
  })
}
