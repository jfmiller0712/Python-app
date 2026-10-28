// Python Galaxy: views, code runner UI, quizzes, missions and effects.
(function () {
  const G = window.Game;
  const C = window.CURRICULUM.sort((a, b) => a.order - b.order);
  const HUES = [195, 265, 150, 25, 310, 55, 175, 345, 215, 95, 285, 10, 235, 45];
  const view = document.getElementById("view");

  // ---------- helpers ----------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function h(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  const icon = {
    play: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>',
    reset: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.5-3.6M3 2.5V5h2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    flame: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2.5 1.2-4 2.5-5 .2 2 1 3 2 3.5C11 9 11.5 5 12 2z" fill="currentColor"/></svg>',
    bolt: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9 1 3 9h4l-1 6 6-8H8z" fill="currentColor"/></svg>',
  };

  function moduleById(id) { return C.find((m) => m.id === id); }
  function lessonById(id) {
    for (const m of C) {
      const i = m.lessons.findIndex((l) => l.id === id);
      if (i >= 0) return { module: m, lesson: m.lessons[i], index: i };
    }
    return null;
  }
  function lessonComplete(l) {
    const s = G.state.lessons[l.id];
    return !!(s && s.read && s.quizDone && (s.challenge || !l.challenge));
  }
  function moduleUnlocked(m) {
    if (G.state.freeRoam || m.order === C[0].order) return true;
    const prev = C[C.indexOf(m) - 1];
    return !!(prev && G.state.bosses[prev.id] && G.state.bosses[prev.id].done);
  }
  function lessonUnlocked(m, i) {
    if (!moduleUnlocked(m)) return false;
    if (G.state.freeRoam || i === 0) return true;
    const prev = G.state.lessons[m.lessons[i - 1].id];
    return !!(prev && prev.read);
  }
  function bossUnlocked(m) {
    return moduleUnlocked(m) && (G.state.freeRoam || m.lessons.every(lessonComplete));
  }
  function moduleProgress(m) {
    const total = m.lessons.length * 3 + 1;
    let done = 0;
    for (const l of m.lessons) {
      const s = G.state.lessons[l.id];
      if (!s) continue;
      done += (s.read ? 1 : 0) + (s.quizDone ? 1 : 0) + (s.challenge || !l.challenge ? (s.read ? 1 : 0) : 0);
    }
    if (G.state.bosses[m.id] && G.state.bosses[m.id].done) done += 1;
    return done / total;
  }
  // The next thing to do, for the "Continue" button.
  function nextStep() {
    for (const m of C) {
      if (G.state.bosses[m.id] && G.state.bosses[m.id].done) continue;
      for (const l of m.lessons) {
        if (!lessonComplete(l)) {
          const s = G.state.lessons[l.id];
          const tab = !s || !s.read ? "learn" : !s.quizDone ? "quiz" : "mission";
          return { module: m, lesson: l, tab, href: "#lesson-" + l.id };
        }
      }
      return { module: m, boss: true, href: "#boss-" + m.id };
    }
    return null;
  }

  // ---------- syntax highlighting ----------
  const KW = new Set("False None True and as assert async await break case class continue def del elif else except finally for from global if import in is lambda match nonlocal not or pass raise return try while with yield".split(" "));
  const BI = new Set("print input len range int float str bool list dict set tuple type isinstance sum min max abs round sorted reversed enumerate zip map filter any all open iter next super object repr format id hash chr ord divmod pow help dir vars getattr setattr hasattr Exception ValueError TypeError KeyError IndexError ZeroDivisionError NameError StopIteration self".split(" "));
  const TOKEN = /(#[^\n]*)|([rRbBfFuU]{0,2}(?:"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|"(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?))|(\b\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?j?\b)|([A-Za-z_][A-Za-z0-9_]*)/g;
  function highlight(code) {
    let out = "", last = 0, m, prevWord = "";
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(code))) {
      out += esc(code.slice(last, m.index));
      const [tok, com, str, num, word] = m;
      if (com) out += `<span class="tok-com">${esc(tok)}</span>`;
      else if (str) out += `<span class="tok-str">${esc(tok)}</span>`;
      else if (num) out += `<span class="tok-num">${esc(tok)}</span>`;
      else if (word) {
        if (KW.has(word)) out += `<span class="tok-kw">${word}</span>`;
        else if (prevWord === "def" || prevWord === "class") out += `<span class="tok-fn">${word}</span>`;
        else if (BI.has(word)) out += `<span class="tok-bi">${word}</span>`;
        else out += word;
        prevWord = word;
      }
      if (!word) prevWord = "";
      last = m.index + tok.length;
    }
    return out + esc(code.slice(last));
  }

  // ---------- code editor ----------
  function createEditor(code, opts = {}) {
    const el = h(`<div class="editor"><div class="gutter" aria-hidden="true"></div><pre aria-hidden="true"></pre>
      <textarea spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="${esc(opts.label || "Python code editor")}"></textarea></div>`);
    const ta = el.querySelector("textarea"), pre = el.querySelector("pre"), gut = el.querySelector(".gutter");
    if (opts.id) ta.id = opts.id;
    ta.value = code;
    let escaped = false;
    function sync() {
      pre.innerHTML = highlight(ta.value) + "\n";
      const n = ta.value.split("\n").length;
      gut.textContent = Array.from({ length: n }, (_, i) => i + 1).join("\n");
      ta.style.height = "auto";
      ta.style.height = Math.max(ta.scrollHeight, (opts.minLines || 3) * 22) + "px";
    }
    ta.addEventListener("input", () => { sync(); opts.onChange && opts.onChange(ta.value); });
    ta.addEventListener("scroll", () => { pre.scrollLeft = ta.scrollLeft; });
    ta.addEventListener("blur", () => { escaped = false; });
    ta.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); opts.onRun && opts.onRun(); return; }
      if (e.key === "Escape") { escaped = true; return; }
      const { selectionStart: s, selectionEnd: en, value: v } = ta;
      if (e.key === "Tab" && !escaped) {
        e.preventDefault();
        const lineStart = v.lastIndexOf("\n", s - 1) + 1;
        if (e.shiftKey) {
          const strip = v.slice(lineStart, lineStart + 4).match(/^ */)[0].length;
          ta.setRangeText("", lineStart, lineStart + strip, "end");
          ta.selectionStart = ta.selectionEnd = Math.max(lineStart, s - strip);
        } else {
          ta.setRangeText("    ", s, en, "end");
        }
        ta.dispatchEvent(new Event("input"));
      } else if (e.key === "Enter" && !e.shiftKey) {
        const lineStart = v.lastIndexOf("\n", s - 1) + 1;
        const line = v.slice(lineStart, s);
        let indent = line.match(/^ */)[0];
        if (/:\s*(#.*)?$/.test(line)) indent += "    ";
        e.preventDefault();
        ta.setRangeText("\n" + indent, s, en, "end");
        ta.dispatchEvent(new Event("input"));
      }
    });
    requestAnimationFrame(sync);
    sync();
    return { el, get value() { return ta.value; }, set value(v) { ta.value = v; sync(); }, focus() { ta.focus(); } };
  }

  // ---------- Python runner ----------
  const FRIENDLY = {
    SyntaxError: "Python could not read this code. Look for a missing colon, bracket or quote. The real slip is often on the line just before the one reported.",
    IndentationError: "The indentation does not line up. Lines inside the same block need the same number of spaces (4 is standard).",
    NameError: "Python does not know this name. Check the spelling and capitals, and make sure the variable or function is created before you use it.",
    TypeError: "A value of the wrong type was used, for example adding a str to an int. Convert with int(), float() or str(), or check the arguments you passed.",
    ValueError: "The type was right but the value was not, for example int(\"seven\").",
    ZeroDivisionError: "Something was divided by zero. Check the value of the divisor before dividing.",
    IndexError: "An index is outside the sequence. Remember that indexes start at 0 and the last one is len(x) - 1.",
    KeyError: "That key is not in the dictionary. Use `key in d` or d.get(key) to check first.",
    AttributeError: "This object does not have that attribute or method. Check the spelling and the type of the value.",
    EOFError: "The code asked for input() but no input lines were left. In the Lab, add one line per input() call in the Input box.",
    ModuleNotFoundError: "This module is not available here. The in-browser Python includes most of the standard library, but not third-party packages.",
    ImportError: "That name could not be imported. Check the spelling of the module and the name.",
    RecursionError: "A function kept calling itself without reaching a base case.",
    AssertionError: "An assert statement failed: the condition was False.",
  };
  let pyReady = false;
  window.PY.ready.then(() => {
    pyReady = true;
    document.querySelectorAll(".loading-py").forEach((n) => { n.classList.add("ready"); n.lastChild.textContent = "Python ready"; });
  });
  async function runPython(code, stdin = [], tests = []) {
    await window.PY.ready;
    try {
      return JSON.parse(window.pyRunJSON(code, JSON.stringify(stdin), JSON.stringify(tests)));
    } catch (e) {
      return { output: "", error: { type: "InternalError", message: String(e && e.message || e), line: null }, results: tests.map(() => ({ ok: false })) };
    }
  }
  function renderOutput(outEl, res) {
    outEl.innerHTML = "";
    if (res.output) outEl.append(document.createTextNode(res.output));
    if (res.error) {
      const e = res.error;
      const err = document.createElement("span");
      err.className = "err";
      err.textContent = `${res.output && !res.output.endsWith("\n") ? "\n" : ""}${e.type}${e.line ? ` on line ${e.line}` : ""}: ${e.message}`;
      outEl.append(err);
      const tip = FRIENDLY[e.type];
      if (tip) { const t = document.createElement("span"); t.className = "hint"; t.textContent = tip; outEl.append(t); }
    }
    if (!res.output && !res.error) outEl.innerHTML = '<span class="sys">(ran with no output)</span>';
  }
  function pyStatus() {
    return `<span class="loading-py${pyReady ? " ready" : ""}"><i></i><span>${pyReady ? "Python ready" : "Starting Python"}</span></span>`;
  }

  function makeRunner(code, label) {
    const box = h(`<div class="runner"><div class="runner-bar"><span class="label">${esc(label || "Try it")}</span>
      <button class="btn small ghost" data-act="reset" type="button">${icon.reset}Reset</button>
      <button class="btn small primary" data-act="run" type="button">${icon.play}Run</button></div><div class="output" role="status"></div></div>`);
    const out = box.querySelector(".output");
    const ed = createEditor(code, { onRun: () => run(), minLines: 1 });
    box.insertBefore(ed.el, out);
    async function run() {
      out.innerHTML = '<span class="sys">Running...</span>';
      const res = await runPython(ed.value);
      renderOutput(out, res);
      G.state.stats.runs++;
      flush();
    }
    box.querySelector('[data-act="run"]').onclick = run;
    box.querySelector('[data-act="reset"]').onclick = () => { ed.value = code; out.innerHTML = ""; };
    return box;
  }
  function staticCode(code) {
    const w = h('<div class="code-static"><pre></pre></div>');
    w.firstChild.innerHTML = highlight(code);
    return w;
  }
  // Turn <pre class="code"> blocks inside rendered content into live widgets.
  function enhanceCode(root) {
    root.querySelectorAll("pre.code").forEach((pre) => {
      const code = pre.textContent.replace(/^\n+|\s+$/g, "");
      pre.replaceWith(pre.hasAttribute("data-run") ? makeRunner(code) : staticCode(code));
    });
  }

  // ---------- feedback: toasts, rank-up, badges ----------
  function toast(html, cls = "") {
    const box = document.getElementById("toasts");
    const t = h(`<div class="toast ${cls}">${html}</div>`);
    box.append(t);
    while (box.children.length > 4) box.firstElementChild.remove();
    setTimeout(() => { t.style.transition = "opacity .4s"; t.style.opacity = "0"; setTimeout(() => t.remove(), 450); }, 3200);
  }
  function flush() {
    G.checkBadges(C);
    const events = G.drainEvents();
    // One toast per action: sum the XP and list the reasons.
    const xp = events.filter((e) => e.type === "xp");
    if (xp.length) {
      const total = xp.reduce((n, e) => n + e.amount, 0);
      const reasons = [...new Set(xp.map((e) => e.reason))].join(" · ");
      toast(`<span class="amt">+${total} XP</span><span>${esc(reasons)}</span>`);
    }
    for (const ev of events) {
      if (ev.type === "badge") { toast(`<span class="amt">Badge</span><span>${esc(ev.badge.name)}: ${esc(ev.badge.text)}</span>`, "badge-t"); burst(0.5, 0.85, 50); }
      if (ev.type === "rank") showRankUp(ev.rank);
    }
    G.save();
  }
  function showRankUp(rank) {
    const modal = document.getElementById("modal");
    modal.hidden = false;
    modal.innerHTML = `<div class="modal-wrap"><div class="modal panel" role="dialog" aria-modal="true" aria-labelledby="rank-title">
      <div class="eyebrow">Rank up · Level ${rank.level}</div>
      ${medal(48, 84)}
      <h2 class="display" id="rank-title">${esc(rank.name)}</h2>
      <p>${rank.next ? `Next rank, ${esc(rank.next.name)}, at ${rank.next.xp} XP.` : "You have reached the highest rank in the galaxy."}</p>
      <button class="btn gold" type="button" id="rank-close">Keep flying</button></div></div>`;
    const close = () => { modal.hidden = true; modal.innerHTML = ""; };
    modal.querySelector("#rank-close").onclick = close;
    modal.querySelector(".modal-wrap").onclick = (e) => { if (e.target.classList.contains("modal-wrap")) close(); };
    modal.querySelector("#rank-close").focus();
    burst(0.5, 0.45, 140);
  }
  function medal(hue, size = 52) {
    return `<svg class="medal" width="${size}" height="${size}" viewBox="0 0 52 52" aria-hidden="true">
      <defs><radialGradient id="md${hue}" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="hsl(${hue} 100% 92%)"/><stop offset=".45" stop-color="hsl(${hue} 85% 62%)"/><stop offset="1" stop-color="hsl(${hue} 70% 26%)"/></radialGradient></defs>
      <path d="M26 2 31.5 9.5 40.5 7.5 42 16.6 50 21 46 29.4 50 37.8 42 42 40.5 50.5 31.5 48.5 26 56 20.5 48.5 11.5 50.5 10 42 2 37.8 6 29.4 2 21 10 16.6 11.5 7.5 20.5 9.5Z" transform="scale(.9) translate(3 -1)" fill="url(#md${hue})"/>
      <circle cx="26" cy="25" r="10" fill="none" stroke="rgba(5,6,15,.45)" stroke-width="2"/>
      <path d="M26 18.5l2 4.3 4.6.5-3.4 3.1 1 4.6-4.2-2.4-4.2 2.4 1-4.6-3.4-3.1 4.6-.5z" fill="rgba(5,6,15,.55)"/></svg>`;
  }

  // Particle burst for celebrations.
  const burstCanvas = document.getElementById("burst");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let particles = [], bursting = false;
  function burst(fx, fy, n) {
    if (reduceMotion) return;
    const w = (burstCanvas.width = innerWidth * devicePixelRatio);
    const hgt = (burstCanvas.height = innerHeight * devicePixelRatio);
    const colors = ["#ffcf6e", "#6ee7ff", "#ff7ab6", "#b98cff", "#ffffff"];
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = (2 + Math.random() * 7) * devicePixelRatio;
      particles.push({ x: w * fx, y: hgt * fy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, life: 1, c: colors[i % colors.length], r: (1 + Math.random() * 2.5) * devicePixelRatio });
    }
    if (!bursting) { bursting = true; requestAnimationFrame(stepBurst); }
  }
  function stepBurst() {
    const ctx = burstCanvas.getContext("2d");
    ctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
    particles = particles.filter((p) => p.life > 0);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.12 * devicePixelRatio; p.vx *= 0.985; p.life -= 0.012;
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    if (particles.length) requestAnimationFrame(stepBurst);
    else { bursting = false; ctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height); }
  }

  // ---------- starfield ----------
  (function starfield() {
    const cv = document.getElementById("stars");
    const ctx = cv.getContext("2d");
    let stars = [];
    function resize() {
      cv.width = innerWidth * devicePixelRatio;
      cv.height = innerHeight * devicePixelRatio;
      const n = Math.min(420, Math.round((innerWidth * innerHeight) / 3800));
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * cv.width, y: Math.random() * cv.height,
        r: (Math.random() ** 3 * 1.6 + 0.3) * devicePixelRatio,
        t: Math.random() * Math.PI * 2, s: 0.004 + Math.random() * 0.02,
        hue: [220, 200, 45, 300][Math.floor(Math.random() * 4)], d: 0.02 + Math.random() * 0.08,
      }));
      draw();
    }
    function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const s of stars) {
        const a = 0.45 + 0.55 * Math.abs(Math.sin(s.t));
        ctx.fillStyle = `hsla(${s.hue}, 90%, 88%, ${a})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    function tick() {
      for (const s of stars) {
        s.t += s.s;
        s.x -= s.d * devicePixelRatio;
        if (s.x < -2) s.x = cv.width + 2;
      }
      draw();
      requestAnimationFrame(tick);
    }
    addEventListener("resize", resize);
    resize();
    if (!reduceMotion) requestAnimationFrame(tick);
  })();

  // ---------- HUD ----------
  function renderHUD() {
    const s = G.state, r = G.rankFor(s.xp);
    document.getElementById("hud").innerHTML = `
      <div class="hud-rank" title="Level ${r.level}: ${esc(r.name)}">
        <div class="rank-orb" aria-hidden="true">${r.level}</div>
        <div class="hud-meta">
          <span class="rank-name">${esc(r.name)}</span>
          <div class="xpbar" role="progressbar" aria-label="Progress to next rank" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(r.pct * 100)}"><i style="width:${(r.pct * 100).toFixed(1)}%"></i></div>
          <span class="xp-num">${s.xp} XP${r.next ? ` · ${r.next.xp - s.xp} to ${esc(r.next.name)}` : ""}</span>
        </div>
      </div>
      <div class="streak" title="Daily streak (best ${s.streak.best})">${icon.flame}<span>${s.streak.count}</span><span class="sr-only" style="position:absolute;left:-9999px">day streak</span></div>`;
  }
  G.onChange(renderHUD);

  // ---------- views ----------
  function planetHTML(m, extra = "") {
    const i = C.indexOf(m), pct = moduleProgress(m), circ = 2 * Math.PI * 54;
    return `<button class="planet" type="button" style="--hue:${HUES[i % HUES.length]}" ${extra}>
      <svg class="ring" viewBox="0 0 120 120" aria-hidden="true"><circle class="bg" cx="60" cy="60" r="54"/><circle class="fg" cx="60" cy="60" r="54" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - pct)}"/></svg>
      <span class="num">${String(m.order).padStart(2, "0")}</span></button>`;
  }

  function viewMap() {
    const next = nextStep();
    const done = G.countBosses(G.state);
    const missionCard = next
      ? `<div class="mission-card panel"><span class="label">Next mission</span>
          <strong>${esc(next.boss ? `Boss: ${next.module.boss.title}` : next.lesson.title)}</strong>
          <span style="color:var(--muted);font-size:.9rem">World ${next.module.order} · ${esc(next.module.name)}${next.boss ? "" : ` · ${next.tab === "learn" ? "Learn" : next.tab === "quiz" ? "Quiz" : "Mission"}`}</span>
          <div class="row"><a class="btn primary" href="${next.href}">${icon.play}${G.state.xp ? "Continue" : "Start learning"}</a><a class="btn ghost" href="#daily">Daily Orbit</a></div></div>`
      : `<div class="mission-card panel"><span class="label">Galaxy cleared</span><strong>Every world is complete.</strong><span style="color:var(--muted)">Keep your streak alive with the Daily Orbit, or build something in the Lab.</span></div>`;
    view.innerHTML = `
      <div class="map-head">
        <div><div class="eyebrow">${done} of ${C.length} worlds cleared</div>
          <h1 class="display">The Python Galaxy</h1>
          <p class="lede">Fourteen worlds take you from your first <code style="font-family:var(--f-code)">print()</code> to writing tested, professional Python. Each world has three lessons and a boss. Every lesson is checked against the official Python documentation.</p></div>
        ${missionCard}
      </div>
      <div class="orbit"><svg class="trail" aria-hidden="true"></svg><div class="worlds"></div></div>`;
    const worlds = view.querySelector(".worlds");
    C.forEach((m) => {
      const unlocked = moduleUnlocked(m);
      const cleared = G.state.bosses[m.id] && G.state.bosses[m.id].done;
      const current = next && next.module === m;
      const tag = cleared ? '<span class="tag done">Cleared</span>' : current ? '<span class="tag now">You are here</span>' : !unlocked ? '<span class="tag">Locked</span>' : "";
      const w = h(`<div class="world${unlocked ? "" : " locked"}${current ? " current" : ""}">
        ${planetHTML(m, `aria-label="World ${m.order}: ${esc(m.name)}${unlocked ? "" : " (locked)"}"`)}
        <div class="world-info"><div class="eyebrow">World ${m.order} · ${esc(m.topic)}</div><h3>${esc(m.name)}</h3><p>${esc(m.blurb)}</p>${tag}</div></div>`);
      w.querySelector(".planet").onclick = () => {
        if (unlocked) location.hash = "world-" + m.id;
        else toast(`<span>Clear World ${m.order - 1}'s boss to unlock ${esc(m.name)}, or turn on Free Roam in the Captain's Log.</span>`);
      };
      worlds.append(w);
    });
    requestAnimationFrame(drawTrail);
  }
  function drawTrail() {
    const orbit = view.querySelector(".orbit");
    if (!orbit) return;
    const svg = orbit.querySelector("svg.trail");
    const box = orbit.getBoundingClientRect();
    const pts = [...orbit.querySelectorAll(".planet")].map((p) => {
      const r = p.getBoundingClientRect();
      return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2];
    });
    let html = "";
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], my = (y0 + y1) / 2;
      const done = G.state.bosses[C[i - 1].id] && G.state.bosses[C[i - 1].id].done;
      html += `<path class="${done ? "done" : ""}" d="M${x0} ${y0} C${x0} ${my} ${x1} ${my} ${x1} ${y1}"/>`;
    }
    svg.innerHTML = html;
  }
  addEventListener("resize", () => requestAnimationFrame(drawTrail));

  function viewWorld(id) {
    const m = moduleById(id);
    if (!m) return notFound();
    if (!moduleUnlocked(m)) { location.hash = "map"; return; }
    const boss = G.state.bosses[m.id] || {};
    const rows = m.lessons.map((l, i) => {
      const s = G.state.lessons[l.id] || {};
      const unlocked = lessonUnlocked(m, i), complete = lessonComplete(l);
      return `<a class="step-row${complete ? " done" : ""}${unlocked ? "" : " locked"}" href="#lesson-${l.id}" ${unlocked ? "" : 'aria-disabled="true" tabindex="-1"'}>
        <span class="dot">${complete ? "&#10003;" : i + 1}</span>
        <span class="min-w"><strong>${esc(l.title)}</strong><br><span class="meta">${l.minutes} min · Learn, quiz, mission${unlocked ? "" : " · Locked"}</span></span>
        <span class="pips" aria-label="Learn ${s.read ? "done" : "to do"}, quiz ${s.quizDone ? "done" : "to do"}, mission ${s.challenge ? "done" : "to do"}">
          <i class="pip${s.read ? " on" : ""}"></i><i class="pip${s.quizDone ? " on" : ""}"></i><i class="pip${s.challenge ? " on" : ""}"></i></span></a>`;
    }).join("");
    const bu = bossUnlocked(m);
    view.innerHTML = `<div class="module-view">
      <div class="crumbs"><a href="#map">Galaxy Map</a><span>/</span><span>World ${m.order}</span></div>
      <div class="module-hero">${planetHTML(m, 'tabindex="-1" aria-hidden="true"')}
        <div><div class="eyebrow">World ${m.order} · ${esc(m.topic)}</div><h1 class="display">${esc(m.name)}</h1><p class="lede">${esc(m.blurb)}</p></div></div>
      <div class="steps">${rows}
        <a class="step-row boss${boss.done ? " done" : ""}${bu ? "" : " locked"}" href="#boss-${m.id}" ${bu ? "" : 'aria-disabled="true" tabindex="-1"'}>
          <span class="dot">${boss.done ? "&#10003;" : "B"}</span>
          <span class="min-w"><strong>Boss: ${esc(m.boss.title)}</strong><br><span class="meta">${bu ? `Worth ${G.XP.boss} XP. Clearing it unlocks the next world.` : "Finish all three lessons to face the boss."}</span></span>
          <span></span></a>
      </div></div>`;
  }

  const lessonTabs = {}; // remembers the open tab per lesson for this visit
  function viewLesson(id) {
    const found = lessonById(id);
    if (!found) return notFound();
    const { module: m, lesson: l, index } = found;
    if (!lessonUnlocked(m, index)) { location.hash = "world-" + m.id; return; }
    const s = G.lessonState(l.id);
    let tab = lessonTabs[l.id] || (!s.read ? "learn" : !s.quizDone ? "quiz" : !s.challenge ? "mission" : "learn");
    const nextLesson = m.lessons[index + 1];
    const nextHref = nextLesson ? `#lesson-${nextLesson.id}` : `#boss-${m.id}`;
    const nextLabel = nextLesson ? `Next: ${nextLesson.title}` : `Face the boss: ${m.boss.title}`;

    function render() {
      lessonTabs[l.id] = tab;
      const tabs = [["learn", "Learn", s.read], ["quiz", "Quiz", s.quizDone], ["mission", "Mission", s.challenge]];
      view.innerHTML = `
        <div class="crumbs"><a href="#map">Galaxy Map</a><span>/</span><a href="#world-${m.id}">World ${m.order}: ${esc(m.name)}</a><span>/</span><span>Lesson ${index + 1}</span></div>
        <div class="lesson-grid"><div style="min-width:0">
          <div class="eyebrow">Lesson ${index + 1} of ${m.lessons.length} · ${l.minutes} min</div>
          <h1 class="display">${esc(l.title)}</h1>
          <div class="tabs" role="tablist">${tabs.map(([k, label, done]) => `<button class="tab${done ? " done" : ""}" role="tab" type="button" aria-selected="${tab === k}" data-tab="${k}"><span class="check"></span>${label}</button>`).join("")}</div>
          <div id="tab-body"></div>
        </div>
        <aside class="side">
          <div class="sources panel"><h4>Sources</h4><ul>${l.sources.map((src) => `<li><a href="${esc(src.url)}" target="_blank" rel="noopener">${esc(src.label)}</a></li>`).join("")}</ul>
            <p>Lessons follow the official Python documentation. Read the source for the full story.</p></div>
          <div class="stat panel"><span class="k">Lesson rewards</span><span class="v">${G.XP.read + l.quiz.length * G.XP.quizFirst + (l.challenge ? G.XP.challenge + G.XP.noHintBonus : 0)} XP</span>
            <span style="color:var(--muted);font-size:.85rem">Read ${G.XP.read} · Quiz ${G.XP.quizFirst} each, first try · Mission ${G.XP.challenge} + ${G.XP.noHintBonus} with no hints</span></div>
          <div>${pyStatus()}</div>
        </aside></div>`;
      view.querySelectorAll(".tab").forEach((b) => (b.onclick = () => { tab = b.dataset.tab; render(); }));
      const body = view.querySelector("#tab-body");
      if (tab === "learn") renderLearn(body);
      if (tab === "quiz") renderQuiz(body, l, s, () => { tab = l.challenge ? "mission" : "learn"; render(); window.scrollTo({ top: 0 }); });
      if (tab === "mission") {
        if (!l.challenge) { body.innerHTML = '<div class="card panel">This lesson has no mission.</div>'; return; }
        renderChallenge(body, l.challenge, {
          key: l.id, st: s, reward: G.XP.challenge, bonus: G.XP.noHintBonus,
          onPass() { s.challenge = true; },
          nextHref, nextLabel,
        });
      }
    }
    function renderLearn(body) {
      body.innerHTML = `<article class="card panel prose">${l.body}</article>
        <div class="next-row"><span></span><button class="btn primary" type="button" id="read-done">${s.read ? "Go to the quiz" : `I've read this · +${G.XP.read} XP`}</button></div>`;
      enhanceCode(body);
      body.querySelector("#read-done").onclick = () => {
        if (!s.read) { s.read = true; G.addXP(G.XP.read, "Lesson read"); flush(); }
        tab = "quiz"; render(); window.scrollTo({ top: 0 });
      };
    }
    render();
  }

  function renderQuiz(body, l, s, onDone) {
    const wrongPicks = {};
    function draw() {
      body.innerHTML = `<div class="quiz">${l.quiz.map((q, i) => {
        const st = s.quiz[i];
        const solved = st === "first" || st === "retry";
        const picks = wrongPicks[i] || [];
        return `<div class="q panel" data-i="${i}">
          <div class="q-head"><span class="n">Q${i + 1}</span><div class="q-text">${q.q}</div></div>
          <div class="opts">${q.options.map((o, j) => {
            const cls = solved && j === q.answer ? " right" : picks.includes(j) ? " wrong" : "";
            return `<button class="opt${cls}" type="button" data-j="${j}" ${solved || picks.includes(j) ? "disabled" : ""}><span class="key">${"ABCD"[j]}</span><span>${esc(o)}</span></button>`;
          }).join("")}</div>
          ${solved ? `<div class="explain">${st === "first" ? "Correct on the first try. " : "Correct. "}${q.explain}</div>` : picks.length ? `<div class="explain miss">Not quite. Try another answer.</div>` : ""}
        </div>`;
      }).join("")}</div>
      <div class="next-row"><span style="color:var(--muted)">${l.quiz.filter((_, i) => s.quiz[i] === "first" || s.quiz[i] === "retry").length} of ${l.quiz.length} answered</span>
        <button class="btn primary" type="button" id="quiz-next" ${s.quizDone ? "" : "disabled"}>${l.challenge ? "Start the mission" : "Done"}</button></div>`;
      body.querySelectorAll(".q-text pre.code, .q-text pre").forEach((pre) => { pre.innerHTML = highlight(pre.textContent); });
      body.querySelectorAll(".opt").forEach((b) => {
        b.onclick = () => {
          const i = +b.closest(".q").dataset.i, j = +b.dataset.j, q = l.quiz[i];
          if (j === q.answer) {
            const first = !(wrongPicks[i] && wrongPicks[i].length) && s.quiz[i] !== "wrong";
            s.quiz[i] = first ? "first" : "retry";
            if (first) { G.state.stats.quizFirst++; G.addXP(G.XP.quizFirst, "Correct answer"); }
            else G.addXP(G.XP.quizRetry, "Correct on retry");
            if (l.quiz.every((_, k) => s.quiz[k] === "first" || s.quiz[k] === "retry") && !s.quizDone) {
              s.quizDone = true;
              if (l.quiz.every((_, k) => s.quiz[k] === "first")) G.state.stats.perfectQuizzes++;
              burst(0.5, 0.6, 40);
            }
          } else {
            (wrongPicks[i] = wrongPicks[i] || []).push(j);
            if (!s.quiz[i]) s.quiz[i] = "wrong";
          }
          flush();
          const y = window.scrollY;
          draw();
          window.scrollTo({ top: y });
        };
      });
      body.querySelector("#quiz-next").onclick = onDone;
    }
    draw();
  }

  // Shared mission UI for lesson challenges and world bosses.
  function renderChallenge(body, ch, o) {
    const st = o.st;
    const draftKey = o.key;
    let revealArmed = false;
    body.innerHTML = `<div class="challenge">
      <div class="brief panel ${o.boss ? "boss" : ""}"><span class="label">${o.boss ? "Boss battle" : "Mission briefing"}</span>
        <h3>${esc(ch.title)}</h3>${ch.prompt}
        ${ch.stdin && ch.stdin.length ? `<p style="color:var(--muted);font-size:.88rem">Test input fed to <code>input()</code>: ${ch.stdin.map((x) => `<code>${esc(x)}</code>`).join(", ")}</p>` : ""}
        <h4 style="margin:14px 0 8px;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)">Checks</h4>
        <ul class="tests">${ch.tests.map((t) => `<li>${esc(t.name)}</li>`).join("")}</ul></div>
      <div class="runner"><div class="runner-bar"><span class="label">solution.py</span>${pyStatus()}</div><div class="output" role="status"></div></div>
      <div class="actions">
        <button class="btn" type="button" id="ch-run">${icon.play}Run</button>
        <button class="btn primary" type="button" id="ch-submit">${icon.bolt}Submit</button>
        <span class="spacer"></span>
        <button class="btn ghost small" type="button" id="ch-hint">Hint (${st.hints}/${ch.hints.length})</button>
        <button class="btn ghost small" type="button" id="ch-reset">Reset code</button>
        <button class="btn ghost small" type="button" id="ch-reveal">Show solution</button>
      </div>
      <div class="hints"></div>
      <div id="ch-result"></div></div>`;
    const runner = body.querySelector(".runner"), out = runner.querySelector(".output");
    const ed = createEditor(G.state.drafts[draftKey] != null ? G.state.drafts[draftKey] : ch.starter, {
      minLines: 6, label: "Mission code editor", id: "ed-" + draftKey,
      onRun: () => submit(), onChange: (v) => { G.state.drafts[draftKey] = v; G.save(); },
    });
    runner.insertBefore(ed.el, out);
    const hintsBox = body.querySelector(".hints");
    function drawHints() {
      hintsBox.innerHTML = ch.hints.slice(0, st.hints).map((x, i) => `<div class="hint-item"><strong>Hint ${i + 1}.</strong> ${x}</div>`).join("");
      body.querySelector("#ch-hint").textContent = `Hint (${st.hints}/${ch.hints.length})`;
      body.querySelector("#ch-hint").disabled = st.hints >= ch.hints.length;
    }
    drawHints();
    function drawPassed() {
      body.querySelector("#ch-result").innerHTML = `<div class="banner ${o.boss ? "boss" : ""}"><strong>${o.boss ? "Boss defeated." : "Mission complete."}</strong>
        <span style="color:var(--muted);flex:1;min-width:180px">${o.boss ? "The path to the next world is open." : "Every check passed."}</span>
        <a class="btn primary" href="${o.nextHref}">${esc(o.nextLabel)}</a></div>`;
    }
    if (o.done ? o.done() : st.challenge) drawPassed();

    body.querySelector("#ch-run").onclick = async () => {
      out.innerHTML = '<span class="sys">Running...</span>';
      const res = await runPython(ed.value, ch.stdin || []);
      renderOutput(out, res);
      G.state.stats.runs++;
      flush();
    };
    async function submit() {
      out.innerHTML = '<span class="sys">Running checks...</span>';
      const res = await runPython(ed.value, ch.stdin || [], ch.tests.map((t) => t.code));
      renderOutput(out, res);
      G.state.stats.runs++;
      const items = body.querySelectorAll(".tests li");
      res.results.forEach((r, i) => { items[i].className = r.ok ? "pass" : "fail"; items[i].title = r.ok ? "" : r.error || ""; });
      const passed = res.results.length && res.results.every((r) => r.ok);
      const already = o.done ? o.done() : st.challenge;
      if (passed && !already) {
        o.onPass();
        let amt = st.revealed ? Math.round(o.reward / 2) : o.reward;
        if (!st.hints && !st.revealed) { amt += o.bonus; G.state.stats.noHintPasses++; }
        if (st.attempts > 0) G.state.stats.comebacks++;
        G.addXP(amt, o.boss ? "Boss defeated" : "Mission complete");
        burst(0.5, 0.5, o.boss ? 160 : 80);
        drawPassed();
      } else if (passed) {
        drawPassed();
      } else {
        st.attempts++;
        const failed = res.results.filter((r) => !r.ok).length;
        body.querySelector("#ch-result").innerHTML = `<div class="hint-item" style="border-style:solid;border-color:rgba(255,107,125,.4);color:#ffd2d8">${failed} check${failed === 1 ? "" : "s"} failed. Read the output above, adjust your code and submit again.${st.attempts >= 2 && st.hints < ch.hints.length ? " A hint might help." : ""}</div>`;
      }
      flush();
    }
    body.querySelector("#ch-submit").onclick = submit;
    body.querySelector("#ch-hint").onclick = () => { if (st.hints < ch.hints.length) { st.hints++; G.save(); drawHints(); } };
    body.querySelector("#ch-reset").onclick = () => { ed.value = ch.starter; G.state.drafts[draftKey] = ch.starter; G.save(); out.innerHTML = ""; };
    const revealBtn = body.querySelector("#ch-reveal");
    revealBtn.onclick = () => {
      if (st.revealed || (o.done ? o.done() : st.challenge)) { ed.value = ch.solution; return; }
      if (!revealArmed) {
        revealArmed = true;
        revealBtn.textContent = "Click again: halves this mission's XP";
        setTimeout(() => { revealArmed = false; revealBtn.textContent = "Show solution"; }, 4000);
        return;
      }
      st.revealed = true;
      G.save();
      body.querySelector("#ch-result").innerHTML = `<div class="code-static"><pre>${highlight(ch.solution)}</pre></div>
        <p style="color:var(--muted);font-size:.9rem">Study it, then type it out yourself and submit. Typing it beats copying it.</p>`;
      revealBtn.textContent = "Solution shown";
    };
  }

  function viewBoss(id) {
    const m = moduleById(id);
    if (!m) return notFound();
    if (!bossUnlocked(m)) { location.hash = "world-" + m.id; return; }
    const st = G.bossState(m.id);
    const next = C[C.indexOf(m) + 1];
    view.innerHTML = `<div class="crumbs"><a href="#map">Galaxy Map</a><span>/</span><a href="#world-${m.id}">World ${m.order}: ${esc(m.name)}</a><span>/</span><span>Boss</span></div>
      <div class="eyebrow" style="margin-top:14px;color:var(--flare)">World ${m.order} boss · ${G.XP.boss} XP + ${G.XP.bossNoHint} with no hints</div>
      <h1 class="display">${esc(m.boss.title)}</h1><div id="tab-body" style="margin-top:16px"></div>`;
    renderChallenge(view.querySelector("#tab-body"), m.boss, {
      key: "boss-" + m.id, st, boss: true, reward: G.XP.boss, bonus: G.XP.bossNoHint,
      done: () => st.done,
      onPass() { st.done = true; },
      nextHref: next ? `#world-${next.id}` : "#achievements",
      nextLabel: next ? `Fly to World ${next.order}: ${next.name}` : "See your Captain's Log",
    });
  }

  // Daily Orbit: one question a day from lessons you have read.
  function viewDaily() {
    const s = G.state, t = G.today();
    const pool = [];
    C.forEach((m) => m.lessons.forEach((l) => {
      if (s.lessons[l.id] && s.lessons[l.id].read) l.quiz.forEach((q, i) => pool.push({ l, q, i, m }));
    }));
    if (!pool.length) C[0].lessons[0].quiz.forEach((q, i) => pool.push({ l: C[0].lessons[0], q, i, m: C[0] }));
    let seed = 0;
    for (const ch of t) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    if (s.daily.date !== t) { s.daily = { date: t, done: false, pick: seed % pool.length, correct: null }; G.save(); }
    const item = pool[Math.min(s.daily.pick, pool.length - 1)];
    const q = item.q;
    view.innerHTML = `<div class="two-col"><div style="min-width:0">
      <div class="eyebrow">Daily Orbit · ${t}</div><h1 class="display">One question a day</h1>
      <p class="lede">A review question from a lesson you've already read. Answer it to keep your streak and earn ${G.XP.daily} XP.</p>
      <div class="q panel" style="margin-top:20px">
        <div class="q-head"><span class="n">Q</span><div class="q-text">${q.q}</div></div>
        <div class="opts">${q.options.map((opt, j) => {
          const cls = s.daily.done ? (j === q.answer ? " right" : j === s.daily.choice ? " wrong" : "") : "";
          return `<button class="opt${cls}" type="button" data-j="${j}" ${s.daily.done ? "disabled" : ""}><span class="key">${"ABCD"[j]}</span><span>${esc(opt)}</span></button>`;
        }).join("")}</div>
        ${s.daily.done ? `<div class="explain${s.daily.correct ? "" : " miss"}">${s.daily.correct ? "Correct. " : "Not this time. "}${q.explain}</div>
          <p style="color:var(--muted);font-size:.9rem;margin-bottom:0">From <a href="#lesson-${item.l.id}">${esc(item.l.title)}</a>. A new orbit opens tomorrow.</p>` : ""}
      </div></div>
      <div class="side"><div class="stat panel"><span class="k">Current streak</span><span class="v">${s.streak.count} day${s.streak.count === 1 ? "" : "s"}</span><span style="color:var(--muted);font-size:.85rem">Best: ${s.streak.best}. Any lesson, quiz or Daily Orbit keeps it going.</span></div>
      <div class="stat panel"><span class="k">Orbits completed</span><span class="v">${s.stats.dailies}</span></div></div></div>`;
    view.querySelectorAll(".q-text pre").forEach((pre) => { pre.innerHTML = highlight(pre.textContent); });
    view.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
      const j = +b.dataset.j;
      s.daily.done = true; s.daily.choice = j; s.daily.correct = j === q.answer;
      s.stats.dailies++;
      G.addXP(s.daily.correct ? G.XP.daily : 5, s.daily.correct ? "Daily Orbit" : "Daily Orbit attempt");
      if (s.daily.correct) burst(0.5, 0.5, 70);
      flush();
      viewDaily();
    }));
  }

  const LAB_INPUT = { "Hello, galaxy": "Ada", "Guess the number": "10\n15\n12\n11" };
  const LAB_SAMPLES = {
    "Hello, galaxy": 'name = input("Your name, captain? ")\nprint(f"Welcome aboard, {name}!")\n',
    "FizzBuzz": 'for n in range(1, 16):\n    if n % 15 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)\n',
    "Planet table": 'planets = {"Mercury": 0.39, "Venus": 0.72, "Earth": 1.0, "Mars": 1.52}\n\nfor name, au in sorted(planets.items(), key=lambda p: p[1]):\n    bar = "*" * round(au * 10)\n    print(f"{name:<8} {au:>5.2f} AU  {bar}")\n',
    "Guess the number": 'import random\n\nrandom.seed(7)\nsecret = random.randint(1, 20)\n\nfor attempt in range(1, 6):\n    guess = int(input("Guess (1-20): "))\n    if guess == secret:\n        print(f"Docked in {attempt} tries!")\n        break\n    print("Higher" if guess < secret else "Lower")\nelse:\n    print("Out of fuel. It was", secret)\n',
  };
  function viewLab() {
    const s = G.state;
    const code = s.lab || LAB_SAMPLES["Planet table"];
    view.innerHTML = `<div class="eyebrow">Free experimentation</div><h1 class="display">The Lab</h1>
      <p class="lede">Write any Python you like. Your code is saved in this browser. Press Ctrl+Enter (Cmd+Enter on a Mac) to run.</p>
      <div class="two-col" style="margin-top:20px"><div style="min-width:0">
        <div class="runner"><div class="runner-bar"><span class="label">lab.py</span>${pyStatus()}
          <button class="btn small primary" type="button" id="lab-run">${icon.play}Run</button></div><div class="output" role="status"></div></div>
      </div><div class="side" style="position:static">
        <div class="field panel" style="padding:14px 16px"><label for="lab-stdin"><strong>Input</strong> <span style="color:var(--muted);font-size:.85rem">one line per input() call</span></label>
          <textarea id="lab-stdin" rows="4" spellcheck="false">${esc(s.labStdin != null ? s.labStdin : "")}</textarea></div>
        <div class="panel" style="padding:14px 16px;display:grid;gap:8px"><strong>Load an example</strong>
          <div style="display:flex;gap:6px;flex-wrap:wrap">${Object.keys(LAB_SAMPLES).map((k) => `<button class="btn small" type="button" data-sample="${esc(k)}">${esc(k)}</button>`).join("")}</div>
          <span style="color:var(--muted);font-size:.85rem">Loading an example replaces your code and the Input box.</span></div>
        <div class="tip"><strong>Tip</strong> Python here runs in your browser. An endless loop will freeze the tab; reload the page and your progress will still be here.</div>
      </div></div>`;
    const runner = view.querySelector(".runner"), out = runner.querySelector(".output");
    const stdin = view.querySelector("#lab-stdin");
    stdin.oninput = () => { s.labStdin = stdin.value; G.save(); };
    const ed = createEditor(code, { minLines: 14, id: "lab-editor", onRun: () => run(), onChange: (v) => { s.lab = v; G.save(); } });
    runner.insertBefore(ed.el, out);
    async function run() {
      out.innerHTML = '<span class="sys">Running...</span>';
      const lines = stdin.value.split("\n");
      if (lines[lines.length - 1] === "") lines.pop();
      renderOutput(out, await runPython(ed.value, lines));
      s.stats.runs++; s.stats.labRuns++;
      flush();
    }
    view.querySelector("#lab-run").onclick = run;
    view.querySelectorAll("[data-sample]").forEach((b) => (b.onclick = () => {
      ed.value = LAB_SAMPLES[b.dataset.sample]; s.lab = ed.value;
      stdin.value = s.labStdin = LAB_INPUT[b.dataset.sample] || "";
      G.save();
    }));
  }

  function viewAchievements() {
    const s = G.state, r = G.rankFor(s.xp);
    const lessonsDone = C.reduce((n, m) => n + m.lessons.filter(lessonComplete).length, 0);
    const totalLessons = C.reduce((n, m) => n + m.lessons.length, 0);
    const earned = G.BADGES.filter((b) => s.badges[b.id]).length;
    view.innerHTML = `<div class="eyebrow">Level ${r.level} · ${esc(r.name)}</div>
      <h1 class="display">Captain's Log${s.name ? `: ${esc(s.name)}` : ""}</h1>
      <div class="stats-grid" style="margin-top:18px">
        <div class="stat panel"><div class="k">Total XP</div><div class="v" style="color:var(--nova)">${s.xp}</div></div>
        <div class="stat panel"><div class="k">Lessons</div><div class="v">${lessonsDone}/${totalLessons}</div></div>
        <div class="stat panel"><div class="k">Worlds cleared</div><div class="v">${G.countBosses(s)}/${C.length}</div></div>
        <div class="stat panel"><div class="k">Best streak</div><div class="v" style="color:var(--flare)">${s.streak.best}</div></div>
        <div class="stat panel"><div class="k">Programs run</div><div class="v">${s.stats.runs}</div></div>
        <div class="stat panel"><div class="k">Badges</div><div class="v" style="color:var(--nebula)">${earned}/${G.BADGES.length}</div></div>
      </div>
      <div class="two-col"><div style="min-width:0">
        <h2 class="section-title">Badges</h2>
        <div class="badge-grid">${G.BADGES.map((b) => `<div class="badge panel${s.badges[b.id] ? "" : " locked"}">${medal(b.hue)}<div><h4>${esc(b.name)}</h4><p>${esc(b.text)}${s.badges[b.id] ? `<br><span style="color:var(--ok)">Earned ${s.badges[b.id]}</span>` : ""}</p></div></div>`).join("")}</div>
      </div><div style="min-width:0">
        <h2 class="section-title">Ranks</h2>
        <div class="ranks panel" style="padding:8px">${G.RANKS.map((k, i) => `<div class="rank-row${s.xp >= k.xp ? " reached" : ""}${i === r.index ? " here" : ""}"><span>${i + 1}</span><span>${esc(k.name)}</span><span class="xp">${k.xp} XP</span></div>`).join("")}</div>
        <h2 class="section-title">Settings</h2>
        <div class="panel" style="padding:16px;display:grid;gap:14px">
          <div class="field"><label for="cmdr">Captain's name</label><input id="cmdr" maxlength="40" value="${esc(s.name)}" placeholder="Your name"></div>
          <label class="toggle"><input type="checkbox" id="free-roam" ${s.freeRoam ? "checked" : ""}><span><strong>Free Roam</strong><br><span style="color:var(--muted);font-size:.88rem">Unlock every world and lesson. Useful if you already know the basics.</span></span></label>
          <div class="field"><label for="save-code"><strong>Backup</strong> <span style="color:var(--muted);font-size:.85rem">Progress lives in this browser. Copy the save code to move it to another device.</span></label>
            <textarea id="save-code" rows="3" spellcheck="false" placeholder="Paste a save code here to restore it"></textarea>
            <div class="danger-zone"><button class="btn small" type="button" id="copy-save">Copy save code</button><button class="btn small" type="button" id="load-save">Restore from code</button><span id="save-msg" style="color:var(--muted);font-size:.85rem"></span></div></div>
          <div class="danger-zone"><button class="btn small ghost" type="button" id="reset-all" style="border-color:rgba(255,107,125,.5);color:var(--bad)">Reset all progress</button></div>
        </div>
      </div></div>`;
    view.querySelector("#cmdr").oninput = (e) => { s.name = e.target.value.trim(); G.save(); };
    view.querySelector("#free-roam").onchange = (e) => { s.freeRoam = e.target.checked; G.save(); };
    const msg = view.querySelector("#save-msg"), box = view.querySelector("#save-code");
    view.querySelector("#copy-save").onclick = () => {
      const code = btoa(unescape(encodeURIComponent(G.exportJSON())));
      box.value = code;
      navigator.clipboard.writeText(code).then(() => (msg.textContent = "Copied."), () => { box.select(); msg.textContent = "Selected. Copy it with Ctrl+C."; });
    };
    view.querySelector("#load-save").onclick = () => {
      try { G.importJSON(decodeURIComponent(escape(atob(box.value.trim())))); msg.textContent = "Progress restored."; viewAchievements(); }
      catch (e) { msg.textContent = "That save code could not be read. Copy the whole code and try again."; }
    };
    let armed = false;
    view.querySelector("#reset-all").onclick = (e) => {
      if (!armed) { armed = true; e.target.textContent = "Click again to erase everything"; setTimeout(() => { armed = false; e.target.textContent = "Reset all progress"; }, 4000); return; }
      G.reset(); viewAchievements();
    };
  }

  function notFound() {
    view.innerHTML = `<h1 class="display">Lost in space</h1><p class="lede">That page does not exist. <a href="#map">Return to the Galaxy Map</a>.</p>`;
  }

  // ---------- router ----------
  function route() {
    const hash = location.hash.replace(/^#/, "") || "map";
    let nav = "map";
    if (hash === "map") viewMap();
    else if (hash.startsWith("world-")) viewWorld(hash.slice(6));
    else if (hash.startsWith("lesson-")) viewLesson(hash.slice(7));
    else if (hash.startsWith("boss-")) viewBoss(hash.slice(5));
    else if (hash === "daily") { viewDaily(); nav = "daily"; }
    else if (hash === "lab") { viewLab(); nav = "lab"; }
    else if (hash === "achievements") { viewAchievements(); nav = "achievements"; }
    else notFound();
    document.querySelectorAll("[data-nav]").forEach((a) => {
      if (a.dataset.nav === nav) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    window.scrollTo({ top: 0 });
    renderHUD();
  }
  addEventListener("hashchange", route);
  route();
})();
