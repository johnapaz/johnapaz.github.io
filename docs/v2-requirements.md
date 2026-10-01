Last updated: October 1, 2026.

## Purpose and principles
Share what John knows, document what he makes, and help people find reasons to work with him. Support professional opportunities, useful guides, writing, speaking, and experiments. The site should remain useful outside a job hunt and accommodate interests beyond the tech industry.

Design principles: **Clear, Clean, Clever**. Clarity takes priority. Avoid crowded compositions and confusing navigation. Pages must work independently for people arriving through shared links, including paz.tips.

## Navigation and content
Primary navigation: **Home | Writing | Work | About**. Work is a provisional label.
- Home: a personal introduction and curated paths into the content.
- Writing: articles, practical guides, and project journal entries.
- Work: professional overview/web resume, experience, capabilities, project case studies, and talks/presentation videos.
- About: personal interests, background, and approach, distinct from the professional overview.
- Resume means downloadable versions, not a separate top-level section. Provide clear access throughout the site (#27).
- Search (#26) and contact should be easy to reach.

## Homepage requirements
Reference: https://baleon.netlify.app/
- Persistent top navigation on desktop.
- Persistent left introduction while content on the right scrolls, matching Baleon.
- One normal page scrollbar, without a separate scrolling pane.
- The left introduction shares the main background, with no enclosing panel or divider.
- Spacious square grids on the right. Content selection, grouping, ordering, and final tile details remain open.
- On mobile, the introduction appears above the content and scrolls normally.

### Exact sidebar content
Circular avatar, with two lines to its right:

**John A. Paz**  
**Writer | Speaker | Human**

Large headline: **Curious, Creative, Clever**

Smaller supporting line: **Clear Communication**

Welcome paragraph:
> Welcome to the online home for my projects. Here you can review my work, read my writing, or learn how to do something new. I love hearing from you, get in touch!

Links: Threads, Instagram, LinkedIn, GitHub. Make “get in touch!” a direct contact link. Confirm destinations before implementation. Missing avatar and URLs may use clearly identified prototype placeholders.

Journal-style imagery may be explored later and is not part of the initial commitment.

## Other page directions
- About: Nomod portrait/introduction composition in the supplied screenshot. Demo author/team sections are not requirements.
- Writing: grid and list views, following the supplied presentation.
- Article: simple initial reading layout, following the supplied presentation.
- Work: professional overview, projects, and speaking. Detailed layout remains open.
- Talk pages may include video, a description, event/date, and slides or transcripts when available.
- Supporting pages: search results, contact, and 404 recovery.
- Useful guides should identify scope and when instructions were last reviewed.

## Prototype color direction (September 30, 2026)
Use the canyon-inspired palette for the first homepage prototype. This is an accepted direction to test in context, with final color tokens and usage subject to visual and accessibility review.

| Swatch | Hex | Initial role |
| --- | --- | --- |
| Pale sand | `#F2D8A8` | Light page background |
| Muted taupe | `#92795D` | Secondary surfaces or restrained details |
| Warm stone | `#BEA17F` | Content card or section surfaces |
| Deep espresso | `#2B1605` | Primary text and dark contrast |
| Rust brown | `#754116` | Links and small accents |

Keep the introduction blended into the page background. Check text and interactive contrast, hover/focus states, and mobile readability in the working prototype before settling exact combinations. The palette comes from the supplied canyon image; typography, grid organization, imagery, and the Work label remain open.

## References and open decisions
References: johnapaz-concepts.pptx and supplied Baleon/Nomod screenshots. Baleon defines initial homepage structure and scrolling; Nomod informs About/search; Journal is a possible later image treatment.

Earlier compact homepage concepts were rejected as too busy. Platform/theme, typography, final palette application, final imagery, Work label, homepage grid organization, and content selection are not locked. Assistant-proposed placeholder headlines and grouping are not approved requirements.

## First implementation milestone
**V2 — Responsive homepage prototype**

Establish staging (#25) before v2 implementation. Deliver an isolated responsive homepage preview with the exact introduction, desktop persistence, square grids, navigation, and mobile layout. Review with John before extending to other pages or production launch. No deadline has been specified. This milestone is a prototype, not the full v2 launch.

## Related issues
- [#22 — Version 2 delivery](https://github.com/johnapaz/johnapaz.github.io/issues/22)
- [#23 — Design exploration](https://github.com/johnapaz/johnapaz.github.io/issues/23): homepage direction established; broader work remains.
- [#25 — Staging prerequisite](https://github.com/johnapaz/johnapaz.github.io/issues/25)
- [#26 — Search](https://github.com/johnapaz/johnapaz.github.io/issues/26)
- [#27 — Resume downloads](https://github.com/johnapaz/johnapaz.github.io/issues/27)

The wiki records requirements and decisions for contributors and AI sessions. Executable configuration belongs in the source repository; public project entries explain the choices and lessons.


## Responsive review requirements
Galaxy Z Fold series is a required design/test class, with **Galaxy Z Fold6** the priority. Retain cover-screen and unfolded layouts, portrait/landscape, narrow split-window sizes, and opening/closing viewport transitions in future page reviews. Distinguish CSS viewport simulations from physical-device tests; Samsung Internet and Chrome on a physical Fold6 still need verification.

## First homepage prototype — September 30, 2026
Implemented on `v2` using the existing Jekyll/Editorial foundation, dedicated homepage layout/includes/Sass, exact introduction copy, persistent navigation, square cards, mobile stacking, and professional overview/PDF access. The updated canyon palette direction is applied; final roles, typography, card grouping/order/imagery, and Work label remain provisional. Threads is marked link pending until its profile URL is confirmed. Existing March 2025 downloads remain pending refresh under #27.

Local safe Jekyll build and staging checks passed for 21 HTML pages. Chromium checks passed at 17 viewport sizes, including Fold-series/Fold6 cover and unfolded portrait/landscape simulations; same-page folding/resizing, keyboard skip navigation, 200% text sizing overflow, and local destinations/assets passed. Local Ruby 3.2 needed scratch-only legacy compatibility helpers; unchanged Ruby 2.7 CI remains the canonical dependency check. No physical-device or secure live-preview claim.

[Prototype choices, validation matrix, and screenshots](https://github.com/johnapaz/johnapaz.github.io/blob/v2/docs/v2-homepage-prototype.md). Writing temporarily targets the homepage grid; Work opens the current web overview and About the existing personal story. Review these prototype choices before extending other pages. Production publishing configuration is unchanged; staging HTTPS remains pending under [#28](https://github.com/johnapaz/johnapaz.github.io/issues/28).


## Review refinements and staging publication — September 30, 2026

John requested that “Curious, Creative, Clever” fit on one line, that the desktop name be larger, and that the page use a lighter background without becoming white. The prototype now keeps the C3 heading on one line with responsive sizing, enlarges “John A. Paz” on desktop, and uses pale sand `#F8EBD3` for the page background. This supersedes the earlier stacked headline and darker background treatment; final palette roles remain open for review.

Source commit `f7ae2fb6c56113900570046ece7be61d78d2a8d2` on `v2` was published by [successful staging run 36777555447](https://github.com/johnapaz/johnapaz-staging/actions/runs/36777555447). The live HTTP `build-info.json` independently confirms this commit. The canonical Ruby 2.7 staging build and 21-page staging checks passed. Local responsive checks passed at 17 viewport sizes, including representative Galaxy Z Fold 6 cover, unfolded, landscape, and resize-transition layouts; physical-device verification remains pending.

The current preview is [http://staging.johnapaz.com/](http://staging.johnapaz.com/). HTTPS still fails certificate hostname validation and remains tracked in issue #28. No certificate warning was bypassed. Production publishing configuration is unchanged.


## Compact composition review — September 30, 2026

John requested a compact toolbar without a divider, less space above the body, consistent navigation typography, a more expressive C3 font, a larger Clear Communication line ending near the R in Clever, tightly grouped introduction text, working social icons, and consistent tile title spacing. Threads handle confirmed by John: `john.paz.stories`; link: `https://www.threads.com/@john.paz.stories`. This supersedes the earlier pending-link state.

Implemented in `227162fba514aa6bccba3778e8b049b8a4f5b091` on `v2`: centered primary navigation, reduced toolbar/body padding, Georgia italic C3 headline, closely paired supporting line, condensed welcome/social spacing, bundled social icons and inline Threads @ symbol, equal card text-section heights/padding and reserved title rows. Centering and the specific serif font remain prototype choices for visual review. Card grouping/order and final design tokens remain open.

Safe local Jekyll build and 17 viewport checks passed, including Fold 6 cover/unfolded layouts and resize transitions. Physical device verification remains pending. Staging publication initiated in run [36779508096](https://github.com/johnapaz/johnapaz-staging/actions/runs/36779508096); confirm its result before treating this revision as live. Production configuration remains unchanged; HTTPS remains under #28.


## Pills, downloads, and tile proportions — September 30, 2026

John prefers standard-size pill links. Use icon-only two-tone social links, with accessible names; remove the visible “A few things to explore” heading. The toolbar download control reads **Resume | Portfolio**, with two dropdowns. Choosing an available document downloads it directly; each option carries a small actual file-type badge.

Resume categories: Developer/API Tech Writer; Knowledge Manager; Content Designer; People Leader; Public Speaker/Presenter. Portfolio categories: Developer Documentation Samples; Technical Writing Samples; Content Design Samples; Coding/Automation Samples. Use latest matching dated versions from Drive, copied intact to same-origin site assets for direct downloads, without changing Drive sharing. Speaker/Presenter has no matching dedicated resume located and is visibly Pending. Developer and coding samples currently use the same September 2026 packet, labelled Combined packet; dedicated files can replace it later. [Exact selected source versions and mappings](https://github.com/johnapaz/johnapaz.github.io/blob/v2/docs/v2-homepage-prototype.md#drive-download-mappings).

**Superseding tile requirement:** image/artwork is **80%** of the square tile; metadata is **20%**. The article title is the focal point within metadata, with much smaller category text. Keep the tile face compact; descriptions may remain available to assistive technology. This overrides earlier fixed metadata-height/10% interpretations.

Desktop introduction stickiness must work in ordinary shorter desktop windows too. The earlier 760px height exception was too broad. Current compact prototype stays sticky above 450px viewport height and scrolls at exceptionally short heights to keep links reachable. Mobile/stacked introduction scrolls normally.

Implemented in `c60c8182b7c9b28db307e06d8a342c4028af8c09` on `v2`. Local safe Jekyll build, 17 responsive viewports including Fold6 simulations and 1440×600 sticky behavior, keyboard/text zoom, seven-width dropdown placement/dismissal tests, and all eight available PDF/DOCX downloads passed. Physical-device testing remains pending. Production configuration is unchanged. Staging run: [36781743537](https://github.com/johnapaz/johnapaz-staging/actions/runs/36781743537). HTTPS remains under #28.


## Current control and spacing direction — September 30, 2026

John clarified that pill labels meant badges and prefers Bootstrap-style continuity. This supersedes earlier all-pill navigation and the Material-inspired control exploration. Remove J.Paz from the toolbar, Clear Communication from the introduction, and the separate Professional overview action. Keep text navigation and compact joined Resume/Portfolio button-style dropdowns, with consistent icon-only social actions.

Each file has separate small pill badges for actual file type and MM/DD/YY version date, with hover text and accessible label Updated: {date}. Dates reflect dated document versions, not later Drive-copy timestamps. Preserve Combined packet disclosure and Pending speaker resume state.

Spacing proposal for review: shared centered 1200px page container, 20–32px inner gutters, 32–48px desktop column gap, narrower introduction, 64px avatar and slightly smaller identity/welcome type. Mobile stacks normally with 44px interaction targets. Use Bootstrap button/badge/spacing conventions within existing Jekyll styles; a global Bootstrap import is not a settled requirement.

Implemented on v2 in d01d25a408f22c9fd4f2663c8e7c81eb6e73397d. Safe build, 17 responsive sizes including Galaxy Z Fold 6, sticky/keyboard/text zoom, and seven-width dropdown/download/badge checks passed. Physical-device verification remains pending. Staging run: https://github.com/johnapaz/johnapaz-staging/actions/runs/36786154327 . Grid grouping/order, final tokens, and Work wording remain open. Production configuration unchanged; HTTPS remains under #28.


## Bootstrap button groups and single-line download rows — September 30, 2026

John requested proper button groups, SVG chevrons instead of arrow characters, smaller right-aligned Resume/Portfolio controls, centered social icons, and single-line download items. Implemented in e903433b0d3f7474b35117506b0ff6ad130bd1a8 on v2.

The homepage now loads a locally vendored, homepage-scoped subset of official Bootstrap 5.3.8 button/group/dropdown CSS with its MIT license. Primary page links and social icons use connected outlined groups; Resume/Portfolio use a compact solid button group, real button toggles and inline SVG chevrons. No global Bootstrap reset or legacy-page/theme replacement.

Download label, type and date badges occupy one line. Desktop menus fit full labels; narrow viewports use ellipsis with complete accessible labels/hover titles. Combined-packet context remains accessible and in the option hover title. Menus support arrow keys, Escape focus restoration, click/focus dismissal and exclusive open state. Touch layouts keep 44px interaction targets.

Safe Jekyll build, 17 responsive viewport checks including Fold 6, seven-width single-line/download/date/icon-group checks, desktop right alignment and touch/keyboard behavior passed. Physical-device review remains pending. Staging run: https://github.com/johnapaz/johnapaz-staging/actions/runs/36788486837 . Production configuration unchanged; HTTPS remains #28. Grid order, final visual tokens and Work wording remain open.


## Centered navigation and borderless Bootstrap social icons — September 30, 2026

John requested narrower dropdowns, primary navigation centered against the page, and borderless two-tone social icons from Bootstrap Icons. This supersedes the previous left-anchored page links and outlined social group.

Implemented in v2 commit 6e9f6440b370f162ae480887d476c3cbf302f440: 390px maximum dropdown width (previously 460px), navigation centered independently of right-aligned downloads, and locally included official Bootstrap Icons 1.13.1 SVGs for Threads, Instagram, LinkedIn and GitHub, with MIT license. Social links use pale-sand circular surfaces and rust glyphs, with no borders/dividers. The group centers beneath the welcome text width rather than the wider introduction column. Homepage Font Awesome loading is removed.

Safe Jekyll build and 17 responsive viewport checks passed, including Fold6 simulations, sticky behavior, keyboard/text zoom and overflow. Seven-width checks confirm page-centered navigation, welcome-centered socials, borderless surfaces, four Bootstrap SVGs, narrow menus, single-line rows, badges and eight downloads. Physical-device checks remain pending. Staging run: https://github.com/johnapaz/johnapaz-staging/actions/runs/36789709854 . Production unchanged; HTTPS remains #28. Final tokens and content ordering remain review choices.


## Plain text navbar, left socials and corrected corners — September 30, 2026

John requested no navbar borders, just text; left-align the social icons again; and make download button corners consistent. This supersedes outlined primary navigation and centered social alignment.

Implemented in v2 db73fcb91d8c77968fdf1e00049e159481ad9c0c: plain page-centered text navigation with current-page weight, left-aligned borderless two-tone Bootstrap social icons, and Resume/Portfolio rounding only the group’s outer corners at 4px. The square right edge seen in the screenshot came from a Bootstrap nested-group selector overriding the custom radius; corrected specificity now yields matching corners.

Safe Jekyll build, 17 responsive sizes including Fold6, and seven-width checks passed for exact corner values, zero nav/social borders, social left alignment, navigation centering, menus/badges and eight downloads. Physical-device testing remains pending. Staging run: https://github.com/johnapaz/johnapaz-staging/actions/runs/36790737979 . Production unchanged; HTTPS remains #28.


## Accepted landing-screen decisions — October 1, 2026

Supersedes all earlier square-image/80–20 card requirements and provisional homepage content ordering. Preserve the current introduction and toolbar. Six rectangular section links use two columns on desktop, ordered by row: **About Me | My Blog**, **Resume & Portfolio | Code & Projects**, **Guides & Articles | Talks & Presentations**. Use one cohesive canyon gradient (pale sand to warm stone), complementary deep espresso text, and the existing curvy Georgia italic font. Whole tiles are clickable. Hover subtly changes color and lifts 3px over 200ms; provide equivalent keyboard focus and respect reduced motion.

At typical desktop sizes, the final two tiles should be approximately half above and half below the fold. Mobile stacks normally without forcing this proportion. Retain responsive/Fold6 review requirements. Search is explicitly deferred (#26); no inactive search bar in this landing-screen scope. Admin implementation remains #31.

Implementation is isolated on `landing-screen-tiles` from `v2`; production promotion is separate. See the branch's `docs/v2-homepage-prototype.md` for published destination mappings and validation limitations. Local label/order/Liquid/Sass/permalink checks passed; full Jekyll CI and browser/device review remain required before merge.
