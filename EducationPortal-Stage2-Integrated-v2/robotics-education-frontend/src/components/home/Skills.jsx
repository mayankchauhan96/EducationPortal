import { skills } from "../../data/homeData";
import SectionHeader from "../common/SectionHeader";

export default function Skills() {
  return (
    <section className="section bg-zinc-100">
      <div className="container-shell">
        <SectionHeader
          eyebrow="WHY ROBOTICS?"
          title="We don't just teach technology. We teach students how to think."
          text="Hands-on projects transform abstract concepts into experiences students can build, test, improve and explain."
        />
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 sm:grid-cols-4">
          {skills.map((skill, i) => (
            <div key={skill} className="bg-white p-6 sm:p-8">
              <span className="text-xs text-zinc-400">0{i + 1}</span>
              <h3 className="mt-10 font-semibold">{skill}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}