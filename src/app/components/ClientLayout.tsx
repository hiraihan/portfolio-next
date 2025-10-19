// src/components/ClientLayout.tsx
"use client";

import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  // Inisialisasi smooth scroll di sini
  useSmoothScroll();

  return <>{children}</>; // Cukup render children
}