'use client'
import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { artworks } from "@/lib/project"

interface Artwork {
  id: number;
  title: string;
  year: string;
  medium: string;
  imageUrl: string | StaticImageData;
}

const GalleryWall: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleArtworkClick = (artwork: Artwork) => {
    if (isMobile) {
      setSelectedArtwork(artwork);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setSelectedArtwork(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="h-full py-10 md:py-20 px-6 lg:px-8 flex items-start justify-center">
        <div className="w-full">
          {/* Section Header */}
          <div className="text-center mb-12 relative">
            <h2 className="text-5xl sm:text-6xl md:Text-7xl lg:text-8xl font-extrabold text-center mb-6">
              <span className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent">
                GALLERY
              </span>
            </h2>
            <p className='text-[18px] tracking-tight text-neutral-600 dark:text-neutral-400'>
              I also have a small collection of artworks that I have drawn.
            </p>
          </div>

          {/* Bento Gallery Grid */}
          <div className="gallery-container w-full h-[400px] md:h-[1000px] min-h-[650px] max-h-[2000px]">
            <div className="gallery-grid h-full gap-3 sm:gap-4 lg:gap-6">
              {/* Large Feature Piece - Top Left */}
              <div
                className="artwork-frame large-piece group"
                onClick={() => handleArtworkClick(artworks[0])}
                style={{ cursor: isMobile ? 'pointer' : 'default' }}
              >
                <div className="frame-border">
                  <Image
                    src={artworks[0].imageUrl}
                    alt={artworks[0].title}
                    fill
                    unoptimized
                    className="artwork-image object-cover p-1.5  transition-all duration-500 border border-neutral-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 40vw"
                    loading='lazy'
                    placeholder='blur'
                  />
                  <div className="artwork-info">
                    <h3 className="artwork-title">{artworks[0].title}</h3>
                    <p className="artwork-details">{artworks[0].year} • {artworks[0].medium}</p>
                  </div>
                </div>
              </div>

              {/* Medium Piece - Top Center */}
              <div
                className="artwork-frame medium-piece-1 group"
                onClick={() => handleArtworkClick(artworks[1])}
                style={{ cursor: isMobile ? 'pointer' : 'default' }}
              >
                <div className="frame-border">
                  <Image
                    src={artworks[1].imageUrl}
                    alt={artworks[1].title}
                    fill
                    unoptimized
                    loading='lazy'
                    placeholder='blur'
                    className={`artwork-image p-1.5 hover:grayscale-0 transition-all duration-500 border border-neutral-700 object-cover`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 30vw"
                  />
                  <div className="artwork-info">
                    <h3 className="artwork-title">{artworks[1].title}</h3>
                    <p className="artwork-details">{artworks[1].year} • {artworks[1].medium}</p>
                  </div>
                </div>
              </div>

              {/* Small Piece - Top Right */}
              <div
                className="artwork-frame small-piece-1 group"
                onClick={() => handleArtworkClick(artworks[2])}
                style={{ cursor: isMobile ? 'pointer' : 'default' }}
              >
                <div className="frame-border">
                  <Image
                    src={artworks[2].imageUrl}
                    alt={artworks[2].title}
                    fill
                    loading='lazy'
                    unoptimized
                    placeholder='blur'
                    className={`artwork-image p-1.5 hover:grayscale-0 transition-all duration-500 border object-cover border-neutral-700`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 20vw, 20vw"
                  />
                  <div className="artwork-info">
                    <h3 className="artwork-title">{artworks[2].title}</h3>
                    <p className="artwork-details">{artworks[2].year} • {artworks[2].medium}</p>
                  </div>
                </div>
              </div>

              {/* Medium Piece - Center Left */}
              <div
                className="artwork-frame medium-piece-2 group "
                onClick={() => handleArtworkClick(artworks[3])}
                style={{ cursor: isMobile ? 'pointer' : 'default' }}
              >
                <div className="frame-border">
                  <Image
                    src={artworks[3].imageUrl}
                    alt={artworks[3].title}
                    fill
                    loading='lazy'
                    placeholder='blur'
                    unoptimized
                    className={`artwork-image p-1.5 hover:grayscale-0 transition-all duration-500 border object-cover border-neutral-700`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 30vw"
                  />
                  <div className="artwork-info">
                    <h3 className="artwork-title">{artworks[3].title}</h3>
                    <p className="artwork-details">{artworks[3].year} • {artworks[3].medium}</p>
                  </div>
                </div>
              </div>

              {/* Large Feature Piece - Center Right */}
              <div
                className="artwork-frame large-piece-2 group"
                onClick={() => handleArtworkClick(artworks[4])}
                style={{ cursor: isMobile ? 'pointer' : 'default' }}
              >
                <div className="frame-border">
                  <Image
                    src={artworks[4].imageUrl}
                    alt={artworks[4].title}
                    quality={100}
                    fill
                    loading='lazy'
                    placeholder='blur'
                    unoptimized
                    className={`artwork-image p-1.5 hover:grayscale-0 transition-alla duration-500 border object-right object-cover border-neutral-700`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 45vw"
                  />
                  <div className="artwork-info">
                    <h3 className="artwork-title">{artworks[4].title}</h3>
                    <p className="artwork-details">{artworks[4].year} • {artworks[4].medium}</p>
                  </div>
                </div>
              </div>

              {/* Small Piece - Bottom Left */}
              <div
                className="artwork-frame small-piece-2 group"
                onClick={() => handleArtworkClick(artworks[5])}
                style={{ cursor: isMobile ? 'pointer' : 'default' }}
              >
                <div className="frame-border">
                  <Image
                    src={artworks[5].imageUrl}
                    alt={artworks[5].title}
                    fill
                    loading='lazy'
                    unoptimized
                    placeholder='blur'
                    quality={100}
                    className={`artwork-image p-1.5 hover:grayscale-0 object-cover transition-all duration-500 border border-neutral-700`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 20vw, 20vw"
                  />
                  <div className="artwork-info">
                    <h3 className="artwork-title">{artworks[5].title}</h3>
                    <p className="artwork-details">{artworks[5].year} • {artworks[5].medium}</p>
                  </div>
                </div>
              </div>

              {/* Medium Piece - Bottom Center */}
              <div
                className="artwork-frame medium-piece-3 group"
                onClick={() => handleArtworkClick(artworks[6])}
                style={{ cursor: isMobile ? 'pointer' : 'default' }}
              >
                <div className="frame-border">
                  <Image
                    src={artworks[6].imageUrl}
                    alt={artworks[6].title}
                    fill
                    unoptimized
                    loading='lazy'
                    placeholder='blur'
                    className={`artwork-image p-1.5 hover:grayscale-0 object-cover transition-all duration-500 border border-neutral-700`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 30vw"
                  />
                  <div className="artwork-info">
                    <h3 className="artwork-title">{artworks[6].title}</h3>
                    <p className="artwork-details">{artworks[6].year} • {artworks[6].medium}</p>
                  </div>
                </div>
              </div>

              {/* Small Piece - Bottom Right */}
              <div
                className="artwork-frame small-piece-3 group"
                onClick={() => handleArtworkClick(artworks[7])}
                style={{ cursor: isMobile ? 'pointer' : 'default' }}
              >
                <div className="frame-border">
                  <Image
                    src={artworks[7].imageUrl}
                    alt={artworks[7].title}
                    fill
                    unoptimized
                    loading='lazy'
                    placeholder='blur'
                    className={`artwork-image p-1.5 hover:grayscale-0 transition-all duration-500  object-cover border border-neutral-700`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 20vw, 20vw"
                  />
                  <div className="artwork-info">
                    <h3 className="artwork-title">{artworks[7].title}</h3>
                    <p className="artwork-details">{artworks[7].year} • {artworks[7].medium}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Popup Modal */}
      {selectedArtwork && isMobile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="relative max-w-sm w-full max-h-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors z-10"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Modal Content */}
            <div className="bg-white dark:bg-neutral-900 rounded-xs overflow-hidden shadow-2xl border">
              <div className="relative aspect-square">
                <Image
                  src={selectedArtwork.imageUrl}
                  alt={selectedArtwork.title}
                  fill
                  unoptimized
                  loading='lazy'
                  placeholder='blur'
                  className={selectedArtwork.id !== 5 ? 'object-cover' : 'object-contain'}
                  sizes="(max-width: 640px) 90vw"
                />
              </div>

              {/* Artwork Info */}
              <div className="p-4 bg-white dark:bg-neutral-900">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {selectedArtwork.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-200">
                  {selectedArtwork.year} • {selectedArtwork.medium}
                </p>
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeModal}
          />
        </div>
      )}
    </>
  );
};

export default GalleryWall;