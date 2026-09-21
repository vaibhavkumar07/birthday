// Build a static export and rewrite root-absolute URLs for GitHub Pages
// project hosting (https://<user>.github.io/<repo>/).
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync, existsSync, copyFileSync, rmSync } from "node:fs";
import { join, extname } from "node:path";

const base = `/${process.env.PAGES_REPO || "birthday"}`;
const out = "dist/client";

rmSync("dist", { recursive: true, force: true });
const build = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  env: { ...process.env, PAGES_EXPORT: "1" },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const re = /(["'`(=])\/(_next\/|images\/|favicon\.svg)/g;
const exts = new Set([".html", ".js", ".css", ".rsc", ".json", ".txt"]);
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (exts.has(extname(p))) {
      const src = readFileSync(p, "utf8");
      const next = src.replace(re, `$1${base}/$2`);
      if (next !== src) writeFileSync(p, next);
    }
  }
};
walk(out);

if (!existsSync(join(out, "404.html"))) copyFileSync(join(out, "index.html"), join(out, "404.html"));
writeFileSync(join(out, ".nojekyll"), "");
console.log(`Pages build ready in ${out} (base ${base})`);
