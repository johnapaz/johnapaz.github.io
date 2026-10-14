# Admin dashboard — issue #31

## Delivered staging review

`/admin` is the minimal branded entry screen. `/admin/preview/` presents **illustrative, synthetic data only on staging**. The production build renders a sign-in link rather than the preview dashboard. Neither Pages build includes `backend/`. No sign-in simulation, access token, reporting secret, or private GA4 report is in public output. The Admin toolbar link and the current navigation/themes are preserved.

The dashboard has Prod/Staging tabs, 7/28/90 completed-day periods with equal previous-period comparisons, a saved 1/2/3 widget-column preference, active users/sessions/page views/engagement rate, daily audience trends, traffic channels, top pages, four manual events, devices, country-level locations, site/deployment evidence and project shortcuts. Every widget includes a short definition. Responsive layouts reduce to two columns below 1020px and one below 650px; requested column preference is restored on a wider screen. Summary metrics remain four/two columns for readability.

**Activation update — October 14, 2026:** John verified fresh authenticated GA4 reports for both properties at `admin.johnapaz.com`. The Cloudflare AI handoff records the production service as `johnapaz-github-io`, with the owner-only Access app “John Paz Admin”, team domain `johnapaz.cloudflareaccess.com`, a six-hour session, and no readers. The final health-fix handoff records clean script version `96766419-1086-4f18-9e58-766009b72638` deployed at 2026-10-14T21:33:06Z, preserving bindings and assets. This is handoff evidence, not an independent deployment audit. The exact cause/fix of the earlier 503 was not captured.

The public sign-in link is configured to `https://admin.johnapaz.com/` in this candidate. A logged-out browser reaches the named Access sign-in screen. Command-line requests received Cloudflare error 1010, so those are not evidence of Worker authorization behavior. Full authenticated UI, protected asset/API denial, unknown identity and revocation tests remain outstanding.

**Still pending:** Production health verification after metadata release, revocable sharing, deployed/source comparison, deployment timestamps/activity integration, independent monitoring, GA4 reconciliation and physical Fold6 checks. Keep #31 open.

## Protected hosting

Retain Jekyll/GitHub Pages and the public `/admin` introduction. The private dashboard is hosted at `admin.johnapaz.com` with Cloudflare Access; `admin_portal_url` selects that HTTPS destination. Exact private same-origin `/admin/*` routing requires a DNS/proxy change, which has **not** been made or authorized as a separate infrastructure decision. This subdomain/sign-in handoff avoids migrating the public site or implying GitHub Pages can enforce identity.

`backend/admin/worker.mjs` is the repository implementation. The live service was provisioned and edited separately through Cloudflare; do not assume the repository and deployed script are byte-identical or overwrite live health-check work without reconciling it. It rejects requests unless configured Access JWTs pass signature, issuer, audience, expiration and identity checks. `OWNER_EMAIL` and `READ_ONLY_EMAILS` are checked on every request, including cache hits. All operations are GET-only. It authenticates the dashboard HTML/assets as well as `/api/reports`. Static assets use `run_worker_first: true`; `workers_dev` is disabled. Access protection must also cover the configured hostname and any alternate/preview hostname. Do not publish this asset directory through public Pages or a static host.

Cloudflare Access supplies the authentication flow (email PIN or a configured identity provider); no password database or custom client gate is introduced. Adding/removing allowed emails also requires updating the Access policy, but removing an email from the Worker allowlist immediately denies subsequent requests after the environment update deploys, even if an Access session remains valid. The dashboard does not persist reports in browser storage. Sharing is read-only; no guests are configured initially. Configure a short Access session duration and test revocation.

## Recovery and deployment configuration

1. Configure a Cloudflare Worker hostname and Access application, with an owner-only policy initially. Add `ACCESS_TEAM_DOMAIN` (hostname only) and `ACCESS_AUD` (application audience) as runtime configuration. Confirm owner email before live provisioning.
2. Enable the Google Analytics Data API in a Google Cloud project. Create a reporting service account and grant **Viewer** access to only production property `557084016` and staging property `557077138`.
3. Store `GA_CLIENT_EMAIL` and `GA_PRIVATE_KEY` as Worker runtime secrets. Never paste private keys into issues, documentation, code or public build artifacts.
4. From `backend/admin`, run `node --test worker.test.mjs`, `node build.mjs`, then authenticated Wrangler deployment after the hostname/Access configuration is ready. The repository does not include Cloudflare deployment credentials.
5. Validate owner/reader access, logged-out denial for HTML/assets/API, signature tampering, unknown identity and revocation. Verify report totals against both GA4 properties, then set `admin_portal_url` in the site configuration and review staging before promotion.

