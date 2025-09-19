import OrbitingItems3D from "./orbiting-items-3-d";
import { ReviewMarquee } from "./ReviewMarquee";

export default function Review() {
  return (
    <div className="relative bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 lg:max-h-[610px] py-8 md:py-12 flex flex-col justify-between max-w-7xl mx-auto">
      <ReviewMarquee />
      <div className="absolute -top-[40px] xs:-top-[50px] md:top-10 lg:top-0 right-2 xs:-right-5 left-0 scale-70 xs:scale-75 md:scale-100">
        <OrbitingItems3D
          duration={25}
          radiusX={40}
          radiusY={20}
          tiltAngle={340}
        />
      </div>
    </div>
  );
}
