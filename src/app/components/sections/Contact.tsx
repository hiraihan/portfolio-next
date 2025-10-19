/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/sections/Contact.tsx
"use client";
import React, { useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  // State untuk status form
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage(''); // Reset pesan

    const form = event.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Terima kasih! Pesan Anda telah terkirim.');
        form.reset(); // Kosongkan form setelah sukses
      } else {
        // Coba dapatkan pesan error dari Formspree
        const responseData = await response.json();
        if (responseData.errors) {
          setMessage(responseData.errors.map((error: any) => error.message).join(", "));
        } else {
          setMessage('Oops! Terjadi kesalahan saat mengirim pesan.');
        }
        setStatus('error');
      }
    } catch (error) {
      setMessage('Oops! Terjadi kesalahan jaringan.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-[120px]">
      <h2 className="text-[20px] font-medium text-subtle mb-[50px] tracking-tight reveal-top">Get in Touch</h2>
      <p className="text-[18px] leading-relaxed text-subtle -mt-[20px] mb-[50px] reveal-top">
        Have a question, a proposal, or just want to say hello? Please contact me.
      </p>
      
      {/* Ganti onSubmit */}
      <form 
        id="contact-form" 
        action="https://formspree.io/f/GANTI_DENGAN_ID_UNIK_ANDA" // <-- JANGAN LUPA GANTI
        method="POST"
        onSubmit={handleSubmit} // Gunakan handler JS
      >
        <div className="flex gap-8 mb-8 sm:flex-col sm:gap-0">
          <input type="text" name="name" placeholder="Full Name" required className="w-full reveal-item" disabled={status === 'loading'} />
          <input type="email" name="email" placeholder="Email" required className="w-full reveal-item" disabled={status === 'loading'} />
        </div>
        <textarea name="message" placeholder="Message" rows={6} required className="w-full mb-16 resize-y reveal-item" disabled={status === 'loading'}></textarea>
        
        <div className="flex items-center gap-4">
          <button 
            type="submit" 
            className="px-[30px] py-[15px] text-[16px] font-medium text-accent-text bg-accent border border-accent cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-accent reveal-item disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === 'loading'} // Disable saat loading
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
          {/* Tampilkan pesan status */}
          {message && (
            <p className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}