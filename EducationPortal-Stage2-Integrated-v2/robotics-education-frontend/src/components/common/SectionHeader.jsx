export default function SectionHeader({ eyebrow, title, text, centered = false }) {
  return (
    <div className={`${centered ? "text-center mx-auto" : ""} max-w-3xl mb-12`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {text && <p className="mt-5 text-lg leading-8 text-zinc-500">{text}</p>}
    </div>
  );
}