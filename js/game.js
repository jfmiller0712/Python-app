// Game layer: saved progress, XP, ranks, streaks and badges.
(function () {
  const KEY = "python-galaxy.v1";

  const RANKS = [
    { name: "Stardust", xp: 0 },
    { name: "Meteor", xp: 150 },
    { name: "Comet", xp: 400 },
    { name: "Moon", xp: 750 },
    { name: "Planet", xp: 1200 },
    { name: "Gas Giant", xp: 1750 },
    { name: "Star", xp: 2400 },
    { name: "Red Giant", xp: 3100 },
    { name: "Pulsar", xp: 3900 },
    { name: "Supernova", xp: 4700 },
    { name: "Black Hole", xp: 5500 },
    { name: "Galaxy Architect", xp: 6300 },
  ];

  const XP = {
    read: 10,
    quizFirst: 10,
    quizRetry: 3,
    challenge: 40,
    noHintBonus: 10,
    boss: 100,
    bossNoHint: 25,
    daily: 25,
    streakDay: 5,
  };

  // Each badge: id, name, text, hue (medal color), test(state, curriculum).
  const BADGES = [
    { id: "first-light", name: "First Light", text: "Run your first Python program.", hue: 50, test: (s) => s.stats.runs >= 1 },
    { id: "liftoff", name: "Liftoff", text: "Finish your first lesson.", hue: 190, test: (s) => countLessons(s) >= 1 },
    { id: "sharpshooter", name: "Sharpshooter", text: "Answer 25 quiz questions right on the first try.", hue: 330, test: (s) => s.stats.quizFirst >= 25 },
    { id: "flawless", name: "Flawless Orbit", text: "Ace every question in a lesson on the first try.", hue: 160, test: (s) => s.stats.perfectQuizzes >= 1 },
    { id: "bug-hunter", name: "Bug Hunter", text: "Pass a mission after a failed attempt.", hue: 10, test: (s) => s.stats.comebacks >= 1 },
    { id: "solo-pilot", name: "Solo Pilot", text: "Pass 10 missions without using a hint.", hue: 260, test: (s) => s.stats.noHintPasses >= 10 },
    { id: "boss-1", name: "Gatekeeper", text: "Defeat your first world boss.", hue: 345, test: (s) => countBosses(s) >= 1 },
    { id: "halfway", name: "Halfway Across", text: "Clear 7 worlds.", hue: 210, test: (s) => countBosses(s) >= 7 },
    { id: "architect", name: "Galaxy Architect", text: "Clear all 14 worlds.", hue: 45, test: (s, c) => c && countBosses(s) >= c.length },
    { id: "streak-3", name: "Ignition", text: "Learn 3 days in a row.", hue: 20, test: (s) => s.streak.best >= 3 },
    { id: "streak-7", name: "Steady Burn", text: "Learn 7 days in a row.", hue: 0, test: (s) => s.streak.best >= 7 },
    { id: "streak-30", name: "Perpetual Motion", text: "Learn 30 days in a row.", hue: 300, test: (s) => s.streak.best >= 30 },
    { id: "tinkerer", name: "Tinkerer", text: "Run 50 programs.", hue: 120, test: (s) => s.stats.runs >= 50 },
    { id: "lab-rat", name: "Lab Scientist", text: "Run 10 experiments in the Lab.", hue: 180, test: (s) => s.stats.labRuns >= 10 },
    { id: "daily-5", name: "Regular Orbit", text: "Complete 5 Daily Orbits.", hue: 230, test: (s) => s.stats.dailies >= 5 },
    { id: "rank-star", name: "Born a Star", text: "Reach the rank of Star.", hue: 48, test: (s) => s.xp >= 2400 },
  ];

  function fresh() {
    return {
      v: 1,
      xp: 0,
      name: "",
      lessons: {},      // id -> { read, quiz: {i: "first"|"retry"}, quizDone, challenge, hints, attempts, revealed }
      bosses: {},       // moduleId -> { done, hints, attempts, revealed }
      drafts: {},       // challenge key -> code
      badges: {},       // id -> date
      streak: { last: null, count: 0, best: 0 },
      daily: { date: null, done: false, qid: null },
      freeRoam: false,
      stats: { runs: 0, labRuns: 0, quizFirst: 0, perfectQuizzes: 0, comebacks: 0, noHintPasses: 0, dailies: 0 },
      lab: "",
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return fresh();
      const saved = JSON.parse(raw);
      const base = fresh();
      return Object.assign(base, saved, {
        stats: Object.assign(base.stats, saved.stats || {}),
        streak: Object.assign(base.streak, saved.streak || {}),
        daily: Object.assign(base.daily, saved.daily || {}),
      });
    } catch (e) {
      return fresh();
    }
  }

  let state = load();
  const listeners = [];

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
    listeners.forEach((fn) => fn(state));
  }

  function today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function dayDiff(a, b) {
    return Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 86400000);
  }

  function countLessons(s) {
    return Object.values(s.lessons).filter((l) => l.read && l.quizDone && l.challenge).length;
  }
  function countBosses(s) {
    return Object.values(s.bosses).filter((b) => b.done).length;
  }

  function rankFor(xp) {
    let i = 0;
    while (i + 1 < RANKS.length && xp >= RANKS[i + 1].xp) i++;
    const cur = RANKS[i];
    const next = RANKS[i + 1] || null;
    const pct = next ? (xp - cur.xp) / (next.xp - cur.xp) : 1;
    return { index: i, level: i + 1, ...cur, next, pct };
  }

  // Events go to the UI (toasts, level-up modal).
  const events = [];
  function emit(ev) { events.push(ev); }
  function drainEvents() { return events.splice(0, events.length); }

  function touchStreak() {
    const t = today();
    const st = state.streak;
    if (st.last === t) return;
    if (st.last && dayDiff(st.last, t) === 1) st.count += 1;
    else st.count = 1;
    st.last = t;
    st.best = Math.max(st.best, st.count);
    addXP(XP.streakDay * Math.min(st.count, 7), `Day ${st.count} streak`, true);
  }

  function addXP(amount, reason, skipStreak) {
    if (!skipStreak) touchStreak();
    const before = rankFor(state.xp);
    state.xp += amount;
    const after = rankFor(state.xp);
    emit({ type: "xp", amount, reason });
    if (after.index > before.index) emit({ type: "rank", rank: after });
  }

  function checkBadges(curriculum) {
    for (const b of BADGES) {
      if (!state.badges[b.id] && b.test(state, curriculum)) {
        state.badges[b.id] = today();
        emit({ type: "badge", badge: b });
      }
    }
  }

  function lessonState(id) {
    if (!state.lessons[id]) state.lessons[id] = { read: false, quiz: {}, quizDone: false, challenge: false, hints: 0, attempts: 0, revealed: false };
    return state.lessons[id];
  }
  function bossState(id) {
    if (!state.bosses[id]) state.bosses[id] = { done: false, hints: 0, attempts: 0, revealed: false };
    return state.bosses[id];
  }

  window.Game = {
    RANKS, XP, BADGES,
    get state() { return state; },
    onChange(fn) { listeners.push(fn); },
    save, today, rankFor, drainEvents, checkBadges, lessonState, bossState, countBosses, countLessons, addXP,
    reset() { state = fresh(); save(); },
    exportJSON() { return JSON.stringify(state); },
    importJSON(text) {
      const data = JSON.parse(text);
      if (typeof data !== "object" || typeof data.xp !== "number") throw new Error("That file is not a Python Galaxy save.");
      state = Object.assign(fresh(), data);
      save();
    },
  };
})();
