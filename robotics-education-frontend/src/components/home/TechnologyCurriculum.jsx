import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { getProjects, getTechnologies } from "../../api/projectApi";

const splitSkills = (value) => (value || "")
  .split(/[•,|]/)
  .map((skill) => skill.trim())
  .filter(Boolean);

const truncate = (value, maxLength = 150) => {
  const text = (value || "").trim();
  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text;
};

function ProjectThumbnail({ project }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = project.listImageUrl || project.imageUrl;

  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      {imageUrl && !imageFailed ? (
        <img
          src={imageUrl}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full bg-white object-contain p-3"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <>
          <div className="absolute inset-0 opacity-20" aria-hidden="true" style={{
            backgroundImage: "linear-gradient(#a5f3fc 1px, transparent 1px), linear-gradient(90deg, #a5f3fc 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />
          <span className="relative text-5xl text-cyan-100" aria-hidden="true">✦</span>
        </>
      )}
    </div>
  );
}

function TechnologyCard({ technology, index, onExplore }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.3, delay: (index % 3) * 0.04 }}
      className="technology-curriculum-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-slate-950 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300/70 hover:shadow-lg sm:p-6"
    >
      <button
        type="button"
        onClick={() => onExplore(technology.slug)}
        className="flex flex-1 flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500"
        aria-label={`Explore ${technology.title}`}
      >
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyan-100 via-blue-100 to-violet-100 font-mono text-lg font-bold text-blue-900" aria-hidden="true">
          {technology.icon || "✦"}
        </span>
        <h3 className="mt-4 text-lg font-bold leading-snug">{technology.title}</h3>
        <p className="technology-card-description mt-2 text-sm leading-6 text-slate-600">{technology.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(technology.topics || []).slice(0, 3).map((topic) => (
            <span key={topic} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
              {topic}
            </span>
          ))}
        </div>
      </button>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <button type="button" onClick={() => onExplore(technology.slug)} className="text-sm font-semibold text-blue-800 transition hover:text-cyan-700">
          Explore Technology <span aria-hidden="true">→</span>
        </button>
      </div>
    </motion.article>
  );
}

