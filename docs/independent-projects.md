# Projects — implementation and validation

## Decision and ownership
Owner direction November 1, 2026, issues #71–#75: **Projects is a new first-class site section**, not a migration of code, samples, client work or the Work area. Nothing in `_data/portfolio.yml`, `_data/home.yml` or the six homepage tiles is reclassified or removed.

## Routes and sources
- `/independent-projects/` — dedicated landing page with accessible product cards
- `/independent-projects/wrimo/`, `/listening-room/`, `/event-day-companion/`, `/vamo-pr/` — individual case studies, all under the section prefix
- `_data/independent_projects.yml` — curated source of public-safe products, status and statements
- `_layouts/independent-index-v2.html` and `_layouts/independent-detail-v2.html` — reusable presentation
- `assets/css/independent-projects.css` — isolated section styles
- Top navigation, new homepage feature section and search index connect the experiences without modifying professional portfolio data.

## Editorial safeguards
- **WriMo**: working browser draft/backup foundation, future collaboration *not* stated as available. No links to private repos.
- **Listening Room**: public artist browsing; don't promise public playlist release. Retain unofficial/non-affiliation note.
- **Event Day Companion**: schedule/stage guide in development; don't claim map or a released planner.
- **Vamo PR**: portfolio site; do not conflate it with an employer and don't promise its contact form is enabled.
- No invented metrics, endorsements, product screenshots or employer consent. Authentic public desktop captures and qualifications are recorded in [the screenshot evidence](project-screenshots-2026-11-01.md), pending owner review under #73.
- AI-assisted implementation is distinguished from John's ideation, product decisions and review. No AI authorship percentages.

## Pre-release checks
1. Feature branch from current `main` (the old `v2` integration branch lags current production); never merge stale `v2` content into this release.
2. Run standard frozen Jekyll + staging CI and `python3 scripts/check-site.py` on built artifact. Check search index JSON, nav, landing and four detail routes.
3. Confirm all preexisting six home cards, feature list, professional portfolio records, writing, talks, downloads and admin links remain.
4. Check actual mobile/desktop, keyboard tab sequence, focus, contrast, three themes, privacy/noindex staging and no-JS content.
5. Stage **exact PR head SHA** using independent staging repository's documented manual override, verify `build-info.json`, restore prior staging selection. The staging controller is not changed by this feature.
6. Obtain owner editorial review before production promotion. Production PR into main, release tag/notes and issue closeout only after successful deployment and verification.

## Follow-up
- #73: Review the authentic desktop screenshots and complete mobile evidence and Companion availability gaps. See [the inventory](project-screenshot-inventory.json). No false mockups.
- Maintain project status and case study proof points as each independent application evolves.
