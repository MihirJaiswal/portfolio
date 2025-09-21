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
      <div className="min-h-screen bg-white dark:bg-neutral-950">
        <main>
          {children}
        </main>
        <ScrollToTop />
      </div>
    </LenisProvider>
  );
} 