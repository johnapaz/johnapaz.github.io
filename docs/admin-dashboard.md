# Admin dashboard — issue #31

## Delivered staging review

`/admin` is the minimal branded entry screen. `/admin/preview/` presents **illustrative, synthetic data only on staging**. The production build renders a sign-in link rather than the preview dashboard. Neither Pages build includes `backend/`. No sign-in simulation, access token, reporting secret, or private GA4 report is in public output. The Admin toolbar link and the current navigation/themes are preserved.

The dashboard has Prod/Staging tabs, 7/28/90 completed-day periods with equal previous-period comparisons, a saved 1/2/3 widget-column preference, active users/sessions/page views/engagement rate, daily audience trends, traffic channels, top pages, four manual events, devices, country-level locations, site/deployment evidence and project shortcuts. Every widget includes a short definition. Responsive layouts reduce to two columns below 1020px and one below 650px; requested column preference is restored on a wider screen. Summary metrics remain four/two columns for readability.

**Not live yet:** Authentication, revocable deployed sharing, embedded GA4 reports, deployed/source comparison, deployment timestamps/activity integration, independent site monitoring, GA4 reconciliation and physical Fold6 checks. Keep #31 open. Provider links are shortcuts, not embedded reporting completion.

## Proposed protected hosting

Retain Jekyll/GitHub Pages and the public `/admin` introduction. Host the private dashboard at a separate Cloudflare Worker hostname with Cloudflare Access; after verified deployment, configure `admin_portal_url` to its HTTPS URL. Exact private same-origin `/admin/*` routing requires a DNS/proxy change, which has **not** been made or authorized as a separate infrastructure decision. This subdomain/sign-in handoff avoids migrating the public site or implying GitHub Pages can enforce identity.

`backend/admin/worker.mjs` is prepared, unit tested, and **not deployed**. It rejects requests unless configured Access JWTs pass signature, issuer, audience, expiration and identity checks. `OWNER_EMAIL` and `READ_ONLY_EMAILS` are checked on every request, including cache hits. All operations are GET-only. It authenticates the dashboard HTML/assets as well as `/api/reports`. Static assets use `run_worker_first: true`; `workers_dev` is disabled. Access protection must also cover the configured hostname and any alternate/preview hostname. Do not publish this asset directory through public Pages or a static host.

Cloudflare Access supplies the authentication flow (email PIN or a configured identity provider); no password database or custom client gate is introduced. Adding/removing allowed emails also requires updating the Access policy, but removing an email from the Worker allowlist immediately denies subsequent requests after the environment update deploys, even if an Access session remains valid. The dashboard does not persist reports in browser storage. Sharing is read-only; no guests are configured initially. Configure a short Access session duration and test revocation.

## Account setup required

1. Configure a Cloudflare Worker hostname and Access application, with an owner-only policy initially. Add `ACCESS_TEAM_DOMAIN` (hostname only) and `ACCESS_AUD` (application audience) as runtime configuration. Confirm owner email before live provisioning.
2. Enable the Google Analytics Data API in a Google Cloud project. Create a reporting service account and grant **Viewer** access to only production property `557084016` and staging property `557077138`.
3. Store `GA_CLIENT_EMAIL` and `GA_PRIVATE_KEY` as Worker runtime secrets. Never paste private keys into issues, documentation, code or public build artifacts.
4. From `backend/admin`, run `node --test worker.test.mjs`, `node build.mjs`, then authenticated Wrangler deployment after the hostname/Access configuration is ready. The repository does not include Cloudflare deployment credentials.
5. Validate owner/reader access, logged-out denial for HTML/assets/API, signature tampering, unknown identity and revocation. Verify report totals against both GA4 properties, then set `admin_portal_url` in the site configuration and review staging before promotion.

This account/infrastructure setup is the blocker to a working login and live reports; code preparation alone does not complete it. No paid service has been provisioned.

## Reporting contract and state handling

The server selects from a fixed property map; it never accepts a property ID from browser input. GA4 uses `activeUsers`, `sessions`, `screenPageViews`, `engagementRate`, daily `date`, `sessionDefaultChannelGroup`, `pagePath`, `eventName`, `deviceCategory`, `country`. Event filters: `resume_download`, `portfolio_click`, `outbound_click`, `contact_click`.

Ranges use America/New_York and end yesterday; period comparison uses named date ranges. API batches contain no more than five reports. Summary active users are period-distinct; do not sum daily users to derive this total. Country user counts can overlap; no misleading share-of-total percentages are shown. Missing manual events are labeled Not observed; a failed request does not produce zero totals. Summary empty results are zero only after a successful GA4 response. Sampling, privacy thresholding, `(other)` loss and processing delays are surfaced.

Reports are cached server-side for five minutes, isolated by property environment, range length and end date. On upstream failure a last successful report up to 30 minutes old is explicitly stale; otherwise the dashboard shows unavailable. Cache storage is per edge location. Clicking Refresh requests a fresh UI load but can use that five-minute server cache; the true successful refresh timestamp remains visible. Browser responses are private/no-store. No scheduled reporting job was added.

Availability currently means an HTTPS request to the selected environment’s build-info.json responded; it is explicitly a point-in-time check, not uptime. Missing metadata/network failures show Unknown rather than claiming the site is unavailable. Source comparison, deployment activity and independent monitoring stay disconnected until implemented with evidence. No uptime history is invented.

## Validation

- Five backend tests cover signed owner/read-only access, signature forgery, expiry, issuer/audience checks, revocation, logged-out asset/API denial, read-only methods, invalid periods/environments, year boundary/timezone math, named comparison periods, event mapping and threshold metadata.
- Production/staging safe builds, internal-link checks and output exclusion checks are required before staging publication.
- Live reports, deployed auth behavior and physical Fold6 verification remain pending account setup.

References: [GA4 API setup](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart), [named date ranges](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/DateRange), [Access JWT validation](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/), [Worker-first assets](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/).
