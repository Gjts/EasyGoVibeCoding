import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { dirname, extname, join, resolve } from "node:path"
import { createRequire } from "node:module"
import test from "node:test"

import ts from "typescript"

const projectRoot = resolve(import.meta.dirname, "../..")
const nativeRequire = createRequire(import.meta.url)

function resolveLocalModule(specifier, parentFile) {
  const base = specifier.startsWith("@/")
    ? join(projectRoot, specifier.slice(2))
    : resolve(dirname(parentFile), specifier)
  const candidates = extname(base)
    ? [base]
    : [`${base}.ts`, `${base}.tsx`, `${base}.json`, join(base, "index.ts")]
  return candidates.find((candidate) => {
    try {
      readFileSync(candidate)
      return true
    } catch {
      return false
    }
  })
}

function loadTypeScript(entry, stubs = {}) {
  const cache = new Map()
  function load(file) {
    if (file.endsWith(".json")) return JSON.parse(readFileSync(file, "utf8"))
    if (cache.has(file)) return cache.get(file).exports
    const loadedModule = { exports: {} }
    cache.set(file, loadedModule)
    const source = readFileSync(file, "utf8")
    const output = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
        target: ts.ScriptTarget.ES2022,
      },
      fileName: file,
    }).outputText
    const localRequire = (specifier) => {
      if (Object.hasOwn(stubs, specifier)) return stubs[specifier]
      const local = resolveLocalModule(specifier, file)
      return local ? load(local) : nativeRequire(specifier)
    }
    new Function("require", "module", "exports", "__filename", "__dirname", output)(
      localRequire,
      loadedModule,
      loadedModule.exports,
      file,
      dirname(file),
    )
    return loadedModule.exports
  }
  return load(resolve(projectRoot, entry))
}

function withBuildEnv(locale, basePath, callback) {
  const before = {
    locale: process.env.NEXT_PUBLIC_SITE_LOCALE,
    basePath: process.env.NEXT_PUBLIC_SITE_BASE_PATH,
  }
  process.env.NEXT_PUBLIC_SITE_LOCALE = locale
  process.env.NEXT_PUBLIC_SITE_BASE_PATH = basePath
  try {
    return callback()
  } finally {
    if (before.locale === undefined) delete process.env.NEXT_PUBLIC_SITE_LOCALE
    else process.env.NEXT_PUBLIC_SITE_LOCALE = before.locale
    if (before.basePath === undefined) delete process.env.NEXT_PUBLIC_SITE_BASE_PATH
    else process.env.NEXT_PUBLIC_SITE_BASE_PATH = before.basePath
  }
}

function source(path) {
  return readFileSync(join(projectRoot, path), "utf8")
}

test("routes every locale without double prefixes and preserves the Japanese sales root", () => {
  withBuildEnv("zh-CN", "", () => {
    const routing = loadTypeScript("lib/i18n-routing.ts")
    assert.equal(routing.stripLocaleBasePath("/ja"), "/ja")
    assert.equal(routing.stripLocaleBasePath("/en/academy/advanced/x/?q=1#top"), "/advanced/x/?q=1#top")
    assert.equal(routing.stripLocaleBasePath("/en/academy/en/academy/basics"), "/basics")
    assert.equal(routing.stripLocaleBasePath("/fr/academy/de/academy"), "/")
    assert.equal(routing.localizedAcademyPath("zh-CN", "/en/academy/basics"), "/basics")
    assert.equal(routing.localizedAcademyPath("ja", "/ja"), "/ja/academy/ja")
    assert.equal(routing.localizedAcademyPath("en", "/en/academy/basics/?q=1#x"), "/en/academy/basics/?q=1#x")
    assert.equal(routing.localizedAcademyPath("fr", "/"), "/fr/academy")
    assert.equal(routing.localizedAcademyPath("de", "/de/academy/de/academy/tools"), "/de/academy/tools")
  })
})

