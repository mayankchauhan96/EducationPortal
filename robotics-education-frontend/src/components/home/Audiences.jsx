import { Link } from "react-router-dom";

const cards = [
  ["For Teachers", "Ready-to-use lessons, project guides, training and classroom support.", "/teachers"],
  ["For Parents", "See how robotics develops problem solving, creativity and confidence.", "/parents"],
];

export default function Audiences() {
  return (
    <section className="section bg-zinc-100">
      <div className="container-shell">
        <div className="grid gap-5 md:grid-cols-2">
          {cards.map(([title, text, href]) => (
            <Link key={title} to={href} className="group rounded-[2rem] bg-black p-8 sm:p-12 text-white transition-transform hover:-translate-y-1">
              <span className="text-sm uppercase tracking-[.2em] text-zinc-500">{title}</span>
              <h2 className="mt-14 text-3xl sm:text-4xl font-bold tracking-tight">{text}</h2>
              <span className="mt-10 inline-flex font-semibold group-hover:gap-3 transition-all">Learn more <span>→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}