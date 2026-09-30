# Staging workflow — issue #25

Status: prepared; deployment, DNS, and review validation pending.

Source: johnapaz/johnapaz.github.io, branch v2.
Destination: johnapaz/johnapaz-staging, main holds the deployment workflow; generated files are uploaded as a Pages artifact.
URL: https://staging.johnapaz.com.
Production continues using its current publishing branch. Coordinate master → main via #20.

## Account setup and deployment

Public staging repository created. Pages source: GitHub Actions.
Custom domain saved: staging.johnapaz.com. DNS/HTTPS pending.
No deploy key or repository secret is needed: staging Actions reads the public v2
branch and uses its own temporary GITHUB_TOKEN/OIDC to publish only staging Pages.
The workflow runs on changes to staging main, manually from Actions, and every
30 minutes (GitHub schedules may be delayed). Source v2 pushes run build checks
but do not instantly publish staging. Use the staging manual run for immediate review.
The previously created gh-pages branch is unused.

Required DNS: CNAME staging → johnapaz.github.io.
After DNS resolves, verify the Pages certificate and enable Enforce HTTPS.
Public Pages staging is publicly accessible. noindex is not authentication.
Public repository Actions/Pages usage is subject to GitHub's current limits.

## Build behavior

The workflow uses the current Jekyll Pages dependency family and safe mode to match Pages.
The theme's obsolete development dependencies were removed, Gemfile was aligned with the inherited Pages 204 dependency family, and the lockfile was retained with Bundler 2.4.22. Verify a successful CI build before claiming build validation.
Ruby 2.7 is a temporary legacy compatibility choice and should be upgraded with the dependency refresh.
Staging config overrides the site URL and disables analytics. Generated CNAME is staging-only.
All HTML receives noindex through the shared head include; robots.txt discourages crawling.
build-info.json identifies source commit, branch, and run.
Source configuration lives here; the wiki should link this guide and record the decision.

## Review and promotion

Push changes to v2; source Actions validates the build. Run the staging workflow manually or wait for the scheduled refresh to publish.
John approves the exact source commit shown in build-info.json.
Review responsive layouts, keyboard navigation/accessibility, internal links, redirects,
canonical URLs, images, navigation, and downloads. Compare production behavior.
Automated comprehensive link checking remains #19; broader CI/release policy remains #21.
Before promotion, freeze v2 updates, record the reviewed commit and current production SHA,
and open a PR from v2 to the current production branch.
Any changes after review require another staging review. Merge only after John approves.
Verify the production Pages build and live site after merge.

## Recovery

For staging, revert the bad source commit on v2 and rerun; preserve the known-good artifact.
For production, revert the release merge on the production branch and verify Pages rebuilds.
Do not deploy a staging artifact to production: its URLs and analytics settings differ.
Validate rollback on staging before accepting #25.

## Validation record

Pending: dependency resolution/build, isolated live change, DNS/HTTPS,
local links/downloads, analytics/noindex verification, promotion and rollback rehearsal.
Do not close #25 until these checks are complete.
