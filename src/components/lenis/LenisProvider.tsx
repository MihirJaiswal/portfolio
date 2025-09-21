'use client'

import { ReactNode, useEffect, useState, useRef } from "react"
import { ReactLenis } from "./lenis"
import Lenis from "@studio-freight/lenis"

interface LenisProviderProps {
  children: ReactNode
}


function shouldEnableSmoothScroll(): boolean {
  if (typeof window === 'undefined') return false
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isPrimaryTouchDevice = (
    'ontouchstart' in window && 
    navigator.maxTouchPoints > 0 && 
    !window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
  
  const isSmallScreen = window.innerWidth <= 640 
  const shouldEnable = !isMobile && !isPrimaryTouchDevice && !isSmallScreen
  
  console.log('Device Detection:', {
    isMobile,
    isPrimaryTouchDevice,
    isSmallScreen,
    hasHover: window.matchMedia('(hover: hover)').matches,
    hasPointerFine: window.matchMedia('(pointer: fine)').matches,
    maxTouchPoints: navigator.maxTouchPoints,
    userAgent: navigator.userAgent,
    shouldEnable
  })
  
  return shouldEnable
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lastScrollY, setLastScrollY] = useState(0)
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const [enableSmoothScroll, setEnableSmoothScroll] = useState(false)
  const lenisRef = useRef<any>(null)
  
  useEffect(() => {
    const checkDevice = () => {
      setEnableSmoothScroll(shouldEnableSmoothScroll())
    }
    
    checkDevice()
    
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])
  
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

  if (!enableSmoothScroll) {
    return <>{children}</>
  }

  return (
    <ReactLenis 
      root 
      options={{
        duration: 1.8,
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
        smoothTouch: false, 
        touchMultiplier: 1.5,
        syncTouch: false, 
        syncTouchLerp: 0.075,
        normalizeWheel: true,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}