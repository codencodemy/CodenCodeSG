# codencode.sg

Static HTML/CSS/JS site for codencode.sg (Singapore coding & AI academy) — no build step, no framework.

**Design closely mirrors [codencode.my](https://codencode.my/)** (the Malaysia sister site): same "bordered grid-line terminal" aesthetic, same fonts (Syne display + Space Mono monospace), same Font Awesome icon set, same component classes (`.wcard3`, `.ccard`, `.roadmap`/`.phase`, `.faq-q`/`.faq-a`, etc.), same JS behaviors (theme toggle, FAQ accordion, course-slider drag, path filter tabs, WhatsApp float button). Content is Singapore-localised per the mapping rules below — nothing MY-specific was translated, it was replaced or removed.

## Structure
```
index.html      Home
paths.html      Career Paths (6 roadmaps, client-side filter tabs)
compare.html    Compare vs other SG providers
css/style.css   Design system (dark "grid-line terminal" theme + light toggle)
js/main.js      Theme toggle, FAQ accordion, mobile nav, course-slider drag, path filters
robots.txt
sitemap.xml
```

## Run locally
```bash
npx serve .
```
or open `index.html` directly in a browser — all paths are relative, no server required.

## Deploy
Drop the whole folder onto any static host (Vercel, Netlify, GitHub Pages, S3+CloudFront). No build command needed.

## ⚠️ Unresolved placeholders (search for `TODO` / `TODO(confirm)` in the HTML)
1. **WhatsApp Business number** — currently `+65 8000 0000` / `wa.me/6580000000` everywhere. Find-and-replace `6580000000` site-wide.
2. **Legal entity name + UEN** — footer on all 3 pages.
3. **Workshop venue address** — Workshops section, "AI Workshop Singapore" card, and workshop meta chips.
4. **Trainer names, photos & bios** — currently generic role-based placeholders with initials avatars ("PY" / "VC"), no fabricated names.
5. **Social handles** — Facebook/LinkedIn links in the footer and contact section.
6. **Google Business Profile review link** — contact section "Read Our Google Reviews" button.
7. **SkillsFuture/SSG/WSQ funding eligibility for codencode.sg's own courses** — flagged as "being confirmed" everywhere it's mentioned; do not claim funding eligibility until verified with SSG.
8. **Hero "50+ Students" stat** — marked with `*`; this is a placeholder number, not a verified claim.
9. **OG share image** (`/assets/og-cover.jpg`) referenced in meta tags is not present — add a real image or update the path.

## Sourced data (already verified, not placeholders)
- `/compare.html` competitor facts (General Assembly Singapore, Le Wagon Singapore, NUS-ISS SCTP, NTUC LearningHub, Heicoders Academy) — sourced via web search 9 Aug 2026; re-verify periodically, date noted on the page itself.
- `/paths.html` salary bands — sourced from MOM Occupational Wages Survey, Glassdoor SG, PayScale SG and SkillUp SG salary guides, 2026.

## Language strategy
Teaching languages are English, 中文 (Mandarin), Bahasa Melayu **and Tamil** (per user decision — all 4 SG official languages get equal billing in the hero rotator and "Why codencode" trilingual card). Adjust the 4th `.lflag-item`/`.lpill` entries and FAQ language answer in `index.html` if this should change.

## Known environment quirk (fixed)
The original codencode.my CSS transitions the `background` **shorthand** driven by a CSS custom property (`background: var(--bg); transition: background .25s`). This is valid CSS, but proved unreliable for triggering a repaint in at least one headless-browser test environment. This site's CSS uses `background-color` (longhand) with no transition on the theme-driven background properties (`body`, `footer`, `.topnav`) to guarantee instant, correct theme switching everywhere.
