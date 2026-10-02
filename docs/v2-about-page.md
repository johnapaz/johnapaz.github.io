# About page — October 1, 2026

Issue #36. John authorized implementation, wiki updates, integration of recent page branches into v2, and live staging verification.

## Implementation

- Preserve `/about/` through `content/about/index.md` using the dedicated `about-v2` layout. Remove the competing root `about.markdown` theme stub; two files previously declared this permalink.
- Single column on desktop and mobile: introduction, full photograph, readable narrative, modest contact footer. Ordinary page scroll; no sidebars or card grid.
- Visually confirmed arms-crossed source `assets/images/John-splash-1.png` (736 × 512); responsive WebP exports at 480 and 736 pixels. Keep original source. Image has intrinsic dimensions, descriptive alt text and high fetch priority; no face/arm crop.
- Cover interests, pre-Atlassian life, Sydney/Australia, creative writing, comedy, gardening, and football/soccer. Copy is an editorial draft for John's review; do not invent relocation dates or particular gardening achievements.
- Biography source: John's January 8, 2019 essay, https://medium.com/johnapaz/tech-companies-should-more-hire-non-techies-and-techies-should-start-looking-for-jobs-in-politics-1c3c4245face. It confirms Florida/English background, healthcare/government work, blue-collar experience, voluntary Jira/Confluence administration and the offer to move his family to Sydney. Those sections paraphrase less than 200 words from the source. Current requested interests and John's sports/comedy discussions inform the remaining draft; no private family/health/financial details are included.
- Primary About link and About Me homepage tile now point to `/about/`. `/my-story/` retains its existing speaking material and featured-talk link.
- Existing shared controls/downloads remain intact. Toolbar redesign is a subsequent workstream.

## Integration audit

The landing-screen branch `925f4d2` is already an ancestor of v2 through merge `bff4688`. Writing/Blog and the approved Work source were integrated by `dfcc846`. The original Work branch `fc60f9b` remained divergent only because its source had been ported rather than merged. Its page/data/style files match v2; the only navigation difference points Writing to the older homepage fragment. Reconcile its ancestry while preserving v2's `/writing/` link. Old Ver2/docu experiments and Dependabot are outside recent approved page work.

## Validation

Local whitespace and source checks completed. Canonical safe Jekyll CI, actual staging publication, live build-info revision, browser layout, images, and navigation must pass before declaring completion. No local Ruby runtime is available. Physical Fold6 checks remain distinct from browser evidence.

## Next course

1. Proper site-wide search (#26), following About integration. Index eligible public articles/guides, blog, About and Work; return meaningful results and exclude drafts/generated duplicates.
2. Toolbar design dive preserving the functionality John likes: navigation, current-page indication, downloads and their metadata, keyboard/touch access. Explore visual hierarchy, alignment, control density, spacing, corners and mobile/Fold behavior with reviewable options.
3. Final content/link/accessibility/responsive audit and a reviewed staging revision before a separate production promotion.
