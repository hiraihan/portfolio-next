"use client";

import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}