import { Link } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container-shell py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black text-sm font-bold">
                {siteConfig.shortName}
              </span>
              <span className="font-bold">{siteConfig.name}</span>
            </div>
            <p className="max-w-md text-zinc-400 leading-7">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <div className="space-y-3 text-zinc-400">
              <Link className="footer-link" to="/programs">Programs</Link>
              <Link className="footer-link" to="/curriculum">Curriculum</Link>
              <Link className="footer-link" to="/projects">Projects</Link>
              <Link className="footer-link" to="/about">About</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Families &amp; Educators</h3>
            <div className="space-y-3 text-zinc-400">
              <Link className="footer-link" to="/schools">For Schools</Link>
              <Link className="footer-link" to="/teachers">For Teachers</Link>
              <Link className="footer-link" to="/parents">For Parents</Link>
              <Link className="footer-link" to="/students">For Students</Link>
              <Link className="footer-link" to="/blogs">Blogs</Link>
              <Link className="footer-link" to="/testimonials">Testimonials</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="space-y-3 text-zinc-400">
              <p>{siteConfig.email}</p>
              <p>{siteConfig.phone}</p>
              <Link className="footer-link" to="/contact">Book a Demo →</Link>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between gap-3 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Robotics • Coding • STEM • Innovation</p>
        </div>
      </div>
    </footer>
  );
}