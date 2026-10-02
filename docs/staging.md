# Staging workflow — issue #25

Status — October 2, 2026: V2 is live. Staging build/deployment, DNS, valid HTTPS, and desktop browser interactions are verified; Enforce HTTPS is enabled. Physical-device/full accessibility review and a rollback rehearsal remain separate follow-ups.

Source: johnapaz/johnapaz.github.io, selected branch or commit (default `v2`).
Destination: johnapaz/johnapaz-staging, main holds the deployment workflow; generated files are uploaded as a Pages artifact.
Custom preview hostname: https://staging.johnapaz.com.
Production publishes main/root after the native master → main rename (#20).

## Account setup and deployment

Public staging repository created. Pages source: GitHub Actions.
Custom domain saved: staging.johnapaz.com. DNS recognition and HTTPS are verified; Enforce HTTPS is enabled.
No deploy key or repository secret is needed: staging Actions reads the public v2 branch and uses its own temporary GITHUB_TOKEN/OIDC to publish only staging Pages.
The workflow runs on changes to staging main, manually from Actions, and every 30 minutes (GitHub schedules may be delayed). `staging-source.txt` on staging main holds the persistent source branch or commit. Set it to a feature branch to keep that branch deployed across scheduled updates and subsequent source pushes/merges. Change it back to `v2` to return to the integration preview.

Manual **Publish branch preview to staging** runs accept an optional `source_ref` branch or commit. Leaving it blank uses the saved selection. An override publishes that run only; the next scheduled run returns to the saved selection. Use the saved selection for ongoing branch review.

Source pushes to `main`, `v2`, `launch-v2`, or branches ending in `-preview`, plus PRs into main/v2, run both production and staging validation. Cross-repository publication reads source on schedule; it is not an immediate source-push trigger. A manual staging run gives immediate review without a cross-repository access secret. Changing `staging-source.txt` also triggers publication. Each deployment records its real selected source and exact commit in `/build-info.json`. All preview branches share one staging URL, so selecting one replaces the previously shown preview.
The previously created gh-pages branch is unused.

Required DNS: CNAME staging → johnapaz.github.io.
Pages DNS check succeeded and Enforce HTTPS is checked; verify these signals again after domain changes.
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

## V2 launch verification — October 2, 2026

Source CI 36997434841 passed both production and staging configurations. Local output checks passed 28 HTML pages and 705 internal links/assets/fragments; staging privacy checks passed. Live desktop launch/disclosure/search and production download interactions passed. Staging deployment 36999409606 returned to v2 after the reviewed candidate. Native production deployment 36998885890 succeeded following PR #44. See [V2 launch](https://github.com/johnapaz/johnapaz.github.io/wiki/V2-Launch).

## Historical setup verification record

Successful build and Pages deployment: https://github.com/johnapaz/johnapaz-staging/actions/runs/36763836078 (attempt 2), source commit 6c36bb3e1c886f9b04b8662162df8e9d1ca1d6f7.
The staging checker passed for 21 generated HTML pages, including noindex/analytics assertions. build-info.json records the source branch, commit, and workflow run.

Source v2/preview pushes run build validation. The staging repository publishes the selected public source branch manually or on its 30-minute schedule. Staging does not change production DNS, branch, or publishing configuration.

## Review and promotion

After HTTPS is valid, review the deployed site for links, redirects, canonical URLs, images, navigation, downloads, responsive layouts, and keyboard accessibility. Compare production behavior.
Internal generated-page/link/asset/fragment checks run before deployment. External-link maintenance and fuller #19 coverage remain follow-up work; broader CI/release policy remains #21.
Before promotion, freeze v2 updates, record the reviewed commit and current production SHA, and open a PR from v2 to main.
Any changes after review require another staging review. Merge only after John approves.
Verify the production Pages build and live site after merge.

## Recovery

For staging, revert the bad source commit on v2 and rerun; preserve the known-good artifact.
For production, revert the release merge on the production branch and verify Pages rebuilds.
Do not deploy a staging artifact to production: its URLs and analytics settings differ.
Validate rollback on staging before accepting #25.

## Validation remaining

- [x] GitHub Pages recognizes DNS and serves valid HTTPS; Enforce HTTPS is enabled.
- [ ] Complete physical Fold6/mobile and full accessibility review beyond the verified desktop interactions.
- [ ] Safely rehearse promotion and rollback before v2 promotion.