test("language switch destinations preserve pathname, query, and hash for every locale", () => {
  withBuildEnv("en", "/en/academy", () => {
    const routing = loadTypeScript("lib/i18n-routing.ts")
    const pathname = "/en/academy/en/academy/tools"
    const search = "?filter=cli&sort=recent"
    const hash = "#pricing"
    assert.deepEqual(
      routing.siteLocales.map((locale) =>
        routing.localizedAcademyHref(locale, pathname, search, hash),
      ),
      [
        "/tools?filter=cli&sort=recent#pricing",
        "/ja/academy/tools?filter=cli&sort=recent#pricing",
        "/en/academy/tools?filter=cli&sort=recent#pricing",
        "/fr/academy/tools?filter=cli&sort=recent#pricing",
        "/de/academy/tools?filter=cli&sort=recent#pricing",
      ],
    )
    assert.equal(
      routing.localizedAcademyHref("fr", "/tools", "filter=cli", "pricing"),
      "/fr/academy/tools?filter=cli#pricing",
    )
  })
})

test("validates locale/base-path pairs", () => {
  assert.throws(
    () => withBuildEnv("en", "/fr/academy", () => loadTypeScript("lib/i18n-routing.ts")),
    /base path/i,
  )
  assert.throws(
    () => withBuildEnv("es", "/es/academy", () => loadTypeScript("lib/i18n-routing.ts")),
    /locale/i,
  )
})

test("language preference storage validates values and fails closed", () => {
  withBuildEnv("zh-CN", "", () => {
    const preference = loadTypeScript("lib/language-preference.ts")
    const values = new Map()
    const storage = {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    }

    preference.savePreferredLocale(storage, "en")
    assert.equal(preference.readPreferredLocale(storage), "en")

    values.set(preference.LANGUAGE_PREFERENCE_STORAGE_KEY, "es")
    assert.equal(preference.readPreferredLocale(storage), null)
    assert.equal(
      preference.readPreferredLocale({ getItem() { throw new Error("blocked") } }),
      null,
    )
    assert.doesNotThrow(() =>
      preference.savePreferredLocale(
        { setItem() { throw new Error("blocked") } },
        "fr",
      ),
    )
  })
})

test("remembered language redirects only the public root", () => {
  withBuildEnv("zh-CN", "", () => {
    const preference = loadTypeScript("lib/language-preference.ts")
    const runRedirect = (pathname, storedLocale) => {
      let replacement = null
      let storageReads = 0
      const browserWindow = {
        location: {
          pathname,
          replace: (destination) => { replacement = destination },
        },
        localStorage: {
          getItem: (key) => {
            storageReads += 1
            assert.equal(key, preference.LANGUAGE_PREFERENCE_STORAGE_KEY)
            return storedLocale
          },
        },
      }
      new Function("window", preference.languagePreferenceRedirectScript)(browserWindow)
      return { replacement, storageReads }
    }

    assert.deepEqual(runRedirect("/", "en"), {
      replacement: "/en/academy",
      storageReads: 1,
    })
    assert.deepEqual(runRedirect("/", "zh-CN"), {
      replacement: null,
      storageReads: 1,
    })
    assert.deepEqual(runRedirect("/", "es"), {
      replacement: null,
      storageReads: 1,
    })
    assert.deepEqual(runRedirect("/fr/academy/", "en"), {
      replacement: null,
      storageReads: 0,
    })
  })
})

test("language switcher uses an accessible native-name dropdown and canonical route mapping", () => {
  const switcher = source("components/language-switcher.tsx")
  for (const [locale, label] of [
    ["zh-CN", "简体中文"],
    ["ja", "日本語"],
    ["en", "English"],
    ["fr", "Français"],
    ["de", "Deutsch"],
  ]) {
    const labelExpression = switcher.match(
      new RegExp(
        `locale: \\"${locale}\\", label: (String\\.fromCodePoint\\([^)]*\\)|\\"(?:\\\\.|[^\\"])*\\")`,
      ),
    )?.[1]
    assert.ok(labelExpression, `missing language option for ${locale}`)
    const renderedLabel = labelExpression.startsWith("String.fromCodePoint")
      ? String.fromCodePoint(
          ...Array.from(labelExpression.matchAll(/0x([\da-f]+)/gi), (match) =>
            Number.parseInt(match[1], 16),
          ),
        )
      : JSON.parse(labelExpression)
    assert.equal(renderedLabel, label)
  }
  assert.match(switcher, /DropdownMenuTrigger/)
  assert.match(switcher, /DropdownMenuContent/)
  assert.match(switcher, /DropdownMenuItem/)
  assert.match(switcher, /<a\s/)
  assert.doesNotMatch(switcher, /<Link\s/)
  assert.match(switcher, /localizedAcademyHref/)
  assert.match(switcher, /translate="no"/)
  assert.match(switcher, /aria-current=/)
})

