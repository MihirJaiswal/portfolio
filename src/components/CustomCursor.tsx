'use client';
import React, { useState, useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isHoveringDescription, setIsHoveringDescription] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Listen for project hover events
    const handleProjectHover = (e: CustomEvent) => {
      setIsHoveringProject(e.detail.isHovering);
    };

    // Listen for description hover events
    const handleDescriptionHover = (e: CustomEvent) => {
      setIsHoveringDescription(e.detail.isHovering);
    };

    // Smooth animation function
    const animateCursor = () => {
      setPosition(prev => {
        const dx = targetPosition.x - prev.x;
        const dy = targetPosition.y - prev.y;
        
        // Lerp (linear interpolation) for smooth movement
        const newX = prev.x + dx * 0.15;
        const newY = prev.y + dy * 0.15;
        
        return { x: newX, y: newY };
      });
      
      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('projectHover', handleProjectHover as EventListener);
    document.addEventListener('descriptionHover', handleDescriptionHover as EventListener);
    document.body.style.cursor = 'none';
    
    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('projectHover', handleProjectHover as EventListener);
      document.removeEventListener('descriptionHover', handleDescriptionHover as EventListener);
      document.body.style.cursor = 'auto';
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetPosition.x, targetPosition.y]);

  return (
    <div
      className={`fixed hidden lg:block rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 will-change-transform transition-all duration-300 ease-out ${
        isHoveringDescription 
          ? 'w-24 h-24' 
          : 'w-5 h-5'
      } ${
        isVisible && !isHoveringProject ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        backgroundColor: isHoveringDescription ? 'white' : 'rgba(255, 255, 255, 0.8)',
        border: isHoveringDescription 
          ? '2px solid transparent' 
          : '1px solid rgb(38, 38, 38)',
        mixBlendMode: isHoveringDescription ? 'difference' : 'normal',
      }}
    />
  );
};