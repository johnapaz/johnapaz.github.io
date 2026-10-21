# Branch audit — October 21, 2026

Baseline: `main` at `72042e20a8fa5f579793038ac08815719b55b774`. Feature work branches from this production baseline as `feat/66-exclude-own-traffic`, with a PR back to `main`. No existing branch has been repointed or deleted. There were no open PRs at inspection; branch names alone do not establish whether another session is using one.

| Branch | Finding / disposition |
| --- | --- |
| `Ver2` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `about-page-preview` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `admin-activation-preview` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `admin-analytics-kickoff` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `admin-dashboard-preview` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `analytics-nav-preview` | Keep/review: contains unique history; do not delete by name |
| `analytics-production` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `chore/template-cleanup` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `coding-projects-media-preview` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `dark-darker-preview` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `docu` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `final-polish-preview` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `landing-screen-tiles` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `launch-v2` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `main` | Keep: production/integration or reserved Mentoring work |
| `mobile-nav-overlay-preview` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `professional-overview-preview` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `resume-story-preview` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `shared-tile-hover-preview` | Keep/review: contains unique history; do not delete by name |
| `toolbar-centered-preview` | Retirement candidate: ancestor of main; confirm no active session or staging reference first |
| `v2` | Keep: production/integration or reserved Mentoring work |
| `v2.1` | Keep: production/integration or reserved Mentoring work |

Preserve `main`, `v2`, and `v2.1`. The saved staging source at inspection is the exact commit `4fd49e45ea77bd59ed82ebb6b539e705a9b6c4de`. It must be read afresh before previewing or removing a branch. Use an exact-commit one-run override for review, then restore the saved source. #55 retains cross-session branch retirement and dependency modernization. Remote deletion remains pending confirmation of active use and suitable authenticated Git access; this scoped change does not erase unique work or fold legacy experiments into production.

Local cleanup: generated protected dashboard assets remain ignored under `backend/admin/public/`; no npm dependencies, screenshots, credentials or build output are committed. Release tags are separate from feature branches and are created only after approved publication. Only historical `Ver1` exists at inspection; do not rename or move it.
