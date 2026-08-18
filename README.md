# Codeninja portfolio site

A simple, no-backend portfolio site built with React + Vite. It reads all of its content
from a single file, [`src/data/projects.json`](src/data/projects.json) — that is the only
file you should normally need to touch. (`src/data/projects.js` just imports it and
documents the fields — the data itself lives in the `.json` file.)

## Updating the site (the day-to-day workflow)

Either edit `projects.json` directly, or edit `scripts/projects.xlsx` and regenerate it —
see [`scripts/README.md`](scripts/README.md) for the spreadsheet workflow.

1. Open `src/data/projects.json` in any text editor.
2. Copy an existing project object, paste it as a new entry (or edit one in place).
3. If you have a screenshot, drop it into `public/images/` (ideally under ~200 KB — resize
   and export as `.webp` if you can) and set `"image": "yourfile.webp"`. If you don't have
   one yet, leave `"image": null` and the card will show a plain placeholder instead.
4. Save, commit, and push to `main`. GitHub Actions takes it from there — see below.

You never need to run a build yourself, install anything, or touch React/CSS for a normal
content update.

## What "build pipeline" means here, in plain terms

This site is written in a form (React components) that a browser can't run directly — it
first needs to be "built" into a folder of plain HTML/CSS/JS. Locally that's the `npm run
build` command; on GitHub it happens automatically.

`.github/workflows/deploy.yml` defines a **GitHub Actions workflow**: a script that GitHub
runs for you in the cloud every time you push to the `main` branch. It:

1. Checks out your repository.
2. Installs the project's dependencies (`npm ci`).
3. Runs the build (`npm run build`), which produces a `dist/` folder of static files.
4. Publishes that `dist/` folder to GitHub Pages.

You can watch it run under the **Actions** tab of the repository on GitHub.com. A green
check means the site is live; a red cross means something broke — click into the run to
see the error.

## One-time setup

1. Create a new (public) repository on GitHub, e.g. `portfolio` — any name works, the site
   doesn't care what the repo is called.
2. Push this folder to it:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/general-ackbar/<your-repo-name>.git
   git push -u origin main
   ```

3. On GitHub, go to the repository's **Settings → Pages**, and under "Build and
   deployment → Source", choose **GitHub Actions** (not "Deploy from a branch").
4. Push (or re-run the workflow from the **Actions** tab). After a minute or two, the site
   will be live at `https://general-ackbar.github.io/<your-repo-name>/`.

From then on, every push to `main` automatically rebuilds and redeploys the site — there is
nothing to run manually.

## Running it locally (optional, only if you want to preview before pushing)

```bash
npm install   # first time only
npm run dev   # starts a local preview at http://localhost:5173
```

`npm install` downloads the project's dependencies into a `node_modules/` folder (already
excluded via `.gitignore` — never commit it). `npm run dev` starts a local server that
live-reloads as you edit files, so you can check a change before pushing it.

## Project status

This is a first draft generated from an inventory spreadsheet, not a finished site. A number
of projects are intentionally incomplete:

- Cards with no image show a plain placeholder tile.
- Cards with no description say "Description coming soon."
- Links that aren't ready yet show as a greyed-out "coming soon" label instead of a real
  link.

Fill these in over time directly in `src/data/projects.json` — there's no rush and no
technical step involved beyond editing text and (optionally) adding an image file.
