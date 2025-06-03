'use client';
import React, { useState, useEffect } from 'react';
import Loader from "./Loader";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Simulate realistic loading with faster start, slower end
        const increment = prev < 50 ? Math.random() * 15 + 5 : Math.random() * 8 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    // End loading when progress reaches 100%
    const checkProgress = setInterval(() => {
      if (progress >= 100) {
        setLoading(false);
        clearInterval(checkProgress);
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkProgress);
    };
  }, [progress]);

  if (loading) {
    return <Loader progress={progress} />;
  }

  return <>{children}</>;
}