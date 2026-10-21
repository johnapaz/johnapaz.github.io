# Releases and recovery

Production: `main` → GitHub Pages, root → https://johnapaz.com.
Staging: separate `johnapaz-staging` repo → GitHub Actions Pages → https://staging.johnapaz.com.
Integration: `v2`; branch previews remain selectable through staging-source.txt.

## Review responsibility — October 21, 2026

John authorized Codex to implement, technically review and merge the infrastructure/dependency fixes in #69 without an additional owner-review step. Continue branches, focused PRs, frozen builds, staging verification, evidence and rollback records. Do not ask John to identify technical corrections in these PRs. Return user-facing design, copy and behavior changes to John when their scope is practical for his review; the authorization does not skip verification or authorize unrelated access/policy changes.

## Small maintenance patches

For a focused cleanup or fix, branch from the latest `main` (for example, `chore/template-cleanup`) and open a PR back to `main`. Keep Mentoring work on `v2.1` separate; this maintenance patch does not retire or repoint existing integration branches.

Recommended site release convention: `vMAJOR.MINOR.PATCH`. Major = redesign/platform-era change; minor = named feature milestone; patch = focused fix, cleanup, or small improvement within that milestone. This is not a package API compatibility guarantee. Use a short GitHub Release title such as **v2.0.1 — Cleaner analytics**. Branches use `feat/<issue>-<short-name>`, `fix/<issue>-<short-name>` or `chore/<short-name>`; this work is `feat/66-exclude-own-traffic` from `main`.

Reserve `v2.1.0 — Mentoring` for the existing feature milestone. #66 proposes the next available `v2.0.x`, currently `v2.0.1`; recheck tags at release. As of October 21 only the historical `Ver1` tag/release exists. V2 deliveries have no version tags; do not invent historical release dates or silently retag them. The private npm command manifest stays unversioned.

Keep a short `CHANGELOG.md` with an **Unreleased** section. Use Added/Changed/Fixed as needed; include user-visible behavior, limitations, issue/PR links and any separate service deployment. A branch or PR is not a release. Optional candidate tags use `v2.0.1-rc.1`; a candidate must be labeled prerelease and must not replace a final tag.

After approved production deployment and live revision verification, move the shipped entries to the selected version/date, create an annotated tag at the deployed production commit, and publish matching GitHub Release notes. Include the previous production SHA, exact release SHA, CI/deployment evidence, rollback procedure, and separate Worker script/asset version when applicable. Never move an existing release tag. After merge and release, remove the feature branch once no session or saved staging selection uses it; preserve `main`, `v2`, `v2.1`, and unique work. See `docs/branch-audit-2026-10-21.md`.

Use the existing dual-configuration CI and a brief staging smoke review for template/asset removal. In the staging repository, record the current `staging-source.txt` selection before previewing the candidate. Manually dispatch **Publish branch preview to staging** with `source_ref` set to the exact candidate commit; this is a one-run override and scheduled publication returns to the saved selection. Verify `/build-info.json` during review and restore/redeploy the recorded selection afterward if necessary. Do not change the saved selection or merge to production implicitly.

Track the deletion inventory, evidence, and checks in the issue/PR (cleanup: #60). Update the wiki when a lasting architecture or workflow decision changes; routine file removals do not need a duplicate wiki inventory.

## Before release

1. Build the reviewed source in CI with Ruby from `.ruby-version`, Bundler 2.4.22 and frozen installation of the committed lockfile.
2. Run `python3 scripts/check-site.py` against the generated output. It validates internal page links, downloads, images/srcset, fragment anchors, launch placement, and metadata.
3. Build with `_config.yml,_config.staging.yml` and run the staging privacy checker. The artifact must contain noindex, the dedicated staging GA4 configuration only, no external Google tag before consent, and a build-info.json source revision.
4. Publish the reviewed ref to staging, compare build-info.json to the expected SHA, and review desktop/mobile layouts, menus, filters, search, and article disclosure.
5. Record the previous production SHA and release source SHA. Open a PR into main; merge technical maintenance after Codex review and passing checks under the authorization above; obtain John’s review for user-facing release scope.
6. Verify `/build-info.json` returns the actual release commit at the production origin (not just a passing CI revision). The endpoint uses GitHub Pages metadata; staging retains its own publisher-generated metadata. This is deployed revision evidence, not a deployment timestamp or uptime measurement. Verify the native production Pages workflow and live site separately. Check canonical URL, social image, robots/sitemap, launch placement, search, navigation, and downloads.

CI is an automated build/link baseline. It does not claim physical-device, full accessibility, external-link, monitoring, or audience analytics verification. External archive links can disappear or block automation; their maintenance is tracked in #19.

## Browser analytics exclusion (#66)

The proposed first increment is collection opt-out, not a historical/session report filter. `/analytics-preferences/` and the consent panel save the browser exclusion separately from consent. An excluded browser makes no new Google tag request on later page loads; an already-loaded tag is disabled. Undo only permits collection if consent was already accepted. The control page itself is never tracked. No owner identity is sent to GA4.

Review both environments and browsers: exclude → ordinary page → reload → no Google requests; undo with accepted vs declined/unset consent; another open tab; blocked storage; keyboard/narrow layout. Verify that earlier reports remain unchanged. Public Admin has a link independent of the private dashboard deployment.

The protected dashboard shortcut is built from `_includes/admin-dashboard.html` and `assets/js/admin-v2.js`. Pages does not deploy it. Reconcile the live `johnapaz-github-io` Worker with source and its current asset manifest before deploying; preserve Access policy, secrets, bindings and the `redirect: 'manual'` health fix. Capture the current Worker version for rollback. If that service is not ready for release, explicitly report the shortcut as pending and keep #66 open. Do not overwrite the service using the proposed Wrangler name. See `docs/admin-dashboard.md`.

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
