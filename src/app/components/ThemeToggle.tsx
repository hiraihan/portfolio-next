// src/components/ThemeToggle.tsx
"use client";

import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa'; // Kita sudah punya react-icons
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Mencegah hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render placeholder agar layout tidak "lompat"
    return <div className="w-[20px] h-[20px]" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      className="text-subtle hover:text-primary transition-colors"
    >
      {isDark ? (
        <FaSun size={20} />
      ) : (
        <FaMoon size={20} />
      )}
    </button>
  );
}