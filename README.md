# Sameer — Portfolio

A static portfolio site for Sameer (CA Finalist, Article Trainee at VCAS & Co LLP, Founder of KWIK) — showcasing 8 desktop software tools, experience, education and certifications.

Pure static HTML/CSS/JS — no build step, no framework, no dependencies. Deploys as-is.

## Structure

```
index.html          ← homepage
style.css            ← shared styles (colors, fonts, layout — edit here for global changes)
generate.js           ← Node script that generates the pages/ detail pages from data
pages/                ← 21 generated detail pages (projects, experience, education, certifications)
assets/               ← icons/logo
```

## Editing content

- **Global colors / fonts / spacing** → edit the `:root` variables and shared rules in [`style.css`](style.css).
- **Homepage content** (hero copy, cards, sections) → edit [`index.html`](index.html) directly.
- **A project / experience / education / certification detail page** → edit its entry inside [`generate.js`](generate.js), then regenerate:

  ```bash
  node generate.js
  ```

  This rewrites every file in `pages/` from the data in `generate.js`, so don't hand-edit files inside `pages/` — edits there will be overwritten next time the script runs.

## Deploying on Vercel

1. Push this repo to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
3. Framework Preset: **Other** (static site — no build command, no output directory needed).
4. Click **Deploy**.

No environment variables, no build step — it's ready to go as-is.

## Pushing to GitHub

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```
