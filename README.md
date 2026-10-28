# Python Galaxy

A gamified course that takes you from your first `print()` to writing tested,
professional Python. It runs entirely in your browser, with no install and no account.

## Start

- **Quickest:** open `index.html` in a browser (double-click it).
- **Or serve it:** `python3 -m http.server 8000`, then visit http://localhost:8000.

### Put it on your phone's home screen

Host the folder on GitHub Pages (repo **Settings → Pages → Deploy from a
branch → `main` / `(root)`**), open the Pages address in Safari, then tap
**Share → Add to Home Screen**. It opens full screen with its own icon and,
after the first visit, works offline. Updates arrive the next time you open
it online.

Python code runs in the page through [Brython](https://brython.info), which
is included in `vendor/`, so lessons work offline. The fonts load from Google
Fonts when you are online and fall back to system fonts when you are not.

## What's inside

14 worlds × 3 lessons + a boss each: 42 lessons, 147 quiz questions,
56 coding missions and 150 runnable examples.

| # | World | Topic |
|---|-------|-------|
| 1 | Launch Pad | print, comments, the interpreter, reading errors |
| 2 | Stardust Values | variables, numbers, operators, types |
| 3 | Signal Strings | strings, slicing, methods, f-strings |
| 4 | Navigation Decisions | input, booleans, if/elif/else, match |
| 5 | Orbit Loops | while, for, range, break/continue |
| 6 | Cargo Lists | lists, comprehensions, tuples, unpacking |
| 7 | Star Charts | dictionaries and sets |
| 8 | Thruster Functions | def, arguments, scope, lambda, recursion |
| 9 | Error Shields | exceptions, try/except, raise, debugging |
| 10 | Module Stations | imports, standard library, venv and pip |
| 11 | Data Archives | files, json, csv, pathlib |
| 12 | Class Constellations | classes, inheritance, dataclasses |
| 13 | Warp Iterators | iterators, generators, itertools |
| 14 | Galaxy Architect | PEP 8, type hints, testing |

Every lesson cites the official sources it follows: the Python Tutorial,
Library and Language Reference on docs.python.org, PEPs on peps.python.org,
and the Python Packaging User Guide.

## How the game works

- **XP:** read a lesson (+10), answer quiz questions (+10 first try, +3 on retry),
  pass a mission (+40, +10 more with no hints), defeat a boss (+100, +25 more with no hints).
- **12 ranks**, from Stardust to Galaxy Architect.
- **16 badges** for streaks, accuracy, persistence and progress.
- **Daily Orbit:** one review question a day that keeps your streak alive.
- **Lab:** a free-form Python playground with input support.
- **Free Roam** (in the Captain's Log) unlocks everything for experienced learners.

Progress is saved in your browser's local storage. Use **Copy save code** in
the Captain's Log to move it to another browser.

## For contributors

Content lives in `js/content/mNN.js`; the format is in `tools/CONTENT_SPEC.md`.

```bash
python3 tools/validate.py          # schema + runs every solution/example in CPython
node tools/browser_check.js        # runs everything again in the in-browser Python (needs Playwright)
python3 tools/build_single.py out.html   # single-page bundle (vendor/ must sit beside it)
```
