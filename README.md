# Gaurisha Malhotra — Portfolio

A static, single-page editorial portfolio for a strategic communications specialist
in the social-development / nonprofit sector.

**Concept.** The site is designed as an *editorial field notebook*: the work is
organized not as a flat gallery but by the **beats** (themes) it serves, presented
like the index of a publication, with datelines showing where the reporting is set.

## Design language
- **Type:** Fraunces (display serif) · Inter (body) · IBM Plex Mono (labels)
- **Palette:** warm "paper" neutrals with a burnt-sienna accent and sari-blue /
  golden-hour secondaries — drawn from the subject's own field photography, to
  avoid generic nonprofit-blue and stock imagery.
- Light **and** dark themes (respects `prefers-color-scheme`, with a manual toggle).

## Structure
```
index.html      – the page (content rendered server-static for SEO/accessibility)
styles.css      – design system + responsive layout
script.js       – theme toggle, filterable index, scroll reveals, count-up, rotator
favicon.svg     – GM monogram
assets/         – portrait, field cover, film stills
.nojekyll       – serve files as-is on GitHub Pages
```

## Run locally
Just open `index.html`, or serve the folder:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy (GitHub Pages)
This repo is `gaurisha-malhotra.github.io`, so pushing to the default branch
publishes to `https://gaurisha-malhotra.github.io/`. No build step required.

---
Content sourced from Gaurisha Malhotra's profile. Beat/geography tagging is an
editorial categorization of the published work.
