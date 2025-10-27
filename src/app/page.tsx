"use client";

import React, { useState } from 'react';

import { Container } from '@/app/components/Container';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/sections/Footer';
import { Hero } from '@/app/components/sections/Hero';
import { Projects } from '@/app/components/sections/Projects';
import { Stack } from '@/app/components/sections/Stack';
import { Contact } from '@/app/components/sections/Contact';
import { Modal } from '@/app/components/Modal';
import { TodoList } from '@/app/components/sections/TodoList';

export default function Home() {
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  const openTodoModal = () => setIsTodoModalOpen(true);
  const closeTodoModal = () => setIsTodoModalOpen(false);


  return (
    <>
      <Header onOpenTodoClick={openTodoModal} />
      <main>
        <Container>
          <Hero />
          <Projects />
          <Stack />
          <Contact />
        </Container>
      </main>
      <Footer />

      <Modal
        isOpen={isTodoModalOpen}
        onClose={closeTodoModal}
        title="My To-Do List"
      >
        <TodoList />
      </Modal>
    </>
  );
}