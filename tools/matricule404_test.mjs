// Replayable headless test of the INMATE 404 / MATRICULE 404 search assistant (docs/javascripts/fl-m404-v1.js).
// Needs a site built with `mkdocs build --strict` then `python tools/postbuild.py <site>` (so the per-language search
// indexes and the Content-Security-Policy are in place), Node 18+ and Playwright with its Chromium.
//
//   node tools/matricule404_test.mjs <built site folder> [screenshots folder]
//   PLAYWRIGHT_FROM=<a package.json next to node_modules/playwright> to load Playwright from another folder.
//
// It serves the site on 127.0.0.1 (free port, stopped at the end) under /FISTILAND/, never opens a window, and checks:
// the 8 languages, widths 320/375/768/1440, keyboard (Tab trap, arrows, Escape, focus back), touch, reduced motion,
// a clean console with no CSP violation, every topic link (HTTP 200 and the #anchor exists), the free search
// (results, "nothing found", hand-over to the theme's search) and the offline copy. Exit code 1 on any failure.
import { createRequire } from "node:module";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");

const SITE = path.resolve(process.argv[2] || "site");
const OUT = process.argv[3] ? path.resolve(process.argv[3]) : null;
if (!fs.existsSync(path.join(SITE, "index.html"))) { console.error("built site not found: " + SITE); process.exit(2); }
if (OUT) fs.mkdirSync(OUT, { recursive: true });

// ---- what the page must say (kept here on purpose: a change of wording must be a deliberate change of the test) ----
const LANGS = {
  en: { name: "INMATE 404", word: "raid", btn: "INMATE 404, search assistant" },
  es: { name: "RECLUSO 404", word: "asalto", btn: "RECLUSO 404, asistente de búsqueda" },
  fr: { name: "MATRICULE 404", word: "drapeau", btn: "MATRICULE 404, assistant de recherche",
    hello: "Je suis le MATRICULE 404, le détenu introuvable. Je sais où tout se cache : comment puis-je t'aider dans ta recherche ?",
    none: "Rien. J'ai retourné toutes les cellules, même celle du fond. Essaie un autre mot, ou la grande recherche." },
  de: { name: "HÄFTLING 404", word: "Flagge", btn: "HÄFTLING 404, Suchassistent" },
  it: { name: "DETENUTO 404", word: "bandiera", btn: "DETENUTO 404, assistente di ricerca" },
  pl: { name: "WIĘZIEŃ 404", word: "flaga", btn: "WIĘZIEŃ 404, asystent wyszukiwania" },
  uk: { name: "В’ЯЗЕНЬ 404", word: "прапор", btn: "В’ЯЗЕНЬ 404, помічник із пошуку" },
  hr: { name: "ZATVORENIK 404", word: "zastava", btn: "ZATVORENIK 404, pomoćnik za pretragu" },
};
const NONSENSE = "qzxwvkj";

// ---- static server ----
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".gif": "image/gif", ".webp": "image/webp",
  ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".zip": "application/zip", ".ini": "text/plain; charset=utf-8" };
const server = http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent(new URL(req.url, "http://x").pathname); } catch { res.writeHead(400); return res.end(); }
  if (!p.startsWith("/FISTILAND/")) { res.writeHead(404); return res.end(); }
  let f = path.join(SITE, p.slice("/FISTILAND/".length));
  if (!f.startsWith(SITE)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404, { "Content-Type": "text/html" }); return fs.createReadStream(path.join(SITE, "404.html")).pipe(res); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-cache" });
  fs.createReadStream(f).pipe(res);
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const BASE = `http://127.0.0.1:${server.address().port}/FISTILAND/`;
const url = (lang, rest = "") => BASE + (lang === "en" ? "" : lang + "/") + rest;

const browser = await chromium.launch({ headless: true });
const fails = [];
let passed = 0;
function check(ok, what) { if (ok) passed++; else { fails.push(what); console.log("FAIL " + what); } }
async function shot(page, name) { if (OUT) { await page.waitForTimeout(350); await page.screenshot({ path: path.join(OUT, name) }); } }   // after the opening animation

