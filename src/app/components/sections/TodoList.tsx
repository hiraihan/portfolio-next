"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ConfirmationModal } from '../ConfirmationModal'; // Pastikan path import ini benar

// Definisikan tipe untuk item to-do
type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number; // Timestamp waktu dibuat
};

// Kunci unik untuk localStorage
const LOCAL_STORAGE_KEY = 'my-portfolio-todos';

export function TodoList() {
  // State untuk menyimpan daftar to-do, diinisialisasi dari localStorage
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    // Fungsi ini hanya dijalankan sekali saat komponen pertama kali dirender
    if (typeof window !== 'undefined') { // Pastikan localStorage tersedia (client-side)
      const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedTodos) {
        try {
          // Parse data JSON
          const parsedTodos = JSON.parse(savedTodos);
          // Pastikan data lama memiliki properti createdAt, beri default jika tidak
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return parsedTodos.map((todo: any) => ({
            ...todo,
            createdAt: todo.createdAt || Date.now()
          }));
        } catch (e) {
          console.error("Error parsing todos from localStorage", e);
          return []; // Kembali ke array kosong jika ada error parsing
        }
      }
    }
    return []; // Default jika tidak ada data tersimpan atau bukan client-side
  });

  // State untuk input teks to-do baru
  const [inputText, setInputText] = useState('');

  // State untuk fitur edit
  const [editingId, setEditingId] = useState<number | null>(null); // ID todo yang sedang diedit
  const [editingText, setEditingText] = useState(''); // Teks sementara saat mengedit

  // State untuk modal konfirmasi hapus
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<{ id: number; text: string } | null>(null);

  // Efek untuk menyimpan ke localStorage setiap kali 'todos' berubah
  useEffect(() => {
    if (typeof window !== 'undefined') { // Hanya jalankan di client-side
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]); // Dependency array: efek ini berjalan setiap kali 'todos' berubah

  // Handler untuk input teks baru
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  // Handler untuk menambahkan to-do baru
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah submit form bawaan
    if (inputText.trim() === '') return; // Jangan tambahkan jika kosong

    const newTodo: TodoItem = {
      id: Date.now(), // ID unik sederhana
      text: inputText,
      completed: false,
      createdAt: Date.now(), // Set waktu saat ini
    };
    setTodos([...todos, newTodo]); // Tambahkan ke state
    setInputText(''); // Kosongkan input
  };

  // Handler untuk mengubah status selesai/belum selesai
  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handler untuk meminta konfirmasi sebelum menghapus
  const requestDeleteTodo = (id: number, text: string) => {
    setTodoToDelete({ id, text }); // Simpan detail todo yang akan dihapus
    setIsModalOpen(true); // Buka modal konfirmasi
  };

  // Handler yang dijalankan saat penghapusan dikonfirmasi di modal
  const confirmDeleteTodo = () => {
    if (todoToDelete) {
      setTodos(todos.filter(todo => todo.id !== todoToDelete.id)); // Hapus dari state
      // Jika todo yang sedang diedit dihapus, batalkan mode edit
      if (editingId === todoToDelete.id) {
        setEditingId(null);
        setEditingText('');
      }
    }
    // State modal ditutup oleh komponen ConfirmationModal
    setTodoToDelete(null); // Reset state todo yang akan dihapus
  };

  // Handler untuk membatalkan penghapusan (menutup modal)
  const cancelDeleteTodo = () => {
    setIsModalOpen(false);
    setTodoToDelete(null);
  };

  // Handler untuk memulai mode edit
  const handleStartEdit = (id: number, currentText: string) => {
    setEditingId(id);
    setEditingText(currentText); // Isi input edit dengan teks saat ini
  };

  // Handler untuk membatalkan mode edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

   // Handler untuk menyimpan hasil edit
  const handleSaveEdit = (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Mencegah submit jika dari form
    // Batalkan edit jika ID tidak valid atau teks kosong
    if (editingId === null || editingText.trim() === '') {
       handleCancelEdit();
       return;
    };

    // Update teks todo yang sesuai di state
    setTodos(
      todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      )
    );
    handleCancelEdit(); // Keluar dari mode edit
  };

  // Handler untuk perubahan input saat mengedit
  const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(e.target.value);
  };

  // Fungsi helper untuk format timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    // Format: DD/MM/YYYY HH:MM (sesuaikan locale jika perlu)
    return `${date.toLocaleDateString('id-ID')} ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
  };

  // Memoized sorted todos (belum selesai di atas, lalu terbaru di atas)
  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; // false (0) comes before true (1)
      }
      return b.createdAt - a.createdAt; // Newest first
    });
  }, [todos]);

  // Render komponen
  return (
    // Menggunakan div sebagai wrapper utama, bukan <section>
    <div className="pt-2"> {/* Sedikit padding atas opsional */}
      {/* Form untuk menambah todo baru */}
      <form onSubmit={handleAddTodo} className="flex gap-4 mb-8">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          className="flex-grow border-b border-border bg-transparent focus:outline-none focus:border-accent px-1 py-1" // Styling input
          aria-label="New todo input"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-accent-text bg-accent border border-accent rounded cursor-pointer transition-colors hover:bg-transparent hover:text-accent whitespace-nowrap"
        >
          Add Task
        </button>
      </form>

      {/* Daftar To-Do */}
      <ul className="space-y-4">
        {sortedTodos.map(todo => (
          <li
            key={todo.id}
            // Highlight item yang sedang diedit
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-card border border-border rounded-lg ${editingId === todo.id ? 'ring-2 ring-accent' : ''}`}
          >
            {editingId === todo.id ? (
              // Tampilan saat mode Edit aktif
              <form onSubmit={handleSaveEdit} className="flex-grow flex items-center gap-2 w-full">
                 <input
                    type="text"
                    value={editingText}
                    onChange={handleEditingInputChange}
                    className="flex-grow border-b border-accent px-1 py-0 bg-transparent focus:outline-none" // Input edit
                    autoFocus // Fokus otomatis
                    // Simpan saat fokus hilang (blur) dengan sedikit delay
                    onBlur={() => setTimeout(handleSaveEdit, 150)}
                    aria-label={`Edit task: ${todo.text}`}
                 />
                 {/* Tombol Simpan Edit */}
                 <button type="submit" className="text-green-600 hover:text-green-800 p-1" aria-label="Save changes">✓</button>
                 {/* Tombol Batal Edit */}
                 <button type="button" onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-800 p-1" aria-label="Cancel edit">×</button>
              </form>
            ) : (
              // Tampilan Normal (tidak sedang diedit)
              <>
                <div className="flex items-center gap-3 flex-grow min-w-0"> {/* min-w-0 untuk wrap teks */}
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    className="form-checkbox h-5 w-5 text-accent border-subtle rounded focus:ring-accent cursor-pointer flex-shrink-0"
                    aria-labelledby={`todo-text-${todo.id}`}
                  />
                  {/* Teks Todo dan Timestamp */}
                  <div className="flex flex-col min-w-0"> {/* min-w-0 */}
                    <span
                      id={`todo-text-${todo.id}`}
                      className={`text-[16px] break-words ${todo.completed ? 'line-through text-subtle' : 'text-primary'}`}
                    >
                      {todo.text}
                    </span>
                    <span className="text-xs text-subtle mt-1">
                      Added: {formatTimestamp(todo.createdAt)}
                    </span>
                  </div>
                </div>
                {/* Tombol Aksi (Edit & Hapus) */}
                <div className="flex gap-2 items-center flex-shrink-0 mt-2 sm:mt-0 self-start sm:self-center">
                  {/* Tombol Edit */}
                  <button
                    onClick={() => handleStartEdit(todo.id, todo.text)}
                    aria-label={`Edit task: ${todo.text}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-xl px-2 py-1 border border-transparent hover:border-blue-600 rounded cursor-pointer"
                  >
                    &#9998;
                  </button>
                  {/* Tombol Hapus (memicu modal konfirmasi) */}
                  <button
                    onClick={() => requestDeleteTodo(todo.id, todo.text)}
                    aria-label={`Delete task: ${todo.text}`}
                    className="text-red-500 hover:text-red-700 transition-colors text-xl px-2 py-1 border border-transparent hover:border-red-500 rounded font-bold cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
        {/* Pesan jika daftar kosong */}
        {todos.length === 0 && (
           <p className="text-subtle text-center py-4">No tasks yet. Add one above!</p>
        )}
      </ul>

      {/* Render Modal Konfirmasi Hapus */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDeleteTodo} // Handler untuk tombol Cancel/backdrop
        onConfirm={confirmDeleteTodo} // Handler untuk tombol Delete
        title="Confirm Deletion"
        message={`Are you sure you want to delete this task?\n"${todoToDelete?.text || ''}"`} // Pesan konfirmasi
      />
    </div>
  );
}