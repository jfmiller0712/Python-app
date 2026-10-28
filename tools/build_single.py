"""Bundle the app into one HTML page body (CSS and app JS inlined).

The two Brython files in vendor/ stay separate and must sit next to the
output under vendor/. Usage: python3 tools/build_single.py OUT.html
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def inline_script(path):
    code = (ROOT / path).read_text(encoding="utf-8").replace("</script", "<\\/script")
    return f"<script>\n{code}\n</script>"


def main(out):
    src = (ROOT / "index.html").read_text(encoding="utf-8")
    head = src.split("<!-- build:head -->")[1].split("<!-- /build:head -->")[0]
    body = src.split("<!-- build:body -->")[1].split("<!-- /build:body -->")[0]
    css = (ROOT / "css/styles.css").read_text(encoding="utf-8")
    head = head.replace('<link rel="stylesheet" href="css/styles.css">', f"<style>\n{css}\n</style>")
    body = re.sub(r'<script src="(js/[^"]+)"></script>', lambda m: inline_script(m.group(1)), body)
    Path(out).write_text(head.strip() + "\n" + body.strip() + "\n", encoding="utf-8")
    print(f"wrote {out} ({Path(out).stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main(sys.argv[1])
