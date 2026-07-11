import { extname } from "node:path"
import ts from "typescript"

import { extractTranslationUnitsFromText } from "./source-extractor.mjs"

const SUPPORTED_KINDS = new Set(["string", "json-string", "jsx-text", "template"])
const PLACEHOLDER_PATTERN = /\{p(\d+)\}/gu

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

function formatParseError(sourceFile, diagnostic) {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
  if (typeof diagnostic.start !== "number") return message
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(diagnostic.start)
  return `${line + 1}:${character + 1}: ${message}`
}

function assertSyntax(source, file) {
  if (extname(file).toLowerCase() === ".json") {
    try {
      JSON.parse(source)
    } catch (error) {
      throw new SyntaxError(`Unable to parse transformed ${file}: ${error.message}`, {
        cause: error,
      })
    }
    return
  }

  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKindForFile(file),
  )
  const diagnostic = sourceFile.parseDiagnostics?.[0]
  if (diagnostic) {
    throw new SyntaxError(
      `Unable to parse transformed ${file}: ${formatParseError(sourceFile, diagnostic)}`,
    )
  }
}

function collectJsxAttributeStringRanges(source, file) {
  if (![".jsx", ".tsx"].includes(extname(file).toLowerCase())) return new Set()
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKindForFile(file),
  )
  const ranges = new Set()
  function visit(node) {
    if (
      ts.isJsxAttribute(node) &&
      node.initializer &&
      ts.isStringLiteral(node.initializer)
    ) {
      ranges.add(`${node.initializer.getStart(sourceFile)}:${node.initializer.end}`)
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return ranges
}

function placeholderIndexes(value) {
  return [...value.matchAll(PLACEHOLDER_PATTERN)].map((match) => Number(match[1]))
}

function assertPlaceholderParity(source, translated, id) {
  const sourcePlaceholders = placeholderIndexes(source).sort((left, right) => left - right)
  const translatedPlaceholders = placeholderIndexes(translated).sort(
    (left, right) => left - right,
  )
  if (
    sourcePlaceholders.length !== translatedPlaceholders.length ||
    sourcePlaceholders.some((value, index) => value !== translatedPlaceholders[index])
  ) {
    throw new Error(`Placeholder mismatch for occurrence ${id}`)
  }
}

function containsRange(container, nested) {
  return container.start <= nested.start && container.end >= nested.end
}

function rangesOverlap(left, right) {
  return left.start < right.end && right.start < left.end
}

function isNestedInTemplateExpression(parent, child) {
  return (
    parent.kind === "template" &&
    parent.expressionRanges.some((range) => containsRange(range, child))
  )
}

function assertValidOverlaps(occurrences) {
  for (let leftIndex = 0; leftIndex < occurrences.length; leftIndex += 1) {
    const left = occurrences[leftIndex]
    for (let rightIndex = leftIndex + 1; rightIndex < occurrences.length; rightIndex += 1) {
      const right = occurrences[rightIndex]
      if (!rangesOverlap(left, right)) continue
      if (
        (containsRange(left, right) && isNestedInTemplateExpression(left, right)) ||
        (containsRange(right, left) && isNestedInTemplateExpression(right, left))
      ) {
        continue
      }
      throw new Error(
        `Invalid occurrence overlap in ${left.file}: ${left.id} and ${right.id}`,
      )
    }
  }
}

function sameExpressionRanges(left, right) {
  return (
    left.length === right.length &&
    left.every(
      (range, index) =>
        range.start === right[index].start && range.end === right[index].end,
    )
  )
}

function assertOccurrenceMatchesExtraction(occurrence, extractedOccurrences) {
  const matched = extractedOccurrences.some(
    (candidate) =>
      candidate.id === occurrence.id &&
      candidate.file === occurrence.file &&
      candidate.start === occurrence.start &&
      candidate.end === occurrence.end &&
      candidate.kind === occurrence.kind &&
      candidate.source === occurrence.source &&
      candidate.expressions.length === occurrence.expressions.length &&
      candidate.expressions.every(
        (expression, index) => expression === occurrence.expressions[index],
      ) &&
      sameExpressionRanges(candidate.expressionRanges, occurrence.expressionRanges),
  )
  if (!matched) {
    throw new Error(
      `Occurrence offset/source region mismatch in ${occurrence.file} for ${occurrence.id}`,
    )
  }
}

function validateInputs({ source, occurrences, messages, file }) {
  if (typeof source !== "string") throw new TypeError("source must be a string")
  if (source.includes("\r")) {
    throw new Error(`Source ${file} must use LF-only line endings`)
  }
  if (typeof file !== "string" || file.length === 0) {
    throw new TypeError("file must be a non-empty string")
  }
  if (!Array.isArray(occurrences)) throw new TypeError("occurrences must be an array")
  if (!messages || typeof messages !== "object" || Array.isArray(messages)) {
    throw new TypeError("messages must be an object")
  }

  for (const occurrence of occurrences) {
    if (!occurrence || typeof occurrence !== "object") {
      throw new TypeError("Every occurrence must be an object")
    }
    if (typeof occurrence.id !== "string" || occurrence.id.length === 0) {
      throw new TypeError("Every occurrence ID must be a non-empty string")
    }
    if (occurrence.file !== file) {
      throw new Error(`Occurrence ${occurrence.id} belongs to ${occurrence.file}, not ${file}`)
    }
    if (!SUPPORTED_KINDS.has(occurrence.kind)) {
      throw new Error(`Occurrence ${occurrence.id} does not have a supported kind`)
    }
    if (
      !Number.isInteger(occurrence.start) ||
      !Number.isInteger(occurrence.end) ||
      occurrence.start < 0 ||
      occurrence.end <= occurrence.start ||
      occurrence.end > source.length
    ) {
      throw new Error(`Occurrence ${occurrence.id} has out-of-bounds offsets`)
    }
    if (typeof occurrence.source !== "string" || occurrence.source.length === 0) {
      throw new TypeError(`Occurrence ${occurrence.id} source must be a non-empty string`)
    }
    if (!Array.isArray(occurrence.expressions) || !Array.isArray(occurrence.expressionRanges)) {
      throw new TypeError(`Occurrence ${occurrence.id} expression metadata must be arrays`)
    }
    if (occurrence.expressions.length !== occurrence.expressionRanges.length) {
      throw new Error(`Occurrence ${occurrence.id} expression/range count mismatch`)
    }
    if (
      occurrence.kind !== "template" &&
      (occurrence.expressions.length > 0 || occurrence.expressionRanges.length > 0)
    ) {
      throw new Error(`Only template occurrences may contain expression ranges`)
    }

    for (const [index, range] of occurrence.expressionRanges.entries()) {
      if (
        !range ||
        !Number.isInteger(range.start) ||
        !Number.isInteger(range.end) ||
        range.end <= range.start ||
        !containsRange(occurrence, range)
      ) {
        throw new Error(`Occurrence ${occurrence.id} has an invalid expression range`)
      }
      if (
        typeof occurrence.expressions[index] !== "string" ||
        source.slice(range.start, range.end) !== occurrence.expressions[index]
      ) {
        throw new Error(`Occurrence ${occurrence.id} expression range does not match source`)
      }
    }
    for (let index = 1; index < occurrence.expressionRanges.length; index += 1) {
      if (rangesOverlap(occurrence.expressionRanges[index - 1], occurrence.expressionRanges[index])) {
        throw new Error(`Occurrence ${occurrence.id} has overlapping expression ranges`)
      }
    }

    const expectedTemplatePlaceholders = occurrence.expressions.map((_, index) => index)
    if (
      occurrence.kind === "template" &&
      !sameNumberArray(
        placeholderIndexes(occurrence.source).sort((left, right) => left - right),
        expectedTemplatePlaceholders,
      )
    ) {
      throw new Error(`Occurrence ${occurrence.id} has invalid template placeholders`)
    }
  }

  assertValidOverlaps(occurrences)

  const expectedMessageIds = new Set(occurrences.map((occurrence) => occurrence.id))
  for (const id of expectedMessageIds) {
    if (!Object.hasOwn(messages, id)) throw new Error(`Missing translated message for ${id}`)
    if (typeof messages[id] !== "string" || messages[id].trim().length === 0) {
      throw new Error(`Translated message for ${id} must be non-empty`)
    }
  }
  const extraIds = Object.keys(messages).filter((id) => !expectedMessageIds.has(id))
  if (extraIds.length > 0) {
    throw new Error(`Extra translated message not used by ${file}: ${extraIds[0]}`)
  }
  for (const occurrence of occurrences) {
    assertPlaceholderParity(occurrence.source, messages[occurrence.id], occurrence.id)
  }

  const extractedOccurrences = extractTranslationUnitsFromText({ file, source })
  for (const occurrence of occurrences) {
    assertOccurrenceMatchesExtraction(occurrence, extractedOccurrences)
  }
}

function sameNumberArray(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

function escapeJsxText(value) {
  return value.replace(
    /&(?:#\d+|#x[\da-f]+|[a-z][\da-z]+);|[&<>{}]/giu,
    (token) => {
      if (token.startsWith("&") && token.endsWith(";")) return token
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "{": "&#123;",
        "}": "&#125;",
      }[token]
    },
  )
}

function escapeTemplateSegment(value) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("`", "\\`")
    .replaceAll("${", "\\${")
}

function isDescendantOf(candidate, parent) {
  return candidate !== parent && isNestedInTemplateExpression(parent, candidate)
}

function rootOccurrences(occurrences) {
  return occurrences.filter(
    (candidate) => !occurrences.some((parent) => isDescendantOf(candidate, parent)),
  )
}

function renderTemplate({ translated, expressions }) {
  let output = "`"
  let cursor = 0
  for (const match of translated.matchAll(PLACEHOLDER_PATTERN)) {
    output += escapeTemplateSegment(translated.slice(cursor, match.index))
    output += `\${${expressions[Number(match[1])]}}`
    cursor = match.index + match[0].length
  }
  output += `${escapeTemplateSegment(translated.slice(cursor))}\``
  return output
}

function renderOccurrence({ fullSource, occurrence, occurrences, messages, appliedCounts }) {
  const translated = messages[occurrence.id]
  appliedCounts[occurrence.index] += 1
  switch (occurrence.kind) {
    case "string": {
      const literal = JSON.stringify(translated)
      return occurrence.isJsxAttribute ? `{${literal}}` : literal
    }
    case "json-string":
      return JSON.stringify(translated)
    case "jsx-text":
      return escapeJsxText(translated)
    case "template": {
      const transformedExpressions = occurrence.expressionRanges.map((range) => {
        const children = occurrences.filter(
          (candidate) => candidate !== occurrence && containsRange(range, candidate),
        )
        return transformSlice({
          fullSource,
          start: range.start,
          end: range.end,
          occurrences: children,
          messages,
          appliedCounts,
        })
      })
      return renderTemplate({ translated, expressions: transformedExpressions })
    }
    default:
      throw new Error(`Unsupported occurrence kind: ${occurrence.kind}`)
  }
}

function transformSlice({ fullSource, start, end, occurrences, messages, appliedCounts }) {
  let output = fullSource.slice(start, end)
  const replacements = rootOccurrences(occurrences).map((occurrence) => ({
    start: occurrence.start,
    end: occurrence.end,
    value: renderOccurrence({
      fullSource,
      occurrence,
      occurrences,
      messages,
      appliedCounts,
    }),
  }))
  replacements.sort((left, right) => right.start - left.start || right.end - left.end)
  for (const replacement of replacements) {
    const relativeStart = replacement.start - start
    const relativeEnd = replacement.end - start
    output = `${output.slice(0, relativeStart)}${replacement.value}${output.slice(relativeEnd)}`
  }
  return output
}

export function applyTranslationsToText({ source, occurrences, messages, file }) {
  validateInputs({ source, occurrences, messages, file })
  assertSyntax(source, file)

  const jsxAttributeStringRanges = collectJsxAttributeStringRanges(source, file)
  const indexedOccurrences = occurrences.map((occurrence, index) => ({
    ...occurrence,
    index,
    isJsxAttribute: jsxAttributeStringRanges.has(`${occurrence.start}:${occurrence.end}`),
  }))
  const appliedCounts = indexedOccurrences.map(() => 0)
  const transformed = transformSlice({
    fullSource: source,
    start: 0,
    end: source.length,
    occurrences: indexedOccurrences,
    messages,
    appliedCounts,
  })
  for (const [index, count] of appliedCounts.entries()) {
    if (count !== 1) {
      const occurrence = indexedOccurrences[index]
      throw new Error(
        `Occurrence ${occurrence.id} at ${occurrence.start} was applied ${count} times`,
      )
    }
  }
  assertSyntax(transformed, file)
  return transformed
}
