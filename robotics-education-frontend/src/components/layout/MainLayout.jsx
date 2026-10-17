// src/layout/MainLayout.jsx

import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

export default function MainLayout() {
  const location = useLocation();
  const mainRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("site-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    window.localStorage.setItem("site-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (mainRef.current) {
      mainRef.current.tabIndex = -1;
      mainRef.current.focus({ preventScroll: true });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const targetId = decodeURIComponent(location.hash.slice(1));
      document.getElementById(targetId)?.scrollIntoView({ behavior: "auto", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return (
    <div className="site-theme min-h-screen bg-white" data-theme={theme}>
      <Navbar
        theme={theme}
        onThemeChange={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      />

      <main ref={mainRef}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}