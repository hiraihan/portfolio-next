"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';

export function Hero() {
  const title = "Muhammad Raihan";
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const textVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section ref={targetRef} id="home" className="py-[120px] border-b border-border min-h-[85vh] flex items-center relative overflow-hidden">
      <div className="flex flex-col-reverse text-center gap-16 md:flex-row md:justify-between md:items-center md:text-left md:gap-24 w-full z-10">

        <div className="flex-1">
          <motion.h1
            className="text-[52px] font-bold text-heading tracking-[-2.5px] mb-8"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-[20px] leading-relaxed max-w-lg md:mx-0"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 }}
          >
             An Informatics student with an interest in technology and software development, focused on creating efficient and innovative digital solutions and committed to continuing to develop in the field of information technology.
          </motion.p>

          <motion.div
            className="flex gap-10 mt-[40px] md:justify-start justify-center"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
          >
            <a href="https://github.com/hiraihan" target="_blank" rel="noopener noreferrer" className="text-[16px] font-medium text-subtle no-underline transition-all duration-300 hover:text-primary hover:-translate-y-0.5">GitHub</a>
            <a href="https://www.linkedin.com/in/muhammad-raihan-335294264/" target="_blank" rel="noopener noreferrer" className="text-[16px] font-medium text-subtle no-underline transition-all duration-300 hover:text-primary hover:-translate-y-0.5">LinkedIn</a>
            <a href="mailto:241111075@student.unu-jogja.unu.ac.id" className="text-[16px] font-medium text-subtle no-underline transition-all duration-300 hover:text-primary hover:-translate-y-0.5">Email</a>
          </motion.div>
        </div>

        <div className="flex-shrink-0">
          <motion.div
            className="relative w-[220px] h-[220px] rounded-full overflow-hidden border-2 border-border grayscale transition-all duration-300 hover:grayscale-0"
            style={{ y: imageY }}
          >
            <Image
              src="/raihan.png"
              alt="Foto Muhammad Raihan"
              layout="fill"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </motion.div>
        </div>

      </div>
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-blob"></div>
         <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
         <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
}