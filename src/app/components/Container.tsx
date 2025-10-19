import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[960px] mx-auto px-[40px]">
      {children}
    </div>
  );
}