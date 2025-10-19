"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaFigma
} from 'react-icons/fa';
import {
  SiTailwindcss, SiNextdotjs, SiTypescript, SiVercel, SiPostgresql, SiMongodb
} from 'react-icons/si';

const stackItems = [
  { icon: <FaHtml5 />, name: 'HTML5', color: '#E34C26' },
  { icon: <FaCss3Alt />, name: 'CSS3', color: '#1572B6' },
  { icon: <FaJsSquare />, name: 'JavaScript', color: '#F7DF1E' },
  { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
  { icon: <FaReact />, name: 'React', color: '#61DBFB' },
  { icon: <SiNextdotjs />, name: 'Next.js', color: 'var(--color-heading)' },
  { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#06B6D4' },
  { icon: <FaNodeJs />, name: 'Node.js', color: '#6CC24A' },
  { icon: <FaPython />, name: 'Python', color: '#4B8BBE' },
  { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#336791' },
  { icon: <SiMongodb />, name: 'MongoDB', color: '#4DB33D' },
  { icon: <FaGitAlt />, name: 'Git', color: '#F1502F' },
  { icon: <FaDocker />, name: 'Docker', color: '#1D63ED' },
  { icon: <SiVercel />, name: 'Vercel', color: 'var(--color-heading)' },
  { icon: <FaFigma />, name: 'Figma', color: '#F24E1E' },
];


const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    }
  }
};

const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export function Stack() {
  return (
    <section id="stack" className="py-[120px] border-b border-border">
      <h2 className="text-[20px] font-medium text-subtle mb-[50px] tracking-tight reveal-top">
        Technologies that I Use
      </h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {stackItems.map((item) => (
          <motion.div
            key={item.name}
            className="group flex flex-col items-center justify-center gap-3 p-6 bg-card border border-border rounded-lg transition-all duration-300 hover:border-subtle hover:-translate-y-1"
            style={{ '--brand-color': item.color } as React.CSSProperties}
            variants={gridItemVariants}
          >
            <div className="text-4xl text-subtle transition-colors duration-300 group-hover:text-[var(--brand-color)]">
              {item.icon}
            </div>
            <span className="text-sm font-medium text-subtle transition-colors duration-300 group-hover:text-primary">
              {item.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}