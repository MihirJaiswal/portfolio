'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Service from './Service'
import Review from './Review'
import ContactForm from '../Contact'
import Intro from './Intro'

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function Cards() {
  const containerRef = useRef(null)
  const platformsRef = useRef(null)
  const trophyRef = useRef(null)
  const serviceRef = useRef(null)

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
      // Trophy comes up and covers platforms (0 to 1)
      .to(trophy, {
        y: 0,
        duration: 1,
        ease: 'power2.inOut'
      })
      // Service comes up and covers trophy (1 to 2) - starts AFTER trophy finishes
      .to(service, {
        y: 0,
        duration: 1,
        ease: 'power2.inOut'
      }) // Removed the ", 0.5" - this was causing overlap
      // Finally, move the entire stack up (2 to 3)
      .to([platforms, trophy, service], {
        y: '-100vh',
        duration: 1,
        ease: 'power2.inOut'
      }) // Removed the ", 1.5" - let it start after previous animation

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <section
        id="services"
        ref={containerRef}
        className="relative lg:flex flex-col hidden overflow-hidden"
        style={{ height: '400vh' }} // Height for scroll duration
      >
        {/* Platforms Section - Base layer */}
        <div
          ref={platformsRef}
          className="absolute inset-0 w-full h-screen flex items-center justify-center bg-black z-10"
        >
          <div className="py-24 px-4 w-full">
            <Review/>
          </div>
        </div>

        {/* Trophy Awards - Second layer */}
        <div
          ref={trophyRef}
          className="absolute inset-0 w-full h-screen flex items-center border-none justify-center bg-black z-20"
        >
          <div className="py-24 px-4 w-full">
            <Intro />
          </div>
        </div>

        {/* Service - Top layer */}
        <div
          ref={serviceRef}
          className="absolute inset-0 w-full h-screen flex items-center justify-center bg-black z-30"
        >
          <div className="px-4 w-full">
            <Service />
          </div>
        </div>
        <ContactForm/>
      </section>
      <section className="lg:hidden bg-black pb-12">
        <div className="mb-12">
          <Review />
        </div>
        <div className="mb-12">
          <Intro />
        </div>
        <Service />
      </section>
    </>
  )
}