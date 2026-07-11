import assert from "node:assert/strict"
import test from "node:test"

import { sanitizeCommandLabel } from "./finalize-release-audit.mjs"

test("command evidence rejects secret-bearing or unsanitized labels", () => {
  assert.equal(sanitizeCommandLabel("I18N_SITE_ORIGIN=https://example.invalid pnpm i18n:build:all"), "I18N_SITE_ORIGIN=https://example.invalid pnpm i18n:build:all")
  assert.throws(() => sanitizeCommandLabel("TRANSLATION_API_KEY=secret pnpm build"), /secret-bearing/iu)
  assert.throws(() => sanitizeCommandLabel("pnpm build\nprintenv"), /sanitized/iu)
})
