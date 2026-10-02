# Branch audit — October 2, 2026

Audited all 20 branches present before v2.1 creation against staging source `4fd49e4`. Production promotion uses the full staging revision, not the narrower draft #51.

| Branch | Head | Result |
| --- | --- | --- |
| `Ver2` | `2aef8dd` | Included in staging; eligible for retirement after production verification |
| `about-page-preview` | `0a67332` | Included in staging; eligible for retirement after production verification |
| `admin-analytics-kickoff` | `ad9fe04` | Included in staging; eligible for retirement after production verification |
| `admin-dashboard-preview` | `d2065ff` | Included in staging; eligible for retirement after production verification |
| `analytics-nav-preview` | `89afa39` | Superseded analytics preview; retain until documented retirement |
| `analytics-production` | `1dc9a0f` | Included in staging; eligible for retirement after production verification |
| `coding-projects-media-preview` | `195b1c6` | Included in staging; eligible for retirement after production verification |
| `dark-darker-preview` | `7f30fbd` | Included in staging; eligible for retirement after production verification |
| `dependabot/npm_and_yarn/picomatch-2.3.2` | `058e56b` | Open dependency PR #17; review separately, do not blindly merge legacy lockfile |
| `docu` | `aadefc2` | Included in staging; eligible for retirement after production verification |
| `final-polish-preview` | `7b3e3e2` | Included in staging; eligible for retirement after production verification |
| `landing-screen-tiles` | `925f4d2` | Included in staging; eligible for retirement after production verification |
| `launch-v2` | `6fee17e` | Included in staging; eligible for retirement after production verification |
| `mobile-nav-overlay-preview` | `287d2cf` | Included in staging; eligible for retirement after production verification |
| `professional-overview-preview` | `fc60f9b` | Included in staging; eligible for retirement after production verification |
| `resume-story-preview` | `f645c66` | Included in staging; eligible for retirement after production verification |
| `shared-tile-hover-preview` | `1daca72` | Identical staging tree; squash-history duplicate, eligible for retirement |
| `toolbar-centered-preview` | `484c196` | Included in staging; eligible for retirement after production verification |

No unique feature work was discarded. Shared hover branch has exactly the same tree as staging despite three unsquashed commits. Analytics preview differs in older styling/configuration and is superseded by integrated analytics, consent and backend work. Branch deletion is deferred; the connector does not expose branch deletion. Git history and rollback references remain intact.

Dependency #17 includes substantial legacy lockfile churn beyond picomatch; modernization and dependency validation should be handled independently of this production promotion.
