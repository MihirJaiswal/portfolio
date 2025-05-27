"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Introduction() {
  const [sequence, setSequence] = useState("intro") // intro, logo, skills, education, experience, projects, contact
  const [currentSection, setCurrentSection] = useState(0)
  const [typingText, setTypingText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [logoRevealed, setLogoRevealed] = useState(false)
  const sequenceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const typeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  

  // Grid items for the skills section
  const skillsItems = [
    "JS", "REACT", "NODE", "HTML", "CSS", "UI/UX", 
    "FIGMA", "GIT", "SQL", "NEXT", "API", "AWS"
  ]

  // Content sections for main showcase
  const sections = [
    {
      title: "EDUCATION",
      content: "B. Tech\nRGPV UNIVERSITY\n2021-2025",
      style: "font-sans font-bold tracking-wider leading-tight",
      animation: "fade"
    },
    // PROJECTS section
    {
      title: "Services",
      content: "FRONTEND\nBACKEND\nAI\nDATABASE",
      style: "font-sans font-bold tracking-wider leading-tight",
      animation: "typing"
    },
    // ABOUT section
    {
      title: "ABOUT ME",
      content: "Passionate \nCREATIVE \nPROBLEM \nSOLVER",
      style: "font-sans tracking-wide leading-tight",
      animation: "staggered"
    },
    // PHILOSOPHY section
    {
      title: "WORK PHILOSOPHY",
      content: "function createValue() {\n  return innovation + quality;\n}",
      style: "font-mono",
      animation: "typing"
    }
  ]

  // Handle the sequence progression
  useEffect(() => {
    // Clear any existing timers when component unmounts or sequence changes
    if (sequenceTimerRef.current) {
      clearTimeout(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
    
    if (sequence === "intro") {
      // First show intro text, then move to logo
      sequenceTimerRef.current = setTimeout(() => {
        setSequence("logo");
      }, 3000);
    } else if (sequence === "logo") {
      // After logo animation complete, move to skills grid
      sequenceTimerRef.current = setTimeout(() => {
        setLogoRevealed(true);
        sequenceTimerRef.current = setTimeout(() => {
          setSequence("skills");
        }, 2500);
      }, 2500);
    } else if (sequence === "skills") {
      // After skills grid animation, move to main showcase
      sequenceTimerRef.current = setTimeout(() => {
        setSequence("main");
      }, 4000);
    } else if (sequence === "main") {
      // After completing the main section cycle, restart sequence
      const mainDisplayTime = 6000 * sections.length; // Allow time for all sections to display
      sequenceTimerRef.current = setTimeout(() => {
        setSequence("intro");
        setLogoRevealed(false);
        setCurrentSection(0);
      }, mainDisplayTime);
    }
    
    return () => {
      if (sequenceTimerRef.current !== null) {
        clearTimeout(sequenceTimerRef.current);
        sequenceTimerRef.current = null;
      }
    };
  }, [sequence, sections.length]);

  // Cursor blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(blinkInterval);
  }, []);

  // Section transition effect (only active during main showcase)
  useEffect(() => {
    if (sequence === "main") {
      const sectionInterval = setInterval(() => {
        // Clear any existing typing interval before changing sections
        if (typeIntervalRef.current !== null) {
          clearInterval(typeIntervalRef.current);
        }
        setCurrentSection((prev) => (prev + 1) % sections.length)
        setIsTyping(false)
        setTypingText("")
      }, 6000)

      return () => {
        clearInterval(sectionInterval);
        // Also clear typing interval when unmounting
        if (typeIntervalRef.current !== null) {
          clearInterval(typeIntervalRef.current);
        }
      }
    }
  }, [sequence, sections.length])

  // Typing effect for content
  useEffect(() => {
    // Cleanup function to clear any existing interval
    if (typeIntervalRef.current !== null) {
      clearInterval(typeIntervalRef.current);
      typeIntervalRef.current = null;
    }
    
    if (sequence !== "main") return;
    
    const section = sections[currentSection];
    const content = section.content;
    
    if (section.animation === "typing") {
      setIsTyping(true);
      setTypingText(""); // Reset typing text when section changes
      let currentIndex = 0;
      
      // Store the interval reference so we can clear it later
      typeIntervalRef.current = setInterval(() => {
        if (currentIndex < content.length) {
          setTypingText(prevText => content.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (typeIntervalRef.current !== null) {
            clearInterval(typeIntervalRef.current);
            typeIntervalRef.current = null;
          }
          setIsTyping(false);
        }
      }, 60);
    }
    
    // Cleanup function
    return () => {
      if (typeIntervalRef.current !== null) {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
      }
    };
  }, [currentSection, sequence]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const staggeredItemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { duration: 1.2 }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const introTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.5 }
    }
  };

  const logoPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { 
          delay: i * 0.3,
          duration: 1.5, 
          ease: "easeInOut" 
        },
        opacity: { 
          delay: i * 0.3,
          duration: 0.3 
        }
      }
    })
  };

  // Render content based on animation type for main showcase
  const renderMainContent = () => {
    const section = sections[currentSection];
    
    if (section.animation === "typing") {
      return (
        <motion.div
          key={`typing-${currentSection}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-64" // Fixed height container
        >
          <div className={`text-5xl md:text-7xl ${section.style}`}>
            {typingText.split('\n').map((line, idx) => (
              <div key={idx} className="overflow-hidden flex">
                <span>{line}</span>
                {idx === typingText.split('\n').length - 1 && isTyping && 
                  <span className={`ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
                }
              </div>
            ))}
          </div>
        </motion.div>
      );
    }
    
    if (section.animation === "staggered") {
      return (
        <motion.div
          key={`staggered-${currentSection}`}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className={`text-5xl md:text-7xl ${section.style} h-64`} // Fixed height container
        >
          {section.content.split('\n').map((line, lineIdx) => (
            <div key={lineIdx} className="overflow-hidden">
              {line.split('').map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  variants={staggeredItemVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>
      );
    }
    
    // Default fade animation
    return (
      <motion.div
        key={`fade-${currentSection}`}
        variants={fadeVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className={`text-5xl md:text-7xl ${section.style} h-64`} // Fixed height container
      >
        {section.content.split('\n').map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </motion.div>
    );
  };

  // Render content based on sequence
  const renderSequenceContent = () => {
    switch (sequence) {
      case "intro":
        return (
          <motion.div
            key="intro"
            className="flex flex-col items-center justify-center text-center h-full mt-[-60px] md:mt-[-120px]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={introTextVariants}
          >
            <h1 className="text-4xl md:text-6xl font-light tracking-widest mb-8">PORTFOLIO</h1>
            <p className="text-sm md:text-base tracking-wide opacity-70">
              FULL-STACK DEVELOPER & UI/UX DESIGNER
            </p>
          </motion.div>
        );
        
      case "logo":
        return (
          <div className="flex flex-col items-center justify-center h-full mt-[-60px] md:mt-[-120px]">
          
            {logoRevealed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.2 }}
                className="mt-10 text-xl font-bold tracking-widest"
              >
                MIHIR JAISWAL
              </motion.p>
            )}
          </div>
        );
        
      case "skills":
        return (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-4 mx-auto items-center justify-center content-center h-auto"
          >
            {skillsItems.map((item, index) => (
              <motion.div
                key={`grid-${index}`}
                variants={gridItemVariants}
                className="bg-opacity-10 h-16 w-16 flex items-center justify-center rounded-md border border-opacity-20 p-2"
              >
                <span className="text-lg font-bold">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        );
        
      case "main":
        return (
          <div className="flex flex-col h-full">
            {/* Fixed header with absolute positioning */}
            <header className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center">
              <motion.p
                className="text-xs tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {sections[currentSection].title}
              </motion.p>
              
              <motion.p
                className="text-xs tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                YOUR NAME • PORTFOLIO
              </motion.p>
            </header>
            
            {/* Main content with fixed height - adjusted more upward for desktop */}
            <main className="flex-1 flex items-center justify-center p-8 mt-[-60px] md:mt-[-120px]">
              <div className="w-full max-w-4xl h-64 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {renderMainContent()}
                </AnimatePresence>
              </div>
            </main>
            
            {/* Fixed footer with absolute positioning */}
            <footer className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-px bg-white mb-4"
              />
              
              <div className="flex justify-between items-start">
                <div>
                  <motion.p
                    className="text-xs tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    PORTFOLIO • {new Date().getFullYear()}
                    <br />
                    EMAIL@EXAMPLE.COM
                  </motion.p>
                </div>
                
                <div>
                  <motion.div 
                    className="text-xs tracking-wider text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {`0${currentSection + 1}`}/{`0${sections.length}`}
                  </motion.div>
                </div>
              </div>
            </footer>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full h-screen font-mono overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={sequence}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex items-center justify-center"
        >
          {renderSequenceContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}