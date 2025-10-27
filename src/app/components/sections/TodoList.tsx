"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ConfirmationModal } from '../ConfirmationModal';


type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
};

const LOCAL_STORAGE_KEY = 'my-portfolio-todos';

export function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedTodos) {
        try {
          const parsedTodos = JSON.parse(savedTodos);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return parsedTodos.map((todo: any) => ({
            ...todo,
            createdAt: todo.createdAt || Date.now()
          }));
        } catch (e) {
          console.error("Error parsing todos from localStorage", e);
          return [];
        }
      }
    }
    return [];
  });

  const [inputText, setInputText] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null); 
  const [editingText, setEditingText] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<{ id: number; text: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    const newTodo: TodoItem = {
      id: Date.now(),
      text: inputText,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([...todos, newTodo]);
    setInputText('');
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const requestDeleteTodo = (id: number, text: string) => {
    setTodoToDelete({ id, text });
    setIsModalOpen(true);
  };

  const confirmDeleteTodo = () => {
    if (todoToDelete) {
      setTodos(todos.filter(todo => todo.id !== todoToDelete.id));
      if (editingId === todoToDelete.id) {
        setEditingId(null);
        setEditingText('');
      }
    }
    setTodoToDelete(null);
  };

  const cancelDeleteTodo = () => {
    setIsModalOpen(false);
    setTodoToDelete(null);
  };

  const handleStartEdit = (id: number, currentText: string) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleSaveEdit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (editingId === null || editingText.trim() === '') {
       handleCancelEdit();
       return;
    };

    setTodos(
      todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      )
    );
    handleCancelEdit();
  };

  const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(e.target.value);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString('id-ID')} ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return b.createdAt - a.createdAt;
    });
  }, [todos]);

  return (
    <div className="pt-2">
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

      <ul className="space-y-4">
        {sortedTodos.map(todo => (
          <li
            key={todo.id}
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-card border border-border rounded-lg ${editingId === todo.id ? 'ring-2 ring-accent' : ''}`}
          >
            {editingId === todo.id ? (
              <form onSubmit={handleSaveEdit} className="flex-grow flex items-center gap-2 w-full">
                 <input
                    type="text"
                    value={editingText}
                    onChange={handleEditingInputChange}
                    className="flex-grow border-b border-accent px-1 py-0 bg-transparent focus:outline-none"
                    autoFocus
                    onBlur={() => setTimeout(handleSaveEdit, 150)}
                    aria-label={`Edit task: ${todo.text}`}
                 />
                 <button type="submit" className="text-green-600 hover:text-green-800 p-1" aria-label="Save changes">✓</button>
                 <button type="button" onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-800 p-1" aria-label="Cancel edit">×</button>
              </form>
            ) : (
              <>
                <div className="flex items-center gap-3 flex-grow min-w-0"> {/* min-w-0 untuk wrap teks */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    className="form-checkbox h-5 w-5 text-accent border-subtle rounded focus:ring-accent cursor-pointer flex-shrink-0"
                    aria-labelledby={`todo-text-${todo.id}`}
                  />
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
                <div className="flex gap-2 items-center flex-shrink-0 mt-2 sm:mt-0 self-start sm:self-center">
                  <button
                    onClick={() => handleStartEdit(todo.id, todo.text)}
                    aria-label={`Edit task: ${todo.text}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-xl px-2 py-1 border border-transparent hover:border-blue-600 rounded cursor-pointer"
                  >
                    &#9998;
                  </button>
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
        {todos.length === 0 && (
           <p className="text-subtle text-center py-4">No tasks yet. Add one above!</p>
        )}
      </ul>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDeleteTodo} 
        onConfirm={confirmDeleteTodo} 
        title="Confirm Deletion"
        message={`Are you sure you want to delete this task?\n"${todoToDelete?.text || ''}"`}
      />
    </div>
  );
}