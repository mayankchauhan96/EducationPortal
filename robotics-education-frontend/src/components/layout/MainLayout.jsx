// src/layout/MainLayout.jsx

import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

export default function MainLayout() {
  const location = useLocation();
  const mainRef = useRef(null);

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main ref={mainRef}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}