import Image from "next/image";
import type { BlogPost } from "@/lib/mdx";

interface BlogPostImageProps {
  post: BlogPost;
}

export function BlogPostImage({ post }: BlogPostImageProps) {
  return (
    <div
      className="mb-16"
    >
      <div className="relative aspect-[4/3] md:aspect-video w-full overflow-hidden rounded-sm border">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          width={1200}
          height={675}
          quality={100}
          loading="lazy"
          className="w-full h-full aspect-video border border-neutral-300 dark:border-neutral-800 object-contain bg-white"
        />
      </div>
    </div>
  );
}