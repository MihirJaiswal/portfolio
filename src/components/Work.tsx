'use client';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useTransform, useScroll, motion } from 'framer-motion';

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
}

const Column: React.FC<ColumnProps> = ({ images, y, topOffset, isMobile }) => {
  return (
    <motion.div 
      className={`relative h-full flex flex-col gap-2 md:gap-8 ${
        isMobile ? 'flex-1 min-w-0' : 'w-1/4 min-w-[250px]'
      }`}
      style={{ 
        y, 
        top: topOffset,
        // Add will-change for better mobile performance
        willChange: 'transform'
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
              // Reduce expensive effects on mobile
              isMobile 
                ? 'filter grayscale hover:grayscale-0 transition-all duration-300' 
                : 'filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500'
            }`}
            style={{
              backgroundImage: `url(/work/${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              minHeight: isMobile ? '250px' : 'auto',
              // Optimize for mobile performance
              transform: isMobile ? 'translateZ(0)' : undefined,
              backfaceVisibility: 'hidden'
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
  
  // Use single state and useMemo for better performance
  const isMobile = useMemo(() => dimension.width < 768, [dimension.width]);
  
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  });
  
  const { height } = dimension;
  
  // Optimize transforms - use simpler calculations for mobile
  const y1 = useTransform(
    scrollYProgress, 
    [0, 1], 
    isMobile ? [0, height * 1.2] : [0, height * 2]
  );
  
  const y2 = useTransform(
    scrollYProgress, 
    [0, 1], 
    isMobile ? [0, height * 1.8] : [0, height * 3.3]
  );
  
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  
  // Debounced resize handler
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setDimension({ width, height });
  }, []);
  
  useEffect(() => {
    // Use passive event listener for better scroll performance
    let timeoutId: NodeJS.Timeout;
    
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };
    
    window.addEventListener("resize", debouncedResize, { passive: true });
    handleResize(); // Initial call
    
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);
  
  // Memoize column organization to prevent recalculation
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
    <div className='bg-black border-t-2'>
      <div className="text-center mb-12 relative pt-12 pb-3">
        <h2 className="text-[50px] md:text-7xl font-bold text-center mb-6">
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
              height: isMobile ? '180vh' : '175vh',
              // Optimize for mobile scrolling
              WebkitOverflowScrolling: 'touch',
              transform: 'translateZ(0)'
            }}
          >
            {isMobile ? (
              <>
                <Column images={columnImages[0]} y={y1} topOffset="-15%" isMobile={isMobile} />
                <Column images={columnImages[1]} y={y2} topOffset="-30%" isMobile={isMobile} />
              </>
            ) : (
              <>
                <Column images={columnImages[0]} y={y1} topOffset="-45%" isMobile={isMobile} />
                <Column images={columnImages[1]} y={y2} topOffset="-95%" isMobile={isMobile} />
                <Column images={columnImages[2]} y={y3} topOffset="-45%" isMobile={isMobile} />
                <Column images={columnImages[3]} y={y4} topOffset="-75%" isMobile={isMobile} />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}