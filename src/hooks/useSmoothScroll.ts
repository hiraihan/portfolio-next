// src/hooks/useSmoothScroll.ts
"use client";
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Kecepatan scroll (sesuaikan)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Fungsi easing
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);
}