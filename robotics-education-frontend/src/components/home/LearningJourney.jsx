import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../common/SectionHeader";
import { learningJourney } from "../../data/learningJourney";

export default function LearningJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const activeStage = learningJourney[activeStep];

  return (
    <section id="learning-journey" className="section scroll-mt-24 bg-zinc-100">
      <div className="container-shell">
        <SectionHeader eyebrow="THE LEARNING JOURNEY" title="Curiosity becomes capability." text="Our methodology moves students through an iterative cycle of discovery, creation and improvement." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" role="group" aria-label="Explore the learning journey">
          {learningJourney.map((step, index) => (
            <motion.button
              key={step.label}
              type="button"
              aria-pressed={activeStep === index}
              aria-controls="learning-journey-detail"
              onClick={() => setActiveStep(index)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group rounded-3xl border border-zinc-200 bg-white p-6 text-left transition-colors hover:border-zinc-400 aria-pressed:border-zinc-900 aria-pressed:bg-zinc-900 aria-pressed:text-white"
            >
              <span className="text-sm font-bold text-zinc-400">{String(index + 1).padStart(2, "0")}</span>
              <span className="mt-6 block text-3xl" aria-hidden="true">{step.icon}</span>
              <span className="mt-4 block text-2xl font-bold">{step.label}</span>
              <span className="mt-2 block text-sm text-zinc-500 group-aria-pressed:text-zinc-300">
                {activeStep === index ? "You're here" : "Explore this step"}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeStage.label}
          id="learning-journey-detail"
          role="region"
          aria-live="polite"
          aria-label={`${activeStage.label} learning activity`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid gap-6 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center"
        >
          <div>
            <p className="eyebrow">STEP {String(activeStep + 1).padStart(2, "0")} OF {String(learningJourney.length).padStart(2, "0")}</p>
            <h3 className="mt-2 text-2xl font-bold">{activeStage.icon} {activeStage.label}</h3>
            <p className="mt-3 max-w-3xl leading-7 text-zinc-600">{activeStage.description}</p>
            <p className="mt-4 text-sm font-semibold text-zinc-700">Try it: <span className="font-normal">{activeStage.challenge}</span></p>
          </div>
          <div className="flex gap-3 md:justify-end">
            <button
              type="button"
              onClick={() => setActiveStep((activeStep - 1 + learningJourney.length) % learningJourney.length)}
              className="btn-secondary"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setActiveStep((activeStep + 1) % learningJourney.length)}
              className="btn-primary"
            >
              {activeStep === learningJourney.length - 1 ? "Start again" : `Next: ${learningJourney[(activeStep + 1) % learningJourney.length].label}`}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}