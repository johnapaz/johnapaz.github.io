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
# Staging may load the consent-gated local integration with its own GA4 ID.
configs = [Path(name).read_text() for name in ('_config.yml', '_config.staging.yml')]
def measurement(text):
    match = re.search(r'^google_analytics:\s*(G-[A-Z0-9]+)\s*$', text, re.M)
    return match.group(1) if match else None
production_id, staging_id = map(measurement, configs)
assert not (production_id and production_id == staging_id), "Properties must be separate"
for path in html_files:
    html = path.read_text()
    if 'data-measurement-id=' in html:
        assert staging_id and f'data-measurement-id="{staging_id}"' in html, f"Wrong staging ID: {path}"
        assert 'data-analytics-host="staging.johnapaz.com"' in html, f"Wrong analytics host: {path}"
        assert 'data-analytics-environment="staging"' in html, f"Wrong analytics environment: {path}"
    if production_id:
        assert production_id not in html, f"Production ID in staging: {path}"
assert json.loads((root / "build-info.json").read_text())["commit"], "Commit missing"
print(f"Staging checks passed for {len(html_files)} HTML files")
