'use client'

import { ReactNode, useEffect, useState, useRef } from "react"
import { ReactLenis } from "./lenis"
import Lenis from "@studio-freight/lenis"

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lastScrollY, setLastScrollY] = useState(0)
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<any>(null)
  
  useEffect(() => {
    if (lenisRef.current && lenisRef.current.lenis && !lenis) {
      setLenis(lenisRef.current.lenis)
    }
  }, [lenis])
  
  useEffect(() => {
    if (!lenis) return
    
    const scrollHandler = (e: any) => {
      const currentScrollY = e.scroll
      setLastScrollY(currentScrollY)
    }
    
    lenis.on('scroll', scrollHandler)
    
    return () => {
      lenis.off('scroll', scrollHandler)
    }
  }, [lenis, lastScrollY])

  return (
    <ReactLenis 
      root 
      options={{
        duration: 1.8,
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
        smoothTouch: true,
        touchMultiplier: 1.5,
        syncTouch: true,
        syncTouchLerp: 0.075,
        normalizeWheel: true,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}