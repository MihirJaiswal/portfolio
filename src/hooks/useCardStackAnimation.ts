//@ts-nocheck
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseCardStackAnimationReturn {
  containerRef: React.RefObject<HTMLElement>
  platformsRef: React.RefObject<HTMLDivElement>
  trophyRef: React.RefObject<HTMLDivElement>
  serviceRef: React.RefObject<HTMLDivElement>
}

export function useCardStackAnimation(): UseCardStackAnimationReturn {
  const containerRef = useRef<HTMLElement>(null)
  const platformsRef = useRef<HTMLDivElement>(null)
  const trophyRef = useRef<HTMLDivElement>(null)
  const serviceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const platforms = platformsRef.current
    const trophy = trophyRef.current
    const service = serviceRef.current

    if (!container || !platforms || !trophy || !service) return

    // Set initial positions
    gsap.set([trophy, service], { y: '100vh' })

    // Create timeline for the stacking animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      }
    })

    // Animation sequence - NO OVERLAPPING
    tl
      .to(trophy, {
        y: 0,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(service, {
        y: 0,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to([platforms, trophy, service], {
        y: '-100vh',
        duration: 1,
        ease: 'power2.inOut'
      })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return {
    containerRef,
    platformsRef,
    trophyRef,
    serviceRef
  }
}