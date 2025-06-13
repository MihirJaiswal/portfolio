"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function ThreeDMarqueeDemo() {
    const images = [
        "/assets/marquee/1.png",
        "/assets/marquee/2.png",
        "/assets/marquee/3.png",
        "/assets/marquee/4.png",
        "/assets/marquee/5.png",
        "/assets/marquee/6.png",
        "/assets/marquee/7.png",
        "/assets/marquee/8.png",
        "/assets/marquee/9.png",
        "/assets/marquee/10.png",
        "/assets/marquee/11.png",
        "/assets/marquee/12.png",
        "/assets/marquee/13.png",
        "/assets/marquee/14.png",
        "/assets/marquee/15.png",
        "/assets/marquee/16.png",
        "/assets/marquee/17.png",
    
        "/assets/marquee/18.png",
        "/assets/marquee/19.png",
        "/assets/marquee/20.png",
        "/assets/marquee/21.png",
        "/assets/marquee/22.png",
        "/assets/marquee/23.png",
        "/assets/marquee/24.png",
        "/assets/marquee/25.png",
        "/assets/marquee/26.png",
        "/assets/marquee/27.png",
        "/assets/marquee/1.png",
        "/assets/marquee/2.png",
        "/assets/marquee/3.png",
        "/assets/marquee/4.png",
        "/assets/marquee/5.png",
        "/assets/marquee/6.png",
        "/assets/marquee/7.png",
        "/assets/marquee/8.png",
        "/assets/marquee/9.png",
        "/assets/marquee/10.png",
        "/assets/marquee/11.png",
        "/assets/marquee/12.png",
        "/assets/marquee/13.png",
        "/assets/marquee/14.png",
        "/assets/marquee/15.png",
        "/assets/marquee/16.png",
        "/assets/marquee/17.png",
      ];
  return (
    <div className="mx-auto max-w-7xl bg-gray-950/5 ring-1 ring-neutral-700/10 dark:bg-neutral-800 lg:min-h-[650px] -mt-[92px]">
      <ThreeDMarquee images={images} />
    </div>
  );
}
