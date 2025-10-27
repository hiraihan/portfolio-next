"use client";
import React, { useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  // 1. Ambil Formspree URL dari environment variable
  const formSpreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // 2. Tambahkan pemeriksaan jika URL tidak ada
    if (!formSpreeUrl) {
      setStatus('error');
      setMessage('Formulir tidak dikonfigurasi. Harap atur NEXT_PUBLIC_FORMSPREE_URL.');
      return;
    }

    setStatus('loading');
    setMessage('');

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      // 3. Gunakan variabel 'formSpreeUrl'
      const response = await fetch(formSpreeUrl, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Terima kasih! Pesan Anda telah terkirim.');
        form.reset();
      } else {
        const responseData = await response.json();
        if (responseData.errors) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setMessage(responseData.errors.map((error: any) => error.message).join(", "));
        } else {
          setMessage('Oops! Terjadi kesalahan saat mengirim pesan.');
        }
        setStatus('error');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      <form
        id="contact-form"
        // 'action' tidak lagi diperlukan di sini karena di-handle oleh onSubmit
        method="POST"
        onSubmit={handleSubmit}
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
            // 4. Disable tombol jika URL tidak ada
            disabled={status === 'loading' || !formSpreeUrl}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
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