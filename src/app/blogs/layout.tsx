'use client'
import React from 'react';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/scroll-progress';
import { ScrollToTop } from '@/components/scroll-to-top';
import LenisProvider from '@/components/lenis/LenisProvider';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <ScrollProgress />
      <CustomCursor />
      <div className="min-h-screen bg-white dark:bg-neutral-950">
        <main>
          {children}
        </main>
        <ScrollToTop />
      </div>
    </LenisProvider>
  );
} 