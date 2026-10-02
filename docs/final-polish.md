# Final polish — October 2, 2026

Staging candidate: `final-polish-preview`, based on current production so existing search, themes, analytics, and admin work are preserved.

- Landing tiles retain a low, wide shape independent of monitor height. Titles use the existing italic serif and stay on one line, sizing down only when their container requires it.
- Social icons, badges, and buttons use rounded rectangle containers throughout V2.
- The appearance icon opens the existing Original / Dark / Darker controls, with keyboard dismissal and outside-click handling.
- Work has section jump links, shared social links below the photo, and Selected work follows Education.
- Writing uses Experience-style compact filter disclosure and an expandable panel for search, topic, sorting, and reset. Pagination is preserved.

Original remains the default for visitors without a saved preference. Production promotion requires review of the deployed staging revision.

## Icon and profile corrections

Instagram points to `john.paz.stories` throughout the shared site configuration. Appearance uses an outlined sun beside About, including on mobile. The sun is flat at rest and gains a rounded inset surface while pressed or expanded. Admin uses a flat outlined gear on desktop and mobile. Both icons retain accessible labels, keyboard focus indicators, and touch-sized targets.
