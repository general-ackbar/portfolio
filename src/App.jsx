import { useMemo, useState } from "react";
import { PROJECTS } from "./data/projects.js";
import ProjectCard from "./components/ProjectCard.jsx";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "released", label: "Released" },
  { value: "wip", label: "Work in progress" },
  { value: "retired", label: "Retired" },
];

const SORT_OPTIONS = [
  { value: "default", label: "Unsorted" },
  { value: "title-asc", label: "Title (A–Z)" },
  { value: "title-desc", label: "Title (Z–A)" },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [activeTags, setActiveTags] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  const allTags = useMemo(() => {
    const set = new Set();
    PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  function toggleTag(tag) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = PROJECTS.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (activeTags.length > 0 && !activeTags.every((t) => p.tags.includes(t))) return false;
      if (q && !`${p.title} ${p.platform} ${p.description ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    });

    if (sortBy === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }
    // "default" keeps the order projects are listed in projects.js

    return result;
  }, [query, status, activeTags, sortBy]);

  return (
    <div className="page">
      <header className="site-header">
        <h1>Codeninja</h1>
        <p className="site-tagline">Retro-computing tools, games, and other nerdy projects by Aladinsane (Jonatan).</p>
        <p className="site-intro">
          A running collection of things I've built over the years - some are polished, some are 
          works in progress and some retired. Most of it lives on the App Store, itch.io or GitHub. 
          <br />
          <br />
          Disclaimer: this page is built using Claude and some of the product images on the page are AI generated - I don't own that many different Macs.           
        </p>
        <nav className="profile-links">
          <a href="https://github.com/general-ackbar" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href="https://itch.io/profile/aladinsane-dk" target="_blank" rel="noreferrer noopener">
            itch.io
          </a>
          <a href="mailto:info@codeninja.dk">Contact</a>
        </nav>
      </header>

      <section className="filters">
        <div className="search-row">
          <input
            type="search"
            className="search-input"
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search projects"
          />

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort projects"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="status-filter" role="group" aria-label="Filter by status">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`status-filter-btn ${status === opt.value ? "active" : ""}`}
              onClick={() => setStatus(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="tag-filter">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`tag-filter-btn ${activeTags.includes(tag) ? "active" : ""}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <p className="result-count">
        {filtered.length} project{filtered.length === 1 ? "" : "s"}
      </p>

      <main className="project-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {filtered.length === 0 && <p className="empty-state">No projects match those filters.</p>}
      </main>

      <footer className="site-footer">
        <p>Built with React + Vite, hosted on GitHub Pages.</p>
      </footer>
    </div>
  );
}
