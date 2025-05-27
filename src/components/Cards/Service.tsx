"use client";

import { motion, useSpring } from "framer-motion";
import React, { useState, useRef, MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Define service items with images
const serviceItems = [
  {
    id: "1",
    title: "Frontend Development",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=1274&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Backend Development",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1274&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1274&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "SEO Optimization",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1274&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Mobile Development",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1274&auto=format&fit=crop",
  }
];
export default function Service() {
  const [img, setImg] = useState<{ src: string; alt: string; opacity: number }>(
    {
      src: "",
      alt: "",
      opacity: 0,
    }
  );

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  const imagePos = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const relativeX = clientX - containerRect.left;
    const relativeY = clientY - containerRect.top;
    imagePos.x.set(relativeX - imageRef.current.offsetWidth / 2);
    imagePos.y.set(relativeY - imageRef.current.offsetHeight / 2);
  };

  const handleImageInteraction = (service: any, opacity: number) => {
    setImg({ src: service.image, alt: service.title, opacity });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      className="max-w-6xl mx-auto md:px-6 px-3 bg-white dark:bg-gradient-to-b dark:from-black dark:from-10% dark:to-neutral-950 border border-neutral-300 dark:border-neutral-700 dark:to-0 dark:to-100% py-12 relative"
    >
      <div
        className={cn(
          `absolute inset-0 size-full`,
          `bg-[radial-gradient(#00000022_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)]`,
          "lab-bg pointer-events-none [background-size:16px_16px]"
        )}
      />
      <div className="text-center mb-12 relative">
        <h2 className="text-[50px] md:text-7xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent">
            SERVICES 
          </span>
        </h2>
      </div>

      <div className="mx-auto relative">
        {serviceItems.map((service) => (
          <div
            key={service.id}
            onMouseEnter={() => handleImageInteraction(service, 1)}
            onMouseMove={() => handleImageInteraction(service, 1)}
            onMouseLeave={() => handleImageInteraction(service, 0)}
          >
            <div className="relative mb-5 group bg-whit dark:bg-neutral-950">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white border border-neutral-300 dark:bg-neutral-950 dark:border-neutral-700 flex items-center justify-center mr-4 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <span className="text-sm">{service.id}</span>
                </div>
                <div className="flex-1 py-4 px-8 rounded-ful border-b border-neutral-300 dark:border-neutral-700 transition-all">
                  <p className="text-center font-semibold">{service.title}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white border border-neutral-300 dark:bg-neutral-950 dark:border-neutral-700 flex items-center justify-center ml-4 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <ArrowRight className="w-5 h-5 rotate-90 group-hover:rotate-0 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <motion.img
        ref={imageRef}
        src={img.src}
        alt={img.alt}
        className="w-[300px] h-[220px] rounded-lg object-cover absolute top-0 left-0 pointer-events-none z-30 filter grayscale"
        style={{
          x: imagePos.x,
          y: imagePos.y,
          opacity: img.opacity,
          transition: "opacity 0.2s ease-in-out",
        }}
      />
    </div>
  );
}
