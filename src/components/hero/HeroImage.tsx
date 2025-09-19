'use client';
import Image from "next/image";
import { useState, useRef, } from "react";
import img from '../../../public/assets/hero-image.webp';
import skeleton from '../../../public/assets/skeleton.webp';

export const HeroImage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);
  const [maskScale, setMaskScale] = useState(0); 
  const containerRef = useRef<HTMLDivElement>(null);
  const handleImageMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
    
    setHasHovered(true);
    setIsHovering(true);
    setMaskScale(1); 
    
    const event = new CustomEvent('heroImageHover', {
      detail: { isHovering: true }
    });
    document.dispatchEvent(event);
  };

  const handleImageMouseLeave = () => {
    const event = new CustomEvent('heroImageHover', {
      detail: { isHovering: false }
    });
    document.dispatchEvent(event);
    setIsHovering(false);
    setMaskScale(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  const maskRadius = isHovering ? maskScale * 45 : 0;

  return (
    <div
      ref={containerRef}
      id="hero-image-container"
      className="group z-10 relative w-[clamp(300px,40vw,450px)] h-[clamp(350px,45vw,500px)] overflow-hidden rounded-lg lg:mt-52 md:scale-100 lg:scale-92"
      onMouseEnter={handleImageMouseEnter}
      onMouseLeave={handleImageMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Main hero image */}
      <Image
        id="hero-main-image"
        src={img}
        alt="Professional portrait of the designer and developer showcasing creative work and technical expertise"
        height={450}
        width={475}
        quality={100}
        className="object-contain transition-all duration-300 relative w-full h-full"
        priority
        loading="eager"
        unoptimized
        fetchPriority="high"
        sizes="(max-width: 1024px) 40vw, 450px"
      />
      
      {/* Skeleton image with smooth circular mask reveal effect */}
      {hasHovered && (
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity hidden lg:block duration-200 ease-out ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            maskImage: `radial-gradient(circle ${maskRadius}px at ${mousePosition.x}px ${mousePosition.y}px, #0A0A0A 100%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${maskRadius}px at ${mousePosition.x}px ${mousePosition.y}px, #0A0A0A 100%, transparent 100%)`,
            transition: 'mask-image 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-mask-image 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Image
            id="hero-skeleton-image"
            src={skeleton}
            alt="X-ray skeleton view"
            height={450}
            width={475}
            quality={100}
            className="object-contain filter transition-all duration-300 relative w-full h-full bg-white dark:bg-neutral-950"
            priority
            loading="eager"
            unoptimized
            fetchPriority="high"
            sizes="(max-width: 1024px) 40vw, 450px"
          />
        </div>
      )}
      
      {/* elements lighting the shoulder of image lol*/}
      <div className="pointer-events-none">
         <div className="hidden lg:block absolute bottom-0 -translate-y-[130px] -translate-x-15 right-0 bg-white dark:bg-black/5 h-1 w-14 rotate-30 rounded-3xl blur-xs"></div>
          <div className="hidden lg:block absolute bottom-0 -translate-y-[97px] xl:-translate-y-[106px] translate-x-17 xl:translate-x-21 left-0 bg-white dark:bg-black/5 h-2 xl:h-1 w-21 rounded-3xl -rotate-25 blur-xs"></div>
      </div>
    </div>
  );
};