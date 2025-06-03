import { useEffect, useState } from "react";
import { Apple, BadgeCent, BadgeInfo, BadgeX, Banana, Bolt } from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";

// Inline Tailwind configuration for floating animation
// Normally this would be in tailwind.config.js
// Kept for reference but no longer used on the statue
export const CenterIcon = (
  <div className="relative h-112 w-112 z-10">
    <Image
      src="/assets/statue.png"
      alt="Statue"
      fill
      className="object-contain filter grayscale contrast-125 brightness-105 drop-shadow-lg drop-shadow-black"
    />
  </div>
);

export const LucideIcons = [
  <Banana key="banana" className="h-8 w-8" />,
  <Bolt key="bolt" className="h-8 w-8" />,
  <BadgeX key="badge-x" className="h-8 w-8" />,
  <BadgeCent key="badge-cent" className="h-8 w-8" />,
  <BadgeInfo key="badge-info" className="h-8 w-8" />,
  <Apple key="apple" className="h-8 w-8" />,
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
  items: React.ReactNode[];

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
  items = LucideIcons,
  backgroundClassName,
  containerClassName,
  className,
  verticalOffset = -30, // Changed from -80 to -40 to move orbit lower
}: OrbitingItems3DProps) {
  // The OrbitingItems3D component creates an animated elliptical orbiting effect for a set of items around a central element.
  // It allows for a visually dynamic layout, where items revolve around the center in a smooth, continuous motion,
  // creating the illusion of 3D movement. The component provides a range of customizable options to control the orbit,
  // including the size of the elliptical path, tilt angle, and animation duration.

  const [animationTime, setAnimationTime] = useState(0);

  useEffect(() => {
    let animationId: number;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      // Convert duration from per-step to full rotation time
      const rotationSpeed = duration * 360; // milliseconds for one full rotation
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
    // Calculate the base angle for this item (evenly distributed)
    const angleStep = 360 / totalItems;
    const baseAngle = index * angleStep;
    
    // Add the animation time to create rotation
    const angle = (baseAngle + animationTime) % 360;
    const radians = (angle * Math.PI) / 180;

    // X and Y positions before tilt
    const x = radiusX * Math.cos(radians);
    const y = radiusY * Math.sin(radians);

    // Apply the tilt using rotation matrix
    const tiltRadians = (tiltAngle * Math.PI) / 180;
    const xTilted = x * Math.cos(tiltRadians) - y * Math.sin(tiltRadians);
    const yTilted = x * Math.sin(tiltRadians) + y * Math.cos(tiltRadians);
    // Adjust z-index to ensure proper layering with the statue
    // Icons in front (0-180 degrees) should be above statue, icons in back (180-360) should be below
    const zIndex = angle > 180 ? 5 : 20;
    // Use a more subtle scale difference to suggest depth without making icons disappear
    const scale = angle < 180 ? 1.1 : 0.9;

    return {
      left: `${50 + xTilted}%`,
      top: `${50 + yTilted + verticalOffset}%`, // Add vertical offset to position items near the head
      transform: `translate(-50%, -50%) scale(${scale})`,
      zIndex: zIndex,
      opacity: 0.8 + (angle < 180 ? 0.2 : 0), // Make items slightly more transparent when in back
      transition: "opacity 0.5s ease-in-out",
    };
  };

  const reverse = cn("transition-transform ease-linear direction-reverse repeat-infinite");

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
          "relative flex h-128 w-128 items-center justify-center ease-linear repeat-infinite z-10",
          className,
        )}
      >
        {CenterIcon}
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-white/50  backdrop-blur-md transition-transform duration-500 ease-out"
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
              <div className={reverse}>{item}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}