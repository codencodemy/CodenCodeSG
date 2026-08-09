# codencode.sg

Static HTML/CSS/JS site for codencode.sg (Singapore coding & AI academy) — no build step, no framework.

## Structure
```
index.html      Home
paths.html      Career Paths (client-side filter tabs)
compare.html    Compare vs other SG providers
css/style.css   Design system (dark IDE theme + light toggle)
js/main.js      Theme toggle, nav, FAQ accordion, hero/announcement rotators, terminal typing, path filters
robots.txt
sitemap.xml
```

## Run locally
Any static file server works, e.g.:
```bash
npx serve .
```
or just open `index.html` directly in a browser (external CDN fonts/icons will still load).

## Deploy
Drop the whole folder onto any static host (Vercel, Netlify, GitHub Pages, S3+CloudFront). No build command needed — set the output/publish directory to the repo root.

## ⚠️ Unresolved placeholders (search for `TODO(confirm)` in the HTML)
1. **WhatsApp Business number** — currently `+65 8000 0000` / `wa.me/6580000000` everywhere (placeholder). Find-and-replace `6580000000` site-wide once you have the real SG WhatsApp Business number.
2. **Legal entity name + UEN** — footer on all 3 pages.
3. **Workshop venue address** — referenced in the Workshops section and local-SEO "AI workshop Singapore" card on the homepage.
4. **Trainer names, photos & bios** — currently generic role-based placeholders ("Lead Trainer — Data & AI" / "Lead Trainer — Cybersecurity").
5. **Social handles** — Facebook/LinkedIn/Instagram/TikTok links in the footer and contact section are placeholders.
6. **Google Business Profile review link** — contact section "Google Reviews" button.
7. **SkillsFuture/SSG/WSQ funding eligibility for codencode.sg's own courses** — FAQ and compare-table copy flags this as "being confirmed"; do not claim funding eligibility until verified with SSG.
8. **Course pricing** — no SGD figures are published; all course/workshop cards route straight to WhatsApp for a quote.
9. **OG share image** (`/assets/og-cover.jpg`) and **logo** (`/assets/logo.png`) referenced in meta tags / JSON-LD are not present — add real image assets at those paths or update the paths.

## Sourced data (already verified, not placeholders)
- `/compare.html` competitor facts (General Assembly, Le Wagon, NUS-ISS SCTP, NTUC LearningHub, Heicoders) — sourced via web search 6 Aug 2026; re-verify periodically, dates are noted on the page itself.
- `/paths.html` salary bands — sourced from MOM Occupational Wages Survey, Glassdoor SG, PayScale SG and SkillUp SG salary guides, 2026.

## Language strategy
Teaching languages are English, 中文 (Mandarin), Bahasa Melayu **and Tamil** (per user decision — all 4 SG official languages get a hero rotator entry; Tamil beyond the hero rotator is still WhatsApp-supported rather than a full teaching track, matching the FAQ copy). Adjust `js/main.js` → `rotatorPhrases` and the FAQ language answer if this should change.
