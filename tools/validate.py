"""Validate the curriculum: schema, challenge tests, and runnable examples.

Usage: python3 tools/validate.py [module-id ...]
"""
import html
import io
import json
import re
import subprocess
import sys
from contextlib import redirect_stdout
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TRUSTED = ("https://docs.python.org/3/", "https://peps.python.org/",
           "https://packaging.python.org/", "https://www.python.org/")
RUN_RE = re.compile(r'<pre class="code" data-run>(.*?)</pre>', re.S)


def run_program(code, stdin):
    """Run code like the app does; return (namespace, output, error)."""
    lines = list(stdin or [])
    buf = io.StringIO()

    def fake_input(prompt=""):
        buf.write(str(prompt))
        if not lines:
            raise EOFError("No more input available")
        value = lines.pop(0)
        buf.write(value + "\n")
        return value

    ns = {"__name__": "__main__", "input": fake_input}
    err = None
    try:
        with redirect_stdout(buf):
            exec(compile(code, "<learner>", "exec"), ns)
    except Exception as e:  # noqa: BLE001
        err = f"{type(e).__name__}: {e}"
    ns["__output__"] = buf.getvalue()
    return ns, buf.getvalue(), err


def run_tests(ch, code):
    ns, out, err = run_program(code, ch.get("stdin"))
    results = []
    for t in ch["tests"]:
        try:
            with redirect_stdout(io.StringIO()):
                exec(t["code"], ns)
            results.append(True)
        except Exception:  # noqa: BLE001
            results.append(False)
    return results, out, err


def check_challenge(where, ch, problems):
    for key in ("title", "prompt", "starter", "tests", "hints", "solution"):
        if key not in ch:
            problems.append(f"{where}: challenge missing '{key}'")
            return
    if not 2 <= len(ch["tests"]) <= 6:
        problems.append(f"{where}: needs 2-5 tests")
    res, out, err = run_tests(ch, ch["solution"])
    if not all(res):
        problems.append(f"{where}: SOLUTION fails tests {[t['name'] for t, ok in zip(ch['tests'], res) if not ok]}"
                        f" (error={err!r}, output={out[:200]!r})")
    res, _, _ = run_tests(ch, ch["starter"])
    if all(res):
        problems.append(f"{where}: starter already passes all tests")


def main():
    data = json.loads(subprocess.check_output(["node", str(ROOT / "tools" / "dump_content.js")]))
    only = set(sys.argv[1:])
    problems, counts = [], {"modules": 0, "lessons": 0, "quiz": 0, "challenges": 0, "examples": 0}
    ids = set()
    for m in data:
        if only and m["id"] not in only:
            continue
        counts["modules"] += 1
        for key in ("id", "order", "name", "topic", "blurb", "lessons", "boss"):
            if key not in m:
                problems.append(f"{m.get('__file')}: missing '{key}'")
        for lesson in m.get("lessons", []):
            counts["lessons"] += 1
            where = lesson.get("id", "?")
            if where in ids:
                problems.append(f"{where}: duplicate id")
            ids.add(where)
            for key in ("id", "title", "minutes", "sources", "body", "quiz"):
                if key not in lesson:
                    problems.append(f"{where}: missing '{key}'")
            for s in lesson.get("sources", []):
                if not s["url"].startswith(TRUSTED):
                    problems.append(f"{where}: untrusted source {s['url']}")
            if not lesson.get("sources"):
                problems.append(f"{where}: no sources")
            for i, q in enumerate(lesson.get("quiz", [])):
                counts["quiz"] += 1
                if not 0 <= q["answer"] < len(q["options"]):
                    problems.append(f"{where} quiz {i}: answer index out of range")
                if not q.get("explain"):
                    problems.append(f"{where} quiz {i}: missing explain")
            for j, ex in enumerate(RUN_RE.findall(lesson.get("body", ""))):
                counts["examples"] += 1
                _, out, err = run_program(html.unescape(ex), [])
                if err:
                    problems.append(f"{where} example {j}: {err}")
            if lesson.get("challenge"):
                counts["challenges"] += 1
                check_challenge(where, lesson["challenge"], problems)
        if m.get("boss"):
            counts["challenges"] += 1
            check_challenge(f"{m['id']} boss", m["boss"], problems)
    print(json.dumps(counts))
    for p in problems:
        print("PROBLEM:", p)
    print("OK" if not problems else f"{len(problems)} problem(s)")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
