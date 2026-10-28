// Runs every challenge solution, starter and example inside the in-browser
// Python (Brython) exactly as the app does. Usage: node tools/browser_check.js [shot-dir]
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]).replace(/\/$/, "/index.html"));
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
});

(async () => {
  await new Promise((r) => server.listen(8765, r));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:8765/index.html");
  await page.waitForFunction(() => typeof window.pyRunJSON === "function", null, { timeout: 60000 });
  const problems = await page.evaluate(() => {
    const out = [];
    const run = (code, stdin, tests) => JSON.parse(window.pyRunJSON(code, JSON.stringify(stdin || []), JSON.stringify(tests || [])));
    const unescape = (s) => { const t = document.createElement("textarea"); t.innerHTML = s; return t.value; };
    const check = (where, ch) => {
      const tests = ch.tests.map((t) => t.code);
      const r = run(ch.solution, ch.stdin, tests);
      const bad = r.results.map((x, i) => (x.ok ? null : `${ch.tests[i].name} [${x.error}]`)).filter(Boolean);
      if (bad.length) out.push(`${where}: solution fails in Brython: ${bad.join("; ")} | error=${JSON.stringify(r.error)} | output=${JSON.stringify(r.output.slice(0, 160))}`);
      const s = run(ch.starter, ch.stdin, tests);
      if (s.results.every((x) => x.ok)) out.push(`${where}: starter passes all tests in Brython`);
    };
    let n = 0;
    for (const m of window.CURRICULUM) {
      for (const l of m.lessons) {
        const re = /<pre class="code" data-run>([\s\S]*?)<\/pre>/g;
        let mm, j = 0;
        while ((mm = re.exec(l.body))) {
          const r = run(unescape(mm[1]));
          if (r.error) out.push(`${l.id} example ${j}: ${r.error.type}: ${r.error.message} (line ${r.error.line})`);
          j++; n++;
        }
        if (l.challenge) { check(l.id, l.challenge); n++; }
      }
      check(m.id + " boss", m.boss); n++;
    }
    out.push(`checked ${n} programs across ${window.CURRICULUM.length} modules`);
    return out;
  });
  problems.forEach((p) => console.log(p));
  if (errors.length) console.log("PAGE ERRORS:", errors);
  const shots = process.argv[2];
  if (shots) {
    await page.screenshot({ path: path.join(shots, "map.png"), fullPage: false });
    await page.goto("http://localhost:8765/index.html#lesson-m01-l1");
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(shots, "lesson.png"), fullPage: true });
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto("http://localhost:8765/index.html#map");
    await mobile.waitForTimeout(800);
    await mobile.screenshot({ path: path.join(shots, "mobile.png") });
    const sw = await mobile.evaluate(() => document.documentElement.scrollWidth);
    console.log("mobile scrollWidth", sw);
  }
  await browser.close();
  server.close();
})();
