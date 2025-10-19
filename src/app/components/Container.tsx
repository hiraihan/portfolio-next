// src/components/Container.tsx
import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

// Asli: max-width: 960px; padding: 0 4rem (40px);
export function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[960px] mx-auto px-[40px]">
      {children}
    </div>
  );
}