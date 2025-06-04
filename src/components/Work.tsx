'use client';
import { useEffect, useRef, useState } from 'react';
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

interface Dimension {
  width: number;
  height: number;
}

interface ColumnProps {
  images: string[];
  y: any; 
  topOffset?: string;
}

const Column: React.FC<ColumnProps> = ({ images, y, topOffset }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div 
      className={`relative h-full flex flex-col gap-2 md:gap-8 ${
        typeof window !== 'undefined' && window.innerWidth >= 768 
          ? 'w-1/4 min-w-[250px]' 
          : 'flex-1 min-w-0'
      }`}
      style={{ y, top: topOffset }}
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
            className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500 border border-neutral-700"
            style={{
              backgroundImage: `url(/work/${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              minHeight: isMobile ? '250px' : 'auto'
            }}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default function Work() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  });
  
  const { height } = dimension;
  
  // Always call all hooks, but use different values based on mobile state
  const desktopY1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const desktopY2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const mobileY1 = useTransform(scrollYProgress, [0, 1], [0, height * 1.5]);
  const mobileY2 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  
  const y = isMobile ? mobileY1 : desktopY1;
  const y2 = isMobile ? mobileY2 : desktopY2;
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  
  useEffect(() => {
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimension({ width, height });
      setIsMobile(width < 768);
    };
    
    window.addEventListener("resize", resize);
    resize();
    
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  
  // Organize images differently for mobile (2 columns) vs desktop (4 columns)
  const getColumnImages = () => {
    if (isMobile) {
      // 2 columns for mobile
      return [
        [images[0], images[2], images[4], images[6], images[8], images[10]], // Column 1
        [images[1], images[3], images[5], images[7], images[9], images[11]], // Column 2
      ];
    } else {
      // 4 columns for desktop
      return [
        [images[0], images[1], images[2]], // Column 1
        [images[3], images[4], images[5]], // Column 2
        [images[6], images[7], images[8]], // Column 3
        [images[9], images[10], images[11]], // Column 4
      ];
    }
  };
  
  const columnImages = getColumnImages();
  
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
            style={{ height: isMobile ? '200vh' : '175vh' }}
          >
            {isMobile ? (
              // Mobile layout - 2 columns with adjusted offsets
              <>
                <Column images={columnImages[0]} y={y} topOffset="-20%" />
                <Column images={columnImages[1]} y={y2} topOffset="-40%" />
              </>
            ) : (
              // Desktop layout - 4 columns
              <>
                <Column images={columnImages[0]} y={y} topOffset="-45%" />
                <Column images={columnImages[1]} y={y2} topOffset="-95%" />
                <Column images={columnImages[2]} y={y3} topOffset="-45%" />
                <Column images={columnImages[3]} y={y4} topOffset="-75%" />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}