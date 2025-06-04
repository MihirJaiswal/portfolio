'use client'
import React, { useState } from 'react';
import Image from 'next/image';

interface Artwork {
  id: number;
  title: string;
  year: string;
  medium: string;
  imageUrl: string;
}

const GalleryWall: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on component mount
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sample artwork data - replace with your actual paintings
  const artworks: Artwork[] = [
    {
      id: 1,
      title: "Daniel Radcliffe",
      year: "2022",
      medium: "Sketch",
      imageUrl: "/drawings/5.png"
    },
    {
      id: 2,
      title: "Leonardo Dicaprio",
      year: "2022",
      medium: "Sketch",
      imageUrl: "/drawings/2.jpg"
    },
    {
      id: 3,
      title: "Thomaas Shelby",
      year: "2022",
      medium: "Sketch",
      imageUrl: "/drawings/4.jpg"
    },
    {
      id: 4,
      title: "Bakugou",
      year: "2020",
      medium: "Pencil Colors",
      imageUrl: "/drawings/1.png"
    },
    {
      id: 5,
      title: "Touka Kirishima",
      year: "2020",
      medium: "Pencil Colors",
      imageUrl: "/drawings/8.png"
    },
    {
      id: 6,
      title: "xxxtentation",
      year: "2022",
      medium: "Sketch",
      imageUrl: "/drawings/10.png"
    },
    {
      id: 7,
      title: "Snow Leopard",
      year: "2024",
      medium: "Pen Sketch",
      imageUrl: "/drawings/7.jpg"
    },
    {
      id: 8,
      title: "Heisenberg",
      year: "2022",
      medium: "Sketch",
      imageUrl: "/drawings/3.jpg"
    }
  ];

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
      <section className="h-full py-8 px-4 sm:px-6 lg:px-8 flex items-start justify-center mb-20">
        <div className="w-full">
          {/* Section Header */}
          <div className="text-center mb-12 relative">
            <h2 className="text-[50px] md:text-7xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent">
                GALLERY
              </span>
            </h2>
            <p className='text-[18px] tracking-tight'>
              I also have a small collection of paintings that I have drawn.
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
                    className="artwork-image object-cover p-1.5 filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500 border border-neutral-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 40vw"
                    priority
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
                    className="artwork-image p-1.5 filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500 border border-neutral-700 object-cover"
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
                    className="artwork-image p-1.5 object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500 border border-neutral-700"
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
                className="artwork-frame medium-piece-2 group"
                onClick={() => handleArtworkClick(artworks[3])}
                style={{ cursor: isMobile ? 'pointer' : 'default' }}
              >
                <div className="frame-border">
                  <Image
                    src={artworks[3].imageUrl}
                    alt={artworks[3].title}
                    fill
                    className="artwork-image p-1.5 object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500 border border-neutral-700"
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
                    className="artwork-image p-1.5 !object-right object-cover filter grayscale contrast-125 hover:grayscale-0 transition-alla duration-500 border border-neutral-700"
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
                    unoptimized={true}
                    quality={100}
                    className="artwork-image object-cover p-1.5 filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500 border border-neutral-700"
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
                    className="artwork-image p-1.5 object-top object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500 border border-neutral-700"
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
                    className="artwork-image p-1.5 filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500 border border-neutral-700"
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

        <style jsx>{`
          .gallery-grid {
            display: grid;
            grid-template-columns: 2fr 1.5fr 1fr;
            grid-template-rows: 1.2fr 1fr 1fr;
            grid-template-areas:
              "large-1 medium-1 small-1"
              "medium-2 large-2 large-2"
              "small-2 medium-3 small-3";
          }

          .large-piece {
            grid-area: large-1;
          }

          .large-piece-2 {
            grid-area: large-2;
          }

          .medium-piece-1 {
            grid-area: medium-1;
          }

          .medium-piece-2 {
            grid-area: medium-2;
          }

          .medium-piece-3 {
            grid-area: medium-3;
          }

          .small-piece-1 {
            grid-area: small-1;
          }

          .small-piece-2 {
            grid-area: small-2;
          }

          .small-piece-3 {
            grid-area: small-3;
          }

          .artwork-frame {
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .frame-border {
            position: relative;
            width: 100%;
            height: 100%;
            background: #1a1a1a;
            padding: 8px;
            box-shadow: 
              0 4px 12px rgba(0, 0, 0, 0.15),
              0 2px 4px rgba(0, 0, 0, 0.1),
              inset 0 0 0 1px rgba(255, 255, 255, 0.05);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .artwork-image {
            object-fit: cover;
            display: block;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .artwork-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
            color: white;
            padding: 24px 12px 12px;
            transform: translateY(100%);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            z-index: 10;
          }

          .artwork-title {
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 4px;
            letter-spacing: 0.025em;
          }

          .artwork-details {
            font-size: 0.75rem;
            opacity: 0.9;
            font-weight: 300;
          }

          .group:hover .frame-border {
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.3),
              0 4px 12px rgba(0, 0, 0, 0.2),
              inset 0 0 0 1px rgba(255, 255, 255, 0.1),
              0 0 0 2px rgba(255, 255, 255, 0.05);
            transform: translateY(-2px);
          }

          .group:hover .artwork-image {
            transform: scale(1.02);
          }

          .group:hover .artwork-info {
            transform: translateY(0);
            opacity: 1;
          }

          /* Mobile-specific styles - add tap indication */
          @media (max-width: 640px) {
            .artwork-frame:active {
              transform: scale(0.98);
            }
          }

          /* Responsive Adjustments */
          @media (max-width: 1024px) {
            .gallery-grid {
              grid-template-columns: 1.8fr 1.3fr 1fr;
            }
            
            .frame-border {
              padding: 6px;
            }
          }

          @media (max-width: 768px) {
            .gallery-grid {
              grid-template-columns: 1.5fr 1.2fr 1fr;
            }
            
            .frame-border {
              padding: 4px;
            }
            
            .artwork-info {
              padding: 16px 8px 8px;
            }
            
            .artwork-title {
              font-size: 0.8rem;
            }
            
            .artwork-details {
              font-size: 0.7rem;
            }
          }

          /* Mobile Layout - 2 images per row */
          @media (max-width: 640px) {
            .gallery-container {
              height: auto !important;
              min-height: auto !important;
            }
            
            .gallery-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-template-rows: repeat(4, 200px);
              gap: 12px;
              grid-template-areas:
                "mobile-1 mobile-2"
                "mobile-3 mobile-4"
                "mobile-5 mobile-6"
                "mobile-7 mobile-8";
            }
            
            .large-piece { grid-area: mobile-1; }
            .medium-piece-1 { grid-area: mobile-2; }
            .small-piece-1 { grid-area: mobile-3; }
            .medium-piece-2 { grid-area: mobile-4; }
            .large-piece-2 { grid-area: mobile-5; }
            .small-piece-2 { grid-area: mobile-6; }
            .medium-piece-3 { grid-area: mobile-7; }
            .small-piece-3 { grid-area: mobile-8; }
            
            .artwork-title {
              font-size: 0.75rem;
            }
            
            .artwork-details {
              font-size: 0.65rem;
            }
            
            .artwork-info {
              padding: 12px 8px 8px;
            }
          }

          @media (max-width: 480px) {
            .gallery-grid {
              gap: 8px;
              grid-template-rows: repeat(4, 180px);
            }
            
            .frame-border {
              padding: 3px;
            }
            
            .artwork-title {
              font-size: 0.7rem;
            }
            
            .artwork-details {
              font-size: 0.6rem;
            }
          }
        `}</style>
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
                  className={selectedArtwork.id !== 5 ? 'object-cover' : 'object-contain'}
                  sizes="(max-width: 640px) 90vw"
                  priority
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