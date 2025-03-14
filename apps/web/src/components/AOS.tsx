"use client";

import { useEffect } from "react";
import "aos/dist/aos.css";

export default function AOS() {
  useEffect(() => {
    // Add a small delay to ensure page is fully loaded
    const timer = setTimeout(() => {
      import("aos").then((AOS) => {
        AOS.init({
          // global settings
          once: true,
          duration: 600,
          startEvent: "DOMContentLoaded",
          offset: 0,
          disable: window.innerWidth < 1024,
        });

        // Reset scroll position
        window.scrollTo(0, 0);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
