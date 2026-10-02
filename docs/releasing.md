# Releases and recovery

Production: `main` → GitHub Pages, root → https://johnapaz.com.
Staging: separate `johnapaz-staging` repo → GitHub Actions Pages → https://staging.johnapaz.com.
Integration: `v2`; branch previews remain selectable through staging-source.txt.

## Before release

1. Build the reviewed source in CI with the inherited Ruby 2.7/Bundler 2.4.22 lockfile.
2. Run `python3 scripts/check-site.py` against the generated output. It validates internal page links, downloads, images/srcset, fragment anchors, launch placement, and metadata.
3. Build with `_config.yml,_config.staging.yml` and run the staging privacy checker. The artifact must contain noindex/no analytics and a build-info.json source revision.
4. Publish the reviewed ref to staging, compare build-info.json to the expected SHA, and review desktop/mobile layouts, menus, filters, search, and article disclosure.
5. Record the previous production SHA and release source SHA. Open a PR into main; merge only after the checks and John’s release authorization.
6. Verify the native production Pages workflow and live site separately. Check canonical URL, social image, robots/sitemap, launch placement, search, navigation, and downloads.

CI is an automated build/link baseline. It does not claim physical-device, full accessibility, external-link, monitoring, or audience analytics verification. External archive links can disappear or block automation; their maintenance is tracked in #19.

## Recover

Revert the production release merge on main, keeping history. Let Pages rebuild, then verify the previous homepage, content routes, downloads, and HTTPS. Do not publish a staging artifact into production: its host, robots, and analytics settings differ.

V1 production rollback reference before V2: `51809fc5f070650bdb8c8d408b09278db1fa5743`.

## Update existing clones after the branch rename

```bash
git fetch origin
git branch -m master main
git branch --set-upstream-to=origin/main main
git remote set-head origin -a
```

Run branch -m only if your local master branch exists. GitHub’s native rename preserves branch URL redirects and retargets open PRs; verify repository settings and Pages after changing it.

## AI disclosure

Article/catalog front matter supports `ai_assistance.level` and `ai_assistance.detail`. The pill opens a keyboard-accessible explanation. Suggested role labels: Editing support, Structural assistance, Substantial drafting. Record actual involvement; do not infer a percentage or retroactively label archival writing without evidence. The V2 launch is substantially AI-drafted from John’s direction and project evidence; human final editorial review is not implied by the badge.
