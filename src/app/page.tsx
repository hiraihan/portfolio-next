"use client";

import React, { useEffect } from 'react';

// Dinamis import ScrollReveal
// import ScrollReveal from 'scrollreveal'; 

import { Container } from '@/app/components/Container';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/sections/Footer';
import { Hero } from '@/app/components/sections/Hero';
import { Projects } from '@/app/components/sections/Projects';
import { Stack } from '@/app/components/sections/Stack';
import { Contact } from '@/app/components/sections/Contact';

export default function Home() {

  useEffect(() => {
    // Fungsi async untuk memuat ScrollReveal secara dinamis
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

  return (
    <>
      <Header />
      <main>
        <Container>
          <Hero />
          <Projects />
          <Stack />
          <Contact />
        </Container>
      </main>
      <Footer />
    </>
  );
}