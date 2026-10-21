# johnapaz.com

[Visit the website](https://johnapaz.com) · [Explore the source](https://github.com/johnapaz/johnapaz.github.io/tree/main) · [Read the project wiki](https://github.com/johnapaz/johnapaz.github.io/wiki) · [View the live backlog](https://github.com/johnapaz/johnapaz.github.io/issues?q=is%3Aissue%20state%3Aopen%20sort%3Aupdated-desc)

My personal website brings together my work as a writer, speaker, and builder: professional samples, practical guides, personal writing, and projects. It is also a project worth discussing in its own right—a record of how I turn an idea into requirements, direct AI-assisted development, review the results, and refine the experience.

**“Curious, Creative, Clever”** is the voice I want the site to have. The goal is to help visitors learn something, explore my work, and find reasons to get in touch, while giving me a publishing home that remains useful beyond a job search.

## V2 is live

[Read the launch story](https://johnapaz.com/blog/website-v2-launch/) · [Browse staging](https://staging.johnapaz.com) · [Build checks](https://github.com/johnapaz/johnapaz.github.io/actions/workflows/staging.yml)

V2 brings together Home, professional Work, Writing/Blog, About, Coding/Projects, Talks/Media, site-wide search, and a native article reading layout. The launch announcement includes a V1/V2 comparison, an actual homepage screenshot, and an expandable AI-assistance disclosure. It leads the Home featured content, Writing catalog, and Blog feed.

| Source | Purpose |
| --- | --- |
| `main` | Production source for [johnapaz.com](https://johnapaz.com) and the default branch |
| `v2` | Integration branch and shared staging source |
| Feature branches | Reviewable changes; selectable for the shared staging preview |
| [johnapaz-staging](https://github.com/johnapaz/johnapaz-staging) | Independent Actions/Pages deployment controls |

The owner dashboard is live at [Admin](https://johnapaz.com/admin): Cloudflare Access protects the dashboard and its GA4 reporting backend. It has separate production/staging reports, comparisons, and point-in-time HTTPS/build-revision checks. Sharing/revocation verification, GA4 reconciliation, deployment activity, independent monitoring, and full device acceptance remain in [#31](https://github.com/johnapaz/johnapaz.github.io/issues/31). A build badge indicates build activity, not uptime.

**In review — [#66](https://github.com/johnapaz/johnapaz.github.io/issues/66):** an **Exclude this browser** control stops future analytics collection on that browser and site, remembers the choice, and offers Undo. It preserves consent and earlier report data; configure each browser/device and production/staging separately. The change includes a public `/analytics-preferences/` page and dashboard shortcut. The protected dashboard assets require a separate, coordinated Worker deployment; publishing Pages alone does not update them.

![Build checks](https://github.com/johnapaz/johnapaz.github.io/actions/workflows/staging.yml/badge.svg?branch=main)
![Staging deployment](https://github.com/johnapaz/johnapaz-staging/actions/workflows/staging.yml/badge.svg)

## Technology and architecture

| Technology | Role in the site |
| --- | --- |
| **Jekyll and Ruby/Bundler** | Generate static pages from content, templates, and configuration; the GitHub Pages gem supplies the build dependency set |
| **Markdown and YAML** | Store readable page content, configuration, and structured homepage data |
| **Liquid** | Compose layouts and reusable includes |
| **Sass/CSS** | Provide the theme styling and dedicated V2 layout, typography, responsive behavior, and interaction states |
| **JavaScript** | Support download menus, filtering, pagination, résumé views, and a static site search index |
| **Bootstrap-style controls and Bootstrap Icons** | Supply familiar visual conventions for grouped controls, badges, and social links in V2; the site is not a Bootstrap application |
| **GitHub Pages and Actions** | Host the static site and validate/build the separate staging deployment |
| **GitHub Issues and wiki** | Track tasks, requirements, decisions, configuration, and development history |

The visual foundation is [Editorial by HTML5 UP](https://html5up.net/editorial), adapted for Jekyll by [Andrew Banchich](https://github.com/andrewbanchich/editorial-jekyll-theme). V2 retains that foundation and adds a dedicated homepage layout, includes, styles, and data. This incremental approach allows the landing page to evolve while existing articles and portfolio pages remain available.

## Design decisions and authorship

I use AI as a development collaborator. I set the purpose, content, and experience I want; AI proposes options and implements details; I review the result and request revisions. That distinction matters here: directing a design and writing every line of its implementation are different contributions.

| Area | My direction and decisions | Details delegated to AI |
| --- | --- | --- |
| **Voice and identity** | The name/portrait introduction, “Writer \| Speaker \| Human,” “Curious, Creative, Clever,” and welcome copy | Template markup and responsive sizing |
| **Layout and scrolling** | A spacious introduction inspired by Baleon, persistent desktop introduction, and mobile adaptation | Grid/sticky CSS, breakpoints, and short-screen handling |
| **Color** | A canyon-inspired palette from my supplied reference; a lighter background that remains nonwhite | Exact color roles, tint values, contrast checks, and gradient implementation |
| **Typography** | Expressive, curvy lettering; a single-line headline; retaining the curvy style for section labels | Georgia italic as the prototype typeface, font sizing, and spacing |
| **Landing sections** | Six rectangular links, their labels and order, and the final row approximately straddling the desktop fold | Data structure, destination wiring, and viewport-dependent geometry |
| **Controls** | Bootstrap-style conventions, compact Resume/Portfolio button groups, file-type/date badges, borderless navigation, and left-aligned social icons | CSS, SVG/icon integration, dropdown behavior, and keyboard support |
| **Interaction** | A subtle tile color change and slight movement on hover | Exact movement/timing, corresponding focus states, and reduced-motion handling |
| **Development workflow** | Keep the project in GitHub, establish separate staging before the redesign, and use the wiki as the project record | Proposed workflow mechanics, build scripts, configuration, and implementation documentation |

The latest landing-screen order is **About Me**, **My Blog**, **Resume & Portfolio**, **Code & Projects**, **Guides & Articles**, and **Talks & Presentations**. A compact search icon now opens a site-wide index of pages, articles, projects, and the speaking/media archive.

Earlier square image cards and several navigation treatments were explored and then superseded through review. The [V2 requirements](https://github.com/johnapaz/johnapaz.github.io/wiki/V2-Requirements) and [prototype implementation notes](https://github.com/johnapaz/johnapaz.github.io/blob/main/docs/v2-homepage-prototype.md) preserve that evolution, including validation results and limitations.

AI has assisted with implementation, troubleshooting, documentation, and verification. Its proposals are not automatically approved design requirements, and generated code is not evidence that an experience has been reviewed on a real device.

## How changes reach the site

Pull requests and pushes to main, v2, and supported preview branches run CI checks for both production and staging configurations. The generated-site checker validates local links, assets, downloads, anchors, and launch metadata. The separate staging repository reads `v2` and publishes through GitHub Actions, either manually or on its scheduled refresh. Staging overrides the site URL, uses its own consent-gated GA4 property, discourages indexing, and records the source commit in `build-info.json`. Local development and Admin are not tracked.

Production promotion is a separate review step: record the reviewed source commit, open a pull request into main, and merge after my approval. Native GitHub Pages publishes main at the production domain. [Release and recovery instructions](docs/releasing.md) record the rollback reference and clone updates for the master → main rename. The [staging guide](https://github.com/johnapaz/johnapaz.github.io/blob/v2/docs/staging.md) explains configuration, verification, and recovery. Build success, deployment success, and browser/device review are tracked separately.

The wiki updates are now [published](https://github.com/johnapaz/johnapaz.github.io/wiki/Release%E2%80%90Notes). Separate protected admin staging is tracked in [#68](https://github.com/johnapaz/johnapaz.github.io/issues/68), estimated at 6–10 engineering hours once build/account prerequisites are ready. The first candidate staging run exposed a Ruby/lockfile mismatch; [#69](https://github.com/johnapaz/johnapaz.github.io/issues/69) blocks live review. Green source CI re-resolved dependencies and is not proof of the committed lockfile's compatibility. See the [validation record](docs/admin-analytics-review-2026-10-21.md).

## Versions and release notes

Recommended site release convention: `vMAJOR.MINOR.PATCH`, with a short descriptive GitHub Release title. Major versions mark redesigns, minor versions mark named feature milestones, and patches cover focused fixes or small improvements within the current milestone. This is a site release convention rather than a package API compatibility promise.

- **Proposed next release:** `v2.0.1 — Cleaner analytics`, after review and verified deployment. Recheck existing tags before assigning the final number.
- **Reserved:** `v2.1.0 — Mentoring`, preserving the existing milestone.
- **Preview labels:** `v2.0.1-rc.1`, `-rc.2` if useful; branch names describe the work, for example `feat/66-exclude-own-traffic`.

[CHANGELOG.md](CHANGELOG.md) records Unreleased changes and verified past deliveries. At release, date the shipped entry and publish matching GitHub Release notes against the deployed commit. The private npm command wrapper stays unversioned. No tag or release is created just by opening a PR. See [releasing](docs/releasing.md) for the complete process.

## Explore or run the source

- `_config.yml`: site configuration
- Root Markdown files and `content/`: page content
- `_layouts/` and `_includes/`: templates and reusable sections
- `_sass/` and `assets/`: styles, scripts, images, and downloads
- V2 `_data/home.yml`: homepage section data
- V2 `docs/`, `scripts/`, and `.github/workflows/`: implementation notes and build checks
- `CNAME`: custom-domain configuration

Install Ruby and Bundler compatible with the checked-out branch's dependency lockfile, then run:

```bash
bundle install
bundle exec jekyll serve
```

Open [http://localhost:4000](http://localhost:4000). For V2 staging configuration and the build checker, follow the staging guide. The V2 workflow currently uses legacy Ruby 2.7 and Bundler 2.4.22; dependency modernization remains future work. Node.js 22 is used by CI for the analytics checks and protected admin backend; it is separate from the Jekyll build. No npm dependencies or Gulp tasks are needed. Run the existing checks without installing packages:

```bash
npm test
node backend/admin/build.mjs
node --check assets/js/admin-v2.js
```

The private `package.json` is a command wrapper, not a website release version. Website releases use Git tags. See [release and recovery instructions](docs/releasing.md) for maintenance branches and preview review.

## Project record and credits

The [wiki](https://github.com/johnapaz/johnapaz.github.io/wiki) holds requirements, architecture, decisions, the roadmap, and the development journal. [Issues](https://github.com/johnapaz/johnapaz.github.io/issues?q=is%3Aissue%20state%3Aopen%20sort%3Aupdated-desc) provide the changing backlog; commits and pull requests connect that record to implementation.

Theme and repository licensing details are in [LICENSE.md](LICENSE.md).
