"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import WaterRippleEffect from "../ui/water-ripple-effect";

// Define service items
const serviceItems = [
  {
    id: "1",
    title: "Frontend Development",
  },
  {
    id: "2",
    title: "Backend Development",
  },
  {
    id: "3",
    title: "UI/UX Design",
  },
  {
    id: "4",
    title: "SEO Optimization",
  },
  {
    id: "5",
    title: "Mobile Development",
  }
];

export default function Service() {
  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-gradient-to-b dark:from-black dark:from-10% dark:to-neutral-950 border border-neutral-300 dark:border-neutral-700 relative overflow-hidden">
      <div
        className={cn(
          `absolute inset-0 size-full`,
          `bg-[radial-gradient(#00000022_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)]`,
          "lab-bg pointer-events-none [background-size:16px_16px]"
        )}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
        {/* Left side - Big Image Only */}
        <div className="relative bg-gradient-to-r from-black to-black lg:to-white dark:bg-gradient-to-r dark:from-black dark:to-black flex items-center justify-center lg:block lg:overflow-hidden">
          <WaterRippleEffect/>
        </div>

        {/* Right side - Title and Service List */}
        <div className="relative py-12 px-1 lg:mt-0 md:mt-20">
          <div className="text-center mb-6">
            <h2 className="text-[40px] md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent">
                WHAT I DO
              </span>
            </h2>
          </div>
          <div className="overflow-y-auto md:pr-2">
            {serviceItems.map((service) => (
              <div key={service.id}>
                <div className="relative mb-4 group transition-all duration-300">
                  <div className="flex items-center p-1 md:p-3">
                    <div className="w-12 h-12 rounded-full bg-white border border-neutral-300 dark:bg-neutral-950 dark:border-neutral-700 flex items-center justify-center mr-4 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                      <span className="text-sm font-semibold">{service.id}</span>
                    </div>
                    <div className="flex-1 py-2 px-4 rounded-4xl bg-white dark:bg-neutral-950 text-black dark:text-white border group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                      <p className="text-center font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-white dark:group-hover:text-black">{service.title}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white border border-neutral-300 dark:bg-neutral-950 dark:border-neutral-700 flex items-center justify-center ml-4 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                      <ArrowRight className="w-5 h-5 rotate-90 group-hover:rotate-180 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}