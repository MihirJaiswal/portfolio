"use client";

import Image from "next/image";
import { heroContent } from "@/lib/data";
import { ArrowDown, ArrowLeft} from "lucide-react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useGrayscaleStore } from "@/lib/store";

export const HeroSection = () => {
  const containerRef = useRef(null);
  const { isGrayscaleEnabled } = useGrayscaleStore();

  // Scroll-based animations - minimalist values only
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "/resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Transform values based on scroll - much more subtle
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6]);

  const sideElementsY = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const sideElementsOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  // Parallax effect for background gradient - very subtle

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
      className="md:min-h-screen bg-white dark:bg-neutral-950 will-change-transform relative overflow-hidden -mt-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div> */}
      <div className="absolute hidden lg:dark:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#0c0a09)]"></div>

      <div className="px-6 relative md:min-h-screen">
        {/* Title - now with improved dark mode colors */}
        <motion.h1
          className="absolute font-[geist] top-8 left-0 right-0 font-black text-center leading-tight md:leading-none mx-auto tracking-wide md:tracking-tight z-0 w-full"
          style={{
            fontSize: "clamp(2.8rem, 12vw, 9rem)",
            maxWidth: "100%",
            y: titleY,
            opacity: titleOpacity,
            scale: titleScale,
          }}
          variants={titleVariants}
        >
          <motion.span
            className="bg-gradient-to-r family-geist from-neutral-500 via-neutral-950 to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-400 bg-clip-text text-transparent px-2"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <span className="hidden lg:inline-flex">CHECK OUT</span>
            <span className="lg:hidden font-black">EXPLORE</span> MY
          </motion.span>
          <br />
          <motion.span
            className="bg-gradient-to-r font-black from-neutral-500 via-neutral-950 to-neutral-500 dark:from-neutral-300 dark:via-white dark:to-neutral-300 bg-clip-text text-transparent"
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
            PORTFOLIO
          </motion.span>
        </motion.h1>

        {/* Main content container - improved height handling */}
        <div className="flex flex-col lg:flex-row items-center justify-center h-full md:min-h-screen relative">
          {/* Central content */}
          <motion.div
            className="flex flex-col items-center justify-center z-10 sm:pt-40 lg:pt-0"
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
                src="/assets/img5.png"
                alt="Designer profile"
                fill
                className={`object-contain transition-all duration-300 hover:filter hover:grayscale-0 ${
                  isGrayscaleEnabled
                    ? "filter grayscale contrast-110 dark:contrast-105"
                    : ""
                }`}
                priority
                sizes="(max-width: 1024px) 40vw, 450px"
              />
            </motion.div>

            {/* Mobile image */}
            <motion.div
              className="relative block lg:hidden w-[clamp(280px,70vw,400px)] h-[clamp(320px,80vw,450px)] overflow-hidden rounded-lg mt-32 md:mt-16"
              variants={imageVariants}
            >
              <Image
                src="/assets/img5.png"
                alt="Designer profile"
                fill
                className={`object-contain transition-all duration-300 hover:filter hover:grayscale-0 ${
                  isGrayscaleEnabled
                    ? "filter grayscale contrast-125 dark:contrast-105"
                    : ""
                }`}
                priority
              />
            </motion.div>

            {/* Mobile tagline and skills */}
            <motion.div
              className="lg:hidden text-center z-1 relative w-full mb-3"
              variants={fadeInUpVariants}
            >
              <motion.blockquote
                className="text-sm w-full mx-auto leading-relaxed tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {heroContent.tagline}
              </motion.blockquote>
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
                <Button
                  onClick={downloadPDF}
                  className="btn w-full max-w-xs border border-neutral-300 dark:border-neutral-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900"
                >
                  <div className="flex items-center gap-1 justify-center">
                    <span>Download CV</span>
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Desktop left side - button */}
          <motion.div
            className="hidden lg:flex lg:absolute left-8 bottom-56 z-10"
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
              <Button onClick={downloadPDF} className="btn">
                <div className="flex items-center gap-1 justify-center">
                  <span>Download CV</span>
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </motion.div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Desktop right side - tagline and skills */}
          <motion.div
            className="hidden lg:flex lg:absolute right-8 bottom-44"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: 1, x: 0 }}
          >
            <motion.div
              className="flex flex-col items-center justify-center relative"
              whileHover={{ scale: 1.1, borderColor: "#666" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="hidden md:flex md:w-18 md:h-18 w-14 h-14 rounded-full border border-neutral-300 dark:border-neutral-700 items-center justify-center group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ x: 2, rotate: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowLeft className="w-6 h-6 md:w-8 md:h-8 hidden md:flex transition-transform -rotate-20" />
                </motion.div>
              </motion.div>
              <p className="text-xs text-neutral-700 dark:text-neutral-400 tracking-wide mt-4 font-semibold uppercase">
                Designer/Developer
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
