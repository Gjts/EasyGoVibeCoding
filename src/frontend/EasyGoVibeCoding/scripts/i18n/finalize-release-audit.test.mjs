import assert from "node:assert/strict"
import test from "node:test"

import { parseBuildEvidence, parseTapEvidence, sanitizeCommandLabel } from "./finalize-release-audit.mjs"

test("command evidence rejects secret-bearing or unsanitized labels", () => {
  assert.equal(sanitizeCommandLabel("I18N_SITE_ORIGIN=https://example.invalid pnpm i18n:build:all"), "I18N_SITE_ORIGIN=https://example.invalid pnpm i18n:build:all")
  assert.throws(() => sanitizeCommandLabel("TRANSLATION_API_KEY=secret pnpm build"), /secret-bearing/iu)
  assert.throws(() => sanitizeCommandLabel("pnpm build\nprintenv"), /sanitized/iu)
  const builds = ["zh-CN", "ja", "en", "fr", "de"].map((locale) => ({ locale, exitCode: 0 }))
  const build = parseBuildEvidence(`x\n ✓ Generating static pages using 19 workers (87/87)\n ✓ Generating static pages using 19 workers (82/82)\n ✓ Generating static pages using 19 workers (82/82)\n ✓ Generating static pages using 19 workers (82/82)\n ✓ Generating static pages using 19 workers (82/82)\n${JSON.stringify({ builds, academyRouteCount: 79, businessHtml: 400, manifestSha256: "a".repeat(64) }, null, 2)}\n`)
  assert.deepEqual(build.routeUnits, { "zh-CN": 87, ja: 82, en: 82, fr: 82, de: 82 })
  assert.equal(build.businessHtml, 400)
  assert.deepEqual(parseTapEvidence("ℹ tests 116\nℹ pass 116\nℹ fail 0\n"), { total: 116, pass: 116, fail: 0 })
  assert.throws(() => parseTapEvidence("ℹ tests 116\nℹ pass 115\nℹ fail 1\n"), /TAP/iu)
})
