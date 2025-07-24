'use client'

import { ReactNode, useEffect, useState, useRef } from "react"
import { ReactLenis } from "./lenis"
import Lenis from "@studio-freight/lenis"

interface LenisProviderProps {
  children: ReactNode
}

// Fixed function to detect if smooth scrolling should be enabled
function shouldEnableSmoothScroll(): boolean {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return false
  
  // Primary mobile detection via user agent
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // More refined touch device detection - only disable if it's primarily a touch device
  const isPrimaryTouchDevice = (
    'ontouchstart' in window && 
    navigator.maxTouchPoints > 0 && 
    !window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
  
  // Screen size check with more reasonable threshold
  const isSmallScreen = window.innerWidth <= 640 // Reduced from 768
  
  // Enable smooth scroll if not mobile, not primarily touch, and not small screen
  const shouldEnable = !isMobile && !isPrimaryTouchDevice && !isSmallScreen
  
  // Debug logging to help troubleshoot
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
  
  // Check if smooth scrolling should be enabled on mount and resize
  useEffect(() => {
    const checkDevice = () => {
      setEnableSmoothScroll(shouldEnableSmoothScroll())
    }
    
    checkDevice()
    
    // Re-check on window resize
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

  // If smooth scrolling is disabled, render children without Lenis
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
        smoothTouch: false, // Disabled for touch devices
        touchMultiplier: 1.5,
        syncTouch: false, // Disabled
        syncTouchLerp: 0.075,
        normalizeWheel: true,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}