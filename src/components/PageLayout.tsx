import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-transparent px-2 py-8 sm:py-12">
      <header className="w-full max-w-lg mx-auto mb-8">
        <h1 className="handwriting-text text-4xl sm:text-5xl font-bold text-center text-gray-900 tracking-tight mb-8">
          你每分钟值多少钱？
        </h1>
      </header>
      <main className="w-full max-w-lg mx-auto flex-1 flex flex-col items-center">
        {children}
      </main>
      <footer className="w-full max-w-lg mx-auto mt-8 text-center text-xs text-gray-400 handwriting-text">
        © {new Date().getFullYear()} 你每分钟值多少钱
      </footer>
    </div>
  );
} 