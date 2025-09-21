import { Play } from "lucide-react"

interface ProjectVideoProps {
  project: {
    title: string
    youtube?: string
  }
}

export function ProjectVideo({ project }: ProjectVideoProps) {
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null

    const regex = /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)

    return match ? `https://www.youtube.com/embed/${match[1]}` : null
  }

  const youtubeEmbedUrl = project.youtube ? getYouTubeEmbedUrl(project.youtube) : null

  if (!youtubeEmbedUrl) return null

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <Play className="w-5 h-5 mr-3 text-zinc-500" />
        Project Video
      </h3>
      <div className="aspect-video w-full rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <iframe
          src={youtubeEmbedUrl}
          title={`${project.title} video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  )
}