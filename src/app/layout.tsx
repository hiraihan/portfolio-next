// src/app/layout.tsx
// HAPUS: "use client";

import type { Metadata } from 'next'; // Tambahkan metadata lagi
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ClientLayout } from './components/ClientLayout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// 2. Kembalikan metadata Anda ke sini
export const metadata: Metadata = {
  title: 'Muhammad Raihan | Software Engineer',
  description: 'Portofolio Muhammad Raihan, seorang mahasiswa Informatika.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 3. HAPUS: const { setMousePosition } = useMouse();

  return (
    <html lang="id" suppressHydrationWarning>
      {/* 4. HAPUS: onMouseMove dari body */}
      <body 
        className={`${inter.variable} bg-background text-primary font-sans antialiased`}
      >
        <Providers>
          {/* 5. Bungkus children dengan ClientLayout */}
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}