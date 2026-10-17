import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { skills } from "../../data/homeData";
import SectionHeader from "../common/SectionHeader";
import { createReturnState } from "../../utils/navigation";

const skillDetails = {
  "Problem Solving": {
    icon: "🧠",
    description: "Students learn to break a big challenge into smaller steps, test an idea, and use what happens to decide what to try next.",
    example: "Try it: adjust an obstacle-avoiding robot when it takes a wrong turn.",
    project: "obstacle-avoiding-robot",
  },
  "Logical Thinking": {
    icon: "📐",
    description: "Sequencing, patterns, and cause and effect help students make sense of how a program or mechanism behaves.",
    example: "Try it: plan the sequence that keeps a traffic signal moving safely.",
    project: "smart-traffic-system",
  },
  Creativity: {
    icon: "🎨",
    description: "Students turn their own ideas into prototypes, then refine the design as they discover new possibilities.",
    example: "Try it: design a moving model with a style and purpose of its own.",
    project: "merry-go-round",
  },
  Teamwork: {
    icon: "🤝",
    description: "Building together gives students practice sharing ideas, dividing tasks, and explaining how their choices fit together.",
    example: "Try it: work as a team to build, wire, and test a classroom prototype.",
    project: "projects",
  },
  "Engineering Thinking": {
    icon: "⚙️",
    description: "Students explore how components work together, identify what needs improvement, and iterate toward a stronger design.",
    example: "Try it: test the movement and control of a mechanical build.",
    project: "robotic-arm",
  },
  "Coding Skills": {
    icon: "💻",
    description: "Writing and adjusting instructions helps students see how code can control real devices and produce observable results.",
    example: "Try it: program a robot to respond to sensor input.",
    project: "obstacle-avoiding-robot",
  },
  Innovation: {
    icon: "🚀",
    description: "Students combine what they know in new ways, moving from a first idea to a working solution they can demonstrate.",
    example: "Try it: combine sensors and automation in a connected model.",
    project: "smart-home",
  },
  Confidence: {
    icon: "✨",
    description: "Completing a build, learning from a test, and sharing the result helps students trust their ability to tackle something new.",
    example: "Try it: show how your project works and explain one improvement you made.",
    project: "projects",
  },
};

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const restoreSkill = location.state?.restoreSkill;
    if (!skills.includes(restoreSkill)) return;

    setSelectedSkill(restoreSkill);
    navigate(
      { pathname: location.pathname, search: location.search, hash: location.hash },
      { replace: true, state: null }
    );
  }, [location.hash, location.pathname, location.search, location.state, navigate]);

  const detail = skillDetails[selectedSkill] || {
    icon: "⚡",
    description: "Hands-on projects help students develop this skill through exploration, practice, and reflection.",
    example: "Try it: choose a project and see what you can discover.",
    project: "projects",
  };

  return (
    <section id="why-robotics" className="section scroll-mt-24 bg-zinc-100">
      <div className="container-shell">
        <SectionHeader
          eyebrow="WHY ROBOTICS?"
          title="We don't just teach technology. We teach students how to think."
          text="Hands-on projects transform abstract concepts into experiences students can build, test, improve and explain."
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
            role="group"
            aria-label="Explore skills developed through robotics"
          >
            {skills.map((skill, index) => {
              const isSelected = skill === selectedSkill;
              return (
                <motion.button
                  key={skill}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedSkill(skill)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: (index % 4) * 0.04 }}
                  className={`min-h-36 rounded-2xl border p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 sm:min-h-40 sm:p-6 ${
                    isSelected
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-lg"
                      : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400"
                  }`}
                >
                  <span className={`text-xs font-semibold tracking-[0.18em] ${isSelected ? "text-zinc-400" : "text-zinc-400"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-4 block text-2xl" aria-hidden="true">
                    {skillDetails[skill]?.icon || "⚡"}
                  </span>
                  <span className="mt-3 block text-sm font-semibold leading-snug sm:text-base">{skill}</span>
                </motion.button>
              );
            })}
          </div>

          <motion.aside
            key={selectedSkill}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            aria-live="polite"
            aria-atomic="true"
            className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-950 p-7 text-white sm:p-9"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">A skill in action</p>
              <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-3xl" aria-hidden="true">
                {detail.icon}
              </div>
              <h3 className="mt-5 text-2xl font-bold">{selectedSkill}</h3>
              <p className="mt-3 leading-7 text-zinc-300">{detail.description}</p>
              <p className="mt-5 border-l-2 border-zinc-600 pl-4 text-sm leading-6 text-zinc-400">{detail.example}</p>
            </div>
            <Link
              to={detail.project === "projects" ? "/projects" : `/projects/${detail.project}`}
              state={createReturnState(location, {
                hash: "#why-robotics",
                label: "WHY ROBOTICS?",
                restoreSkill: selectedSkill,
              })}
              className="mt-8 inline-flex min-h-11 items-center gap-2 self-start font-semibold text-white transition-colors hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              See it in a project <span aria-hidden="true">→</span>
            </Link>
          </motion.aside>
        </div>

        <p className="sr-only" aria-live="polite">Selected skill: {selectedSkill}</p>
      </div>
    </section>
  );
}