test("language selection persists and the Chinese root installs the early redirect", () => {
  const switcher = source("components/language-switcher.tsx")
  const layout = source("app/layout.tsx")
  assert.match(switcher, /savePreferredLocale\(window\.localStorage, locale\)/)
  assert.match(layout, /siteLocale === ["']zh-CN["']/)
  assert.match(layout, /languagePreferenceRedirectScript/)
  assert.match(layout, /dangerouslySetInnerHTML/)
})

test("progress canonicalizes locale paths and re-keys legacy records", () => {
  withBuildEnv("en", "/en/academy", () => {
    const values = new Map()
    global.window = {
      localStorage: {
        getItem: (key) => values.get(key) ?? null,
        setItem: (key, value) => values.set(key, value),
      },
      dispatchEvent() {},
    }
    global.Event = class Event {}
    try {
      const progress = loadTypeScript("lib/learning-progress.ts")
      progress.markComplete("/en/academy/basics/")
      assert.equal(progress.loadProgress().completed["/basics"].path, "/basics")
      assert.equal(progress.isPathCompleted(progress.loadProgress(), "/fr/academy/basics"), true)

      values.set("egvc:learning-progress:v1", JSON.stringify({
        version: 2,
        visits: {
          "/ja/academy/tools": { path: "/ja/academy/tools", category: "tools", firstSeen: 1, lastSeen: 2, visits: 3 },
          "/tools": { path: "/tools", category: "tools", firstSeen: 0, lastSeen: 4, visits: 2 },
        },
        completed: {
          "/de/academy/tools": { path: "/de/academy/tools", category: "tools", completedAt: 3 },
        },
        updatedAt: 4,
      }))
      const rekeyed = progress.loadProgress()
      assert.deepEqual(Object.keys(rekeyed.visits), ["/tools"])
      assert.equal(rekeyed.visits["/tools"].visits, 5)
      assert.equal(rekeyed.completed["/tools"].path, "/tools")
      assert.doesNotMatch(values.get("egvc:learning-progress:v1"), /\/academy/)
    } finally {
      delete global.window
      delete global.Event
    }
  })
})

test("localized model branches never fetch while Chinese branches do", async () => {
  await withBuildEnv("en", "/en/academy", async () => {
    let calls = 0
    global.fetch = async () => { calls += 1; throw new Error("must not fetch") }
    try {
      const models = loadTypeScript("lib/models.ts")
      assert.equal((await models.getLatestModels()).from, "seed")
      assert.equal((await models.refreshLatestModels()).from, "seed")
      assert.equal(calls, 0)
      assert.notEqual(models.formatUpdatedAt("2026-07-10T00:00:00.000Z"), "2026/07/10 08:00")
    } finally {
      delete global.fetch
    }
  })

  await withBuildEnv("zh-CN", "", async () => {
    let calls = 0
    global.fetch = async () => ({ ok: false, status: 500, json: async () => null })
    const countedFetch = global.fetch
    global.fetch = async (...args) => { calls += 1; return countedFetch(...args) }
    try {
      const models = loadTypeScript("lib/models.ts")
      await models.getLatestModels()
      await assert.rejects(models.refreshLatestModels())
      assert.equal(calls, 2)
    } finally {
      delete global.fetch
    }
  })
})

test("localized feedback initializes from seed and never fetches while Chinese does", async () => {
  async function renderFeedback(locale, basePath) {
    return withBuildEnv(locale, basePath, async () => {
      const states = []
      let calls = 0
      global.fetch = async () => {
        calls += 1
        return { json: async () => ({ data: [] }) }
      }
      try {
        const component = loadTypeScript("components/home/email-feedback-ticker.tsx", {
          react: {
            useState(initial) {
              states.push(initial)
              return [initial, () => {}]
            },
            useEffect(effect) {
              effect()
            },
          },
          "lucide-react": new Proxy({}, { get: () => () => null }),
          "react/jsx-runtime": {
            jsx: (type, props) => ({ type, props }),
            jsxs: (type, props) => ({ type, props }),
          },
        })
        component.EmailFeedbackTicker()
        await new Promise((resolve) => setImmediate(resolve))
        return { calls, states }
      } finally {
        delete global.fetch
      }
    })
  }

  const localized = await renderFeedback("en", "/en/academy")
  assert.equal(localized.calls, 0)
  assert.equal(Array.isArray(localized.states[0]), true)
  assert.equal(localized.states[1], false)

  const chinese = await renderFeedback("zh-CN", "")
  assert.equal(chinese.calls, 1)
  assert.deepEqual(chinese.states[0], [])
  assert.equal(chinese.states[1], true)
})

test("localized contact failures never expose raw response or Error bodies", () => {
  const stubs = {
    react: { useState: () => [null, () => {}] },
    "@/components/ui/button": { Button: () => null },
    "@/components/ui/input": { Input: () => null },
    "@/components/ui/textarea": { Textarea: () => null },
    "@/components/ui/label": { Label: () => null },
    "lucide-react": new Proxy({}, { get: () => () => null }),
    "react/jsx-runtime": { jsx: () => null, jsxs: () => null },
  }
  withBuildEnv("en", "/en/academy", () => {
    const contact = loadTypeScript("components/contact-section.tsx", stubs)
    assert.equal(
      contact.getContactHttpErrorMessage({ error: "raw server", details: "secret" }),
      "发送失败",
    )
    assert.equal(
      contact.getContactNetworkErrorMessage(new Error("raw network")),
      "网络错误，请检查网络连接后重试",
    )
  })
  withBuildEnv("zh-CN", "", () => {
    const contact = loadTypeScript("components/contact-section.tsx", stubs)
    assert.equal(
      contact.getContactHttpErrorMessage({ error: "raw server", details: "detail" }),
      "raw server: detail",
    )
    assert.equal(contact.getContactNetworkErrorMessage(new Error("raw network")), "raw network")
  })
})

test("localized feedback, contact privacy, locale formatting, and root APIs are explicit", () => {
  const feedback = source("components/home/email-feedback-ticker.tsx")
  const contact = source("components/contact-section.tsx")
  const footer = source("components/footer.tsx")
  assert.match(feedback, /siteLocale !== "zh-CN"/)
  assert.match(feedback, /if \(isLocalizedAcademy\) return/)
  assert.match(contact, /siteLocale !== "zh-CN"\) return "发送失败"/)
  assert.match(contact, /siteLocale !== "zh-CN"\) return "网络错误，请检查网络连接后重试"/)
  assert.match(footer, /toLocaleString\(siteLocale\)/)
  assert.match(footer, /stripLocaleBasePath\(window\.location\.pathname/)
  for (const api of ["/api/feedback", "/api/send-email", "/api/site-stats"]) {
    assert.match(`${feedback}\n${contact}\n${footer}`, new RegExp(`\\"${api.replaceAll("/", "\\/")}\\"`))
  }
})

test("every framework renderer has a localized no-PNG diagram branch", () => {
  const diagram = source("components/course/localized-framework-diagram.tsx")
  assert.doesNotMatch(diagram, /[\u3400-\u9fff]/u)
  assert.doesNotMatch(diagram, /<Image|\.png/)
  for (const file of [
    "components/home/ai-frameworks-spotlight.tsx",
    "components/course/framework-detail.tsx",
    "app/advanced/ai-frameworks/page.tsx",
  ]) {
    const contents = source(file)
    assert.match(contents, /LocalizedFrameworkDiagram/)
    assert.match(contents, /siteLocale !== "zh-CN"/)
  }
})

test("source catalog matches the approved Grok 4.5 release baseline", () => {
  const bytes = readFileSync(join(projectRoot, "i18n/catalog/source.zh-CN.json"))
  const catalog = JSON.parse(bytes)
  assert.equal(Object.keys(catalog.entries).length, 9289)
  assert.equal(createHash("sha256").update(bytes).digest("hex"), "55d91d217208e1e7e3e3d33851eeb2af3d905cb7a6e6bbedff6f2e4a1920a710")
})
