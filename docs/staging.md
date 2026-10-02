# Staging workflow — issue #25

Status: workflow setup, build, and Pages deployment verified; custom-domain HTTPS and browser review remain pending.

Source: johnapaz/johnapaz.github.io, selected branch or commit (default `v2`).
Destination: johnapaz/johnapaz-staging, main holds the deployment workflow; generated files are uploaded as a Pages artifact.
Custom preview hostname: staging.johnapaz.com (HTTPS is not ready until the GitHub Pages certificate is active).
Production continues using its current publishing branch. Coordinate master → main via #20.

## Account setup and deployment

Public staging repository created. Pages source: GitHub Actions.
Custom domain saved: staging.johnapaz.com. DNS recognition and HTTPS certificate are pending under #28.
No deploy key or repository secret is needed: staging Actions reads the public v2 branch and uses its own temporary GITHUB_TOKEN/OIDC to publish only staging Pages.
The workflow runs on changes to staging main, manually from Actions, and every 30 minutes (GitHub schedules may be delayed). `staging-source.txt` on staging main holds the persistent source branch or commit. Set it to a feature branch to keep that branch deployed across scheduled updates and subsequent source pushes/merges. Change it back to `v2` to return to the integration preview.

Manual **Publish branch preview to staging** runs accept an optional `source_ref` branch or commit. Leaving it blank uses the saved selection. An override publishes that run only; the next scheduled run returns to the saved selection. Use the saved selection for ongoing branch review.

Source pushes to `v2` or branches ending in `-preview` run validation. Cross-repository publication reads source on schedule; it is not an immediate source-push trigger. A manual staging run gives immediate review without a cross-repository access secret. Changing `staging-source.txt` also triggers publication. Each deployment records its real selected source and exact commit in `/build-info.json`. All preview branches share one staging URL, so selecting one replaces the previously shown preview.
The previously created gh-pages branch is unused.

Required DNS: CNAME staging → johnapaz.github.io.
After DNS resolves, verify the Pages certificate and enable Enforce HTTPS.
Public Pages staging is publicly accessible. noindex is not authentication.
Public repository Actions/Pages usage is subject to GitHub's current limits.

## Build behavior

The workflow uses the current Jekyll Pages dependency family and safe mode to match Pages.
The theme's obsolete development dependencies were removed, Gemfile was aligned with the inherited Pages 204 dependency family, and the lockfile was retained with Bundler 2.4.22.
Ruby 2.7 is a temporary legacy compatibility choice and should be upgraded with the dependency refresh.
Staging config overrides the site URL and disables analytics. Generated CNAME is staging-only.
All HTML receives noindex through the shared head include; robots.txt discourages crawling.
build-info.json identifies source commit, branch, and run.
The source configuration and executable build checks live here. The Development-Workflow wiki page records the workflow decision and links to this guide.

## Verification record

Successful build and Pages deployment: https://github.com/johnapaz/johnapaz-staging/actions/runs/36763836078 (attempt 2), source commit 6c36bb3e1c886f9b04b8662162df8e9d1ca1d6f7.
The staging checker passed for 21 generated HTML pages, including noindex/analytics assertions. build-info.json records the source branch, commit, and workflow run.

Source v2/preview pushes run build validation. The staging repository publishes the selected public source branch manually or on its 30-minute schedule. Staging does not change production DNS, branch, or publishing configuration.

## Review and promotion

After HTTPS is valid, review the deployed site for links, redirects, canonical URLs, images, navigation, downloads, responsive layouts, and keyboard accessibility. Compare production behavior.
Automated comprehensive link checking remains #19; broader CI/release policy remains #21.
Before promotion, freeze v2 updates, record the reviewed commit and current production SHA, and open a PR from v2 to the current production branch.
Any changes after review require another staging review. Merge only after John approves.
Verify the production Pages build and live site after merge.

## Recovery

For staging, revert the bad source commit on v2 and rerun; preserve the known-good artifact.
For production, revert the release merge on the production branch and verify Pages rebuilds.
Do not deploy a staging artifact to production: its URLs and analytics settings differ.
Validate rollback on staging before accepting #25.

## Validation remaining

- [ ] GitHub Pages recognizes DNS and provisions a valid certificate; enable Enforce HTTPS (#28).
- [ ] Complete a browser-level review of the staging site, including links/assets/navigation/downloads, responsive layout, and accessibility.
- [ ] Safely rehearse promotion and rollback before v2 promotion.
