"use client";
import { useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  useEffect(() => {
    const header = document.querySelector('.header');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.navbar a');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
          current = section.getAttribute('id') || '';
        }
      });
      navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href')?.includes(current)) {
          a.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        .navbar a.active { color: var(--color-text-primary); }
      `}</style>

      <header className="header fixed top-0 left-0 w-full px-[40px] py-[25px] flex justify-between items-center z-50 transition-all duration-300 md:px-8">
        <a href="#home" className="text-[20px] font-bold text-heading no-underline tracking-tighter cursor-pointer">Home</a>

        <nav className="navbar hidden md:flex items-center">
          <a href="#work" className="text-[15px] font-medium text-subtle no-underline ml-[30px] transition-colors duration-300 hover:text-primary cursor-pointer">Project</a>
          <a href="#stack" className="text-[15px] font-medium text-subtle no-underline ml-[30px] transition-colors duration-300 hover:text-primary cursor-pointer">Stack</a>
          <a href="#contact" className="text-[15px] font-medium text-subtle no-underline ml-[30px] transition-colors duration-300 hover:text-primary cursor-pointer">Contact</a>
          <div className="w-px h-5 bg-border mx-6" />
          <ThemeToggle />
        </nav>
      </header>
    </>
  );
}