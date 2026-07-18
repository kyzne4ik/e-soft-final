import { readdirSync, mkdirSync, copyFileSync } from "fs";
import { join, dirname, basename } from "path";

const DEFAULT_DIR = "src";
const HTML_TAIL = ".html";

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );

for (const file of walk(DEFAULT_DIR).filter((f) => f.endsWith(HTML_TAIL))) {
  const dest = file.replace(/^src/, "dist");
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(file, dest);
  copyFileSync(file, join("dist", basename(file)));
}
