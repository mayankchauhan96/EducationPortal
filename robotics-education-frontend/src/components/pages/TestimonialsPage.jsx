import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getPageContent } from "../../api/pageContentApi";
import SectionHeader from "../common/SectionHeader";

const getImageUrls = (value) => {
  if (!value || typeof value !== "string") return [];
  return value
    .split(/[\n,]+/)
    .map((url) => url.trim())
    .filter(Boolean)
    .filter((url) => /^https?:\/\//i.test(url));
};

const categoryDetails = {
  "partner-schools": { label: "Partner school", icon: "🏫" },
  students: { label: "Student story", icon: "✨" },
  labs: { label: "In the lab", icon: "🤖" },
  seminars: { label: "Seminar", icon: "🎤" },
  workshops: { label: "Workshop", icon: "🛠️" },
  stories: { label: "Community story", icon: "💬" },
};

const getStoryCategory = (story) => {
  const category = (story.category || "").toLowerCase().replaceAll(" ", "-");
  if (categoryDetails[category]) return category;

  const pageKey = (story.pageKey || "").toLowerCase();
  if (pageKey.includes("partner-schools")) return "partner-schools";
  if (pageKey.includes("students")) return "students";
  if (pageKey.includes("labs")) return "labs";
  if (pageKey.includes("seminars")) return "seminars";
  if (pageKey.includes("workshops")) return "workshops";
  return "stories";
};

function StoryDialog({ story, category, onClose }) {
  const dialogRef = useRef(null);
  const imageUrls = getImageUrls(story.imageUrl);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const currentImage = imageUrls[activeIndex] || imageUrls[0];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="story-dialog-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        dialogRef.current?.close();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="w-[min(92vw,900px)] max-w-none overflow-hidden rounded-3xl border border-zinc-200 bg-white p-0 text-zinc-900 shadow-2xl backdrop:bg-black/70"
    >
      <div className="flex max-h-[90vh] flex-col overflow-y-auto">
        <div className="flex items-center justify-between gap-4 p-5 sm:p-7">
          <div>
            <p className="eyebrow">{category.label}</p>
            <h2 id="story-dialog-title" className="mt-1 text-2xl font-bold">{story.sectionTitle}</h2>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xl transition hover:bg-zinc-100"
            aria-label="Close photo"
          >
            ×
          </button>
        </div>

        {currentImage ? (
          <>
            <img
              src={currentImage}
              alt={story.imageAltText || story.sectionTitle}
              className="max-h-[65vh] w-full bg-zinc-100 object-contain"
            />
            {imageUrls.length > 1 && (
              <div className="flex items-center justify-between gap-3 px-5 py-3 sm:px-7">
                <button
                  type="button"
                  onClick={() => setActiveIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1))}
                  className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                >
                  Prev
                </button>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {activeIndex + 1} / {imageUrls.length}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveIndex((prev) => (prev + 1) % imageUrls.length)}
                  className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-zinc-100 text-6xl" aria-hidden="true">
            {category.icon}
          </div>
        )}
        <div className="p-5 sm:p-7">
          <p className="whitespace-pre-line leading-7 text-zinc-600">{story.sectionBody}</p>
          {story.attribution && <p className="mt-4 text-sm font-semibold text-zinc-900">{story.attribution}</p>}
        </div>
      </div>
    </dialog>
  );
}

function StoryCard({ story, category, onOpen }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrls = getImageUrls(story.imageUrl);
  const primaryImage = imageUrls[0] || "";
  const hasImage = Boolean(primaryImage) && !imageFailed;

  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      {hasImage ? (
        <button
          type="button"
          onClick={() => onOpen(story)}
          className="group relative block aspect-[4/3] w-full overflow-hidden bg-zinc-100 text-left"
          aria-label={`Open photo: ${story.imageAltText || story.sectionTitle}`}
        >
          <img
            src={primaryImage}
            alt={story.imageAltText || ""}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          {imageUrls.length > 1 && (
            <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              {imageUrls.length} photos
            </span>
          )}
        </button>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center bg-zinc-100 text-6xl" aria-hidden="true">
          {category.icon}
        </div>
      )}

      <div className="p-6 sm:p-7">
        <span className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-600">
          {category.label}
        </span>
        <h2 className="mt-4 text-xl font-bold text-zinc-900">{story.sectionTitle}</h2>
        {story.sectionBody && <p className="mt-3 whitespace-pre-line leading-7 text-zinc-600">{story.sectionBody}</p>}
        {story.attribution && <p className="mt-4 text-sm font-semibold text-zinc-800">{story.attribution}</p>}
      </div>
    </article>
  );
}

export default function TestimonialsPage({
  pageKey = "testimonials",
  eyebrow = "OUR COMMUNITY",
  title = "Real people. Real moments. Real learning.",
  description = "Meet the schools, students, and educators turning curiosity into hands-on experiences. Browse their stories and moments from our learning community.",
}) {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getPageContent(pageKey)
      .then((data) => {
        if (active) setStories(Array.isArray(data) ? data : []);
      })
      .catch((loadError) => {
        console.error("Failed to load testimonial stories:", loadError);
        if (active) setError("We couldn't load community stories right now. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [pageKey]);

  return (
    <section className="section min-h-screen bg-white pt-32">
      <div className="container-shell">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          text={description}
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { label: "All", to: "/testimonials" },
            { label: "Partner Schools", to: "/testimonials/partner-schools" },
            { label: "Students", to: "/testimonials/students" },
            { label: "Labs", to: "/testimonials/labs" },
            { label: "Community", to: "/testimonials/community" },
            { label: "Others", to: "/testimonials/others" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                (link.to === "/testimonials" && pageKey === "testimonials") ||
                (link.to === "/testimonials/partner-schools" && pageKey === "testimonials-partner-schools") ||
                (link.to === "/testimonials/students" && pageKey === "testimonials-students") ||
                (link.to === "/testimonials/labs" && pageKey === "testimonials-labs") ||
                (link.to === "/testimonials/community" && pageKey === "testimonials-community") ||
                (link.to === "/testimonials/others" && pageKey === "testimonials-others")
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500 hover:text-zinc-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mb-9 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 sm:p-7">
          <p className="text-sm font-semibold text-zinc-700">A growing community gallery</p>
          <p className="mt-2 max-w-3xl leading-7 text-zinc-600">
            From partner schools and student builds to labs, seminars, and workshops, each story brings our learning journey to life.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-zinc-500" role="status">Loading community stories…</div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-800" role="alert">
            {error}
          </div>
        ) : stories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center">
            <p className="text-4xl" aria-hidden="true">📸</p>
            <h2 className="mt-4 text-2xl font-bold text-zinc-900">Our community gallery is just getting started.</h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-zinc-600">
              New partner-school visits, student projects, labs, seminars, and workshops will appear here as they are shared.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-zinc-500" aria-live="polite">
              Showing {stories.length} {stories.length === 1 ? "story" : "stories"}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => {
                const key = getStoryCategory(story);
                const category = categoryDetails[key] || categoryDetails.stories;
                return (
                  <StoryCard
                    key={story.id}
                    story={story}
                    category={category}
                    onOpen={setSelectedStory}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      {selectedStory && (
        <StoryDialog
          story={selectedStory}
          category={categoryDetails[getStoryCategory(selectedStory)] || categoryDetails.stories}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </section>
  );
}
