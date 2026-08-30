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
            <Link to="/contact" className="btn-primary">Book a School Demo <span>↗</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}