The handoff confirms all six configuration names plus `ASSETS` are present. `ACCESS_TEAM_DOMAIN`, `ACCESS_AUD`, `GA_CLIENT_EMAIL` and `GA_PRIVATE_KEY` are secret bindings; owner/readers are plain configuration. Do not put secret values in this document. Observability was enabled with 100% sampling and persistence during diagnosis; temporary report-error logging was removed.

The checked-in Wrangler name `johnapaz-admin` is the original proposed name, while the existing live service is `johnapaz-github-io`. Before any Wrangler deployment, explicitly target and review the existing service, routes, bindings and asset settings; avoid creating a second Worker or replacing runtime configuration. Keep manual Cloudflare changes coordinated with repository work.

## Reporting contract and state handling

The server selects from a fixed property map; it never accepts a property ID from browser input. GA4 uses `activeUsers`, `sessions`, `screenPageViews`, `engagementRate`, daily `date`, `sessionDefaultChannelGroup`, `pagePath`, `eventName`, `deviceCategory`, `country`. Event filters: `resume_download`, `portfolio_click`, `outbound_click`, `contact_click`.

Ranges use America/New_York and end yesterday; period comparison uses named date ranges. API batches contain no more than five reports. Summary active users are period-distinct; do not sum daily users to derive this total. Country user counts can overlap; no misleading share-of-total percentages are shown. Missing manual events are labeled Not observed; a failed request does not produce zero totals. Summary empty results are zero only after a successful GA4 response. Sampling, privacy thresholding, `(other)` loss and processing delays are surfaced.

Reports are cached server-side for five minutes, isolated by property environment, range length and end date. On upstream failure a last successful report up to 30 minutes old is explicitly stale; otherwise the dashboard shows unavailable. Cache storage is per edge location. Clicking Refresh requests a fresh UI load but can use that five-minute server cache; the true successful refresh timestamp remains visible. Browser responses are private/no-store. No scheduled reporting job was added.

Availability currently means an HTTPS request to the selected environment’s build-info.json responded; it is explicitly a point-in-time check, not uptime. Missing metadata/network failures show Unknown rather than claiming the site is unavailable. Source comparison, deployment activity and independent monitoring stay disconnected until implemented with evidence. No uptime history is invented.

## Validation

- Backend tests cover signed owner/read-only access, signature forgery, expiry, issuer/audience checks, revocation, logged-out asset/API denial, read-only methods, invalid periods/environments, year boundary/timezone math, named comparison periods, event mapping and threshold metadata.
- Production/staging safe builds, internal-link checks and output exclusion checks are required before staging publication.
- John supplied successful fresh 7-day production/staging API responses on October 14. This verifies reporting access, not GA4 UI reconciliation or all periods.
- `/build-info.json` returned 404 on production and valid JSON without redirection on staging during direct checks. This candidate adds a production Jekyll metadata endpoint using `site.github.build_revision`, supplied by `jekyll-github-metadata`. Staging publication retains its existing generated branch/commit/run metadata. CI checks the production revision, environment and origin.
- Cloudflare AI's authenticated health-fix handoff reports runtime logs for both environments: `TypeError: Invalid redirect value, must be one of "follow" or "manual"`. The unsupported `redirect: "error"` failed before networking. The live script was changed to `redirect: "manual"`; the repository now preserves that fix. Non-OK responses, including redirects, remain Unknown without following another environment's metadata. A regression test models the runtime restriction and checks success, redirects, 404, invalid JSON and network failure for both environments.
- The complete health-fix handoff records user-authenticated fresh reports after the fix: staging is Operational with commit `4fd49e45ea77bd59ed82ebb6b539e705a9b6c4de`; production is Unknown with “Build metadata unavailable”, consistent with its current 404. Cloudflare API inspection reportedly verified manual mode, all temporary diagnostics removed, and unchanged analytics/auth/bindings. These are supplied verification results, not independently repeated authenticated tests. Verify production health and actual release revision after this PR ships. The earlier analytics 503 cause remains unconfirmed.
- Full deployed authorization/UI, GA4 reconciliation and physical Fold6 verification remain pending.

References: [GA4 API setup](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart), [named date ranges](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/DateRange), [Access JWT validation](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/), [Worker-first assets](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/).
