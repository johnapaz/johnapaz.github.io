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

Enhanced measurement is off on both streams. User/event retention: 14 months; reset on new activity off. Google Signals: off. IDs are public tag identifiers, not credentials. Live receipt is pending release validation.

## Activation

1. Create the two dedicated GA4 properties and web streams. Use America/New_York reporting timezone, USD, and the exact environment URLs above. Set each `google_analytics` value to its corresponding `G-...` measurement ID.
2. Disable all enhanced measurement before collecting events. This integration explicitly sends reviewed page_view, resume_download, portfolio_click, outbound_click and contact_click events; automatic events can otherwise include unreviewed link/URL/search values or duplicates. GA4 may also generate ordinary session/engagement events.
3. Keep Google Signals and advertising personalization off. Select 14-month event retention if available and document the verified setting here and in privacy.md. Apply no destructive production traffic filters until tested; use staging for developer/QA journeys.
4. Update privacy.md to reflect activation and actual provider settings. No Google scripts or requests before opt-in; no tag at all on local hosts or /admin. The same behavior applies to staging.
5. Run CI and review the consent panel on narrow/mobile/Fold layouts. Validate no requests before consent, Allow begins collection, No thanks/withdrawal stops future events, preference persists, and cross-tab withdrawal works. Browser cookie deletion is best effort within accessible domains.
6. Confirm expected events in staging Realtime and DebugView; verify page_location excludes queries/fragments and contact clicks contain only channel, not address. Verify no production ID appears in staging output. Test production separately after its analytics changes are released.

## Reporting and maintenance

Use an authenticated Google Analytics provider link initially. Do not embed private reports in public assets or store reporting credentials in this repository. /admin protection and revocable guest sharing require a compatible server-side authentication/routing solution; a static password prompt is insufficient.

The runtime enforces exact HTTPS hostname matching, separate environment labels, and a consent value stored under `johnapaz-analytics-consent-v1`. Missing or invalid configuration/storage fails closed. The privacy page is untracked and links to John for questions.

Source/page review: legacy UA configuration removed on the feature branch. Runtime consent/isolation tests: `node scripts/test-analytics.cjs`. Full Jekyll and link validation run in GitHub Actions because Ruby is unavailable in this workspace. Analytics is not considered operational until both properties and actual event receipt are verified.

Rollback: set the affected environment's google_analytics to null and rebuild. This stops loading the integration for new page loads; it does not delete historic provider data. No other site/property is part of this change.
