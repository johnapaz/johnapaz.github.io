# Changelog

Changes are grouped by verified delivery. Unreleased entries describe branch work, not live behavior. Version convention and release steps: [docs/releasing.md](docs/releasing.md).

## Unreleased — proposed v2.0.1, Cleaner analytics

### Added

- Browser analytics exclusion with a remembered **Exclude this browser** / **Undo browser exclusion** control, available from analytics preferences and an untracked `/analytics-preferences/` page. Public Admin and the protected dashboard source link to it. [#66](https://github.com/johnapaz/johnapaz.github.io/issues/66).
- Regression coverage for exclusion/undo, consent independence, both hosts, cross-tab changes, storage clearing/failure, and an always-untracked management page.
- A site release naming convention, release-note workflow, and current branch audit.

### Limitations and release work

- Exclusion affects future collection only. Earlier visits remain in reports; this does not identify John's historic sessions or add a report-level filter.
- Set it separately on every browser/device and each environment. Clearing storage or private browsing can remove it. Undo preserves the separate consent decision.
- Pages publication and protected Worker assets are separate deployments. The dashboard shortcut requires reconciling and deploying the existing Worker; preserve runtime configuration and the health fix. Review staging before release.
- The initial staging blocker [#69](https://github.com/johnapaz/johnapaz.github.io/issues/69) has a merged, independently verified runtime fix. This branch includes it; the browser-exclusion candidate still needs its own exact-source live acceptance.
- This version is proposed and untagged. Record the approved release date, exact production SHA, checks, Pages deployment, Worker version/asset status and rollback SHA before publishing a final GitHub Release.

## October 14, 2026 — Initial owner dashboard (unversioned delivery)

- Connected public Admin sign-in to the protected dashboard, live separate production/staging analytics, and production build metadata. Both point-in-time health widgets were verified Operational after release.
- Preserved Cloudflare's supported manual redirect mode in health checks, with regression coverage.
- Delivered in [PR #62](https://github.com/johnapaz/johnapaz.github.io/pull/62), production merge `905bbc30a08b6b3ba53d18552b65fb5bdd87a47d`. Pages run `38642716291` and validation `38642716512` passed. The protected Worker was deployed separately.
- Broader acceptance remains in [#31](https://github.com/johnapaz/johnapaz.github.io/issues/31): access/sharing/revocation verification, GA4 reconciliation, deployment detail, independent monitoring, and device/accessibility checks. Referrals/drilldowns [#64](https://github.com/johnapaz/johnapaz.github.io/issues/64) and the Not John experience [#65](https://github.com/johnapaz/johnapaz.github.io/issues/65) are later enhancements.

## October 2, 2026 — V2 launch (unversioned delivery)

Home, Work, Writing/Blog, About, Coding/Projects, Talks/Media, site-wide search and the launch story went live. [Launch record and evidence](https://github.com/johnapaz/johnapaz.github.io/wiki/V2-Launch).

## Historical release

[Ver1](https://github.com/johnapaz/johnapaz.github.io/releases/tag/Ver1) is preserved as published. The later V2 deliveries above were not tagged; these records do not retroactively create versioned releases.
