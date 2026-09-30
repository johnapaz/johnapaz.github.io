# V2 homepage prototype — issue #23

This is the first reviewable homepage implementation on `v2`, not an approved final design or production release. Requirements: [V2 Requirements](https://github.com/johnapaz/johnapaz.github.io/wiki/V2-Requirements). Reference: the supplied `johnapaz-concepts.pptx`, especially its Baleon landing-page screenshot.

## Implementation

Keep Jekyll and the Editorial theme. The homepage uses `_layouts/home-v2.html`, two dedicated includes, and `_sass/_home-v2.scss` compiled through `assets/css/home-v2.scss`. Other page layouts and theme styles remain intact. No frontend framework or runtime JavaScript is required.

The top navigation stays visible. At desktop widths above 1000px, the introduction sticks beside a two-column square-card grid with one document scrollbar. On shorter screens (760px high or less), the introduction scrolls so its links remain reachable. At tablet/mobile widths it sits above the content; below 600px cards form one column and navigation wraps into two rows.

The introduction uses the existing `John_smile.jpg` portrait, the exact approved identity/headline/supporting/welcome copy, and a contact link to the configured email. Instagram, LinkedIn, and GitHub reuse repository-configured destinations. Threads is explicitly marked “link pending”; confirm the profile URL before enabling it. No guessed profile destination.

Resume download is in the persistent navigation; professional overview is in the introduction. Existing theme pages also gain professional overview and dated resume-download links. Downloads deliberately use the existing March 2025 PDF; refreshing resume content and versions remains #27. Work links to the existing `/resume/` web overview while its label and new page design remain unresolved. About links to the existing personal `/my-story/` page. Writing temporarily jumps to the homepage content grid; a dedicated Writing index with grid/list views is a subsequent task.

Removed the competing `index.markdown` homepage source; `index.md` now explicitly owns `/`. Existing article links from the old homepage are retained in git history; the prototype curates a subset rather than approving deletion or migration of published writing.

## Choices for design review

| Area | Prototype choice | Decision still needed |
| --- | --- | --- |
| Palette | Canyon palette: pale sand, deep espresso, warm stone, rust accents | Final color roles, contrast, and surface treatment |
| Typography | System sans; large three-line headline | Final typefaces, scale, line breaks |
| Cards | Six square cards, real links; existing images and typographic motifs | Imagery, grouping, card details, number, order |
| Curation | Automation, UI copy, learning, Cuban coffee, portfolio, personal story | Which content best serves the homepage purpose |
| Navigation | Home / Writing / Work / About | Work label, dedicated Writing destination, search placement (#26) |
| Professional access | Current web overview and dated PDF | Professional overview redesign and updated downloads (#27) |
| Social profiles | Existing configured URLs; Threads pending | Confirm Threads and review existing profile destinations |

Card selection/order/text lives in `_data/home.yml`. All proposed headings and tokens beyond the exact introduction are provisional. The desktop introduction has no separate panel, border, or background.

## Local review

Use the existing locked dependencies (CI uses Ruby 2.7 and Bundler 2.4.22):

```sh
bundle install
JEKYLL_ENV=staging bundle exec jekyll build --safe --config _config.yml,_config.staging.yml
JEKYLL_ENV=staging bundle exec jekyll serve --safe --config _config.yml,_config.staging.yml --host 127.0.0.1
```

Visit `http://127.0.0.1:4000`. Check desktop scrolling, tablet stacking, narrow mobile navigation, keyboard focus/skip link, text zoom, card links, portrait, and downloads. Run the existing staging checker with the generated build-info fixture as documented in the staging workflow.

Validation results are recorded below after the local review. Local validation does not certify a live staging preview. Staging deployment has passed previously, but custom-domain HTTPS remains pending under #28. Do not bypass certificate warnings. Production publishing settings, workflows, CNAME, and dependencies are unchanged; no production merge or deployment is part of this prototype.

## Validation record — September 30, 2026

- Jekyll 3.8.5 safe staging build passed with the unchanged lockfile. Local Ruby was 3.2.3; scratch-only REXML loading and Ruby compatibility shims handled legacy file-read keywords and removed taint methods. These are not site changes. CI's unmodified Ruby 2.7 build remains the canonical compatibility check.
- Existing staging checker passed for 21 generated HTML pages (local build-info fixture), including noindex and analytics checks.
- Chromium 134 rendered 1440×1000, 1280×800, 1024×768, 1000×900, 768×1024, 600×900, 390×844, 320×568, and 1440×600. Automated geometry checks verified no horizontal overflow, square cards without clipping, mobile introduction ordering, persistent navigation, and desktop introduction persistence. Short desktop screens intentionally use normal introduction scrolling.
- Keyboard skip link and 200% root text sizing overflow checks passed. Local homepage destinations, generated images/styles, and resume PDF returned 200; no local resource failures or JavaScript errors. The coffee card points directly to the generated `.html` URL to work with a plain static local server as well as Pages.
- Desktop and mobile screenshots were visually inspected. Local review served the real Jekyll-generated output over HTTP. External article/profile destinations were taken from repository content and were not independently availability-checked. A screen-reader audit and multi-browser testing remain future checks.
- Production config, CNAME, staging workflows, Gemfile, and lockfile are unchanged. Live HTTPS validation remains #28.

[Desktop screenshot](images/v2-homepage-desktop.webp) · [Mobile screenshot](images/v2-homepage-mobile.webp)

## Foldable review matrix (retain for future design changes)

Galaxy Z Fold is a required device class, with Z Fold6 the priority. The following are **representative CSS viewport simulations**, not claimed hardware browser measurements. Browser chrome, Android display scaling, font settings, and split-screen use change usable CSS dimensions. Samsung's [Fold6 display specifications](https://news.samsung.com/global/samsung-galaxy-z-fold-6-and-z-flip-6-elevate-galaxy-ai-to-new-heights) inform the aspect ratios; physical pixel resolution is not the browser viewport.

| Design type | CSS viewport tested | Result |
| --- | --- | --- |
| Z Fold series narrow cover | 344×882 and 882×344 | Passed |
| Z Fold6 cover, portrait/landscape | 360×884 and 884×360 | Passed |
| Z Fold6 unfolded, portrait/landscape | 690×803 and 803×690 | Passed |
| Z Fold series wider unfolded/scaled | 768×894 and 894×768 | Passed |
| Narrow split-window stress case | 320×568 | Passed |

These eight additional foldable viewports passed the same overflow, square-card, navigation persistence, and introduction-order checks. Resizing the same page from cover → unfolded → rotated → cover passed without reload or losing cards. The existing mobile-first CSS naturally stacks the introduction for unfolded widths in this range, with two grid columns above 600px. No device-name-specific breakpoint was needed.

Keep these cases in prototype and subsequent page reviews. Physical Z Fold6 testing in Samsung Internet and Chrome, opening/closing transitions, browser toolbar changes, display/font scaling, split-window use, and keyboard operation remain to be checked on a device.

[Fold6 cover simulation](images/v2-homepage-fold6-cover.webp) · [Fold6 unfolded simulation](images/v2-homepage-fold6-unfolded.webp)

The wiki gained an accepted canyon color direction during this session. The reviewed prototype now applies that direction; the earlier dark/lime exploration was superseded before final review. Primary and secondary card text use deep espresso for legibility on warm stone. Final roles remain subject to review.

Canyon text contrast checks: deep espresso on pale sand 12.43:1; rust on pale sand 6.01:1; deep espresso on warm stone 7.05:1. Card hover retains deep espresso text and adds an underline; rust on warm stone is limited to the decorative arrow/focus indicator (3.40:1), not small body text.

## Review revision — September 30, 2026

John requested a single-line “Curious, Creative, Clever,” a larger desktop identity name, and a lighter nonwhite background. Removed forced headline line breaks; size the headline against its introduction column to keep one line across desktop, mobile, and Fold layouts. Desktop identity name is now 1.75rem (mobile 1.2rem). The shared page/navigation background is a lighter pale-sand tint, `#F8EBD3`; original canyon accents remain. Staging publication is part of this review revision; verify its served build-info commit and HTTPS independently rather than treating a source commit or screenshot as deployment.


## Compact navigation and introduction review — September 30, 2026

John requested a smaller toolbar without a dividing line, less space above the main content, a more condensed introduction, expressive tagline typography, a larger supporting line ending near “Clever,” working social icons, and consistent tile title spacing. This iteration uses centered primary navigation in the existing system font, a locally available Georgia italic headline, tightly paired tagline lines, and reduced identity/welcome/social gaps. Centering and the serif choice are prototype options for review, not final design tokens. Card text sections share a fixed height, equal top/bottom padding, and a reserved two-line title row so neighboring tile labels and descriptions align.

Threads now links to `https://www.threads.com/@john.paz.stories`, using the handle supplied by John. Automated external profile retrieval was unavailable, so account ownership was not independently verified. Instagram, LinkedIn, and GitHub use the existing bundled Font Awesome assets; Threads uses a small inline @ symbol. Visible link labels remain available.

Safe Jekyll build and responsive checks at 17 viewport sizes passed, including Fold 6 cover/unfolded simulations and resize transitions. Physical Samsung Internet/Chrome review remains pending. Staging is the review destination; HTTPS remains tracked in #28. Production configuration is untouched.


## Pill links, downloads, and 80/20 tiles — September 30, 2026

John prefers standard-height pill links and two-tone social icons without visible words. Navigation, professional overview, and footer contact links now use 44px minimum-height pills; social links use 44px two-tone circles with accessible names. The inline welcome contact link preserves the exact welcome copy. The toolbar has a joined Resume | Portfolio control, with native dropdowns, real file-type badges, direct same-origin downloads, keyboard support, Escape/outside dismissal, and only one open menu. The visible “A few things to explore” heading is removed; an accessible section heading remains.

**Superseding tile decision:** image/artwork occupies 80% of each square tile; metadata occupies 20%. Article title dominates that metadata section, category is much smaller, and the description is available to assistive technology without crowding the tile face. This supersedes the earlier fixed-height metadata rows.

Desktop stickiness previously stopped below 760px viewport height. The condensed introduction now stays sticky down to 451px; at exceptionally short heights it scrolls to keep all links reachable. Mobile/stacked layouts scroll normally. Tests include a 1440×600 desktop window.

### Drive download mappings

User directed use of latest matching Drive documents. Selection prioritizes dated content versions over later timestamps on copied older files; source files are copied intact with actual PDF/DOCX types, without changing Drive sharing. The table records the source dates rather than implying these old documents were rewritten.

| Menu option | Selected document | Type | Content date |
| --- | --- | --- | --- |
| Developer/API Tech Writer | John_Paz_Developer_API_Technical_Writer_resume_09292026 | PDF | September 2026 |
| Knowledge Manager | John_Paz_Knowledge_Manager-Technical_Writer_09122025 | DOCX | September 2025 |
| Content Designer | John_Paz_Content_Designer_01082025 | PDF | January 2025 |
| People Leader | John_Paz_Documentation_Manager_resume_02092024 | DOCX | February 2024 |
| Public Speaker/Presenter | No matching dedicated resume located; disabled Pending entry | — | — |
| Developer Documentation Samples | John_Paz_API_Technical_Writer_work-samples_09152026_Bloomberg | DOCX | September 2026 |
| Technical Writing Samples | John Paz - Sr. Content Designer - documentation writing samples_03032021 | DOCX | March 2021 |
| Content Design Samples | John Paz - Sr. Content Designer Portfolio_042424 | PDF | April 2024 |
| Coding/Automation Samples | Same September 2026 combined packet; includes Confluence Automation Toolkit case study | DOCX | September 2026 |

Developer and coding options explicitly indicate Combined packet. Dedicated exports can replace these mappings under #27. Role-document refreshes remain open; finding the newest existing file does not mean its content is current. Public Speaker/Presenter needs a file.

Validation: safe Jekyll build; 17 responsive sizes including Fold6 simulations, keyboard skip navigation, text zoom, local assets/destinations; dropdown placement at seven widths, keyboard opening/Escape/outside dismissal, mutually exclusive open state, and all eight available PDF/DOCX downloads. Physical-device verification remains pending. Production configuration untouched.

## Compact Material-inspired controls — September 30, 2026

Supersedes the earlier all-pill navigation treatment at John's request. Primary navigation now uses compact text actions; only the joined Resume/Portfolio download action has a tonal surface. Social icons use transparent icon-action surfaces with the same accent, 8px corner shape, and subtle hover state layer as toolbar actions. All controls retain 44px minimum interaction targets while reducing gaps and visible padding. Dropdowns use compact elevated surfaces; their file-type badges remain small pills. The separate Professional overview action is removed at John’s follow-up request; Resume and Portfolio remain in the toolbar.

“Clear Communication” is removed. Welcome copy, one-line expressive headline, desktop sticky introduction, downloads, and 80/20 tiles remain. This is a Material-inspired native HTML/CSS treatment, retaining Jekyll and the existing brand palette, rather than importing a component framework. References: https://github.com/material-components/material-web/blob/main/docs/components/button.md and https://github.com/material-components/material-web/blob/main/docs/components/icon-button.md .

Review: compactness, text-action emphasis, and unified interaction styling are the current proposal; grid order/grouping, final tokens, and Work wording remain open. Physical Galaxy Z Fold 6 verification is still pending.

Validation: safe Jekyll build and 17 responsive viewport checks passed after both removals, including Fold 6 cover/unfolded/landscape and desktop sticky behavior. Dropdown positioning, keyboard dismissal, and eight downloads passed at seven widths during this styling iteration.

## Bootstrap-style buttons, badges, and centered spacing — September 30, 2026

John clarified that small pill labels meant badges, and prefers Bootstrap-style continuity. Removed the J.Paz toolbar brand entirely. Primary links remain text navigation; Resume/Portfolio are a joined solid button-style control. Each available file has separate compact pill badges for its actual file type and MM/DD/YY date. Dates come from the selected document's dated version (not a later Drive copy timestamp), with semantic ISO datetime and a native title/accessible label “Updated: {date}”. The combined-packet disclosure remains beneath its file label. Pending speaker resume has no invented type/date.

Spacing proposal: center the entire toolbar group and page in a shared 1200px maximum container, with 20–32px interior gutters and a 32–48px desktop column gap. Compared with the former 1520px container, this adds balanced outer breathing room and reduces the introduction's width. The desktop avatar is 64px, name 1.6rem, and welcome copy .92rem; mobile keeps readable text and full interaction targets. Stacked layouts remain centered in the existing 780px container. This is a reviewable spacing choice, not a final token decision.

Recommendation: use Bootstrap conventions (button vs. badge semantics, shared radii, spacing scale, centered containers) now. A framework-wide import would overlap Editorial's global styles; evaluate a scoped Bootstrap Sass component layer if later pages need many reusable components. No platform/theme replacement or production configuration change. References: https://getbootstrap.com/docs/5.3/components/badge/ , https://getbootstrap.com/docs/5.3/components/buttons/ , https://getbootstrap.com/docs/5.3/layout/grid/ .

Validation: safe Jekyll build and 17 viewport checks passed, including Fold 6 dimensions, sticky behavior, single-line tagline, text zoom and overflow. Dropdowns are centered against the joined button group to stay onscreen on narrow layouts; eight downloads and all date/type badges are checked at seven widths. Physical-device review remains pending.

## Actual Bootstrap control groups and single-line downloads — September 30, 2026

Review screenshot showed mismatched standalone navigation shapes, a heavier download group, character chevrons, left-aligned social icons, and stacked file metadata. This revision uses a homepage-scoped subset of official Bootstrap 5.3.8 button, button-group and dropdown CSS (vendored locally with MIT license). Legacy pages retain Editorial; no global Bootstrap reset or theme replacement.

Primary navigation is a joined outlined button group; Resume/Portfolio are a smaller, right-aligned solid button group. Dropdown toggles are real buttons with SVG chevrons, aria-expanded/aria-controls, Escape/outside dismissal, arrow-key navigation and mutually exclusive open panels. Social icons form a centered outlined group with shared borders and only outer corners rounded.

Download rows display label, file type and date on a single line. Menus are wider on desktop; narrow screens truncate long labels with ellipsis while preserving badges. Full filenames/options and combined-packet context remain in accessible text and hover titles. Touch pointers retain at least 44px interaction heights; desktop controls are visually smaller. Exact styling and grid order remain review choices.

Bootstrap source: https://github.com/twbs/bootstrap/tree/v5.3.8 and button-group conventions: https://getbootstrap.com/docs/5.3/components/button-group/ . The scoped CSS is in assets/css/bootstrap-controls-v2.css and its license accompanies it.

Validation: safe Jekyll build and 17 responsive sizes passed, including Fold 6 simulations, sticky behavior, single-line headline, keyboard skip and text zoom. Seven-width dropdown checks passed for single-line rows, centered socials, on-screen panels, date/type badges and eight downloads. Arrow keys, Escape focus restoration, right alignment and coarse-pointer 44px targets also passed. Physical-device verification remains pending.