const contexts = [];
async function open(lang, w, h, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h }, deviceScaleFactor: opts.mobile ? 2 : 1, isMobile: !!opts.mobile, hasTouch: !!opts.mobile,
    serviceWorkers: opts.sw ? "allow" : "block", reducedMotion: opts.reduced ? "reduce" : "no-preference", colorScheme: opts.scheme || "dark",
  });
  contexts.push(ctx);
  await ctx.addInitScript(() => {
    window.__csp = [];
    document.addEventListener("securitypolicyviolation", (e) => window.__csp.push(e.violatedDirective + " " + e.blockedURI));
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
  page.on("response", (r) => { if (r.status() >= 400 && r.url().startsWith(BASE)) errors.push("HTTP " + r.status() + " " + r.url()); });
  await page.goto(url(lang, opts.path || ""), { waitUntil: "networkidle" });
  return { ctx, page, errors };
}
async function clean(page, errors, label) {
  const csp = await page.evaluate(() => window.__csp || []);
  check(errors.length === 0, `${label}: console clean (${errors.slice(0, 3).join(" | ")})`);
  check(csp.length === 0, `${label}: no CSP violation (${csp.slice(0, 3).join(" | ")})`);
}
const dlgOpen = (page) => page.evaluate(() => { const d = document.getElementById("fl-m404"); return !!(d && d.open); });
const say = (page) => page.textContent(".fl-m404__q-say");
const active = (page) => page.evaluate(() => { const a = document.activeElement; return a ? (a.className || a.tagName) + "|" + (a.textContent || "").trim().slice(0, 40) : ""; });
const inDialog = (page) => page.evaluate(() => !!(document.activeElement && document.activeElement.closest("#fl-m404")));
async function openAssistant(page) {
  await page.click(".fl-m404-btn");
  await page.waitForSelector("#fl-m404[open] .fl-m404__chip");
}
async function typeQuery(page, q) {
  await page.fill(".fl-m404__q", q);
  await page.waitForFunction((w) => { const r = document.querySelector(".fl-m404__res"); return r && !r.hidden && r.getAttribute("data-q") === w; }, q);
}

// every link given by a topic answers 200 and its #anchor exists on the target page
const linkCache = new Map();
async function linkOk(page, href) {
  if (!href.startsWith(BASE)) return true;   // the Discord invitation (external, opened in a new tab)
  if (linkCache.has(href)) return linkCache.get(href);
  const [u, hash] = href.split("#");
  const r = await page.request.get(u);
  let ok = r.status() === 200;
  if (ok && hash) ok = (await r.text()).includes(`id="${hash}"`);
  linkCache.set(href, ok);
  return ok;
}

// ---- 1. Every language, desktop: name, greeting, the whole topic tree, links, free search, nothing found ----
for (const [lang, L] of Object.entries(LANGS)) {
  const { page, errors } = await open(lang, 1440, 900);
  const btn = page.locator(".md-header__inner .fl-m404-btn");
  check(await btn.isVisible(), `${lang}: tag button visible in the header`);
  check((await btn.getAttribute("aria-label")) === L.btn, `${lang}: button name read aloud`);
  check(await page.evaluate(() => { const b = document.querySelector(".fl-m404-btn"), s = document.querySelector(".md-search"); return !!(b && s && b.compareDocumentPosition(s) & Node.DOCUMENT_POSITION_FOLLOWING); }), `${lang}: button placed right before the search`);
  await openAssistant(page);
  check(await page.evaluate(() => { const d = document.getElementById("fl-m404"); return d.tagName === "DIALOG" && d.matches(":modal") && d.getAttribute("aria-labelledby") === "fl-m404-name"; }), `${lang}: modal dialog with a name`);
  check((await page.textContent("#fl-m404-name")) === L.name, `${lang}: name ${L.name}`);
  if (L.hello) check((await page.textContent(".fl-m404__hello")) === L.hello, `${lang}: exact greeting`);
  check((await page.locator(".fl-m404__chip").count()) === 8, `${lang}: 8 topics`);
  check(await page.evaluate(() => document.activeElement && document.activeElement.id === "fl-m404-q"), `${lang}: desktop focus in the search field`);
  if (lang === "fr") await shot(page, "02-fr-bureau-accueil.png");
  if (lang === "de") await shot(page, "08-de-bureau-accueil.png");

  // walk the whole tree
  const hrefs = new Set();
  const answers = [];
  const roots = await page.locator(".fl-m404__chip").count();
  for (let i = 0; i < roots; i++) {
    await page.locator(".fl-m404__chip").nth(i).click();
    const wings = await page.locator(".fl-m404__chip").count();
    if (wings) {
      for (let j = 0; j < wings; j++) {
        await page.locator(".fl-m404__chip").nth(j).click();
        answers.push(await say(page));
        for (const h of await page.$$eval(".fl-m404__links a", (as) => as.map((a) => a.href))) hrefs.add(h);
        if (lang === "fr" && j === 1) await shot(page, "03-fr-bureau-rubrique.png");
        await page.click(".fl-m404__back");
      }
    } else {
      answers.push(await say(page));
      for (const h of await page.$$eval(".fl-m404__links a", (as) => as.map((a) => a.href))) hrefs.add(h);
    }
    await page.click(".fl-m404__back");
  }
  check(answers.length === 17 && answers.every((a) => a && a.length > 20), `${lang}: 17 answers written`);
  check(answers.every((a) => !/\d/.test(a)), `${lang}: no server value quoted in the answers`);
  const pre = lang === "en" ? BASE : BASE + lang + "/";
  const internal = [...hrefs].filter((h) => h.startsWith(BASE));
  check(internal.length >= 20 && internal.every((h) => h.startsWith(pre)), `${lang}: ${internal.length} topic links, all in the page language`);
  check([...hrefs].some((h) => h.startsWith("https://discord.gg/")), `${lang}: Discord offered when joining`);
  for (const h of hrefs) check(await linkOk(page, h), `${lang}: link answers 200 with its anchor: ${h}`);
  check(!(await page.textContent("#fl-m404")).toLowerCase().includes("métamorphe"), `${lang}: no secret rank named`);

  // free search
  await typeQuery(page, L.word);
  const hits = await page.$$eval(".fl-m404__hits a", (as) => as.map((a) => a.href));
  check(hits.length >= 1, `${lang}: search "${L.word}" gives results (${hits.length})`);
  check(hits.every((h) => h.startsWith(pre)), `${lang}: results only in the page language`);
  for (const h of hits) check(await linkOk(page, h), `${lang}: result answers 200: ${h}`);
  if (lang === "fr") await shot(page, "04-fr-bureau-recherche.png");
  if (lang === "de") await shot(page, "09-de-bureau-recherche.png");
  await typeQuery(page, NONSENSE);
  check((await page.locator(".fl-m404__hits a").count()) === 0 && await page.locator(".fl-m404__status.is-none").isVisible(), `${lang}: "nothing found" shown`);
  if (L.none) check((await page.textContent(".fl-m404__status")) === L.none, `${lang}: exact "nothing found" line`);
  check(await page.locator(".fl-m404__full").isVisible(), `${lang}: full search offered`);
  // clearing the field brings the topics back
  await page.fill(".fl-m404__q", "");
  await page.waitForSelector(".fl-m404__chip");
  check((await page.locator(".fl-m404__chip").count()) === 8, `${lang}: topics back after clearing`);
  await page.keyboard.press("Escape");
  check(!(await dlgOpen(page)), `${lang}: Escape closes`);
  await clean(page, errors, `${lang} desktop`);
}

// ---- 2. Hand-over to the theme's own search ----
{
  const { page, errors } = await open("fr", 1440, 900, { path: "faq/" });
  await openAssistant(page);
  await typeQuery(page, "largage");
  await page.click(".fl-m404__full");
  await page.waitForFunction(() => document.querySelectorAll(".md-search-result__item").length > 0, null, { timeout: 15000 }).catch(() => {});
  check(!(await dlgOpen(page)), "fr: dialog closed for the full search");
  check(await page.evaluate(() => { const t = document.getElementById("__search"), i = document.querySelector(".md-search__input"); return !!(t && t.checked && i && i.value === "largage" && document.activeElement === i); }), "fr: theme search open with the words");
  check((await page.locator(".md-search-result__item").count()) > 0, "fr: theme search shows results");
  await clean(page, errors, "fr full search");
}

// ---- 3. Keyboard only ----
{
  const { page, errors } = await open("fr", 1440, 900, { path: "guide/" });
  await page.focus(".fl-m404-btn");
  await page.keyboard.press("Enter");
  await page.waitForSelector("#fl-m404[open] .fl-m404__chip");
  check(await page.evaluate(() => document.activeElement.id === "fl-m404-q"), "keyboard: Enter opens, focus in the field");
  let trapped = true;
  for (let i = 0; i < 14; i++) { await page.keyboard.press("Tab"); trapped = trapped && await inDialog(page); }
  for (let i = 0; i < 14; i++) { await page.keyboard.press("Shift+Tab"); trapped = trapped && await inDialog(page); }
  check(trapped, "keyboard: Tab and Shift+Tab stay inside the dialog");
  await page.focus(".fl-m404__chip >> nth=3");   // the server in detail
  await page.keyboard.press("Enter");
  check((await active(page)).includes("fl-m404__chip"), "keyboard: after a choice, focus on the first new choice");
  await page.keyboard.press("Enter");
  check((await active(page)).includes("Aperçu") || (await page.evaluate(() => document.activeElement.tagName)) === "A", "keyboard: answer reached, focus on its first link");
  await page.focus(".fl-m404__q");
  await page.keyboard.type("respawn");
  await page.waitForSelector(".fl-m404__hits a");
  await page.keyboard.press("ArrowDown");
  check(await page.evaluate(() => document.activeElement.closest(".fl-m404__hits") !== null), "keyboard: ArrowDown goes to the results");
  await page.keyboard.press("ArrowUp");
  check(await page.evaluate(() => document.activeElement.id === "fl-m404-q"), "keyboard: ArrowUp comes back to the field");
  await page.keyboard.press("Escape");
  check(!(await dlgOpen(page)) && await page.evaluate(() => document.activeElement.classList.contains("fl-m404-btn")), "keyboard: Escape closes and gives the focus back");
  check((await page.getAttribute(".fl-m404-btn", "aria-expanded")) === "false", "keyboard: aria-expanded back to false");
  // Enter in the field opens the first result
  await page.keyboard.press("Enter");
  await page.waitForSelector("#fl-m404[open]");
  await page.keyboard.type("bunker");
  await page.waitForSelector(".fl-m404__hits a");
  const first = await page.getAttribute(".fl-m404__hits a", "href");
  await Promise.all([page.waitForURL((u) => u.href.split("#")[0] === first.split("#")[0]), page.keyboard.press("Enter")]);
  check(page.url().split("#")[0] === first.split("#")[0], "keyboard: Enter in the field opens the first result");
  await clean(page, errors, "keyboard");
}

// ---- 4. Widths, every language at phone width; captures ----
for (const [w, h] of [[320, 640], [375, 812], [768, 1024], [1440, 900]]) {
  for (const lang of Object.keys(LANGS)) {
    const mobile = w < 768;
    const { page, errors } = await open(lang, w, h, { mobile });
    const lay = await page.evaluate(() => {
      // sideways scroll caused by the tag itself (the page may have its own, unrelated)
      const sideways = () => { const btn = document.querySelector(".fl-m404-btn"), with1 = document.documentElement.scrollWidth;
        btn.hidden = true; const without = document.documentElement.scrollWidth; btn.hidden = false; return with1 > Math.max(without, innerWidth) + 1; };
      const b = document.querySelector(".fl-m404-btn").getBoundingClientRect();
      const others = Array.from(document.querySelectorAll(".md-header__inner > *")).filter((e) => e !== document.querySelector(".fl-m404-btn") && e.offsetParent !== null);
      const hit = others.filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.left < b.right - 1 && r.right > b.left + 1 && r.top < b.bottom - 1 && r.bottom > b.top + 1; });
      return { inside: b.left >= 0 && b.right <= innerWidth && b.width >= 40 && b.height >= 40, overlap: hit.map((e) => e.className).join(","), wide: sideways(), b: [b.left, b.right, b.width, b.height].map(Math.round).join(" ") };
    });
    check(lay.inside && !lay.overlap && !lay.wide, `${lang} ${w}px: tag fits the header, no overlap, no sideways scroll (${JSON.stringify(lay)})`);
    if (mobile) await page.tap(".fl-m404-btn"); else await page.click(".fl-m404-btn");
    await page.waitForSelector("#fl-m404[open] .fl-m404__chip");
    const box = await page.evaluate(() => {
      const d = document.getElementById("fl-m404"), r = d.getBoundingClientRect(), body = d.querySelector(".fl-m404__body");
      const chips = Array.from(d.querySelectorAll(".fl-m404__chip, .fl-m404__x")).every((c) => c.getBoundingClientRect().height >= 40);
      const name = d.querySelector(".fl-m404__name");
      return { inside: r.left >= 0 && r.right <= innerWidth + 0.5 && r.top >= 0 && r.bottom <= innerHeight + 0.5, sideways: body.scrollWidth > body.clientWidth + 1,
        targets: chips, name: name.scrollWidth <= name.clientWidth + 1, focusField: document.activeElement && document.activeElement.id === "fl-m404-q" };
    });
    check(box.inside && !box.sideways && box.name, `${lang} ${w}px: dialog inside the screen, nothing cut`);
    check(box.targets, `${lang} ${w}px: touch targets at least 40 px high`);
    if (mobile) check(!box.focusField, `${lang} ${w}px: on touch, the keyboard does not pop up at once`);
    if (lang === "fr" && w === 375) await shot(page, "01-fr-telephone-accueil.png");
    if (lang === "uk" && w === 375) await shot(page, "07-uk-telephone-accueil.png");
    if (lang === "fr" && w === 320) {
      await page.fill(".fl-m404__q", NONSENSE);
      await page.waitForSelector(".fl-m404__status.is-none");
      await shot(page, "05-fr-telephone-rien-trouve.png");
    }
    if (lang === "en" && w === 768) await shot(page, "10-en-tablette-accueil.png");
    // the close button works with a tap / click
    if (mobile) await page.tap(".fl-m404__x"); else await page.click(".fl-m404__x");
    check(!(await dlgOpen(page)), `${lang} ${w}px: close button`);
    await clean(page, errors, `${lang} ${w}px`);
  }
}

