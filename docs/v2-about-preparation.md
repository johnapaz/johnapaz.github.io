# About page preparation — October 1, 2026

John authorized starting the queued About work after Writing/Blog. The canonical handoff is issue #36, https://github.com/johnapaz/johnapaz.github.io/issues/36, retrieved directly rather than assuming earlier Nomod notes were complete.

Approved scope: single-column About page on desktop/mobile, arms-crossed hero, canyon palette and shared controls. Cover interests, life before Atlassian, journey to Australia, creative writing, comedy, gardening, and sports emphasizing football and soccer. Provide an isolated preview before integration.

## Source audit started

- Exact supplied repository hero visually confirmed: `assets/images/John-splash-1.png`, 736 × 512 PNG, approximately 636 KiB. John is smiling in a UCF polo, arms crossed, with city and plants behind him. Preserve face and crossed arms rather than using a tight headshot crop. Create responsive WebP assets during About implementation.
- Current `/my-story/` content is a speaking page, not a personal biography. Preserve that content and its incoming links when selecting the About route; avoid overwriting these talks with a new biography. A dedicated `/about/` page with updated navigation/tile is the safer routine implementation choice pending any newer explicit route requirement.
- Current repo verifies speaking at Atlassian Summit 2019 in San Francisco and Atlassian Design Week 2019 in Sydney. The published non-techies essay verifies an English degree, learning Atlassian administration on the job, and leveraging that experience into an offer to move the family to Sydney for Atlassian. Specific years of relocation, pre-Atlassian chronology and personal motivations still need source confirmation before specific narrative claims.
- Existing featured links: “What are you?” and “Pronouncing My Name: You’re (probably) doing it wrong…” are potential personal-story sources. Read them before deriving biography or using excerpts.
- Do not introduce private family, health, financial or relationship details from memory into public copy.

Next: read the personal essays and prior personal bio, compress the verified hero, draft the requested personal sections with no invented chronology, then build and review the single-column page on an isolated About branch. Canonical Jekyll/browser validation remains blocked in this environment (no Ruby; browser download unavailable).

Usage limits: no remaining-allowance or reset-time telemetry is exposed. No cap warning received during this work. Cannot reliably schedule a resume specifically at the unknown reset time; if a warning supplies a reset timestamp, pause, notify John and use that concrete time for continuation.
