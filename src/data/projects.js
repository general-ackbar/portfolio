// ---------------------------------------------------------------------------
// The actual project data lives in ./projects.json — edit that file (by hand,
// or by regenerating it from a spreadsheet with scripts/xlsx_to_json.py, see
// scripts/README.md).
//
// Fields:
//   id          unique slug, lowercase-with-dashes (used as the React key)
//   title       display name
//   platform    short platform label, e.g. "iOS", "macOS (CLI)", "NES"
//   tags        array of short category strings, used for the filter chips.
//               Keep the vocabulary small so the filter row stays short.
//   status      "released" | "wip" | "retired"
//   description short text (2-4 sentences), or null to show a
//               "description coming soon" placeholder on the card instead.
//   image       filename of an image placed in /public/images/, or null to
//               show a plain placeholder tile instead. Recommended size:
//               roughly 900px wide, .webp format (keeps the site fast).
//   links       array of { label, url }. Use url: null for a link that
//               isn't ready yet — it will render as a disabled
//               "coming soon" badge instead of a clickable link.
// ---------------------------------------------------------------------------

import PROJECTS_DATA from "./projects.json";

export const PROJECTS = PROJECTS_DATA;
