import { type ReactNode } from 'react';

interface DedicationLayoutProps {
  children: ReactNode;
}

export function DedicationLayout({ children }: DedicationLayoutProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {children}
    </div>
  );
}
