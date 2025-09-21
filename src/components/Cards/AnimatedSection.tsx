// @ts-nocheck
'use client'
import { useCardStackAnimation } from '@/hooks/useCardStackAnimation'

interface AnimatedSectionProps {
  children: React.ReactNode
}

export default function AnimatedSection({ children }: AnimatedSectionProps) {
  const { containerRef, platformsRef, trophyRef, serviceRef } = useCardStackAnimation()

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative lg:flex flex-col hidden overflow-hidden"
      style={{ height: '400vh' }}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        let ref = null
        if (index === 0) ref = platformsRef
        else if (index === 1) ref = trophyRef
        else if (index === 2) ref = serviceRef
        
        return ref ? React.cloneElement(child, { ref } as any) : child
      })}
    </section>
  )
}