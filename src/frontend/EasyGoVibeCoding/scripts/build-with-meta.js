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

  const result = spawnSync(process.execPath, [nextBin, "build"], {
    stdio: "inherit",
    env,
  });

  if (result.error) {
    // eslint-disable-next-line no-console
    console.error(result.error);
  }

  process.exit(result.status ?? 1);
}

main();

