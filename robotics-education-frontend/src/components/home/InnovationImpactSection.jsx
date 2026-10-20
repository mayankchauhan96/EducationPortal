export default function InnovationImpactSection() {
  return (
    <section className="relative isolate overflow-hidden bg-zinc-950 py-20 text-white sm:py-24">
      <div
        className="pointer-events-none absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-zinc-700/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">
            Experience that inspires
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Empowering the Next Generation of Innovators
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
            Backed by a proven track record of mentoring 2,000+ students in
            Robotics, we bring world-class STEM education directly to schools.
          </p>
        </div>

        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/20 sm:p-9">
          <div className="flex flex-wrap items-end gap-x-4 gap-y-1 border-b border-zinc-800 pb-6">
            <span className="text-6xl font-black tracking-[-0.06em] sm:text-7xl">2,000+</span>
            <span className="pb-2 text-sm font-medium text-zinc-400">students mentored</span>
          </div>

          <ul className="mt-2 divide-y divide-zinc-800">
            <li className="flex gap-4 py-5 sm:py-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-xs font-bold text-zinc-300">
                01
              </span>
              <div>
                <h3 className="font-bold text-white">2+ Years of Teaching Expertise</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  Hands-on experience that makes complex ideas engaging and easy to explore.
                </p>
              </div>
            </li>
            <li className="flex gap-4 py-5 sm:py-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-xs font-bold text-zinc-300">
                02
              </span>
              <div>
                <h3 className="font-bold text-white">School-Ready Robotics Curriculum</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  Structured for real classrooms and designed to make STEM learning practical.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
