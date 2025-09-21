import { artworks } from "@/lib/project";
import GalleryClient from './GalleryClient';

const GalleryWall: React.FC = () => {
  return (
    <section className="h-full py-10 md:py-20 px-6 lg:px-8 flex items-start justify-center">
      <div className="w-full">
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
        <GalleryClient artworks={artworks} />
      </div>
    </section>
  );
};

export default GalleryWall;