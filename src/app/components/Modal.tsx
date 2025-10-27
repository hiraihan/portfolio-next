"use client";

import React from 'react';
import { FaTimes } from 'react-icons/fa';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-card text-primary rounded-lg shadow-xl w-full max-w-2xl border border-border flex flex-col max-h-[90vh] animate-fade-in-up"
        onClick={handleModalContentClick}
        style={{ animation: 'fadeInUp 0.3s ease-out forwards' }}
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center p-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 id="modal-title" className="text-xl font-semibold text-heading">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-subtle hover:text-primary transition-colors text-2xl cursor-pointer"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow">
          {children}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in-up {
          opacity: 0; /* Mulai dari transparan untuk animasi */
        }
      `}</style>
    </div>
  );
}