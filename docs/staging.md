# Staging workflow — issue #25

Status: prepared; deployment, DNS, and review validation pending.

Source: johnapaz/johnapaz.github.io, branch v2.
Destination: johnapaz/johnapaz-staging, branch gh-pages (generated files only).
URL: https://staging.johnapaz.com.
Production continues using its current publishing branch. Coordinate master → main via #20.

## Initial account setup

1. Create public repository johnapaz-staging and initialize its gh-pages branch with a README.
2. Create an SSH deploy key. Add its public key to staging repository Settings → Deploy keys with write access. Add the private key as STAGING_DEPLOY_KEY in the source repository Actions secrets. Never commit either secret.
3. Set staging Pages publishing to gh-pages / root.
4. Set staging Pages custom domain to staging.johnapaz.com.
5. Add DNS CNAME: staging → johnapaz.github.io. Verify DNS and enable HTTPS once available.
6. Run Deploy staging from the v2 branch. Confirm Actions succeeds, Pages deployment succeeds, and the URL serves the commit in build-info.json.

Use a repository-scoped deploy key; it grants no production repository write access.
Public Pages staging is publicly accessible. noindex is not authentication.
Public repository Actions/Pages usage is subject to GitHub's current limits; verify account quotas.

## Build behavior

The workflow uses the current Jekyll Pages dependency family and safe mode to match Pages.
The inherited lockfile does not match Gemfile. CI resolves dependencies temporarily; a corrected committed lockfile is required before claiming reproducible builds.
Ruby 2.7 is a temporary legacy compatibility choice and should be upgraded with the dependency refresh.
Staging config overrides the site URL and disables analytics. Generated CNAME is staging-only.
All HTML receives noindex through the shared head include; robots.txt discourages crawling.
build-info.json identifies source commit, branch, and run.
Source configuration lives here; the wiki should link this guide and record the decision.

## Review and promotion

Push reviewed changes to v2; Actions publishes the full staging site.
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
