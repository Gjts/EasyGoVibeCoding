import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const headerSource = await readFile(new URL("../../components/header.tsx", import.meta.url), "utf8")
const languageSwitcherSource = await readFile(
  new URL("../../components/language-switcher.tsx", import.meta.url),
  "utf8",
)

test("desktop navigation waits for the wide breakpoint and keeps medium widths compact", () => {
  assert.match(headerSource, /flex xl:hidden/)
  assert.match(headerSource, /flex xl:shrink-0/)
  assert.match(headerSource, /hidden xl:flex xl:flex-1 xl:justify-center xl:gap-x-2/)
  assert.doesNotMatch(headerSource, /2xl:gap-x-6/)
  assert.doesNotMatch(headerSource, /2xl:px-3/)
  assert.match(headerSource, /hidden xl:flex xl:flex-none xl:items-center/)
  assert.match(headerSource, /sr-only 2xl:not-sr-only/)
  assert.match(headerSource, /hidden 2xl:block/)
})

test("language dropdown trigger stays visible and compact when translated controls get longer", () => {
  assert.match(languageSwitcherSource, /shrink-0/)
  assert.match(languageSwitcherSource, /whitespace-nowrap/)
  assert.match(languageSwitcherSource, /DropdownMenuTrigger/)
  assert.match(headerSource, /LanguageSwitcher className="mr-1 justify-end"/)
})
