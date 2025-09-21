import { ScrollProgress } from '@/components/scroll/scroll-progress';
import { ScrollToTop } from '@/components/scroll/scroll-to-top';
import LenisProvider from '@/components/lenis/LenisProvider';
import React from 'react';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <ScrollProgress />
      <div className="min-h-screen bg-white dark:bg-neutral-950">
        <main>
          {children}
        </main>
        <ScrollToTop />
      </div>
    </LenisProvider>
  );
} 