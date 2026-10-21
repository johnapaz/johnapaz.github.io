# Admin analytics review — October 21, 2026

Implementation: #66, [draft PR #67](https://github.com/johnapaz/johnapaz.github.io/pull/67), `feat/66-exclude-own-traffic` from production `72042e20a8fa5f579793038ac08815719b55b774`. Behavior commit `c1010eb57543d1e38b02e9a289f2660b6bb7f36f`; candidate reviewed for deployment `0370188cd6f37375873e21a37d79300d5a0f52a0` (documentation only after the behavior commit).

## Verified

- Local analytics/exclusion/consent/environment checks and all six backend tests pass. Covered exclusion/Undo, accepted/declined/unset consent, both configured hosts, cross-tab changes, storage clear/read/write failures, an always-untracked management page, and existing payload minimization.
- Protected dashboard asset build, both affected JS syntax checks and whitespace checks pass.
- Source CI [39673997569](https://github.com/johnapaz/johnapaz.github.io/actions/runs/39673997569) and [39674453453](https://github.com/johnapaz/johnapaz.github.io/actions/runs/39674453453) pass production/staging builds and link/privacy/configuration checks. **Limit:** logs from job `119480510201` show dependency re-resolution to rubyzip 2.4.1 from committed 3.4.0. These builds do not establish committed-lockfile compatibility.
- Published wiki Home, Roadmap, Development Workflow, Site Operations, Development Journal, sidebar and [Release Notes](https://github.com/johnapaz/johnapaz.github.io/wiki/Release%E2%80%90Notes) through authenticated GitHub UI. Removed the temporary wiki patch from the feature branch after publication; the wiki history is authoritative.
- Added [#68](https://github.com/johnapaz/johnapaz.github.io/issues/68), an independent protected staging deployment of admin code/assets/backend. Estimate: 6–10 engineering hours, typically 1–2 working days once build/account prerequisites are ready. Existing live Admin already reports staging traffic. This issue creates no infrastructure.

## Historical staging blocker

The manual one-run workflow override requested exact candidate `0370188cd6f37375873e21a37d79300d5a0f52a0` without changing `staging-source.txt`. [Staging run 39675317815](https://github.com/johnapaz/johnapaz-staging/actions/runs/39675317815), build job `119483526092`, failed before deployment. Frozen Bundler installation rejected rubyzip 3.4.0 because it requires Ruby >=3.0 and the publisher uses Ruby 2.7.8. Deployment was skipped. [#69](https://github.com/johnapaz/johnapaz.github.io/issues/69) records the reproduced mismatch, source CI's silent downgrade and the required isolated maintenance fix.

The saved source remained exact `4fd49e45ea77bd59ed82ebb6b539e705a9b6c4de`. Live browser inspection of staging `/build-info.json` after failure returned that same commit and previous successful run `39661763505`. The candidate never replaced the existing site, so no restore deployment was needed.

## Integrated candidate verification

Exact candidate `e7200fce37cfd4a6578bd2eda164a7e9b6324fc7` passed frozen CI [39679233765](https://github.com/johnapaz/johnapaz.github.io/actions/runs/39679233765) and actual staging publication [39679279467](https://github.com/johnapaz/johnapaz-staging/actions/runs/39679279467). Cache-refreshed live build-info matched the exact SHA/run. Local frozen installation and staging output checks passed 32 HTML pages and 957 link/asset/anchor references; analytics/exclusion and six backend tests passed.

Browser checks on staging verified remembered exclusion after reload, no Google script element on excluded ordinary pages, no Google script on the management page even with accepted consent, Undo with declined consent leaving the tag absent, Undo with accepted consent adding it, and Enter-key activation of both controls. This establishes DOM/script-gating behavior, not a captured network trace. Physical-device/narrow-layout review remains unverified. The test browser was left excluded. Saved staging revision `4fd49e45ea77bd59ed82ebb6b539e705a9b6c4de` was then restored in run [39679563070](https://github.com/johnapaz/johnapaz-staging/actions/runs/39679563070); live build-info confirmed the saved SHA and restore run. staging-source.txt was never edited.

Native production Pages [39679088864](https://github.com/johnapaz/johnapaz.github.io/actions/runs/39679088864) and source CI [39679089170](https://github.com/johnapaz/johnapaz.github.io/actions/runs/39679089170) passed for the technical prerequisite; live production build-info confirmed `2f7bb8a13e7f36678014d533b70ed19a4f6c54cc`. This does not publish the exclusion feature.

## Remaining acceptance

The #69 fix is merged through source PR #70 (`2f7bb8a13e7f36678014d533b70ed19a4f6c54cc`) and controller PR #1 (`707eafeeec477b11320670e3e44910fc31dcc2cf`). Frozen source CI 39678613800 and exact-source live staging run 39678798536 passed. Runtime selection, frozen installs and lockfile guards now agree. This branch integrates that prerequisite; rerun its exact-candidate publication and UI/keyboard review. Physical-device and network acceptance must be reported separately. Do not bypass enforcement or downgrade dependencies solely to obtain a green preview.

Pages and private Worker assets release separately. Reconcile the live `johnapaz-github-io` Worker before shipping its dashboard link, preserving runtime bindings, secrets, Access policy and the manual redirect health fix. Record its current version and rollback. The runtime prerequisite is now in production; no exclusion feature, Worker, DNS, access-policy, final tag or GitHub Release change was performed. PR #67 remains draft; #66 remains open.

Proposed site release naming is `v2.0.1 — Cleaner analytics`, with `v2.1.0 — Mentoring` reserved. The recommendation does not create a version tag or imply release completion.
