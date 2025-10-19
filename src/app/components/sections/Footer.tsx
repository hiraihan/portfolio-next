// src/components/Footer.tsx
export function Footer() {
  return (
    // Asli: padding: 5rem (50px)
    <footer className="py-[50px] text-center">
      {/* PERBAIKAN: text-sm -> text-[14px] (Asli: 1.4rem) */}
      <p className="text-[14px] text-subtle">&copy; 2025 | Muhammad Raihan.</p>
    </footer>
  );
}