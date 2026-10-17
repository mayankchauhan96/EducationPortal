import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";
import { learningJourney } from "../../data/learningJourney";

const robotAnimations = {
  scan: { x: [-5, 5, -5], rotate: [-1, 1, -1], y: [0, -7, 0] },
  build: { rotate: [0, -7, 6, 0], y: [0, -10, 0] },
  code: { y: [0, -15, 0], rotate: [0, 3, -3, 0] },
  test: { x: [0, -10, 10, 0], rotate: [0, -4, 4, 0] },
  improve: { rotate: [0, 10, -8, 0], y: [0, -8, 0] },
  launch: { y: [0, -24, 0], rotate: [0, -8, 8, 0] },
};

export default function Hero() {
  const [activeStep, setActiveStep] = useState(0);
  const activeStage = learningJourney[activeStep];

  const advanceRobot = () => {
    setActiveStep((current) => (current + 1) % learningJourney.length);
  };

  return (
    <section className="relative overflow-hidden bg-white pt-32 lg:pt-44">
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-zinc-100 blur-3xl" />
      <div className="container-shell relative grid items-center gap-14 pb-24 lg:grid-cols-[1.05fr_.95fr] lg:pb-32">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <p className="eyebrow">ROBOTICS • CODING • STEM</p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
            Build. Code.
            <br />
            <span className="text-zinc-400">Create.</span> Innovate.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-500 sm:text-xl">
            {siteConfig.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary">{siteConfig.primaryCta} <span>↗</span></Link>
            <Link to="/programs" className="btn-secondary">{siteConfig.secondaryCta}</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-zinc-500">
            <span>✓ Project-based learning</span>
            <span>✓ School-integrated</span>
            <span>✓ Future-ready skills</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .8, delay: .15 }}
          className="relative"
        >
          <div className="robot-stage relative mx-auto aspect-square max-w-[600px] overflow-hidden rounded-[2rem] p-5 shadow-soft">
            <div className="robot-grid absolute inset-0" aria-hidden="true" />
            <div className="robot-stage-inner relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[1.5rem]">
              <motion.button
                type="button"
                onClick={advanceRobot}
                aria-label={`Play robot action: ${activeStage.label}. Click for the next action.`}
                className="robot-click-target relative flex h-60 w-60 items-center justify-center rounded-[2rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-cyan-400 sm:h-64 sm:w-72"
                whileTap={{ scale: 0.94 }}
              >
                <motion.div
                  key={activeStage.robotAction}
                  animate={robotAnimations[activeStage.robotAction]}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="robot-body relative h-44 w-48 rounded-[2rem] border shadow-2xl sm:h-48 sm:w-56"
                >
                  <motion.span
                    animate={{ rotate: activeStage.robotAction === "scan" ? [0, 20, -20, 0] : 0 }}
                    transition={{ duration: 0.7 }}
                    className="robot-antenna absolute left-1/2 top-[-36px] h-9 w-1 -translate-x-1/2 rounded-full"
                  />
                  <motion.span
                    animate={{ scale: activeStage.robotAction === "launch" ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.45 }}
                    className="robot-antenna-tip absolute left-1/2 top-[-50px] h-5 w-5 -translate-x-1/2 rounded-full"
                  />
                  <div className="robot-face absolute left-7 right-7 top-9 flex h-20 items-center justify-center gap-7 rounded-2xl border">
                    <motion.span
                      animate={{ scaleY: activeStage.robotAction === "code" ? [1, 0.15, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                      className="robot-eye h-5 w-5 rounded-full"
                    />
                    <motion.span
                      animate={{ scaleY: activeStage.robotAction === "code" ? [1, 0.15, 1] : 1 }}
                      transition={{ duration: 0.3, delay: 0.08 }}
                      className="robot-eye h-5 w-5 rounded-full"
                    />
                    {activeStage.robotAction === "code" && (
                      <span className="robot-code absolute -bottom-8 rounded-md px-2 py-1 font-mono text-xs font-bold" aria-hidden="true">&lt;/&gt;</span>
                    )}
                  </div>
                  <motion.span
                    animate={{ rotate: activeStage.robotAction === "build" ? -35 : activeStage.robotAction === "launch" ? -55 : 0 }}
                    className="robot-arm robot-arm-left absolute -left-6 top-20 h-16 w-6 origin-top rounded-full"
                  />
                  <motion.span
                    animate={{ rotate: activeStage.robotAction === "build" ? 35 : activeStage.robotAction === "launch" ? 55 : 0 }}
                    className="robot-arm robot-arm-right absolute -right-6 top-20 h-16 w-6 origin-top rounded-full"
                  />
                  <span className="robot-wheel absolute -bottom-5 left-5 h-10 w-10 rounded-full border-4" />
                  <span className="robot-wheel absolute -bottom-5 right-5 h-10 w-10 rounded-full border-4" />
                </motion.div>
              </motion.button>
              <div className="robot-caption absolute inset-x-5 bottom-5 rounded-2xl border px-4 py-3 backdrop-blur sm:inset-x-6">
                <div className="flex items-center justify-between gap-3">
                  <div aria-live="polite">
                    <p className="robot-kicker text-xs uppercase tracking-widest">Learning by doing · {activeStage.label}</p>
                    <p className="robot-message mt-1 font-semibold">{activeStage.robotMessage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={advanceRobot}
                    className="robot-play-button flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition hover:scale-105"
                    aria-label="Make the robot do another action"
                  >
                    <span aria-hidden="true">↻</span>
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-1.5" role="group" aria-label="Choose a learning journey action">
                  {learningJourney.map((stage, index) => (
                    <button
                      key={stage.label}
                      type="button"
                      aria-label={`${stage.label} robot action`}
                      aria-pressed={index === activeStep}
                      onClick={() => setActiveStep(index)}
                      className="robot-stage-dot h-2 flex-1 rounded-full transition aria-pressed:flex-[1.6]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}