export default function TechnologyCurriculum() {
  const location = useLocation();
  const [technologies, setTechnologies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingTechnologies, setLoadingTechnologies] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [technologyError, setTechnologyError] = useState("");
  const [projectError, setProjectError] = useState("");
  const [selectedTechnologyId, setSelectedTechnologyId] = useState(
    () => location.state?.restoreTechnologyId || null
  );
  const detailRef = useRef(null);
  const selectedTechnology = technologies.find(({ slug }) => slug === selectedTechnologyId);

  useEffect(() => {
    let active = true;

    getTechnologies()
      .then((data) => {
        if (active) {
          setTechnologies((Array.isArray(data) ? data : []).map((technology) => ({
            ...technology,
            topics: Array.isArray(technology.topics)
              ? technology.topics
              : (technology.topics || "").split(/[|\n,]/).map((topic) => topic.trim()).filter(Boolean),
          })));
        }
      })
      .catch((loadError) => {
        console.error("Failed to load the technology curriculum:", loadError);
        if (active) setTechnologyError("The technology curriculum is temporarily unavailable.");
      })
      .finally(() => {
        if (active) setLoadingTechnologies(false);
      });

    getProjects()
      .then((data) => {
        if (active) setProjects(Array.isArray(data) ? data.filter(Boolean) : []);
      })
      .catch((loadError) => {
        console.error("Failed to load projects for the technology curriculum:", loadError);
        if (active) setProjectError("Unable to load mapped projects right now.");
      })
      .finally(() => {
        if (active) setLoadingProjects(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedTechnologyId) return;
    detailRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
    });
  }, [selectedTechnology, selectedTechnologyId]);

  const mappedProjects = useMemo(() => {
    if (!selectedTechnologyId) return [];
    return projects.filter((project) => project.technologySlugs?.includes(selectedTechnologyId));
  }, [projects, selectedTechnologyId]);

  return (
    <section id="future-technology-curriculum" className="technology-curriculum-section relative isolate overflow-hidden">
      <div className="pointer-events-none absolute -right-36 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-3xl" aria-hidden="true" />
      <div className="container-shell">
        <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-12">
          <p className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] text-cyan-700 sm:text-base">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 text-xl text-white shadow-md shadow-blue-500/25 sm:h-12 sm:w-12 sm:text-2xl" aria-hidden="true">
              ✦
            </span>
            Built for what comes next
          </p>
          <h2 className="technology-curriculum-heading mt-4 text-3xl font-black leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            FUTURE-READY, CONTINUOUSLY UPDATED CURRICULUM
          </h2>
          <p className="technology-curriculum-intro mx-auto mt-5 max-w-3xl text-base leading-7 sm:text-lg sm:leading-8">
            Our curriculum is regularly reviewed to introduce students to emerging technologies through age-appropriate concepts, practical activities and guided projects.
          </p>
          <p className="technology-curriculum-support mx-auto mt-3 max-w-3xl text-sm leading-7 sm:text-base">
            From artificial intelligence to space exploration, students develop the knowledge, creativity and technical skills needed to understand and shape tomorrow&apos;s world.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {technologies.map((technology, index) => (
            <TechnologyCard
              key={technology.slug}
              technology={technology}
              index={index}
              onExplore={setSelectedTechnologyId}
            />
          ))}
        </div>

        {loadingTechnologies && <p className="mt-5 text-center text-sm text-slate-500" role="status">Loading technology curriculum…</p>}
        {technologyError && <p className="mt-5 text-center text-sm text-rose-700" role="alert">{technologyError}</p>}

        {selectedTechnology && (
          <motion.section
            ref={detailRef}
            key={selectedTechnology.slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="technology-detail-panel mt-8 scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-950 shadow-lg"
            aria-labelledby="selected-technology-title"
          >
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 text-white sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="max-w-3xl">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Technology overview</p>
                  <h3 id="selected-technology-title" className="mt-3 text-2xl font-bold sm:text-3xl">{selectedTechnology.title}</h3>
                  <p className="mt-4 leading-7 text-slate-300">{selectedTechnology.overview}</p>
                </div>
                <a
                  href={selectedTechnology.resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-cyan-200/40 bg-cyan-300/10 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                >
                  {selectedTechnology.resourceLabel} <span className="ml-2" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="space-y-8 p-6 sm:p-8 lg:p-10">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">What students will learn</h4>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {selectedTechnology.topics.map((topic) => (
                    <li key={topic} className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-900">{topic}</li>
                  ))}
                </ul>
              </div>

              {(projectError || loadingProjects || mappedProjects.length > 0) && (
              <div className="scroll-mt-24">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h4 className="text-xl font-bold">Hands-on projects</h4>
                    <p className="mt-1 text-sm text-slate-500">Explore existing builds connected to this technology.</p>
                  </div>
                  <Link to="/projects" className="text-sm font-semibold text-blue-800 transition hover:text-cyan-700">
                    View all projects <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {projectError ? (
                  <p className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800" role="alert">{projectError}</p>
                ) : loadingProjects ? (
                  <p className="mt-5 text-sm text-slate-500" role="status">Loading projects…</p>
                ) : mappedProjects.length > 0 ? (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {mappedProjects.map((project) => {
                      const skills = splitSkills(project.skills);
                      const primaryTechnology = technologies.find(
                        ({ slug }) => slug === project.primaryTechnologySlug
                      );
                      const returnState = {
                        returnTo: {
                          pathname: location.pathname,
                          search: location.search,
                          hash: "#future-technology-curriculum",
                          label: "curriculum",
                          restoreTechnologyId: selectedTechnology.slug,
                        },
                      };

                      return (
                        <article key={project.id || project.slug} className="technology-project-card overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-blue-200 hover:shadow-lg">
                          <ProjectThumbnail project={project} />
                          <div className="p-5">
                            <h5 className="text-lg font-bold">{project.title}</h5>
                            {primaryTechnology && (
                              <p className="mt-1 text-xs font-medium text-blue-800">
                                Primary area: {primaryTechnology.title}
                              </p>
                            )}
                            <p className="mt-2 text-sm leading-6 text-slate-600">{truncate(project.description)}</p>
                            {skills.length > 0 && (
                              <div className="mt-3">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Skills students develop</p>
                                <ul className="mt-2 flex flex-wrap gap-1.5">
                                  {skills.slice(0, 4).map((skill) => (
                                    <li key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">{skill}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <Link
                              to={`/projects/${project.slug}`}
                              state={returnState}
                              className="mt-4 inline-flex min-h-10 items-center font-semibold text-blue-800 transition hover:gap-2 hover:text-cyan-700"
                            >
                              View Project <span className="ml-1" aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              )}
            </div>
          </motion.section>
        )}
      </div>
    </section>
  );
}
