import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
/** Sortie dans `src/assets` : Vite embarque les JPG au build (plus fiable que `public/` seul). */
const outDir = path.join(root, "src", "assets", "portfolio");

const targets = [
  { url: "https://www.remidental.com/", file: "remidental.jpg" },
  { url: "https://ailien-site.vercel.app/", file: "ailien.jpg" },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  for (const t of targets) {
    console.log("Capture:", t.url);
    await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await wait(3000);
    await page.screenshot({
      path: path.join(outDir, t.file),
      type: "jpeg",
      quality: 88,
      clip: { x: 0, y: 0, width: 1440, height: 780 },
    });
    console.log("OK ->", path.join("src/assets/portfolio", t.file));
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
