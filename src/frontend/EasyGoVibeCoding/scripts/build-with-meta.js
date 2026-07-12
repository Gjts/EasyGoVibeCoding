/* eslint-disable @typescript-eslint/no-require-imports */
const { spawnSync } = require("node:child_process");
const path = require("node:path");

function main() {
  const env = { ...process.env };

  if (!env.NEXT_PUBLIC_LAST_UPDATED) {
    env.NEXT_PUBLIC_LAST_UPDATED = new Date().toISOString();
  }

  const nextBin = path.join(
    __dirname,
    "..",
    "node_modules",
    "next",
    "dist",
    "bin",
    "next",
  );

  const buildArgs = [nextBin, "build"];
  if (env.NEXT_BUILD_ENGINE === "webpack") {
    buildArgs.push("--webpack");
  }

  const result = spawnSync(process.execPath, buildArgs, {
    stdio: "inherit",
    env,
  });

  if (result.error) {
    console.error(result.error);
  }

  process.exit(result.status ?? 1);
}

main();

