import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjects } from "../../api/projectApi";
import BackLink from "../common/BackLink";
import SectionHeader from "../common/SectionHeader";
import { createReturnState } from "../../utils/navigation";

const categories = [
  { label: "Robotics", matches: /\brobot(?:ics)?\b|mechanic|motor|robotic arm|rc car/i },
  { label: "Coding", matches: /\bcod(?:e|ing|er)\b|programming|python|logic/i },
  { label: "Electronics", matches: /electronic|circuit|sensor|arduino|led|switch|counter|traffic/i },
  { label: "AI & IoT", matches: /artificial intelligence|\bai\b|\biot\b|smart|connected|automation|goggles/i },
];

const isUsableImageUrl = (url) => {
  if (!url || !url.trim()) return false;

  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

const truncateDescription = (description, maxLength = 150) => {
  const text = (description || "").trim();
  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text;
};

const getProjectCategories = (project) => {
  const searchable = [project.title, project.skills, project.description].filter(Boolean).join(" ");
  return categories.filter((category) => category.matches.test(searchable)).map((category) => category.label);
};

const createProjectImage = (title, difficulty = "Project") => {
  const label = (title || "Project").replace(/\s+/g, " ").trim();
  const lower = label.toLowerCase();

  let icon = "⚙️";
  let theme = "#27272a";
  if (lower.includes("traffic") || lower.includes("signal")) {
    icon = "🚦";
    theme = "#1f2937";
  } else if (lower.includes("plant") || lower.includes("garden") || lower.includes("watering")) {
    icon = "🌱";
    theme = "#14532d";
  } else if (lower.includes("joystick") || lower.includes("football") || lower.includes("goalkeeper") || lower.includes("robot")) {
    icon = "🤖";
    theme = "#3f3f46";
  } else if (lower.includes("iot") || lower.includes("smart") || lower.includes("system")) {
    icon = "📡";
    theme = "#0f172a";
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="675" viewBox="0 0 900 675">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#111827"/>
          <stop offset="100%" stop-color="${theme}"/>
        </linearGradient>
      </defs>
      <rect width="900" height="675" fill="url(#g)"/>
      <circle cx="760" cy="120" r="110" fill="rgba(255,255,255,0.08)"/>
      <circle cx="160" cy="520" r="170" fill="rgba(255,255,255,0.06)"/>
      <rect x="70" y="70" width="760" height="535" rx="28" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)"/>
      <text x="450" y="330" text-anchor="middle" font-size="180" fill="#f4f4f5" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif">${icon}</text>
      <text x="450" y="420" text-anchor="middle" font-size="28" fill="#d4d4d8" font-family="Arial, sans-serif" letter-spacing="3">${(difficulty || "PROJECT").toUpperCase()}</text>
      <text x="450" y="485" text-anchor="middle" font-size="28" fill="#fafafa" font-family="Arial, sans-serif">${label.slice(0, 26)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

function ProjectPreview({ project, onClose, returnState }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll("a[href], button:not(:disabled)");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-preview-title"
        className="my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-950 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Project preview</p>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close project preview" className="rounded-full border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-zinc-800">
            Close
          </button>
        </div>
        <div className="aspect-[16/9] bg-white">
          <img
            src={project.listImageUrl}
            alt={project.title}
            className="h-full w-full object-contain p-3"
            onError={(event) => {
              if (!event.currentTarget.dataset.fallback) {
                event.currentTarget.dataset.fallback = "true";
                event.currentTarget.src = createProjectImage(project.title, project.difficulty);
              }
            }}
          />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider text-zinc-300">
            {project.difficulty && <span className="rounded-full border border-zinc-700 px-3 py-1">{project.difficulty}</span>}
            {project.gradeRange && <span className="rounded-full border border-zinc-700 px-3 py-1">{project.gradeRange}</span>}
          </div>
          <h2 id="project-preview-title" className="mt-4 text-3xl font-bold">{project.title}</h2>
          <p className="mt-3 leading-7 text-zinc-300">{truncateDescription(project.description, 320)}</p>
          {project.skills && <p className="mt-4 text-sm text-zinc-400">Skills: {project.skills}</p>}
          <Link to={`/projects/${project.slug}`} state={returnState} onClick={onClose} className="btn-primary mt-6">
            Explore full project <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ limit }) {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(location.state?.restoreProjectFilters?.categoryFilter || "All");
  const [difficultyFilter, setDifficultyFilter] = useState(location.state?.restoreProjectFilters?.difficultyFilter || "All");
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [previewProject, setPreviewProject] = useState(null);

  useEffect(() => {
    let active = true;
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        const normalizedProjects = (Array.isArray(data) ? data : [])
          .filter((project) => project)
          .map((project) => ({
            ...project,
            categories: getProjectCategories(project),
            listImageUrl: isUsableImageUrl(project.listImageUrl || project.imageUrl)
              ? project.listImageUrl || project.imageUrl
              : createProjectImage(project.title, project.difficulty),
          }));

        const shuffled = [...normalizedProjects];
        for (let i = shuffled.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        if (active) {
          const visibleProjects = typeof limit === "number" ? shuffled.slice(0, limit) : shuffled;
          setProjects(visibleProjects);
          const restoredSpotlight = visibleProjects.findIndex(
            (project) => project.slug === location.state?.restoreProjectFilters?.spotlightSlug
          );
          if (restoredSpotlight >= 0) setSpotlightIndex(restoredSpotlight);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
        if (active) setError("Unable to load student projects right now.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProjects();
    return () => {
      active = false;
    };
  }, [limit, location.state]);

  const difficulties = [...new Set(projects.map((project) => project.difficulty).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  const filteredProjects = projects.filter((project) => (
    (categoryFilter === "All" || project.categories.includes(categoryFilter))
    && (difficultyFilter === "All" || project.difficulty === difficultyFilter)
  ));
  const spotlightProject = filteredProjects.length
    ? filteredProjects[spotlightIndex % filteredProjects.length]
    : null;
  const projectReturnState = createReturnState(location, {
    hash: location.pathname === "/" ? "#project-showcase" : location.hash,
    label: "projects",
    projectFilters: !limit ? {
      categoryFilter,
      difficultyFilter,
      spotlightSlug: filteredProjects[spotlightIndex % Math.max(filteredProjects.length, 1)]?.slug,
    } : undefined,
  });

  const selectFilter = (setter, value) => {
    setter(value);
    setSpotlightIndex(0);
  };

  return (
    <section id="project-showcase" className="section scroll-mt-24 bg-zinc-950 text-white">
      <div className="container-shell">
        {!limit && location.state?.returnTo && (
          <BackLink fallbackTo="/" fallbackLabel="home" className="mb-8 inline-flex min-h-11 items-center text-sm font-medium text-zinc-400 transition hover:text-white" />
        )}
        <SectionHeader
          eyebrow="STUDENT PROJECTS"
          title="What will your students build?"
          text="Real projects make learning visible. Every project connects concepts to a tangible outcome."
        />

        {loading ? (
          <div className="py-10 text-center text-zinc-400" role="status">Loading projects...</div>
        ) : error ? (
          <div className="py-10 text-center text-zinc-300" role="alert">{error}</div>
        ) : projects.length === 0 ? (
          <div className="py-10 text-center text-zinc-400">No projects available yet.</div>
        ) : (
          <>
            {!limit && (
              <div className="mb-12 grid gap-8 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Build spotlight</p>
                  <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Pick a project. See the learning.</h2>
                  <p className="mt-3 leading-7 text-zinc-400">Explore real student builds and the skills, age groups, and ideas behind them.</p>
                  <div role="group" aria-label="Choose a project to explore" className="mt-6 flex flex-wrap gap-2">
                    {filteredProjects.map((project, index) => (
                      <button
                        key={project.id || project.slug}
                        type="button"
                        aria-pressed={index === spotlightIndex % filteredProjects.length}
                        aria-controls="project-spotlight-panel"
                        onClick={() => setSpotlightIndex(index)}
                        className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 aria-selected:border-white aria-selected:bg-white aria-selected:text-zinc-950"
                      >
                        {project.title}
                      </button>
                    ))}
                  </div>
                </div>
                {spotlightProject && (
                  <motion.div
                    key={spotlightProject.id || spotlightProject.slug}
                    id="project-spotlight-panel"
                    aria-label={`${spotlightProject.title} learning spotlight`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950"
                  >
                    <div className="aspect-[16/9] bg-white">
                      <img
                        src={spotlightProject.listImageUrl}
                        alt={spotlightProject.title}
                        className="h-full w-full object-contain p-3"
                        onError={(event) => {
                          if (!event.currentTarget.dataset.fallback) {
                            event.currentTarget.dataset.fallback = "true";
                            event.currentTarget.src = createProjectImage(spotlightProject.title, spotlightProject.difficulty);
                          }
                        }}
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider text-zinc-400">
                        {spotlightProject.gradeRange && <span>{spotlightProject.gradeRange}</span>}
                        {spotlightProject.difficulty && <span aria-hidden="true">·</span>}
                        {spotlightProject.difficulty && <span>{spotlightProject.difficulty}</span>}
                      </div>
                      <h3 className="mt-2 text-xl font-bold">{spotlightProject.title}</h3>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">What students learn</p>
                      <p className="mt-2 leading-7 text-zinc-400">{truncateDescription(spotlightProject.description, 220)}</p>
                      {spotlightProject.skills && <p className="mt-3 text-sm text-zinc-300">Skills in action: {spotlightProject.skills}</p>}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {!limit && (
              <div className="mb-8 space-y-5">
                <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">Explore by area</h2>
                  <div className="flex flex-wrap gap-2" aria-label="Filter projects by area">
                    {["All", ...categories.map((category) => category.label)].map((category) => (
                      <button
                        key={category}
                        type="button"
                        aria-pressed={categoryFilter === category}
                        onClick={() => selectFilter(setCategoryFilter, category)}
                        className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 aria-pressed:border-white aria-pressed:bg-white aria-pressed:text-zinc-950"
                      >
                        {category === "All" ? "All areas" : category}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">Filter by difficulty</h2>
                    <p className="mt-1 text-sm text-zinc-500">Choose the challenge level that fits your students.</p>
                  </div>
                  <label className="sr-only" htmlFor="project-difficulty-filter">Filter projects by difficulty</label>
                  <select
                    id="project-difficulty-filter"
                    value={difficultyFilter}
                    onChange={(event) => selectFilter(setDifficultyFilter, event.target.value)}
                    className="min-h-11 rounded-full border border-zinc-700 bg-zinc-900 px-4 text-sm text-white outline-none transition hover:border-zinc-500 focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <option value="All">All difficulties</option>
                    {difficulties.map((difficulty) => <option key={difficulty} value={difficulty}>{difficulty}</option>)}
                  </select>
                </div>
              </div>
            )}

            <p className="sr-only" aria-live="polite">
              Showing {filteredProjects.length} of {projects.length} projects.
            </p>
            <p className="mb-4 text-sm text-zinc-500" aria-hidden="true">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
            {filteredProjects.length === 0 ? (
              <p className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">No projects match these filters. Try another area or difficulty.</p>
            ) : (
              <div className="grid gap-5 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id || project.slug}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.35, delay: Math.min(index % 3, 2) * 0.06 }}
                    className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-600"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: "linear-gradient(#a1a1aa 1px, transparent 1px), linear-gradient(90deg, #a1a1aa 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }} />
                      <img
                        src={project.listImageUrl}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full bg-white object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                        onError={(event) => {
                          if (!event.currentTarget.dataset.fallback) {
                            event.currentTarget.dataset.fallback = "true";
                            event.currentTarget.src = createProjectImage(project.title, project.difficulty);
                          }
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-zinc-950/90 to-transparent p-4 pt-12">
                        {project.difficulty && <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white">{project.difficulty}</span>}
                        {project.gradeRange && <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white">{project.gradeRange}</span>}
                      </div>
                    </div>
                    <div className="p-7">
                      {project.categories.length > 0 && (
                        <p className="text-xs uppercase tracking-widest text-zinc-500">{project.categories.join(" · ")}</p>
                      )}
                      <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>
                      <p className="mt-3 min-h-12 text-zinc-400">
                        {project.skills || truncateDescription(project.description)}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link
                          to={`/projects/${project.slug}`}
                          state={projectReturnState}
                          className="inline-flex min-h-11 items-center font-semibold text-white transition hover:gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                          View project <span aria-hidden="true">→</span>
                        </Link>
                        <button type="button" onClick={() => setPreviewProject(project)} aria-haspopup="dialog" className="min-h-11 rounded-full border border-zinc-700 px-4 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800">
                          Quick preview
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {previewProject && (
        <ProjectPreview
          project={previewProject}
          returnState={projectReturnState}
          onClose={() => setPreviewProject(null)}
        />
      )}
    </section>
  );
}
