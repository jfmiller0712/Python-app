# Curriculum content spec

Each module lives in its own file `js/content/mNN.js` (NN = 01..14) and calls
`registerModule({...})` exactly once. Files are plain browser scripts (no
`import`/`export`). Use template literals for HTML and code.

```js
registerModule({
  id: "m01",                     // matches file name
  order: 1,
  name: "Launch Pad",            // space-themed world name
  topic: "Your first Python program",
  blurb: "One sentence shown on the galaxy map.",
  lessons: [ /* 3 lessons */ ],
  boss: { /* a challenge object (see below), harder, combines the module */ }
});
```

## Lesson

```js
{
  id: "m01-l1",
  title: "Hello, Python",
  minutes: 6,
  sources: [
    { label: "The Python Tutorial, 3. An Informal Introduction",
      url: "https://docs.python.org/3/tutorial/introduction.html" }
  ],
  body: `<p>…</p>
<pre class="code" data-run>print("Hello")</pre>
<p>…</p>`,
  quiz: [
    { q: `What does <code>print(2 + 3)</code> show?`,
      options: ["5", "2 + 3", "23", "An error"],
      answer: 0,
      explain: "Python evaluates the expression first, then prints the result." }
  ],
  challenge: { /* optional but strongly preferred; see below */ }
}
```

### Body rules
- Beginner-friendly, accurate, concise: 250-550 words per lesson. Short paragraphs,
  `<h3>` sub-headings, `<ul>` lists, `<code>` for inline code.
- Code examples: `<pre class="code" data-run>…</pre>` gets a "Run" button.
  Use `<pre class="code">` (no data-run) for code that should not be run
  (e.g. shell commands, code that needs files/network, or deliberately broken code).
  Escape `<`, `>`, `&` inside HTML as `&lt;` `&gt;` `&amp;`.
- Callouts: `<div class="tip"><strong>Tip</strong> …</div>`,
  `<div class="warn"><strong>Watch out</strong> …</div>`.
- No emoji. No images.
- Code in examples must run on Python 3.12+ AND in Brython (in-browser Python).
  Avoid: writing real files, network, threads, `subprocess`, `os.system`,
  `time.sleep` longer than 0.1s, infinite loops, `input()` in data-run examples.
  Reading/writing files may be TAUGHT with non-run blocks; for runnable demos
  use `io.StringIO`.

### Sources (trusted only)
Only cite: docs.python.org/3/ (Tutorial, Library Reference, Language Reference,
Glossary, HOWTOs, FAQ), peps.python.org, packaging.python.org, python.org.
Cite page-level URLs you are sure exist (e.g.
`https://docs.python.org/3/tutorial/controlflow.html`). Only add a `#anchor`
if you are certain of it. Every lesson needs >= 1 source. Content must agree
with those sources.

### Quiz
2-4 questions per lesson, multiple choice with 3-4 options, `answer` is the
0-based index of the correct option. Mix concept questions and
"what does this print?" questions (put code in `<pre class="code">` inside `q`).
`explain` teaches why. Vary the position of the correct answer.

## Challenge (lesson challenge or module boss)

```js
{
  title: "Greeting Beacon",
  prompt: `<p>Print exactly <code>Hello, Galaxy!</code></p>`,
  starter: `# Write your code below\n`,
  stdin: [],                 // optional: lines fed to input(), in order
  tests: [
    { name: "Prints Hello, Galaxy!", code: `assert __output__.strip() == "Hello, Galaxy!"` }
  ],
  hints: ["Use print()", "Strings go inside quotes"],
  solution: `print("Hello, Galaxy!")`
}
```

How tests run (identical in the app and in `tools/validate.py`):
1. The learner's code runs with `exec` in a fresh namespace
   (`__name__ == "__main__"`). Everything printed is captured.
2. `input(prompt)` returns the next line from `stdin`; the prompt AND the
   returned value plus a newline are echoed into the output, like a terminal.
3. The captured text is put into the namespace as `__output__` (a str).
4. Each test's `code` is `exec`'d in that same namespace. A test passes if it
   raises nothing. Use `assert` with clear conditions. Tests may call the
   learner's functions/classes. Guard against missing names gracefully is not
   needed; a NameError simply fails the test.
- 2-5 tests per challenge; each `name` tells the learner what is expected.
- The `starter` must NOT pass all tests. The `solution` must pass all tests.
- Prefer checking functions with several inputs over exact output matching.
  When checking output, prefer `.strip()`, `in`, or `splitlines()`.
- Hints: 2-3, progressive, never the full answer.
- Boss challenges: combine the module's ideas, 4-5 tests.

Validate with: `python3 tools/validate.py` (checks schema, runs every solution
and starter against the tests, and runs every data-run example).
