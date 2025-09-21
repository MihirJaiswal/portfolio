import { ProjectHero } from "./ProjectHero"
import { ProjectImage } from "./ProjectImage"
import { ProjectOverview } from "./ProjectOverview"
import { ProjectVideo } from "./ProjectVideo"
import { ProjectActions } from "./ProjectActions"
import { ProjectSidebar } from "./ProjectSidebar"
import { RelatedProjects } from "./RelatedProjects"
import PageNav from "@/components/navbar/PageNav"
import { ScrollToTop } from "./ScrollToTop" 

interface ProjectDetailClientProps {
  project: any 
  currentProjectIndex: number
  projectsToShow: any[] 
}

export function ProjectDetailClient({ 
  project, 
  projectsToShow 
}: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 dark:text-white">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <PageNav type="project" isSlug={true} />
        <ProjectHero project={project} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 my-12">
          <div className="md:col-span-2">
            <ProjectImage project={project} />
            <ProjectOverview project={project} />
            <ProjectVideo project={project} />
            <ProjectActions project={project} />
          </div>

          <div>
            <ProjectSidebar 
              project={project}
            />
          </div>
        </div>

        <RelatedProjects projects={projectsToShow} />
      </div>
    </div>
  )
}