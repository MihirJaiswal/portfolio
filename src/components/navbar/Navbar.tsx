'use client';
import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Instagram, Linkedin, Github } from "lucide-react";
import { siteConfig } from "../../lib/data";
import { navLinks } from "../../lib/data";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  const headerRef = useRef<HTMLElement>(null);
  return (
    <>
      <header
        ref={headerRef}
        className="bg-white dark:bg-neutral-950 py-4 sticky top-0 z-30 header-hide-on-scroll"
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <motion.div
            className="text-xl tracking-wider font-bold uppercase"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
           Mihir Jaiswal
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
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              className="group w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-all"
            >
              <Instagram className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
            </Link>
            <Link
              href={siteConfig.social.github}
              aria-label="GitHub"
              className="group w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-all"
            >
              <Github className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
            </Link>
            <Link
              href={siteConfig.social.linkedin}
              aria-label="LinkedIn"
              className="group w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
            </Link>
            <ThemeToggle />
          </motion.div>
          <div className="lg:hidden flex items-center space-x-3">
            <ThemeToggle />
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </header>
    </>
  );
};
