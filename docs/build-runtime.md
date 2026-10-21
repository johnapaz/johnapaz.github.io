# Frozen build runtime — issue #69

## Runtime and dependency contract

Ruby **3.3.9** in `.ruby-version`, Bundler **2.4.22**, Jekyll **3.10.0**, the configured GitHub metadata plugin and GFM parser. The manifest constrains rubyzip to patched **3.4.x**; the committed resolution is **3.4.1**. Source CI and staging use `BUNDLE_FROZEN=true` and reject a changed Gemfile.lock after installation.

The obsolete `github-pages` 204 bootstrap pinned Jekyll 3.8.5. Moving that bootstrap to 232 conflicts with patched rubyzip because its unused remote-theme helper requires ZIP <3. The site config uses only jekyll-github-metadata, with local templates and assets and no remote_theme. Use explicit build gems matching GitHub Pages' Jekyll 3.10 family instead of importing the unused plugin bundle. Pages hosting, public routes, site content and private Worker remain unchanged by this maintenance.

Primary sources checked October 21, 2026: [Pages dependency family](https://pages.github.com/versions/), [rubyzip advisory: fixed in 3.4.0](https://github.com/advisories/GHSA-47m2-wp7j-p9vc), [Pages bootstrap dependencies](https://github.com/github/pages-gem/blob/v232/lib/github-pages/dependencies.rb). Do not weaken the ZIP constraint or unfreeze CI to make a deployment pass.

## Staging controller

The separate controller reads `.ruby-version` from the exact selected source revision and validates a numeric version before passing it to ruby/setup-ruby. Sources predating the file retain the prior Ruby 2.7 fallback to preserve saved-preview restoration. Both paths enforce frozen installation. PR checks build but do not deploy. Manual workflow dispatch on a controller feature branch can preview an exact source SHA; record and restore the saved selection without editing staging-source.txt.

## Local verification

Both safe site configurations build; staging privacy/isolation and generated links/assets/anchors pass (31 HTML pages, 925 staging and 923 production references). Local analytics tests, all six protected backend tests and protected asset generation pass. A frozen reinstall leaves the lockfile byte-identical; a temporary Gemfile with an additional dependency is rejected in frozen mode. Local generated assets remain ignored and are not deployed by these tests. GitHub CI and exact-SHA live staging review must be recorded in the PR before technical merge.

## Review authorization

John explicitly delegated technical review and merge for this infrastructure work on October 21. Continue scoped branches, PRs, passing checks, live staging evidence, documentation and recovery. Do not request an extra owner review of technical corrections. Return user-facing design/copy/behavior changes to John's review when their scope is practical. This does not grant unrelated access/policy changes.

## Recovery

Record source production SHA and staging-controller SHA before merge. Revert the respective maintenance merge to restore its prior tracked files; coordinate both repos rather than mixing an old runtime with a new lockfile. The saved staging source remains unchanged. Restore that exact saved SHA after temporary preview and verify live build-info. Private admin Worker configuration/assets are outside this fix.
