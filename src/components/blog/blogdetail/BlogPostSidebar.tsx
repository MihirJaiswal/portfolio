import TableOfContents from "@/components/blog/blogdetail/TableOfContents";
import type { BlogPost } from "@/lib/mdx";

interface BlogPostSidebarProps {
  post: BlogPost;
}

export function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  return (
    <aside
      className="hidden lg:block lg:col-span-3"
    >
      <div className="sticky top-8 h-fit">
        <TableOfContents items={post.tableOfContents || []} />
      </div>
    </aside>
  );
}