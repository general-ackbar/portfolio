const STATUS_LABEL = {
  released: "Released",
  wip: "Work in progress",
  retired: "Retired",
};

function initials(title) {
  return title
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function ProjectCard({ project }) {
  const { title, platform, tags, status, description, image, links } = project;

  return (
    <article className="card">
      <div className="card-media">
        {image ? (
          <img src={`images/${image}`} alt={`${title} screenshot`} loading="lazy" />
        ) : (
          <div className="card-media-placeholder" aria-hidden="true">
            <span>{initials(title)}</span>
          </div>
        )}
        <span className={`status-badge status-${status}`}>{STATUS_LABEL[status] ?? status}</span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-platform">{platform}</p>

        {description ? (
          <p className="card-description">{description}</p>
        ) : (
          <p className="card-description card-description-missing">Description coming soon.</p>
        )}

        <div className="card-tags">
          {tags.map((t) => (
            <span className="tag-pill" key={t}>
              {t}
            </span>
          ))}
        </div>

        {links && links.length > 0 && (
          <div className="card-links">
            {links.map((l) =>
              l.url ? (
                <a key={l.label} href={l.url} target="_blank" rel="noreferrer noopener" className="card-link">
                  {l.label} &rarr;
                </a>
              ) : (
                <span key={l.label} className="card-link card-link-disabled">
                  {l.label}
                </span>
              )
            )}
          </div>
        )}
      </div>
    </article>
  );
}
