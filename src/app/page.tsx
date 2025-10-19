// src/app/page.tsx
"use client";

import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

// Impor komponen modular
import { Container } from '@/app/components/Container';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/sections/Footer';
import { Hero } from '@/app/components/sections/Hero';
import { Projects } from '@/app/components/sections/Projects';
import { Stack } from '@/app/components/sections/Stack';
import { Contact } from '@/app/components/sections/Contact';

export default function Home() {

  // Inisialisasi ScrollReveal di komponen halaman utama
  useEffect(() => {
    const sr = ScrollReveal({
      distance: '30px',
      duration: 1000,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: false
    });
    // Menargetkan kelas-kelas yang ada di dalam komponen anak
    sr.reveal('.reveal-top', { origin: 'top', interval: 100, delay: 200 });
    sr.reveal('.reveal-bottom', { origin: 'bottom', delay: 400 });
    sr.reveal('.reveal-item', { origin: 'bottom', interval: 100, delay: 200 });
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Gunakan Container untuk membungkus semua section */}
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