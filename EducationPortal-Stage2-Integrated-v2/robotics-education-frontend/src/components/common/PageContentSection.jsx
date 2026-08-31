import { useEffect, useState } from "react";
import { getPageContent } from "../../api/pageContentApi";
import SectionHeader from "./SectionHeader";

export default function PageContentSection({
  pageKey,
  eyebrow,
  title,
  intro,
  className = "",
  fallbackSections = [],
}) {
  const [sections, setSections] = useState(fallbackSections);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSections = async () => {
      try {
        const data = await getPageContent(pageKey);
        if (Array.isArray(data) && data.length > 0) {
          setSections(data);
        } else {
          setSections(fallbackSections);
        }
      } catch (err) {
        console.warn(`Using fallback content for ${pageKey}:`, err);
        setSections(fallbackSections);
      } finally {
        setLoading(false);
      }
    };

    loadSections();
  }, [pageKey, fallbackSections]);

  const splitBullets = (bullets) => {
    if (!bullets) return [];
    return bullets
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  return (
    <section className={`section ${className}`}>
      <div className="container-shell">
        <SectionHeader eyebrow={eyebrow} title={title} text={intro} />

        {loading ? (
          <div className="py-8 text-center text-zinc-500">Loading...</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {sections.map((section) => (
              <article key={section.id} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7">
                <h3 className="text-2xl font-bold text-zinc-900">{section.sectionTitle}</h3>
                <p className="mt-4 leading-7 text-zinc-600">{section.sectionBody}</p>

                {splitBullets(section.bullets).length > 0 && (
                  <ul className="mt-5 space-y-3 text-sm text-zinc-700">
                    {splitBullets(section.bullets).map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-zinc-900" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
