"use client"

import React, { ReactNode, useEffect, createContext, useContext, useState, JSX } from 'react'
import Lenis from '@studio-freight/lenis'

type LenisContextType = Lenis | null
type LenisOptions = {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
  smooth?: boolean;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
  [key: string]: any;
}

interface ReactLenisProps {
  root?: boolean;
  options?: LenisOptions;
  children: ReactNode;
}

const LenisContext = createContext<LenisContextType>(null)

export const useLenis = (): LenisContextType => useContext(LenisContext)

export function ReactLenis({ 
  options = {},
  children 
}: ReactLenisProps): JSX.Element {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, 
      touchMultiplier: 2,
      infinite: false,
      ...options
    })

    function raf(time: number): void {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
    setLenis(lenisInstance)

    return () => {
      lenisInstance.destroy()
    }
  }, [options])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}

export function useLenisScrollTrigger(): void {
  const lenis = useLenis()
  
  useEffect(() => {
    if (!lenis) return
    
    try {
      const registerScrollTrigger = async () => {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)
        
        lenis.on('scroll', ScrollTrigger.update)
        
        gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000)
        })
        
        gsap.ticker.lagSmoothing(0)
      }
      
      registerScrollTrigger().catch(() => {
      })
    } catch (error) {
        console.error(error)
    }
  }, [lenis])
}