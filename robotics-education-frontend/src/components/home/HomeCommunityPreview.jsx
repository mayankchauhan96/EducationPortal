import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedTestimonials } from "../../api/pageContentApi";
import SectionHeader from "../common/SectionHeader";

const getImageUrls = (value) => {
  if (!value || typeof value !== "string") return [];
  return value
    .split(/[\n,]+/)
    .map((url) => url.trim())
    .filter(Boolean)
    .filter((url) => /^https?:\/\//i.test(url));
};

const normalizeCategory = (story) => {
  const pageKey = (story.pageKey || "").toLowerCase();
  const category = (story.category || "").toLowerCase().replaceAll(" ", "-");
  if (pageKey.includes("students")) return "students";
  if (pageKey.includes("labs")) return "labs";
  if (pageKey.includes("workshops")) return "workshops";
  if (pageKey.includes("awards")) return "awards";
  if (pageKey.includes("partner-schools")) return "partner-schools";
  if (category.includes("student")) return "students";
  if (category.includes("lab")) return "labs";
  if (category.includes("workshop")) return "workshops";
  if (category.includes("award")) return "awards";
  if (category.includes("school")) return "partner-schools";
  return "others";
};

const shuffle = (items) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

function selectCarouselStories(stories) {
  const uniqueStories = [...new Map(stories.map((story) => [story.id, story])).values()];
  const categories = [
    "students",
    "labs",
    "partner-schools",
  ];
  const selected = categories
    .map((category) => shuffle(uniqueStories.filter((story) => normalizeCategory(story) === category))[0])
    .filter(Boolean);
  const remaining = shuffle(uniqueStories.filter((story) => !selected.includes(story)));

  return [...shuffle(selected), ...remaining];
}

function CommunityCard({ story }) {
  const imageUrls = getImageUrls(story.imageUrl);
  const primaryImage = imageUrls[0] || "";
  const [imageFailed, setImageFailed] = useState(false);
  const category = normalizeCategory(story).replaceAll("-", " ");

  return (
    <article className="community-story-card group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md">
      <div className="relative overflow-hidden">
        {imageFailed || !primaryImage ? (
          <div className="flex aspect-[16/9] items-center justify-center bg-zinc-100 text-4xl text-zinc-700 transition-colors group-hover:bg-zinc-200" aria-hidden="true">
            ✨
          </div>
        ) : (
          <img
            src={primaryImage}
            alt={story.imageAltText || ""}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="aspect-[16/9] w-full bg-zinc-100 object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">{category}</p>
        <h3 className="mt-1 text-base font-bold text-zinc-900">{story.sectionTitle}</h3>
        {story.sectionBody && (
          <p className="mt-2 text-sm leading-5 text-zinc-600">
            {story.sectionBody.length > 160 ? `${story.sectionBody.slice(0, 157).trimEnd()}…` : story.sectionBody}
          </p>
        )}
        {story.attribution && <p className="mt-1 text-sm text-zinc-600">{story.attribution}</p>}
        {imageUrls.length > 1 && (
          <p className="mt-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            {imageUrls.length} photos
          </p>
        )}
      </div>
    </article>
  );
}

export default function HomeCommunityPreview() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const carouselStories = useMemo(() => selectCarouselStories(stories), [stories]);

  useEffect(() => {
    if (carouselStories.length < 2) return undefined;

    const interval = window.setInterval(() => {
      setSlideIndex((index) => (index + 1) % carouselStories.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [carouselStories.length]);

  const visibleStories = useMemo(() => {
    return Array.from({ length: Math.min(3, carouselStories.length) }, (_, offset) => (
      carouselStories[(slideIndex + offset) % carouselStories.length]
    ));
  }, [carouselStories, slideIndex]);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return undefined;

    let active = true;
    const loadStories = () => {
      setStarted(true);
      setLoading(true);
      getFeaturedTestimonials()
        .then((data) => {
          if (active) setStories(Array.isArray(data) ? data : []);
        })
        .catch((loadError) => {
          console.error("Failed to load homepage community stories:", loadError);
          if (active) setError("Community stories are temporarily unavailable.");
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    };

    if (!("IntersectionObserver" in window)) {
      loadStories();
      return () => {
        active = false;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loadStories();
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(element);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);

  if (started && !loading && !error && stories.length === 0) return null;

  return (
    <section ref={sectionRef} className="section bg-zinc-50 py-12 sm:py-14 lg:py-16">
      <div className="container-shell">
        <SectionHeader
          eyebrow="OUR COMMUNITY"
          title="Learning comes to life together."
          text="Student projects, hands-on workshops, school partnerships, and achievements from our learning community."
          centered
        />

        {!started || loading ? (
          <p className="py-8 text-center text-zinc-500" role="status">Loading community stories…</p>
        ) : error ? (
          <p className="py-6 text-center text-zinc-600" role="status">{error}</p>
        ) : carouselStories.length > 0 ? (
          <div aria-live="polite" aria-atomic="true">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {visibleStories.map((story) => (
                <CommunityCard key={story.id} story={story} />
              ))}
            </div>
            {carouselStories.length > 3 && (
              <div className="mt-5 flex justify-center gap-2" aria-label="Community stories carousel">
                {carouselStories.map((story, index) => (
                  <button
                    key={story.id}
                    type="button"
                    aria-label={`Show community stories starting at ${index + 1}`}
                    aria-pressed={slideIndex === index}
                    onClick={() => setSlideIndex(index)}
                    className="h-2.5 w-2.5 rounded-full bg-zinc-300 transition aria-pressed:bg-zinc-700"
                  />
                ))}
              </div>
            )}
          </div>
        ) : null}

        <div className="mt-8 text-center">
          <Link to="/testimonials" className="btn-secondary">
            Explore our community <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
