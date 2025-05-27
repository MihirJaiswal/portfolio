"use client";

import Image from "next/image";
import { heroContent } from "@/lib/data";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export const HeroSection = () => {
  const containerRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth spring physics for scroll animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values based on scroll
  const titleY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const titleScale = useTransform(smoothProgress, [0, 0.5], [1, 0.8]);
  
  const imageY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  
  const sideElementsY = useTransform(smoothProgress, [0, 1], [0, 80]);
  const sideElementsOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  // Parallax effect for background gradient
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-white dark:bg-neutral-950 will-change-transform relative overflow-hidden -mt-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated background gradient for desktop */}
      <motion.div
        className="hidden lg:block absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05) 0%, transparent 50%)",
          y: backgroundY,
        }}
      />
      
      <div className="max-w-6xl mx-auto px-6 relative min-h-screen">
        {/* Title - now with improved dark mode colors */}
        <motion.h1
          className="absolute top-8 left-0 right-0 font-bold text-center leading-none mx-auto tracking-tight z-0 w-full font-inter"
          style={{
            fontSize: "clamp(2rem, 12vw, 9rem)",
            maxWidth: "100%",
            y: titleY,
            opacity: titleOpacity,
            scale: titleScale,
          }}
          variants={titleVariants}
        >
          <motion.span 
            className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-neutral-200 dark:to-neutral-50 bg-clip-text text-transparent px-2"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {heroContent.title.firstLine} {heroContent.title.secondLine}
          </motion.span>
          <br />
          <motion.span 
            className="bg-gradient-to-r from-neutral-500 via-neutral-950 to-neutral-500 dark:from-neutral-400 dark:via-neutral-200 dark:to-neutral-50 bg-clip-text text-transparent"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
          >
            {heroContent.title.thirdLine}
          </motion.span>
        </motion.h1>

        {/* Main content container - improved height handling */}
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen relative">
          {/* Central content */}
          <motion.div 
            className="flex flex-col items-center justify-center z-10 pt-[5.7rem] sm:pt-40 lg:pt-0"
            variants={fadeInUpVariants}
          >
            {/* Desktop image */}
            <motion.div 
              className="relative hidden lg:block w-[clamp(300px,40vw,450px)] h-[clamp(350px,45vw,500px)] overflow-hidden rounded-lg mt-58 scale-90"
              variants={imageVariants}
              style={{
                y: imageY,
                opacity: imageOpacity,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/img1.png"
                alt="Designer profile"
                fill
                className="object-contain transition-all duration-300 hover:filter hover:grayscale-0 filter grayscale contrast-125 block dark:hidden"
                priority
                sizes="(max-width: 1024px) 40vw, 450px"
              />
              <Image
                src="/img2.png"
                alt="Designer profile"
                fill
                className="object-contain drop-shadow-[0_0_10px_rgba(55,65,85,0.2)] transition-all duration-300 hover:filter hover:grayscale-0 filter grayscale contrast-110 hidden dark:block"
                priority
                sizes="(max-width: 1024px) 40vw, 450px"
              />
            </motion.div>

            {/* Mobile image */}
            <motion.div 
              className="relative block lg:hidden w-[clamp(280px,70vw,400px)] h-[clamp(320px,80vw,450px)] overflow-hidden rounded-lg md:mt-16"
              variants={imageVariants}
            >
              <Image
                src="/img1.png"
                alt="Designer profile"
                fill
                className="object-contain transition-all duration-300 hover:filter hover:grayscale-0 filter grayscale contrast-125 block dark:hidden"
                priority
                sizes="(max-width: 640px) 70vw, 400px"
              />
              <Image
                src="/img2.png"
                alt="Designer profile"
                fill
                className="object-contain transition-all duration-300 hover:filter hover:grayscale-0 filter grayscale contrast-110 hidden dark:block"
                priority
                sizes="(max-width: 640px) 70vw, 400px"
              />
            </motion.div>

            {/* Mobile tagline and skills */}
            <motion.div 
              className="lg:hidden text-center z-1 relative w-full mb-6"
              variants={fadeInUpVariants}
            >
              <motion.blockquote 
                className="text-sm w-full mx-auto mb-3 leading-relaxed tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {heroContent.tagline}
              </motion.blockquote>
              <motion.div 
                className="flex flex-wrap justify-center items-center gap-2"
                variants={skillsContainerVariants}
              >
                {heroContent.skills.slice(0, 3).map((skill, index) => (
                  <motion.li
                    key={index}
                    className="list-none px-3 py-1 border border-neutral-300 dark:border-neutral-700 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 transition-colors cursor-pointer"
                    variants={skillVariants}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.div>
            </motion.div>

            {/* Mobile button */}
            <motion.div 
              className="lg:hidden w-full px-4 flex justify-center pb-8"
              variants={buttonVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button className="btn w-full max-w-xs border border-neutral-300 dark:border-neutral-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900">
                  <a href="" className="flex items-center gap-1 justify-center">
                    <span>Download CV</span>
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </motion.div>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Desktop left side - button */}
          <motion.div 
            className="hidden lg:flex lg:absolute left-8 top-96 z-10"
            style={{
              y: sideElementsY,
              opacity: sideElementsOpacity,
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button className="btn border border-neutral-300 dark:border-neutral-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 bg-gradient-to-r from-neutral-500 to-black dark:from-neutral-100 dark:to-neutral-100">
                <a href="" className="flex items-center gap-1 justify-center">
                  <span>Download CV</span>
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </motion.div>
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Desktop right side - tagline and skills */}
          <motion.div 
            className="hidden lg:block lg:absolute right-8 top-96 text-right z-10"
            style={{
              y: sideElementsY,
              opacity: sideElementsOpacity,
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.blockquote 
              className="text-sm max-w-xs ml-auto mb-6 leading-relaxed tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {heroContent.tagline}
            </motion.blockquote>
            <motion.div 
              className="space-y-3"
              variants={skillsContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {heroContent.skills.map((skill, index) => (
                <motion.p 
                  key={index} 
                  className="text-sm text-black dark:text-white font-bold tracking-wide cursor-pointer"
                  variants={skillVariants}
                  whileHover={{ 
                    x: -5,
                    color: "#6b7280",
                    transition: { duration: 0.2 }
                  }}
                >
                  {skill}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};