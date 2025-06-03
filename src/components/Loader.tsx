import React, { useState, useEffect } from 'react';

const PortfolioLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - adjust as needed
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to My Portfolio</h1>
          <p className="text-gray-600">This is your main content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      {/* Minimal spinning loader */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
        <div className="mt-4 text-center">
          <div className="text-gray-600 text-sm font-medium">Loading</div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLoader;