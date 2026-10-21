# Analytics setup and maintenance

Owner: John Paz. Work tracked in #32; access-controlled admin in #31.

John approved separate GA4 properties on October 2, 2026:

| Environment | Property | Website | Configuration |
| --- | --- | --- | --- |
| Production | johnapaz.com — Production | https://johnapaz.com | `_config.yml` |
| Staging | johnapaz.com — Staging | https://staging.johnapaz.com | `_config.staging.yml` |

Both dedicated properties were created under Paz Web Development on October 2, 2026. Reporting timezone: New York; currency: USD. Mia's property was not changed.

| Environment | Property ID | Stream ID | Measurement ID |
| --- | --- | --- | --- |
| Production | 557084016 | 15945486786 | G-1ESYN701VR |
| Staging | 557077138 | 15945255148 | G-68CVWTTNZ4 |

Enhanced measurement is off on both streams. User/event retention: 14 months; reset on new activity off. Google Signals: off. IDs are public tag identifiers, not credentials. Live production and staging receipt was verified on October 2; broader event reconciliation remains in #32. Authenticated dashboard reporting was activated October 14 (#62).

## Activation

1. Create the two dedicated GA4 properties and web streams. Use America/New_York reporting timezone, USD, and the exact environment URLs above. Set each `google_analytics` value to its corresponding `G-...` measurement ID.
2. Disable all enhanced measurement before collecting events. This integration explicitly sends reviewed page_view, resume_download, portfolio_click, outbound_click and contact_click events; automatic events can otherwise include unreviewed link/URL/search values or duplicates. GA4 may also generate ordinary session/engagement events.
3. Keep Google Signals and advertising personalization off. Select 14-month event retention if available and document the verified setting here and in privacy.md. Apply no destructive production traffic filters until tested; use staging for developer/QA journeys.
4. Update privacy.md to reflect activation and actual provider settings. No Google scripts or requests before opt-in; no tag at all on local hosts or /admin. The same behavior applies to staging.
5. Run CI and review the consent panel on narrow/mobile/Fold layouts. Validate no requests before consent, Allow begins collection, No thanks/withdrawal stops future events, preference persists, and cross-tab withdrawal works. Browser cookie deletion is best effort within accessible domains.
6. Confirm expected events in staging Realtime and DebugView; verify page_location excludes queries/fragments and contact clicks contain only channel, not address. Verify no production ID appears in staging output. Test production separately after its analytics changes are released.

## Reporting and maintenance

Authenticated aggregate reporting is live through the protected Cloudflare Access/Worker dashboard at admin.johnapaz.com; see `docs/admin-dashboard.md`. The Google Analytics provider link remains a shortcut. Do not embed private reports in public assets or store reporting credentials in this repository. /admin protection and revocable guest sharing require a compatible server-side authentication/routing solution; a static password prompt is insufficient.

The runtime enforces exact HTTPS hostname matching, separate environment labels, and a consent value stored under `johnapaz-analytics-consent-v1`. Missing or invalid configuration/storage fails closed. The privacy page is untracked and links to John for questions.

Source/page review: legacy UA configuration removed on the feature branch. Runtime consent/isolation tests: `node scripts/test-analytics.cjs`. Full Jekyll and link validation run in GitHub Actions because Ruby is unavailable in this workspace. Analytics is not considered operational until both properties and actual event receipt are verified.

Rollback: set the affected environment's google_analytics to null and rebuild. This stops loading the integration for new page loads; it does not delete historic provider data. No other site/property is part of this change.

## Browser exclusion — #66, in review

`johnapaz-analytics-exclude-browser-v1` stores `excluded` or `included` in localStorage for the current origin. It contains no identity. Missing means not excluded; invalid or unreadable storage fails closed. Consent remains separately stored under `johnapaz-analytics-consent-v1`.

An excluded browser never starts the Google tag on a new page load, and manual events require both accepted consent and no exclusion. On exclusion after collection began, the existing stop path sets Google's `ga-disable-<measurement ID>` flag, denies analytics storage, and removes accessible GA cookies. It cannot retract prior requests. Same-origin tabs react to exclusion, consent changes and storage clearing. A failed preference write pauses this page and reports that the change was not saved.

`/analytics-preferences/` explicitly loads the local integration in preferences-only mode. It never collects, even after Undo, and provides a production/staging handoff link. Admin routes and local development remain untracked. The normal consent panel exposes the same exclusion control. Each origin/browser/device needs its own choice; clearing storage/private browsing can remove it.

The first increment deliberately stops future collection rather than filtering historical reports. Existing reports have no owner marker. GA4 custom-dimension scopes are event/user/item, so an event-level exclusion must not be presented as whole-session exclusion. No GA4 custom dimension, IP rule, permanent data filter, or backend report/cache change is needed here. All widgets and comparisons continue to show the collected data without retroactive subtraction.

Sources checked October 21: [Google tag collection opt-out](https://developers.google.com/tag-platform/security/guides/privacy), [GA4 custom dimension scopes](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customDimensions). UI/unit checks are `node scripts/test-analytics.cjs`; live consent/network verification and both environment review are release requirements.
