'use client';
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { Linkedin, Github, Youtube } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import { siteConfig } from "../../lib/data";
import { navLinks } from "../../lib/data";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";
import NameTranslation from "./name-translation";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface NavbarState {
  isVisible: boolean;
  hasScrolled: boolean;
}

export const Navbar = () => {
  const pathname = usePathname(); 
  
  const [state, setState] = useState<NavbarState>({
    isVisible: true,
    hasScrolled: false
  });

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const updateNavbar = useCallback(() => {
    const scrollY = window.scrollY;
    const hasScrolled = scrollY > 10;

    let isVisible = true;
    if (scrollY > 100) {
      isVisible = scrollY < lastScrollY.current || scrollY < 100;
    }

    setState(prev => {
      if (prev.isVisible !== isVisible || prev.hasScrolled !== hasScrolled) {
        return { isVisible, hasScrolled };
      }
      return prev;
    });

    lastScrollY.current = scrollY;
    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateNavbar);
      ticking.current = true;
    }
  }, [updateNavbar]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${state.hasScrolled
    ? 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-sm'
    : 'bg-transparent'
    } ${state.isVisible
      ? 'translate-y-0 opacity-100'
      : '-translate-y-full opacity-0'
    }`;

  const socialLinks = [
    { href: siteConfig.social.twitter, icon: BsTwitterX, label: 'Follow on Twitter' },
    { href: siteConfig.social.github, icon: Github, label: 'View GitHub profile' },
    { href: siteConfig.social.linkedin, icon: Linkedin, label: 'Connect on LinkedIn' },
    { href: siteConfig.social.youtube, icon: Youtube, label: 'Subscribe on YouTube' }
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <header
        className={navbarClasses}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl tracking-wider font-bold uppercase pl-1.5">
              <div className="hidden xs:block">
                <NameTranslation />
              </div>
              <span className="xs:hidden">Mihir Jaiswal</span>
            </div>

            {/* Main Navigation */}
            <nav
              className="hidden lg:flex items-center space-x-3"
              role="navigation"
              aria-label="Main navigation"
            >
              <ul className="flex items-center space-x-3">
                {navLinks.map((link) => {
                  const isActive = isActiveRoute(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`text-xs font-medium px-5 py-2 rounded-full border transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${
                          isActive
                            ? 'border-neutral-900/20 dark:border-neutral-50/20 bg-neutral-900/10 dark:bg-zinc-50/10'
                            : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-900 hover:border-neutral-900 hover:text-white dark:hover:bg-neutral-50 dark:hover:text-black dark:hover:border-neutral-50'
                        }`}
                        tabIndex={0}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              className="hidden lg:flex items-center space-x-3"
              role="complementary"
              aria-label="Social media links and settings"
            >
              <ul className="flex items-center space-x-3">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-all"
                    >
                      <Icon className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
                    </Link>
                  </li>
                ))}
              </ul>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <ThemeToggle />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle theme</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <ThemeToggle />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle theme</p>
                </TooltipContent>
              </Tooltip>
              <MobileMenu links={navLinks} />
            </div>
          </div>
        </div>
      </header>
      <div className="h-0" />
    </>
  );
};