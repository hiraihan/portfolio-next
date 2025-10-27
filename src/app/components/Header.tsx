"use client";
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';

type HeaderProps = {
  onOpenTodoClick: () => void;
};

export function Header({ onOpenTodoClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 50);
       const sections = document.querySelectorAll('section');
       let current = 'home';
       sections.forEach(section => {
         const sectionTop = section.offsetTop;
         if (window.pageYOffset >= sectionTop - 150) {
           current = section.getAttribute('id') || 'home';
         }
       });
       setActiveSection(current);
     };
     window.addEventListener('scroll', handleScroll);
     handleScroll();
     return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        .navbar a.active { color: var(--color-text-primary); }
        .navbar button.active { color: var(--color-text-primary); } /* Style untuk tombol jika diperlukan */
      `}</style>

      <header
        className={`header fixed top-0 left-0 w-full px-[40px] py-[25px] flex justify-between items-center z-50 transition-all duration-300 md:px-8 ${isScrolled ? 'scrolled' : ''}`}
      >
        <Link href="#home" className="text-[20px] font-bold text-heading no-underline tracking-tighter cursor-pointer">
          Home
        </Link>

        <nav className="navbar hidden md:flex items-center">
          <Link
            href="#work"
            className={`text-[15px] font-medium text-subtle no-underline ml-[30px] transition-colors duration-300 hover:text-primary cursor-pointer ${activeSection === 'work' ? 'active' : ''}`}
          >
            Project
          </Link>
          <Link
            href="#stack"
            className={`text-[15px] font-medium text-subtle no-underline ml-[30px] transition-colors duration-300 hover:text-primary cursor-pointer ${activeSection === 'stack' ? 'active' : ''}`}
          >
            Stack
          </Link>
          <Link
            href="#contact"
            className={`text-[15px] font-medium text-subtle no-underline ml-[30px] transition-colors duration-300 hover:text-primary cursor-pointer ${activeSection === 'contact' ? 'active' : ''}`}
          >
            Contact
          </Link>

          <button
            onClick={onOpenTodoClick}
            className="text-[15px] font-medium text-subtle no-underline ml-[30px] transition-colors duration-300 hover:text-primary cursor-pointer flex items-center gap-1"
            aria-label="Open To-Do List"
          >
             <span>To-Do</span>
          </button>

          <div className="w-px h-5 bg-border mx-6" />
          <ThemeToggle />
        </nav>
      </header>
    </>
  );
}