// ---- 5. Reduced motion, colour scheme (the wiki is dark only: a light system theme must not break it) ----
{
  const { page, errors } = await open("fr", 1440, 900, { reduced: true });
  await openAssistant(page);
  check((await page.evaluate(() => getComputedStyle(document.getElementById("fl-m404")).animationName)) === "none", "reduced motion: no opening animation");
  await clean(page, errors, "reduced motion");
}
{
  const { page, errors } = await open("fr", 1440, 900, { scheme: "light" });
  await openAssistant(page);
  const c = await page.evaluate(() => { const s = getComputedStyle(document.getElementById("fl-m404")); return [s.backgroundColor, s.color]; });
  check(c[0] !== "rgb(255, 255, 255)" && c[1] !== c[0], "light system theme: dialog stays dark and readable");
  await shot(page, "06-fr-bureau-theme-sombre-systeme-clair.png");
  await page.click(".fl-m404__x");
  await clean(page, errors, "light scheme");
}

// ---- 6. Offline: after one visit the topics and the search still work without a network ----
{
  const { ctx, page, errors } = await open("fr", 1440, 900, { sw: true });
  await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 20000 }).catch(() => {});
  const controlled = await page.evaluate(() => !!(navigator.serviceWorker && navigator.serviceWorker.controller));
  check(controlled, "offline: service worker in control");
  // a second visit, now through the service worker: what the theme's search loads in its own worker is kept too
  await page.reload({ waitUntil: "networkidle" });
  await openAssistant(page);
  await typeQuery(page, "drapeau");   // the index of the language is now kept by the service worker
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  await ctx.setOffline(true);
  errors.length = 0;
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector(".fl-m404-btn");
  await openAssistant(page);
  await typeQuery(page, "drapeau");
  check((await page.locator(".fl-m404__hits a").count()) > 0, "offline: search still gives results");
  await page.click(".fl-m404__new");
  check((await page.locator(".fl-m404__chip").count()) === 8, "offline: topics still there");
  await ctx.setOffline(false);
  const off = errors.filter((e) => !/ERR_INTERNET_DISCONNECTED|net::ERR|Failed to load resource/.test(e));
  check(off.length === 0, `offline: no script error (${off.slice(0, 3).join(" | ")})`);
}

for (const c of contexts) await c.close().catch(() => {});
await browser.close();
server.close();
console.log(`\n${passed} checks passed, ${fails.length} failed`);
process.exit(fails.length ? 1 : 0);
