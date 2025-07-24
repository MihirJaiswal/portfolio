'use client';
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {Linkedin, Github, Youtube, Twitter } from "lucide-react";
import { siteConfig } from "../../lib/data";
import { navLinks } from "../../lib/data";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";
import { GrayscaleToggle } from "./grayscale-toggle";
import NameTranslation from "./name-translation";

// Tooltip component
const Tooltip = ({ children, content, position = "bottom" }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className={`absolute z-50 px-2 py-1 text-xs font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-md shadow-lg whitespace-nowrap transition-opacity duration-200 ${
            position === "bottom" 
              ? "top-full left-1/2 transform -translate-x-1/2 mt-2" 
              : "bottom-full left-1/2 transform -translate-x-1/2 mb-2"
          }`}
        >
          {content}
          <div 
            className={`absolute w-2 h-2 bg-neutral-900 dark:bg-neutral-100 transform rotate-45 ${
              position === "bottom" 
                ? "-top-1 left-1/2 -translate-x-1/2" 
                : "-bottom-1 left-1/2 -translate-x-1/2"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we're at the top of the page
      setIsAtTop(currentScrollY < 10);
      
      // Only hide/show navbar after scrolling past 100px to avoid flickering
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else {
        // Show navbar when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isAtTop 
            ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-transparent' 
            : 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200/20 dark:border-neutral-800/20 shadow-sm'
        }`}
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth animation
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-xl tracking-wider font-bold uppercase pl-1.5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <NameTranslation/>
            </motion.div>

            <motion.nav
              className="hidden lg:flex items-center space-x-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Link
                    href={link.href}
                    className="text-xs font-medium px-5 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-900 hover:border-neutral-900 hover:text-white dark:hover:bg-neutral-50 dark:hover:text-black dark:hover:border-neutral-50 transition-all ease-in-out duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              className="hidden lg:flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href={siteConfig.social.twitter}
                aria-label="Instagram"
                target="_blank"
                className="group w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-all"
              >
                <Twitter className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
              </Link>
              <Link
                href={siteConfig.social.github}
                aria-label="GitHub"
                target="_blank"
                className="group w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-all"
              >
                <Github className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
              </Link>
              <Link
                href={siteConfig.social.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                className="group w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
              </Link>
              <Link
                href={siteConfig.social.youtube}
                aria-label="YouTube"
                target="_blank"
                className="group w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-all"
              >
                <Youtube className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
              </Link>
             
              <Tooltip content="Toggle theme" position="bottom">
                <ThemeToggle />
              </Tooltip>
              <Tooltip content="Toggle colors" position="bottom">
                <GrayscaleToggle />
              </Tooltip>
            </motion.div>
            
            <div className="lg:hidden flex items-center space-x-3">
              <Tooltip content="Toggle theme" position="bottom">
                <ThemeToggle />
              </Tooltip>
              <Tooltip content="Toggle colors" position="bottom">
                <GrayscaleToggle />
              </Tooltip>
              <MobileMenu links={navLinks} />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content jump when navbar becomes fixed */}
      <div className="h-[72px]" />
    </>
  );
};