import { createHash } from "node:crypto"
import { readFile, readdir } from "node:fs/promises"
import { join, relative, resolve } from "node:path"
import { pathToFileURL } from "node:url"

import { auditDeploymentSeo, postprocessDeploymentSeo, validateSiteOrigin } from "./seo-postprocess.mjs"
import { deriveAcademyRoutes } from "./static-deployment.mjs"

const SALES_LEGAL = ["/ja", "/ja/privacy", "/ja/refund", "/ja/terms", "/ja/tokushoho"]

async function deploymentTreeHash(root) {
  const rows = []
  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true })
    entries.sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0)
    for (const entry of entries) {
      const absolute = join(directory, entry.name)
      if (entry.isDirectory()) await walk(absolute)
      else if (entry.isFile()) {
        const bytes = await readFile(absolute)
        rows.push(`${relative(root, absolute).replaceAll("\\", "/")}\0${createHash("sha256").update(bytes).digest("hex")}\0${bytes.length}\n`)
      } else throw new Error(`Deployment audit encountered a non-ordinary entry: ${absolute}`)
    }
  }
  await walk(root)
  return createHash("sha256").update(rows.join("")).digest("hex")
}

export async function auditStaticSeo(projectRoot = process.cwd(), { siteOrigin = process.env.I18N_SITE_ORIGIN } = {}) {
  const root = resolve(projectRoot)
  const deploymentRoot = join(root, ".cache", "i18n-deploy")
  const origin = validateSiteOrigin(siteOrigin)
  const academyRoutes = await deriveAcademyRoutes(root)
  const manifest = JSON.parse(await readFile(join(deploymentRoot, "i18n-merge-manifest.json"), "utf8"))
  const beforeTreeSha256 = await deploymentTreeHash(deploymentRoot)
  const first = await auditDeploymentSeo({ deploymentRoot, academyRoutes, salesLegal: SALES_LEGAL, siteOrigin: origin })
  const rerun = await postprocessDeploymentSeo({ deploymentRoot, academyRoutes, salesLegal: SALES_LEGAL, siteOrigin: origin })
  const afterTreeSha256 = await deploymentTreeHash(deploymentRoot)
  const second = await auditDeploymentSeo({ deploymentRoot, academyRoutes, salesLegal: SALES_LEGAL, siteOrigin: origin })
  const salesLegal = []
  for (const route of SALES_LEGAL) {
    const relativePath = `${route.slice(1)}.html`
    const source = await readFile(join(root, "out", ...relativePath.split("/")))
    const published = await readFile(join(deploymentRoot, ...relativePath.split("/")))
    salesLegal.push({ route, sourceBytesPreserved: source.equals(published) })
  }
  if (first.businessPageCount !== 400 || first.academyPageCount !== 395 || first.sitemapUrlCount !== 400) throw new Error("SEO audit did not cover the exact 400-page business matrix")
  if (JSON.stringify(first) !== JSON.stringify(second) || beforeTreeSha256 !== afterTreeSha256) throw new Error("SEO post-processing is not byte-idempotent")
  if (JSON.stringify(manifest.seo) !== JSON.stringify(rerun)) throw new Error("Deployment manifest SEO evidence does not match the emitted release")
  if (salesLegal.some(({ sourceBytesPreserved }) => !sourceBytesPreserved)) throw new Error("A Japanese sales/legal page was modified by academy SEO processing")
  return { ...first, treeSha256: afterTreeSha256, idempotent: true, manifestSeoMatches: true, originKind: manifest.seo.originKind, salesLegal }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  auditStaticSeo().then((result) => console.log(JSON.stringify(result, null, 2))).catch((error) => { console.error(error?.stack ?? error); process.exitCode = 1 })
}
