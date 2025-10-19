"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { SiVercel } from 'react-icons/si';

type ProjectCardProps = {
  title: string;
  description: string;
  href: string;
  deployUrl?: string;
  tags: string[];
  imageUrl?: string;
};

export function ProjectCard({ title, description, href, deployUrl, tags, imageUrl }: ProjectCardProps) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };

  return (
    <div
      className="project-card reveal-item flex flex-col md:flex-row h-full bg-card border border-border rounded-lg transition-colors duration-300 hover:border-subtle overflow-hidden" // Hapus padding default (p-6)
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mouseX}px`,
        '--mouse-y': `${mouseY}px`,
      } as React.CSSProperties}
    >
      {imageUrl && (
        <div className="relative aspect-video md:aspect-auto w-full md:w-2/5 h-auto md:h-full overflow-hidden flex-shrink-0"> {/* Adjusted width & aspect ratio */}
          <Image
            src={imageUrl}
            alt={`Preview of ${title}`}
            layout="fill"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col flex-grow p-6 md:p-8">

        <div className="flex-grow">
          <h3 className="text-[22px] font-semibold text-heading mb-4 tracking-tighter">{title}</h3>
          <p className="text-[16px] leading-relaxed text-subtle mb-6">{description}</p>
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

        <div className="flex items-center gap-6 mt-auto pt-4">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} repository on GitHub`}
            className="cursor-pointer"
          >
            <FaGithub className="text-[24px] text-subtle transition-colors duration-300 hover:text-primary" />
          </a>
          {deployUrl && (
            <a
              href={deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} live deployment`}
              className="cursor-pointer"
            >
              <SiVercel className="text-[24px] text-subtle transition-colors duration-300 hover:text-primary" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}