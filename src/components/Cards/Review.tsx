import OrbitingItems3D from "./orbiting-items-3-d";
import { Lightbulb, Columns, Scale, Sword, Activity } from "lucide-react";
import { ReviewMarquee } from "./ReviewMarquee";

export default function Review() {
  return (
    <div className="relative bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 md:min-h-[625px] py-8 md:py-12 flex flex-col justify-between max-w-7xl mx-auto">
      <ReviewMarquee />
      <div className="absolute md:top-4 -right-5 left-0 scale-75 md:scale-100">
        <OrbitingItems3D
          duration={25}
          items={[
            <Lightbulb key="lightbulb" className="h-8 w-8" />,   
            <Columns key="columns" className="h-8 w-8" />, 
            <Scale key="scale" className="h-8 w-8" />,         
            <Sword key="sword" className="h-8 w-8" />,        
            <Activity key="activity" className="h-8 w-8" />,     
          ]}
          radiusX={40}
          radiusY={20}
          tiltAngle={340}
        />
      </div>
    </div>
  );
}
