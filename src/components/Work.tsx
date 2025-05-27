'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
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
  return (
    <motion.div 
      className={`relative h-full w-1/4 min-w-[250px] flex flex-col gap-8`}
      style={{ y, top: topOffset }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden">
          <Image 
            src={`/work/${src}`}
            alt="image"
            fill
            className="object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500 border border-neutral-700"
          />
        </div>
      ))}
    </motion.div>
  );
};

export default function Work() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 });
  
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  });
  
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  
  useEffect(() => {
    const lenis = new Lenis();
    
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();
    
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  
  return (
   <div className='border-t-2 bg-black'>
     <main className="w-full max-w-6xl mx-auto">
      <div ref={gallery} className="h-[175vh] relative flex gap-8 p-8 box-border overflow-hidden">
        <Column images={[images[0], images[1], images[2]]} y={y} topOffset="-45%" />
        <Column images={[images[3], images[4], images[5]]} y={y2} topOffset="-95%" />
        <Column images={[images[6], images[7], images[8]]} y={y3} topOffset="-45%" />
        <Column images={[images[9], images[10], images[11]]} y={y4} topOffset="-75%" />
      </div>
    </main>
   </div>
  );
}