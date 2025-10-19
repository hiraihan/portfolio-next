// src/components/sections/Stack.tsx
import React from 'react';
// Impor ikon yang dibutuhkan
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaFigma
} from 'react-icons/fa';
import {
  SiTailwindcss, SiNextdotjs, SiTypescript, SiVercel, SiPostgresql, SiMongodb
} from 'react-icons/si';

// Data stack dengan warna brand
const stackItems = [
  { icon: <FaHtml5 />, name: 'HTML5', color: '#E34C26' },
  { icon: <FaCss3Alt />, name: 'CSS3', color: '#1572B6' },
  { icon: <FaJsSquare />, name: 'JavaScript', color: '#F7DF1E' },
  { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
  { icon: <FaReact />, name: 'React', color: '#61DBFB' },
  { icon: <SiNextdotjs />, name: 'Next.js', color: 'var(--color-heading)' }, // Warna hitam/putih
  { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#06B6D4' },
  { icon: <FaNodeJs />, name: 'Node.js', color: '#6CC24A' },
  { icon: <FaPython />, name: 'Python', color: '#4B8BBE' }, // Kembali ke satu warna hover
  { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#336791' },
  { icon: <SiMongodb />, name: 'MongoDB', color: '#4DB33D' },
  { icon: <FaGitAlt />, name: 'Git', color: '#F1502F' },
  { icon: <FaDocker />, name: 'Docker', color: '#1D63ED' },
  { icon: <SiVercel />, name: 'Vercel', color: 'var(--color-heading)' }, // Warna hitam/putih
  { icon: <FaFigma />, name: 'Figma', color: '#F24E1E' },
];

export function Stack() {
  return (
    <section id="stack" className="py-[120px] border-b border-border">
      {/* Judul Section */}
      <h2 className="text-[20px] font-medium text-subtle mb-[50px] tracking-tight text-center reveal-top">
        Technologies I Use
      </h2>

      {/* Grid Responsif untuk Kartu Ikon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {stackItems.map((item) => (
          <div
            key={item.name}
            // Kartu Ikon dengan style & hover
            className="group flex flex-col items-center justify-center gap-3 p-6 bg-card border border-border rounded-lg transition-all duration-300 hover:border-subtle hover:-translate-y-1"
            // Variabel CSS kustom untuk warna hover
            style={{ '--brand-color': item.color } as React.CSSProperties}
          >
            {/* Ikon */}
            <div className="text-4xl text-subtle transition-colors duration-300 group-hover:text-[var(--brand-color)]">
              {item.icon}
            </div>

            {/* Nama Teknologi */}
            <span className="text-sm font-medium text-subtle transition-colors duration-300 group-hover:text-primary">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}