# johnapaz.com

This repository contains the source for [johnapaz.com](https://johnapaz.com), John Paz's professional website, portfolio, and publishing home.

The current site presents John's background, selected work, technical-writing portfolio, and public resources. A broader Version 2 redesign is in planning to make hiring information easier to reach, support ongoing publishing, and document the site itself as a portfolio project.

## Current implementation

The production site is a static [Jekyll](https://jekyllrb.com/) site hosted by [GitHub Pages](https://pages.github.com/).

- **Site configuration:** `_config.yml`
- **Page content:** Markdown files in the repository root
- **Structured content:** `content/`
- **Templates and reusable page sections:** `_layouts/` and `_includes/`
- **Styles:** `_sass/`
- **Images, downloads, JavaScript, and compiled CSS:** `assets/`
- **Custom-domain configuration:** `CNAME`

The site is based on the Jekyll adaptation of the [Editorial theme](https://html5up.net/editorial) by HTML5 UP and has been customized for John's content and portfolio.

## Run locally

The site uses the GitHub Pages Ruby dependency set. Install Ruby and Bundler, then run:

```bash
bundle install
bundle exec jekyll serve
```

Open [http://localhost:4000](http://localhost:4000) to preview the site. Jekyll watches the source files and rebuilds after most changes.

## Publishing

GitHub Pages currently builds the repository root from the default branch and publishes it to [johnapaz.com](https://johnapaz.com).

The deployment, release, and CI process is being formalized in [issue #21](https://github.com/johnapaz/johnapaz.github.io/issues/21). The default branch is also scheduled to change from `master` to `main` in [issue #20](https://github.com/johnapaz/johnapaz.github.io/issues/20), so check the repository settings before following branch-specific instructions.

## Roadmap and backlog

Work is tracked in [GitHub Issues](https://github.com/johnapaz/johnapaz.github.io/issues). Current priorities include:

- [Version 2 redesign and implementation](https://github.com/johnapaz/johnapaz.github.io/issues/22)
- [Version 2 design exploration — in progress](https://github.com/johnapaz/johnapaz.github.io/issues/23)
- [Deployment, release, and CI strategy](https://github.com/johnapaz/johnapaz.github.io/issues/21)
- [Automated link validation and broken-link fixes](https://github.com/johnapaz/johnapaz.github.io/issues/19)
- [Analytics, public status page, and outage alerts](https://github.com/johnapaz/johnapaz.github.io/issues/24)
- [Default-branch rename](https://github.com/johnapaz/johnapaz.github.io/issues/20)

New bugs, content problems, and proposed improvements should be documented as issues with enough context to reproduce or evaluate them.

## Credits and license

The visual foundation comes from [Editorial by HTML5 UP](https://html5up.net/editorial), adapted for Jekyll by [Andrew Banchich](https://github.com/andrewbanchich/editorial-jekyll-theme). Theme and repository licensing details are available in [LICENSE.md](LICENSE.md).
