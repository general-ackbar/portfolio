#!/usr/bin/env python3
"""
Convert a spreadsheet of projects into src/data/projects.json.

Usage:
    python3 scripts/xlsx_to_json.py path/to/sheet.xlsx [output.json]

    (output.json defaults to src/data/projects.json, relative to cwd —
    run this from the portfolio-site/ root.)

Expected columns (row 1 = headers, matched by name, any order):
    id, title, platform, tags, status, description, image, links

Encoding used in cells:
    tags        comma-separated
                e.g.  Game, NFT

    links       semicolon-separated "Label|URL" pairs
                e.g.  App Store|https://apps.apple.com/...;GitHub|https://github.com/...
                A label with no "|URL" part (e.g. "Link coming soon")
                becomes {"label": "...", "url": None} — renders as a
                disabled/coming-soon badge on the site.

    description / image
                leave the cell blank for null (renders as a placeholder
                on the site).

This is a personal tool, not a general-purpose importer: no validation,
no helpful error messages, no attempt to handle malformed input gracefully.
"""
import sys
import json
import openpyxl


def parse_tags(cell):
    if not cell:
        return []
    return [t.strip() for t in str(cell).split(",") if t.strip()]


def parse_links(cell):
    if not cell:
        return []
    links = []
    for part in str(cell).split(";"):
        part = part.strip()
        if not part:
            continue
        if "|" in part:
            label, url = part.split("|", 1)
            links.append({"label": label.strip(), "url": url.strip() or None})
        else:
            links.append({"label": part, "url": None})
    return links


def cell_or_none(value):
    if value is None:
        return None
    s = str(value).strip()
    return s or None


def main():
    xlsx_path = sys.argv[1]
    out_path = sys.argv[2] if len(sys.argv) > 2 else "src/data/projects.json"

    if not out_path.endswith(".json"):
        sys.exit(f"Refusing to write to '{out_path}' — output path must end in .json "
                  f"(this guards against overwriting projects.js by mistake).")

    wb = openpyxl.load_workbook(xlsx_path)
    ws = wb.active

    rows = list(ws.iter_rows(values_only=True))
    headers = [str(h).strip() for h in rows[0]]
    idx = {h: i for i, h in enumerate(headers)}

    def get(row, name):
        return row[idx[name]] if name in idx else None

    projects = []
    for row in rows[1:]:
        if not row or all(c is None for c in row):
            continue
        projects.append({
            "id": cell_or_none(get(row, "id")),
            "title": cell_or_none(get(row, "title")),
            "platform": cell_or_none(get(row, "platform")),
            "tags": parse_tags(get(row, "tags")),
            "status": cell_or_none(get(row, "status")),
            "description": cell_or_none(get(row, "description")),
            "image": cell_or_none(get(row, "image")),
            "links": parse_links(get(row, "links")),
        })

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(projects, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Wrote {len(projects)} projects to {out_path}")


if __name__ == "__main__":
    main()
