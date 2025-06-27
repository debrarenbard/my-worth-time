import type { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <div className="min-h-screen w-full font-sans rainbow-bg">
      {children}
    </div>
  );
} 