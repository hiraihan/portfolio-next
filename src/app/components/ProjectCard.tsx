// src/components/ProjectCard.tsx
"use client"; // Diperlukan untuk useState dan event handler

import React, { useState } from 'react'; // Impor useState
import { FaGithub } from 'react-icons/fa';
import { SiVercel } from 'react-icons/si';

// Tipe props untuk komponen
type ProjectCardProps = {
  title: string;
  description: string;
  href: string; // Link GitHub
  deployUrl?: string; // Link Vercel (opsional)
  tags: string[]; // Tag teknologi
};

export function ProjectCard({ title, description, href, deployUrl, tags }: ProjectCardProps) {
  // State lokal untuk posisi mouse relatif terhadap kartu
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Fungsi untuk mengupdate posisi mouse saat bergerak di atas kartu
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };

  return (
    // Kartu Proyek dengan event handler dan style untuk border illumination
    <div
      className="project-card reveal-item flex flex-col h-full bg-card border border-border rounded-lg p-6 transition-colors duration-300 hover:border-subtle overflow-hidden" // Tambahkan overflow-hidden
      onMouseMove={handleMouseMove} // Panggil handler saat mouse bergerak
      style={{
        // Setel variabel CSS kustom untuk posisi mouse
        '--mouse-x': `${mouseX}px`,
        '--mouse-y': `${mouseY}px`,
      } as React.CSSProperties}
    >
      {/* Konten Teks (Judul, Deskripsi, Tags) */}
      <div className="flex-grow">
        <h3 className="text-[22px] font-semibold text-heading mb-4 tracking-tighter">{title}</h3>
        <p className="text-[16px] leading-relaxed text-subtle mb-6">{description}</p>
        {/* Menampilkan tag teknologi */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-border text-subtle text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Ikon Link (GitHub & Vercel) */}
      <div className="flex items-center gap-6">
        {/* Link GitHub */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} repository on GitHub`}
          // Tidak perlu <Hoverable>
        >
          <FaGithub className="text-[24px] text-subtle transition-colors duration-300 hover:text-primary" />
        </a>

        {/* Link Vercel (jika ada) */}
        {deployUrl && (
          <a
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} live deployment`}
             // Tidak perlu <Hoverable>
          >
            <SiVercel className="text-[24px] text-subtle transition-colors duration-300 hover:text-primary" />
          </a>
        )}
      </div>
    </div>
  );
}