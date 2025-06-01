"use client";
import { projects } from "@/lib/data";
import { ProjectGrid } from "./project-grid";
import { ProjectListMobile } from "./project-list-mobile";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-white dark:bg-neutral-950 ">
      <div className="px-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-bold">
              <span className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent">
                PROJECTS
              </span>
            </h2>
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
