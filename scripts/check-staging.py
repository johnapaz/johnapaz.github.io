from pathlib import Path
import json
import re

root = Path("_site")
assert (root / "index.html").is_file(), "Homepage missing"
assert (root / "assets/css/main.css").is_file(), "Stylesheet missing"
html_files = list(root.rglob("*.html"))
assert html_files, "No HTML generated"
for path in html_files:
    html = path.read_text()
    if "<head" in html:
        assert 'content="noindex, nofollow"' in html, f"Missing noindex: {path}"
    assert not re.search(r"google-analytics\.com|googletagmanager\.com|UA-165031992-2", html), f"Analytics in {path}"
assert json.loads((root / "build-info.json").read_text())["commit"], "Commit missing"
print(f"Staging checks passed for {len(html_files)} HTML files")
