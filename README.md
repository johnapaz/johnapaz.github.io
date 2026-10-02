# johnapaz.com

[Visit the website](https://johnapaz.com) · [Explore the V2 source](https://github.com/johnapaz/johnapaz.github.io/tree/v2) · [Read the project wiki](https://github.com/johnapaz/johnapaz.github.io/wiki) · [View the live backlog](https://github.com/johnapaz/johnapaz.github.io/issues?q=is%3Aissue%20state%3Aopen%20sort%3Aupdated-desc)

My personal website brings together my work as a writer, speaker, and builder: professional samples, practical guides, personal writing, and projects. It is also a project worth discussing in its own right—a record of how I turn an idea into requirements, direct AI-assisted development, review the results, and refine the experience.

**“Curious, Creative, Clever”** is the voice I want the site to have. The goal is to help visitors learn something, explore my work, and find reasons to get in touch, while giving me a publishing home that remains useful beyond a job search.

## Where the project stands

The production site uses the customized Editorial Jekyll theme. A V2 redesign is being developed separately, with its own GitHub Pages staging repository.

| Source | Purpose |
| --- | --- |
| `master` | Current production source for [johnapaz.com](https://johnapaz.com) |
| [`v2`](https://github.com/johnapaz/johnapaz.github.io/tree/v2) | Redesign integration branch and source for shared staging |
| [`landing-screen-tiles`](https://github.com/johnapaz/johnapaz.github.io/tree/landing-screen-tiles) | Latest six-section landing-screen iteration, isolated for review |
| [`johnapaz-staging`](https://github.com/johnapaz/johnapaz-staging) | Separate repository that builds and publishes the staging site |

The V2 decisions below describe the redesign, rather than features already released to production. The accepted homepage, professional Work page, Writing/Blog, and single-column About page are now integrated into `v2`. Future feature branches can be selected for review using staging-source.txt in the staging repository; restore that selection to `v2` after integration. Proper site-wide search (#26) and a shared toolbar design review (#38) are next.

## Technology and architecture

| Technology | Role in the site |
| --- | --- |
| **Jekyll and Ruby/Bundler** | Generate static pages from content, templates, and configuration; the GitHub Pages gem supplies the build dependency set |
| **Markdown and YAML** | Store readable page content, configuration, and structured homepage data |
| **Liquid** | Compose layouts and reusable includes |
| **Sass/CSS** | Provide the theme styling and dedicated V2 layout, typography, responsive behavior, and interaction states |
| **JavaScript** | Support V2 download-menu interactions such as dismissal and keyboard behavior |
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

The latest landing-screen order is **About Me**, **My Blog**, **Resume & Portfolio**, **Code & Projects**, **Guides & Articles**, and **Talks & Presentations**. Search was considered and explicitly deferred so the landing screen could be finalized.

Earlier square image cards and several navigation treatments were explored and then superseded through review. The [V2 requirements](https://github.com/johnapaz/johnapaz.github.io/wiki/V2-Requirements) and [prototype implementation notes](https://github.com/johnapaz/johnapaz.github.io/blob/landing-screen-tiles/docs/v2-homepage-prototype.md) preserve that evolution, including validation results and limitations.

AI has assisted with implementation, troubleshooting, documentation, and verification. Its proposals are not automatically approved design requirements, and generated code is not evidence that an experience has been reviewed on a real device.

## How changes reach the site

V2 source changes run a staging build validation workflow. The separate staging repository reads `v2` and publishes through GitHub Actions, either manually or on its scheduled refresh. Staging overrides the site URL, disables analytics, discourages indexing, and records the source commit in `build-info.json`.

Production promotion is a separate review step: record the reviewed source commit, open a pull request into the production branch, and merge after my approval. The [staging guide](https://github.com/johnapaz/johnapaz.github.io/blob/v2/docs/staging.md) explains configuration, verification, and recovery. Build success, deployment success, and browser/device review are tracked separately.

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

Open [http://localhost:4000](http://localhost:4000). For V2 staging configuration and the build checker, follow the staging guide. The V2 workflow currently uses legacy Ruby 2.7 and Bundler 2.4.22; dependency modernization remains future work. The npm package is not the Jekyll build entry point.

## Project record and credits

The [wiki](https://github.com/johnapaz/johnapaz.github.io/wiki) holds requirements, architecture, decisions, the roadmap, and the development journal. [Issues](https://github.com/johnapaz/johnapaz.github.io/issues?q=is%3Aissue%20state%3Aopen%20sort%3Aupdated-desc) provide the changing backlog; commits and pull requests connect that record to implementation.

Theme and repository licensing details are in [LICENSE.md](LICENSE.md).
