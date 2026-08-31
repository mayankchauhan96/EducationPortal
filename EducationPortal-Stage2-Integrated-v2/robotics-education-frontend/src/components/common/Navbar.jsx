import { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";

const links = [
  ["Programs", "/programs"],
  ["Curriculum", "/curriculum"],
  ["Projects", "/projects"],
  ["For Schools", "/schools"],
  ["About", "/about"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl">
      <div className="container-shell h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white text-sm font-bold">
            {siteConfig.shortName}
          </span>
          <span className="font-bold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map(([label, href]) => (
            <Link key={href} to={href} className="nav-link">{label}</Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/demo-request" className="btn-primary">{siteConfig.primaryCta}</Link>
        </div>

        <button
          className="lg:hidden rounded-xl border border-zinc-200 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className="block h-0.5 w-5 bg-black mb-1.5" />
          <span className="block h-0.5 w-5 bg-black mb-1.5" />
          <span className="block h-0.5 w-5 bg-black" />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-zinc-200 bg-white px-6 py-5 space-y-3">
          {links.map(([label, href]) => (
            <Link key={href} to={href} onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 font-medium hover:bg-zinc-100">
              {label}
            </Link>
          ))}
          <Link to="/demo-request" onClick={() => setOpen(false)} className="btn-primary block text-center">
            {siteConfig.primaryCta}
          </Link>
        </nav>
      )}
    </header>
  );
}
