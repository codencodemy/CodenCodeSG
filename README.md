# codencode.sg

Static HTML/CSS/JS site for codencode.sg (Singapore coding & AI academy) — no build step, no framework.

**Design closely mirrors [codencode.my](https://codencode.my/)** (the Malaysia sister site): same "bordered grid-line terminal" aesthetic, same fonts (Syne display + Space Mono monospace), same Font Awesome icon set, same component classes (`.wcard3`, `.ccard`, `.roadmap`/`.phase`, `.faq-q`/`.faq-a`, etc.), same JS behaviors (theme toggle, FAQ accordion, course-slider drag, path filter tabs, WhatsApp float button). Content is Singapore-localised per the mapping rules below — nothing MY-specific was translated, it was replaced or removed.

## Structure
```
index.html                              Home
python-course-singapore/index.html      Python course landing page
cybersecurity-course-singapore/index.html  Cybersecurity course landing page
ai-course-singapore/index.html          Vibe Coding, Machine Learning & AI workshops
paths.html                              Career Paths (6 roadmaps, client-side filter tabs)
compare.html                            Compare vs other SG providers
404.html                                Not-found page (noindex)
css/style.css  js/main.js               Design system + interactivity
logo/                                   codencode.sg pixel wordmark (dark/light, 1x/2x/xl) + favicons
assets/og-cover.png                     1200x630 social share image
llms.txt  robots.txt  sitemap.xml  manifest.webmanifest
```

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

## ⚠️ Still needed (placeholders were removed from public pages, add these when confirmed)
1. ~~WhatsApp Business number~~ — done: `+65 8321 6288`.
2. **Legal entity name + UEN** — add to footers and to the Organization JSON-LD (`legalName`, `taxID`).
3. **Workshop venue address** — pages say "venue details via WhatsApp"; add a `Place`/`PostalAddress` to JSON-LD once known.
4. **Trainers** — names/bios reused from codencode.my; confirm they teach codencode.sg cohorts.
5. **Social profiles + Google Business Profile** — add URLs to the footer and to `sameAs` in the Organization JSON-LD.
6. **Email** — `hello@codencode.sg` is shown in the footer; confirm the mailbox exists.
7. **SkillsFuture/SSG/WSQ funding** — still worded as "being confirmed".
8. **Student count / reviews** — no numbers are claimed until verified.

## Sourced data (already verified, not placeholders)
- `/compare.html` competitor facts (General Assembly Singapore, Le Wagon Singapore, NUS-ISS SCTP, NTUC LearningHub, Heicoders Academy) — sourced via web search 9 Aug 2026; re-verify periodically, date noted on the page itself.
- `/paths.html` salary bands — sourced from MOM Occupational Wages Survey, Glassdoor SG, PayScale SG and SkillUp SG salary guides, 2026.

## Language strategy
Teaching languages are English, 中文 (Mandarin), Bahasa Melayu **and Tamil** (per user decision — all 4 SG official languages get equal billing in the hero rotator and "Why codencode" trilingual card). Adjust the 4th `.lflag-item`/`.lpill` entries and FAQ language answer in `index.html` if this should change.

## Known environment quirk (fixed)
The original codencode.my CSS transitions the `background` **shorthand** driven by a CSS custom property (`background: var(--bg); transition: background .25s`). This is valid CSS, but proved unreliable for triggering a repaint in at least one headless-browser test environment. This site's CSS uses `background-color` (longhand) with no transition on the theme-driven background properties (`body`, `footer`, `.topnav`) to guarantee instant, correct theme switching everywhere.
