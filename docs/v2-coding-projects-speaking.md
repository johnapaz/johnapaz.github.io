# Coding, Projects, Talks, and Media — October 1, 2026

Request: complete the remaining portfolio pages with Coding/Projects paired like Articles/Blog, and recover missing talks, podcasts, interviews, and articles mentioning John. Tracked in #41.

## Experience

- `/coding/`: a tiled repository catalog with technology badges; `/projects/`: a single-column view of challenges, John's contributions, and results. Four selected project stories, two public code repositories. Tabs work as ordinary links without JavaScript.
- `/presentations/`: 16 talk, panel, student-session, and slide-deck records, with a featured belonging story. `/media/`: seven podcast, interview, and press records. The second pair of tabs separates the speaking archive from conversations and coverage.
- `/my-story/`: preserve the original URL while replacing the duplicated table and incorrect links with a readable history of four belonging talks. Two lazy, privacy-enhanced YouTube embeds; Button 2020 has no recovered recording, and Confab links to the actual session page.
- Reuse the approved Writing catalog controls, six-card pagination, reduced motion, keyboard focus, empty/reset states, and no-JavaScript fallback. Search and filter stay collapsed by default. Extend the catalog script only to support honest item labels; Writing behavior remains unchanged.
- Homepage Code & Projects now opens the site hub. Work links to both new hubs and media. Keep existing primary navigation and downloads.

## Provenance and editorial rules

Public repositories and the existing portfolio packet ground project claims. The Confluence repository README distinguishes the original tools used by six teammates, saving hundreds of hours, from the sanitized public reconstruction (offline tests, no live Confluence integration test). Preserve that distinction. The developer packet describes separating object hydration from the API proxy module and partnering with an engineer on examples; use those specific facts.

The archive is a recovered selection, not a claim to contain every appearance. Titles/years come from host pages, John's published portfolio, or his existing site. Do not invent exact dates for year-only entries or infer an event date from a slide upload. Undated slide decks sort after dated appearances. Host and topical badges are searchable, format is filterable. Podcast, interview, and press records are distinct: a quoted article is not a guest appearance.

| Records | Evidence / destination |
| --- | --- |
| Summit 2019; Design Week 2019 | Existing `/my-story/` source; videos `iRljzL8Qx78` and `DQKkYzL0sFM`; 2022 Content Design Manager portfolio |
| Button keynote 2020 | Existing source and 2022 portfolio; recording not recovered. Do not substitute the Summit recording. |
| Confab keynote 2021 | https://www.confabevents.com/2021-segments/the-pipeline-problem-is-about-belonging |
| Button talk and breakout 2022 | https://button-2022.webflow.io/2022-recap and the individual linked session pages. Breakout explicitly not recorded. |
| Managing with empathy, for impact | https://workingincontent.com/resources/managing-with-empathy ; event year 2022, not the later article publication date |
| Six slide decks | https://www.slideshare.net/johnapaz ; direct deck URLs recovered for Team Playbook, Real-World Scale, and Innovation; three records honestly link to the author's slide archive |
| Three UCF sessions | https://futuretechnicalcommunicators.com/2022/06/ftcs-year-in-review-2021-2022/ ; recap links to the club's recording channel |
| Manuscript episodes 18 and 19 | https://www.ivoox.com/en/18-building-a-career-in-tech-writing-audios-mp3_rf_66952117_1.html ; https://www.ivoox.com/en/19-training-mentorship-and-diversity-for-writers-in-audios-mp3_rf_67582932_1.html |
| Not-Boring Tech Writer, Skill 21 | 2022 portfolio; archived episode listing and Hackmamba's linked discussion. Original Podbean endpoint now leads to login/unavailable site; use the article discussion, label the action accordingly. |
| Tom Johnson interview | https://idratherbewriting.com/blog/diversity-in-tech-comm-conversation-with-john-paz/ |
| POCIT interview | https://peopleofcolorintech.com/writers/atlassians-john-a-paz-on-being-a-technical-writer-a-young-parent-and-a-fan-of-blacktechtwitter/ |
| Hackmamba press mention | https://hackmamba.io/technical-writing/mentorship-platforms-for-technical-writers/ |
| UCF press mention | https://futuretechnicalcommunicators.com/2022/02/tech-comm-jobs-and-where-to-find-them/ |

Excluded same-name results include the wrestling podcast host, Godwin Pumps executive, Nuvia founder, and unrelated academic papers. No employer endorsement implied.

## Maintenance

Edit `_data/portfolio.yml` to add/revise records. Each catalog record requires title, category, description, source, URL, action, and date (empty if unknown); use date_label for a display year without fabricating an exact date. Tags hold search terms. `belonging: true` includes a record on the preserved story page; `video` supplies an explicitly verified YouTube ID. Project stories carry challenge/contribution/result and optional secondary links. No package or framework dependency was added.

## Validation

Local Liquid/Sass rendering for all five new/replaced pages and Writing; JavaScript syntax and whitespace checks. Canonical safe Jekyll CI, staging deployment, browser interactions and responsive review recorded in the completion entry. Ruby/Bundler are absent from this execution workspace; CI provides the canonical build.
