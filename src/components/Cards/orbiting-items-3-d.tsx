'use client'
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import statue from '../../../public/assets/statue.png'

export const CenterIcon = () => {
  
  return (
    <div className="relative h-112 w-112 z-10">
      <Image
        src={statue}
        alt="Statue"
        fill
        loading="lazy"
        className="object-contain drop-shadow-2xl drop-shadow-black"
      />
    </div>
  );
};

// Replace with your actual image imports
import image1 from '../../../public/assets/icons/logo-tailwind.svg'; // Replace with your actual paths
import image2 from '../../../public/assets/icons/logo-nyx.png';
import image3 from '../../../public/assets/icons/logo-motion.svg';
import image4 from '../../../public/assets/icons/logo-react.svg';
import image5 from '../../../public/assets/icons/logo-nextjs.png';

export const ImageItems = [
  {
    src: image1,
    alt: "Image 1",
    key: "image1"
  },
  {
    src: image2,
    alt: "Image 2", 
    key: "image2"
  },
  {
    src: image3,
    alt: "Image 3",
    key: "image3"
  },
  {
    src: image4,
    alt: "Image 4",
    key: "image4"
  },
  {
    src: image5,
    alt: "Image 5",
    key: "image5"
  }
];

interface OrbitingItems3DProps {
  /**
   * The radius of the ellipse on X-axis in percentage, relative to the container.
   */
  radiusX: number;

  /**
   * The radius of the ellipse on Y-axis in percentage, relative to the container.
   */
  radiusY: number;

  /**
   * The angle at which ellipse is tilted to x-axis.
   */
  tiltAngle: number;

  /**
   * The time taken for the revolution around the center element.
   */
  duration: number;

  /**
   * The items to orbit around the center of the parent element.
   */
  items?: Array<{src: any, alt: string, key: string}>;

  /**
   * Class name for the background element.
   */
  backgroundClassName?: string;

  /**
   * Class name for the container element.
   */
  containerClassName?: string;

  /**
   * Additional classes for the item container.
   */
  className?: string;

  /**
   * Vertical offset for orbiting items (negative moves up)
   */
  verticalOffset?: number;
}

export default function OrbitingItems3D({
  radiusX = 100,
  radiusY = 30,
  tiltAngle = 360 - 30,
  duration = 25,
  items = ImageItems,
  backgroundClassName,
  containerClassName,
  className,
  verticalOffset = -30,
}: OrbitingItems3DProps) {
  const [animationTime, setAnimationTime] = useState(0);

  useEffect(() => {
    let animationId: number;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      const rotationSpeed = duration * 360;
      const currentAngle = (elapsed / rotationSpeed) * 360;
      
      setAnimationTime(currentAngle);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [duration]);

  const CalculateItemStyle = ({
    index,
    radiusX,
    radiusY,
    totalItems,
    tiltAngle,
    animationTime,
    verticalOffset,
  }: {
    index: number;
    radiusX: number;
    radiusY: number;
    totalItems: number;
    tiltAngle: number;
    animationTime: number;
    verticalOffset: number;
  }) => {
    const angleStep = 360 / totalItems;
    const baseAngle = index * angleStep;
    
    const angle = (baseAngle + animationTime) % 360;
    const radians = (angle * Math.PI) / 180;

    const x = radiusX * Math.cos(radians);
    const y = radiusY * Math.sin(radians);

    const tiltRadians = (tiltAngle * Math.PI) / 180;
    const xTilted = x * Math.cos(tiltRadians) - y * Math.sin(tiltRadians);
    const yTilted = x * Math.sin(tiltRadians) + y * Math.cos(tiltRadians);
    
    const zIndex = angle > 180 ? 5 : 20;
    const scale = angle < 180 ? 1.1 : 0.9;

    return {
      left: `${50 + xTilted}%`,
      top: `${50 + yTilted + verticalOffset}%`,
      transform: `translate(-50%, -50%) scale(${scale})`,
      zIndex: zIndex,
      opacity: 0.8 + (angle < 180 ? 0.2 : 0),
      transition: "opacity 0.5s ease-in-out",
    };
  };

  return (
    <div
      className={cn(
        "storybook-fix group flex items-center justify-center py-32",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 h-full w-full items-center",
          backgroundClassName,
        )}
      />
      <div
        className={cn(
          "relative flex h-[32rem] w-[32rem] items-center justify-center ease-linear repeat-infinite z-10",
          className,
        )}
      >
        <div className="relative h-[28rem] w-[28rem] z-10">
          <Image
            src={statue}
            alt="Statue"
            fill
            loading="lazy"
            className="object-contain drop-shadow-lg drop-shadow-black"
          />
        </div>
        {items.map((item, index) => {
          return (
            <div
              key={item.key}
              className="absolute flex h-14 w-14 items-center justify-center border border-black/60 dark:border-white/60 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md transition-transform duration-500 ease-out overflow-hidden"
              style={CalculateItemStyle({
                index,
                radiusX,
                radiusY,
                tiltAngle,
                totalItems: items.length,
                animationTime,
                verticalOffset,
              })}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={32}
                height={32}
                className="object-contain"
                unoptimized
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}