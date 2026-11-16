import { Link } from "react-router-dom";

export default function FinalCta() {
  return (
    <section className="section bg-white">
      <div className="container-shell">
        <div className="rounded-[2rem] bg-zinc-100 p-10 text-center sm:p-16 lg:p-24">
          <p className="eyebrow">READY TO START?</p>
          <h2 className="mx-auto max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Build the next generation of innovators.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-500">
            Let's explore how a robotics and coding program can fit into your school's learning journey.
          </p>
          <div className="mt-9">
            <Link to="/demo-request" className="btn-primary">Book a School Demo <span>↗</span></Link>
          </div>
          <nav aria-label="Explore information for your community" className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-zinc-600">
            <Link to="/students" className="transition hover:text-zinc-950">For students <span aria-hidden="true">→</span></Link>
            <Link to="/schools" className="transition hover:text-zinc-950">For schools <span aria-hidden="true">→</span></Link>
            <Link to="/teachers" className="transition hover:text-zinc-950">For teachers <span aria-hidden="true">→</span></Link>
            <Link to="/parents" className="transition hover:text-zinc-950">For parents <span aria-hidden="true">→</span></Link>
          </nav>
        </div>
      </div>
    </section>
  );
}