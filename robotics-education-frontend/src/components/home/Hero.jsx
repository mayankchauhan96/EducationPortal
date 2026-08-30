import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";

export default function Hero() {
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
          <div className="relative aspect-square max-w-[600px] mx-auto overflow-hidden rounded-[2rem] bg-zinc-950 p-5 shadow-soft">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: "linear-gradient(#52525b 1px, transparent 1px), linear-gradient(90deg, #52525b 1px, transparent 1px)",
              backgroundSize: "38px 38px"
            }} />
            <div className="relative h-full rounded-[1.5rem] border border-zinc-800 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [-1, 1, -1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-52 w-64 rounded-[2rem] border border-zinc-700 bg-zinc-900 shadow-2xl"
              >
                <div className="absolute left-1/2 top-[-54px] h-16 w-1 -translate-x-1/2 bg-zinc-600" />
                <div className="absolute left-1/2 top-[-76px] h-8 w-8 -translate-x-1/2 rounded-full border border-zinc-500 bg-zinc-800" />
                <div className="absolute left-8 right-8 top-10 h-20 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center gap-6">
                  <span className="h-5 w-5 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,.6)]" />
                  <span className="h-5 w-5 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,.6)]" />
                </div>
                <div className="absolute -bottom-7 left-5 h-12 w-12 rounded-full border-4 border-zinc-500 bg-black" />
                <div className="absolute -bottom-7 right-5 h-12 w-12 rounded-full border-4 border-zinc-500 bg-black" />
              </motion.div>
              <div className="absolute bottom-6 left-6 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 backdrop-blur">
                <p className="text-xs uppercase tracking-widest text-zinc-500">Learning by doing</p>
                <p className="font-semibold mt-1">Think → Build → Test</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}