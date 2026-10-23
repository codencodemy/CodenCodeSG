# codencode.sg

Static HTML/CSS/JS site for codencode.sg (Singapore coding & AI academy) — no build step, no framework.

**Design closely mirrors [codencode.my](https://codencode.my/)** (the Malaysia sister site): same "bordered grid-line terminal" aesthetic, same fonts (Syne display + Space Mono monospace), same Font Awesome icon set, same component classes (`.wcard3`, `.ccard`, `.roadmap`/`.phase`, `.faq-q`/`.faq-a`, etc.), same JS behaviors (theme toggle, FAQ accordion, course-slider drag, path filter tabs, WhatsApp float button). Content is Singapore-localised per the mapping rules below — nothing MY-specific was translated, it was replaced or removed.

## Structure
```
index.html                                Home — Learn AI. Build AI. Lead with AI. (6-level pathway + corporate)
ai-curriculum/index.html                  AI curriculum overview (CC-AI01 to CC-AI06, assessment model)
ai-curriculum/cc-ai0X-*/index.html        One page per level (Explorer, Creator, Developer, Builder, Engineer, Leader)
corporate-ai-training/index.html          6 corporate AI programmes, delivery formats, session structure
paths.html  compare.html                  Career roadmaps; comparison with other SG providers
python-course-singapore/  ai-course-singapore/  cybersecurity-course-singapore/
                                          Redirects from the old course pages (kept so indexed links keep working)
404.html                                  Not-found page (noindex)
css/style.css  js/main.js                 Design system + interactivity
logo/  assets/                            Wordmarks, favicons, OG image, trainer photos
llms.txt  robots.txt  sitemap.xml  manifest.webmanifest  BingSiteAuth.xml
```

Content source: *CodenCode AI Academy Curriculum Blueprint* (6-level framework + corporate AI programmes).

## SEO / AEO / GEO
- Every page: unique title + description, canonical, hreflang en-SG, geo meta (SG), Open Graph + Twitter cards, favicons, JSON-LD `@graph` (EducationalOrganization, WebSite, WebPage, BreadcrumbList, Course, FAQPage).
- Visible FAQ text matches the FAQPage JSON-LD on each page.
- `llms.txt` summarises the academy for AI answer engines; `robots.txt` explicitly allows search and AI crawlers.
- Update `lastmod` in `sitemap.xml` and "Last updated" dates when content changes.

## Run locally
```bash
npx serve .
```
or open `index.html` directly in a browser — all paths are relative, no server required.

## Deploy
Drop the whole folder onto any static host (Vercel, Netlify, GitHub Pages, S3+CloudFront). No build command needed.

## Sourced data
- `/compare.html` competitor facts (General Assembly Singapore, Le Wagon Singapore, NUS-ISS SCTP, NTUC LearningHub, Heicoders Academy) — sourced via web search 9 Aug 2026; re-verify periodically, date noted on the page itself.
- `/paths.html` salary bands — sourced from MOM Occupational Wages Survey, Glassdoor SG, PayScale SG and SkillUp SG salary guides, 2026.

## Language strategy
Teaching languages are English, 中文 (Mandarin), Bahasa Melayu **and Tamil** (per user decision — all 4 SG official languages get equal billing in the hero rotator and "Why codencode" trilingual card). Adjust the 4th `.lflag-item`/`.lpill` entries and FAQ language answer in `index.html` if this should change.

## Known environment quirk (fixed)
The original codencode.my CSS transitions the `background` **shorthand** driven by a CSS custom property (`background: var(--bg); transition: background .25s`). This is valid CSS, but proved unreliable for triggering a repaint in at least one headless-browser test environment. This site's CSS uses `background-color` (longhand) with no transition on the theme-driven background properties (`body`, `footer`, `.topnav`) to guarantee instant, correct theme switching everywhere.
