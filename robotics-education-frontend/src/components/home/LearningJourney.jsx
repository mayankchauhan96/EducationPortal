import { motion } from "framer-motion";
import SectionHeader from "../common/SectionHeader";

const steps = [
  { label: "Explore", icon: "🔍" },
  { label: "Build", icon: "🛠️" },
  { label: "Code", icon: "💻" },
  { label: "Test", icon: "🧪" },
  { label: "Improve", icon: "🔁" },
  { label: "Innovate", icon: "🚀" },
];

export default function LearningJourney() {
  return (
    <section className="section bg-zinc-100">
      <div className="container-shell">
        <SectionHeader eyebrow="THE LEARNING JOURNEY" title="Curiosity becomes capability." text="Our methodology moves students through an iterative cycle of discovery, creation and improvement." />
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, i) => (
            <motion.div key={step.label} whileHover={{ y: -5 }} className="rounded-3xl bg-white p-6 border border-zinc-200">
              <span className="text-sm font-bold text-zinc-400">0{i + 1}</span>
              <div className="mt-6 text-3xl">{step.icon}</div>
              <div className="mt-4 text-2xl font-bold">{step.label}</div>
              {i < steps.length - 1 && <div className="mt-5 text-zinc-300 hidden lg:block">→</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}