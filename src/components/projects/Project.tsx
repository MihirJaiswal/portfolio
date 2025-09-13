import { projects } from "@/lib/project";
import { ProjectGrid } from "./project-grid";
import { ProjectListMobile } from "./project-list-mobile";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-neutral-950 ">
      <div className="px-6">
        <div className="flex justify-center md:justify-between items-center">
          <div className="flex flex-col items-center justify-center mb-6 md:mb-0">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 md:mb-0">
              <span className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent text-center md:text-left">
                PROJECTS
              </span>
            </h2>
            <p className='md:hidden text-center text-[18px] tracking-tight text-neutral-600 dark:text-neutral-400'>
              Here are some of the projects I have worked on.
            </p>
          </div>
        </div>
        <div className="md:hidden">
          <ProjectListMobile projects={projects} />
        </div>
        <div className="hidden md:flex">
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
