import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
/** Sortie dans `src/assets` : Vite embarque les JPG au build (plus fiable que `public/` seul). */
const outDir = path.join(root, "src", "assets", "portfolio");

const targets = [
  { url: "https://www.remidental.com/", file: "remidental.jpg", mobileFile: "remidental-mobile.jpg" },
  { url: "https://ailien-site.vercel.app/", file: "ailien.jpg", mobileFile: "ailien-mobile.jpg" },
  { url: "https://smel-psi.vercel.app/", file: "smel.jpg", mobileFile: "smel-mobile.jpg" },
  { url: "https://thejadecosmetics.com/", file: "jade.jpg", mobileFile: "jade-mobile.jpg" },
  { url: "https://dada.be/", file: "dada.jpg", mobileFile: "dada-mobile.jpg" },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    hasTouch: true,
    isMobile: true,
  });
  const desktopPage = await desktopContext.newPage();
  const mobilePage = await mobileContext.newPage();

  for (const t of targets) {
    console.log("Capture:", t.url);
    await desktopPage.goto(t.url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await mobilePage.goto(t.url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await wait(3000);
    await desktopPage.screenshot({
      path: path.join(outDir, t.file),
      type: "jpeg",
      quality: 88,
      clip: { x: 0, y: 0, width: 1440, height: 780 },
    });
    await mobilePage.screenshot({
      path: path.join(outDir, t.mobileFile),
      type: "jpeg",
      quality: 88,
      clip: { x: 0, y: 0, width: 390, height: 760 },
    });
    console.log("OK ->", path.join("src/assets/portfolio", t.file));
    console.log("OK ->", path.join("src/assets/portfolio", t.mobileFile));
  }

  await desktopContext.close();
  await mobileContext.close();
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
