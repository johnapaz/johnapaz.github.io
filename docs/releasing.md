# Releases and recovery

Production: `main` → GitHub Pages, root → https://johnapaz.com.
Staging: separate `johnapaz-staging` repo → GitHub Actions Pages → https://staging.johnapaz.com.
Integration: `v2`; branch previews remain selectable through staging-source.txt.

## Review responsibility — October 21, 2026

John authorized Codex to implement, technically review and merge the infrastructure/dependency fixes in #69 without an additional owner-review step. Continue branches, focused PRs, frozen builds, staging verification, evidence and rollback records. Do not ask John to identify technical corrections in these PRs. Return user-facing design, copy and behavior changes to John when their scope is practical for his review; the authorization does not skip verification or authorize unrelated access/policy changes.

## Small maintenance patches

For a focused cleanup or fix, branch from the latest `main` (for example, `chore/template-cleanup`) and open a PR back to `main`. Keep Mentoring work on `v2.1` separate; this maintenance patch does not retire or repoint existing integration branches.

Classify behavior-preserving cleanup as the next available `v2.0.x` patch, checking existing tags before assigning the release tag. Reserve `v2.1.0` for the Mentoring feature release. Create a release tag only after the approved change ships; the private npm command manifest does not carry the website version.

Use the existing dual-configuration CI and a brief staging smoke review for template/asset removal. In the staging repository, record the current `staging-source.txt` selection before previewing the candidate. Manually dispatch **Publish branch preview to staging** with `source_ref` set to the exact candidate commit; this is a one-run override and scheduled publication returns to the saved selection. Verify `/build-info.json` during review and restore/redeploy the recorded selection afterward if necessary. Do not change the saved selection or merge to production implicitly.

Track the deletion inventory, evidence, and checks in the issue/PR (cleanup: #60). Update the wiki when a lasting architecture or workflow decision changes; routine file removals do not need a duplicate wiki inventory.

## Before release

1. Build the reviewed source in CI with Ruby from `.ruby-version`, Bundler 2.4.22 and frozen installation of the committed lockfile.
2. Run `python3 scripts/check-site.py` against the generated output. It validates internal page links, downloads, images/srcset, fragment anchors, launch placement, and metadata.
3. Build with `_config.yml,_config.staging.yml` and run the staging privacy checker. The artifact must contain noindex, the separate consent-gated staging analytics property, and a build-info.json source revision.
4. Publish the reviewed ref to staging, compare build-info.json to the expected SHA, and review desktop/mobile layouts, menus, filters, search, and article disclosure.
5. Record the previous production SHA and release source SHA. Open a PR into main; merge technical maintenance after Codex review and passing checks under the authorization above; obtain John’s review for user-facing release scope.
6. Verify `/build-info.json` returns the actual release commit at the production origin (not just a passing CI revision). The endpoint uses GitHub Pages metadata; staging retains its own publisher-generated metadata. This is deployed revision evidence, not a deployment timestamp or uptime measurement. Verify the native production Pages workflow and live site separately. Check canonical URL, social image, robots/sitemap, launch placement, search, navigation, and downloads.

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
