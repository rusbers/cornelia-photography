"use client";

import { useEffect } from "react";
import "aos/dist/aos.css";

export default function AOS() {
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({
        // global settings
        once: true,
        duration: 600,
      });
    });
  }, []);

  return null;
}
