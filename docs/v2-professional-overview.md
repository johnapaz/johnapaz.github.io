# Professional overview draft — issue #35

Prepared on `professional-overview-preview`, based on `landing-screen-tiles` at `6051fb6`. John approved the reviewed prototype on October 1, 2026 and authorized committing it on its feature branch. Integration into v2, canonical CI, staging publication and production promotion remain separate steps.

The existing `/resume/` URL is preserved. Its dated table-based content is replaced with a dedicated V2 layout: introduction, three capabilities, three selected samples, six selected roles, education, and contact. The existing shared download inventory is reused. Navigation now identifies the current page and gives Writing a homepage destination from interior pages.

## Content and authorship

John requested the professional overview as the next development task and a preview before committing. Existing requirements establish resume/sample/contact access, the provisional Work label, shared controls, and responsive/Fold6 review.

John's subsequent review supersedes the proposed hero: use “John A. Paz | Professional Work History” above “Clear Communication,” with “Curiosity-driven storyteller known for technical depth; tinkerer-developer” as the lead. Remove Explore my work and Get in touch actions, including the contact footer. LinkedIn remains in the desktop profile.

The later mobile correction sets download toggles to 36px height and anchors the dropdown to the toolbar's full width with 20px side gutters. Labels wrap beside file/date badges instead of truncating or extending beyond the screen. Liquid/Sass rendering, copy/removal assertions, JS syntax and whitespace checks passed; physical-device/browser validation remains pending.

AI proposed the headline **Words that work.**, the supporting copy, the section composition, project summaries, and CSS details. These remain drafts for John to review, not accepted design decisions.

Experience and capabilities are grounded in `assets/docs/John_Paz_Developer_API_Technical_Writer_resume_09292026.pdf`. Project links and files come from the existing published toolkit destination and `_data/downloads.yml`. The developer sample is explicitly identified as a combined packet. No new achievement metrics are asserted. Only selected roles appear; the full resume remains available from the toolbar.

The draft reuses the current canyon palette. Dark/Darker appearance is separately tracked in #34; this page does not establish or implement those palettes. Search and operations remain separate workstreams.

## Validation

- Liquid rendering and both Sass files compiled in a local preview.
- The local preview renderer needed an equivalent quoted CSS `min()` expression because Python libsass interprets the existing homepage's CSS function as a Sass function; source Sass is unchanged.
- Verified three sample cards, six roles, Work current-page navigation, fragment targets, and all linked downloads against repository files.
- Existing dropdown JavaScript syntax and Git whitespace checks passed.
- Full Jekyll build is pending: Ruby/Bundler are unavailable in this workspace.
- Browser/Fold6 visual, interaction, text zoom, and physical-device review remain pending. Chromium installation failed because the browser download returned a truncated archive.

The inline preview has been approved. Before integration, run canonical Jekyll/CI validation and stage the exact reviewed commit through the established staging workflow. Production promotion remains separate.

## Mobile review correction — October 1, 2026

John's Fold6 screenshot showed pale headings/lead text in the dark ChatGPT preview and awkward mobile action arrangement. Set explicit espresso colors for every heading and the lead, avoiding inherited host text colors. On narrow screens, center the joined Resume/Portfolio controls on their own toolbar row and keep their labels/chevrons together. Below 480px, give the hero and footer actions full-width rows with 44px minimum targets. Source and rendered Sass checks passed; browser/device review remains pending. John subsequently approved this revision together with the later copy/menu refinements.
