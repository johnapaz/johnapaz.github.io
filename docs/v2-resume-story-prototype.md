# Résumé story prototype

Status: approved by John on October 1, 2026 and merged into `v2` through PR #40 at `7b04338ababbfae33ed22cf80f223b7f4fa0811f`. John then requested a properly weighted Education section with UCF branding. `/resume/` remains the canonical path. The hero, capability blocks, sample cards, navigation and existing desktop layout are preserved.

## User direction

Deepen the current résumé section so a hiring reader can recognize the problems John solved, industries, departments and technologies at a glance. Keep the existing desktop spacing and site design language, adapt purposefully on mobile, and make filtered views shareable by URL. Prototype before committing to v2.

## Proposed design

- The existing 1:2 job-identity/contribution columns, 2rem gap, 1.25rem row padding, shell and gutters remain unchanged. Extra context increases row content height rather than shrinking type or squeezing the existing columns.
- Each row combines one proof statement, a short contribution summary, warm filled work-type badges, and softer technology badges. Industry and team context use labeled icons beside the job identity. Logos identify Airbnb and Atlassian; letter marks identify companies without supplied brand assets.
- Badges are interactive filters with explicit accessible names, focus treatment and pressed states. Visible text carries their meaning; icons and color supplement it.
- Chronology remains the default, showing the same six recent roles. Three earlier examples are expandable: PatientPoint, Pentaho and EA Tiburon. Active filters and grouping consider all nine selected roles, so relevant earlier experience can surface.
- Group by primary work type or industry, with newest-to-oldest roles within each group. Work type filters match all listed work types, not only the primary group label.
- Four single-select facets combine with AND: work type, industry, team and technology. The filter panel starts collapsed. Grouping and filter state persist in the URL; browser Back/Forward restore them. Copy view link points directly to the experience section. If clipboard access fails, a selectable URL is provided.
- On mobile the existing stacked layout becomes a subtle timeline; controls wrap predictably, four filters become a 2x2 grid, and deeper work details remain expandable. There is no horizontal carousel hiding résumé content.
- The résumé remains readable without JavaScript. Enhancement controls are hidden and badge buttons disabled until initialization succeeds.

## Content evidence and editorial boundaries

Primary sources read for this work:

1. `John_Paz_Developer_API_Technical_Writer_resume_09292026.pdf` (the existing downloadable résumé).
2. `Profile.pdf`, the LinkedIn export saved September 8, 2026 (including RQI, Airbnb, Menlo, Atlassian, PatientPoint, Pentaho and EA).
3. `John_Paz_API_Technical_Writer_work-samples_09152026_Bloomberg.docx`. Its Airbnb section contains copied Bitbucket material, so that section was not used to support new Airbnb claims.

Live LinkedIn retrieval returned HTTP 999, so this prototype uses the saved export. New summaries are AI editorial drafts derived from those sources. The supported quantities are 200+ wiki users across two countries at PatientPoint, 250+ wiki pages at EA, and more than 10 external presentations at Atlassian. The department labels describe documented team/function context; they do not assert formal organizational names except where the source gives one. No guessed business impact percentages, hiring outcomes or financial metrics were added.

The six recent employment dates and sequence are preserved. Earlier jobs are selected examples, not a complete chronology; full résumé downloads remain available.

## Assets

Locally stored SVG symbols from official source repositories: Simple Icons (Airbnb, Atlassian, Python, Confluence, Jira, Bitbucket, Swagger), and Bootstrap Icons (industry, team, tools, filter, link, work). The symbols inherit the canyon palette. Text labels remain visible. Attribution and upstream URLs are in `career-icon-attribution.md`. No icon CDN or runtime package is required.

## URL contract

Parameters: `view=type|industry` (chronology is implicit), `work`, `industry`, `team`, `tech`, and `earlier=1`. Human-readable facet values use standard URL encoding. Invalid facet or view values are ignored. Unrelated query parameters are retained. Reset clears facets while retaining the chosen grouping. Clicking a badge toggles that facet and exposes the filter panel.

## Validation

Liquid preview rendering, Sass compilation, JavaScript syntax and whitespace checks pass locally. Canonical Jekyll build and deployed UI checks are required before completing review delivery. Local Chromium download was unavailable; use the connected browser for deployed interaction and mobile frame checks.

## Staging review

Select `resume-story-preview` in the staging repository's `staging-source.txt` to retain this preview across scheduled updates. The staging URL is shared across branches. Restore that selection to `v2` after approval/integration or rejection. Production publishing remains separate.


## Education follow-up — October 1, 2026

John requested more appropriate visual weight for his degree and UCF icons. Education is now a separate full-width section with the same heading treatment as Experience, a restrained raised sand panel, the official UCF stacked black mark, University of Central Florida, Class of 2008, Bachelor of Arts in English and Technical Writing Track. Facts match the existing résumé; no additional honors or credentials are inferred. The mark retains its original geometry, black color and clear space. Source: https://www.ucf.edu/brand/logo-and-identity/ and https://www.ucf.edu/wp-content/blogs.dir/34/files/2026/08/UCF-LOGO-Stacked-Alt-SingleBlack-330x280-1.png . The logo is used to identify John's alma mater.

Feature canonical CI and staging build/deploy passed (runs 36957806761 and 36957782584). Deployed desktop checks passed for views, combined facets, badges, empty state, reset, earlier experience, reload, Back and Copy view link. Mobile visual verification remains a physical-device release check. Staging selection has returned to v2.
