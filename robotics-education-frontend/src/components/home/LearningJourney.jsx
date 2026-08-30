import { motion } from "framer-motion";
import SectionHeader from "../common/SectionHeader";

const steps = ["Explore", "Build", "Code", "Test", "Improve", "Innovate"];

export default function LearningJourney() {
  return (
    <section className="section bg-zinc-100">
      <div className="container-shell">
        <SectionHeader eyebrow="THE LEARNING JOURNEY" title="Curiosity becomes capability." text="Our methodology moves students through an iterative cycle of discovery, creation and improvement." />
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, i) => (
            <motion.div key={step} whileHover={{ y: -5 }} className="rounded-3xl bg-white p-6 border border-zinc-200">
              <span className="text-sm font-bold text-zinc-400">0{i + 1}</span>
              <div className="mt-12 text-2xl font-bold">{step}</div>
              {i < steps.length - 1 && <div className="mt-5 text-zinc-300 hidden lg:block">→</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}