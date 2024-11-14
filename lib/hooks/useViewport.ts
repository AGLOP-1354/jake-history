"use client";

import { useState, useEffect } from "react";

type Viewport = {
  width: number;
  height: number;
  isMobile: boolean;
};

const useViewport = (): Viewport => {
  const [viewport, setViewport] = useState<Viewport>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewport({
        width,
        height,
        isMobile: width <= 768,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewport;
};

export default useViewport;
