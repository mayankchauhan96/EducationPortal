import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPrograms } from "../../api/programApi";
import SectionHeader from "../common/SectionHeader";

const programIcons = {
  Robotics: "🤖",
  Coding: "💻",
  Electronics: "⚡",
  "AI & IoT": "🌐",
};

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await getPrograms();
        setPrograms(data);
      } catch (error) {
        console.error("Failed to load programs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  return (
    <section className="section bg-white">
      <div className="container-shell">
        <SectionHeader
          eyebrow="OUR PROGRAMS"
          title="A learning ecosystem built around making."
          text="A structured pathway from first concepts to ambitious student projects."
        />

        {loading ? (
          <div className="py-10 text-center text-zinc-500">
            Loading programs...
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, i) => (
              <motion.article
                key={program.id}
                whileHover={{ y: -7 }}
                className="group rounded-3xl border border-zinc-200 p-7 transition-shadow hover:shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{programIcons[program.title] || "🧩"}</span>

                  <span className="text-xs rounded-full bg-zinc-100 px-3 py-1 text-zinc-500">
                    {program.tag}
                  </span>
                </div>

                <h3 className="mt-12 text-2xl font-bold">
                  {program.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-500">
                  {program.description}
                </p>

                <span className="mt-3 block text-sm text-zinc-400">
                  {program.ageGroup}
                </span>

                <Link
                  to={`/programs/${program.slug}`}
                  className="mt-7 inline-flex font-semibold group-hover:gap-3 transition-all"
                >
                  Explore <span>→</span>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}