# Writing and Blog draft — October 1, 2026

Isolated on `writing-blog-preview`, based on approved Work branch `fc60f9b`. John approved integration on October 1, 2026 after requesting collapsed discovery controls. Integration is based on latest `v2` (`bff4688`) and preserves its approved homepage layout/featured data. The approved Work page source is included from `fc60f9b` without reverting newer homepage changes.

- `/writing/`: responsive article tiles; collapsed-by-default Search & filter disclosure containing title/topic/description search, exact topic filter, newest/oldest/title ascending/title descending sorts, reset, result count, no-results message, and pagination at six articles per page. Pagination remains visible with disabled boundaries even for a single page. Search here is catalog-local; global search #26 remains deferred.
- `/blog/`: a Blog section heading and single-column newsletter-style archive with one normal page scrollbar, comfortable reading width, dated metadata where available, story previews and original-publication links. No subscription feature was requested.
- Shared navigation points Writing to `/writing/`; homepage My Blog/Guides & Articles targets `/blog/` and `/writing/`.
- `_data/writing.yml` holds ten initial entries. Two repo drafts, six existing featured article links from PR #33, and two retrieved Medium pieces. Empty dates stay absent and sort after dated entries; summaries are editorial previews, not new prose attributed to John. Catalog completeness is unverified.
- Enable output for existing collections to make local article targets real and add a stable review permalink. Existing Cuban coffee URL remains unchanged. Collection output also makes existing collection index pages render; check their legacy content during canonical CI review.
- Source checks: local files; `origin/landing-screen-tiles:_data/home.yml`; https://john-paz-stories.medium.com/resume-design-guide-860633bd4f (February 12, 2022); https://medium.com/johnapaz/tech-companies-should-more-hire-non-techies-and-techies-should-start-looking-for-jobs-in-politics-1c3c4245face (January 8, 2019).

Validation: Liquid templates rendered with local preview engine, Sass compiled, JavaScript syntax and whitespace checks passed. A DOM harness exercises search/filter/all sorts/reset/empty state and pagination including reset from later pages. Canonical Ruby/Jekyll build and real browser/Fold6 checks remain blocked: Ruby is unavailable and Chromium download is rejected/truncated by the environment. These are not claimed as passed. John authorized commit to v2 and staging review. Canonical CI/deployment evidence is recorded after publication.

Next authorized work: #36 About page; source audit started in `docs/v2-about-preparation.md`. Keep its independent review scope.

## Compact discovery and staging review

A native details/summary disclosure starts closed and holds the search, topic, sort, and reset controls. Closing it preserves the selected filters; an Active label identifies nondefault state. Discovery progressively enhances only with JavaScript. The narrow open controls use two columns for topic/sort, keeping search full-width. Pagination stays visible and all ten articles are accessible across two pages. Shared toolbar stays on one row on interior Writing/Blog pages at 540–780px and stacks below that to preserve fit. Source assets include build cache-busting query strings.

Staging now supports a persistent source selection and optional manual branch/commit override; see docs/staging.md. This permits branch previews before v2 integration and further commits/merges while selected. Scheduled refresh remains every 30 minutes, not instantaneous source-push publication.
