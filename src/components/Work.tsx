'use client';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useTransform, useScroll, motion, useReducedMotion } from 'framer-motion';
import { useGrayscaleStore } from '@/lib/store';

const images: string[] = [
  "certigen.webp",
  "citronics.webp", 
  "cybersphere.webp",
  "dreammist.webp",
  "equi.webp",
  "gdsc.webp",
  "ghibli.webp",
  "hero.webp",
  "inkscroll.webp",
  "monsterpedia.webp",
  "riya.webp",
  "story.webp",
];

interface ColumnProps {
  images: string[];
  y: any; 
  topOffset?: string;
  isMobile: boolean;
  shouldReduceMotion: boolean;
}

const Column: React.FC<ColumnProps> = ({ images, y, topOffset, isMobile, shouldReduceMotion }) => {
  const { isGrayscaleEnabled } = useGrayscaleStore();
  
  return (
    <motion.div 
      className={`relative h-full flex flex-col gap-2 md:gap-8 ${
        isMobile ? 'flex-1 min-w-0' : 'w-1/4 min-w-[250px]'
      }`}
      style={{ 
        y: shouldReduceMotion ? 0 : y, 
        top: topOffset,
        // Critical mobile performance optimizations
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      {images.map((src, i) => (
        <div 
          key={i} 
          className="relative w-full overflow-hidden"
          style={{ 
            aspectRatio: isMobile ? '3/4' : 'auto',
            height: isMobile ? 'auto' : '100%'
          }}
        >
          <div 
            className={`w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 border border-neutral-700 ${
              // Simplified mobile effects
              isMobile 
                ? `${isGrayscaleEnabled ? 'filter grayscale' : ''} transition-none` 
                : `${isGrayscaleEnabled ? 'filter grayscale contrast-125' : ''} hover:grayscale-0 transition-all duration-300`
            }`}
            style={{
              backgroundImage: `url(/work/${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: isMobile ? '200px' : 'auto',
              // Mobile GPU acceleration
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              // Prevent layout thrashing
              contain: 'layout style paint'
            }}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default function Work() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const shouldReduceMotion = useReducedMotion();
  
  // Cache mobile check
  const isMobile = useMemo(() => dimension.width < 768, [dimension.width]);
  
  // Use lighter scroll detection for mobile
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
    // Reduce scroll sampling on mobile for better performance
    layoutEffect: false
  });
  
  const { height } = dimension;
  
  // Dramatically simplified transforms for mobile
  const y1 = useTransform(
    scrollYProgress, 
    [0, 1], 
    isMobile ? [0, height * 0.5] : [0, height * 2]
  );
  
  const y2 = useTransform(
    scrollYProgress, 
    [0, 1], 
    isMobile ? [0, height * 0.8] : [0, height * 3.3]
  );
  
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  
  // Throttled resize handler for better performance
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setDimension({ width, height });
  }, []);
  
  useEffect(() => {
    let rafId: number;
    let timeoutId: NodeJS.Timeout;
    
    const throttledResize = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          handleResize();
          rafId = 0;
        }, 150);
      });
    };
    
    window.addEventListener("resize", throttledResize, { passive: true });
    handleResize(); // Initial call
    
    return () => {
      window.removeEventListener("resize", throttledResize);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);
  
  // Memoize column organization
  const columnImages = useMemo(() => {
    if (isMobile) {
      return [
        [images[0], images[2], images[4], images[6], images[8], images[10]],
        [images[1], images[3], images[5], images[7], images[9], images[11]],
      ];
    } else {
      return [
        [images[0], images[1], images[2]],
        [images[3], images[4], images[5]],
        [images[6], images[7], images[8]],
        [images[9], images[10], images[11]],
      ];
    }
  }, [isMobile]);
  
  return (
    <div className='bg-black border-t-2' id='work'>
      <div className="text-center mb-12 relative pt-12 pb-3">
        <h2 className="text-[50px] md:text-7xl font-extrabold text-center mb-6">
          <span className="bg-gradient-to-r from-neutral-400 via-white to-neutral-200 bg-clip-text text-transparent">
            MY WORK
          </span>
        </h2>
      </div>
      
      <div className='bg-black'>
        <main className="w-full max-w-7xl mx-auto">
          <div 
            ref={gallery} 
            className="relative flex gap-2 md:gap-8 px-2 md:p-8 box-border overflow-hidden"
            style={{ 
              height: isMobile ? '120vh' : '175vh', // Reduced mobile height
              // Critical mobile optimizations
              WebkitOverflowScrolling: 'touch',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              // Contain layout calculations
              contain: 'layout style paint',
              // Prevent unnecessary repaints
              isolation: 'isolate'
            }}
          >
            {isMobile ? (
              <>
                <Column 
                  images={columnImages[0]} 
                  y={y1} 
                  topOffset="-10%" 
                  isMobile={isMobile} 
                  shouldReduceMotion={shouldReduceMotion || false}
                />
                <Column 
                  images={columnImages[1]} 
                  y={y2} 
                  topOffset="-20%" 
                  isMobile={isMobile} 
                  shouldReduceMotion={shouldReduceMotion || false}
                />
              </>
            ) : (
              <>
                <Column 
                  images={columnImages[0]} 
                  y={y1} 
                  topOffset="-45%" 
                  isMobile={isMobile} 
                  shouldReduceMotion={shouldReduceMotion || false}
                />
                <Column 
                  images={columnImages[1]} 
                  y={y2} 
                  topOffset="-95%" 
                  isMobile={isMobile} 
                  shouldReduceMotion={shouldReduceMotion || false}
                />
                <Column 
                  images={columnImages[2]} 
                  y={y3} 
                  topOffset="-45%" 
                  isMobile={isMobile} 
                  shouldReduceMotion={shouldReduceMotion || false}
                />
                <Column 
                  images={columnImages[3]} 
                  y={y4} 
                  topOffset="-75%" 
                  isMobile={isMobile} 
                  shouldReduceMotion={shouldReduceMotion || false}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}