"use client";

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useEffect } from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useSmoothScroll();

  useEffect(() => {
    const initScrollReveal = async () => {
      try {
        const ScrollRevealModule = await import('scrollreveal');
        const ScrollReveal = ScrollRevealModule.default;

        const sr = ScrollReveal({
          distance: '30px',
          duration: 1000,
          easing: 'cubic-bezier(0.5, 0, 0, 1)',
          reset: false
        });
        
        sr.reveal('.reveal-top', { origin: 'top', interval: 100, delay: 200 });
        sr.reveal('.reveal-bottom', { origin: 'bottom', delay: 400 });
        sr.reveal('.reveal-item', { origin: 'bottom', interval: 100, delay: 200 });
      
      } catch (error) {
        console.error("Gagal memuat ScrollReveal:", error);
      }
    };

    initScrollReveal();

  }, []);

  return <>{children}</>;
}