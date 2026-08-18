# scripts/

Personal tooling, not part of the built site.

## xlsx_to_json.py

Regenerates `src/data/projects.json` from a spreadsheet. `scripts/projects.xlsx`
is a working copy generated from the current data — edit it directly, or keep
it wherever you prefer and pass the path in.

```bash
python3 scripts/xlsx_to_json.py scripts/projects.xlsx
```

Second argument is the output path, defaults to `src/data/projects.json`.

Columns: `id, title, platform, tags, status, description, image, links`

- `tags` — comma-separated: `Game, NFT`
- `links` — semicolon-separated `Label|URL` pairs:
  `App Store|https://apps.apple.com/...;GitHub|https://github.com/...`
  A label with no `|URL` (e.g. `Link coming soon`) becomes a disabled
  "coming soon" badge instead of a link.
- `description` / `image` — blank cell = `null` = placeholder on the card.

Requires `openpyxl` (`pip install openpyxl` if it's not already there).

No validation. Garbage in, garbage in `projects.json` — check the diff before
committing.
