import React from "react"
import { cn } from "@/lib/utils"

// Function to generate ID from heading text
const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
}

// Custom heading components that automatically generate IDs
const createHeading = (level: number) => {
  const HeadingComponent = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = generateId(children?.toString() || "")
    const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

    return React.createElement(
      Tag,
      {
        id,
        className: cn("scroll-mt-24 font-heading tracking-tight text-foreground", getHeadingStyles(level)),
        ...props,
      },
      <React.Fragment>
        {children}
        <a
          href={`#${id}`}
          className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity text-sm"
          aria-label="Link to this section"
        >
          #
        </a>
      </React.Fragment>,
    )
  }

  HeadingComponent.displayName = `Heading${level}`
  return HeadingComponent
}

const getHeadingStyles = (level: number): string => {
  switch (level) {
    case 1:
      return "text-4xl md:text-5xl font-extrabold mt-10 mb-6 group bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent font-bold mb-5 tracking-tight leading-tight line-clamp-3"
    case 2:
      return "text-3xl md:text-4xl font-bold mt-8 mb-5 border-b pb-2 border-border group  bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent font-bold mb-5 tracking-tight leading-tight line-clamp-3"
    case 3:
      return "text-2xl md:text-3xl font-bold mt-6 mb-4 group bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent font-bold mb-5 tracking-tight leading-tight line-clamp-3"
    case 4:
      return "text-xl md:text-2xl font-semibold mt-6 mb-3 group bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent font-bold mb-5 tracking-tight leading-tight line-clamp-3"
    case 5:
      return "text-lg md:text-xl font-semibold mt-4 mb-2 group bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent font-bold mb-5 tracking-tight leading-tight line-clamp-3"
    case 6:
      return "text-base md:text-lg font-semibold mt-4 mb-2 group bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent font-bold mb-5 tracking-tight leading-tight line-clamp-3"
    default:
      return ""
  }
}



// MDX component mapping 
export const MDXComponents = {
  // Headings with auto-generated IDs
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),

  // Paragraphs
  p: ({ children, ...props }: any) => (
    <p className="mb-5 text-neutrl-800 dark:text-neutral-100 leading-7 md:leading-relaxed" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }: any) => (
    <ul className="mb-6 space-y-2 list-disc list-outside ml-6 text-neutrl-800 dark:text-neutral-100" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: any) => (
    <ol className="mb-6 space-y-2 list-decimal list-outside ml-6 text-neutrl-800 dark:text-neutral-100" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed -ml-6" {...props}>
      {children}
    </li>
  ),

  // Links
  a: ({ children, href, ...props }: any) => (
    <a
      href={href}
      className="font-medium text-primary underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),


  // Blockquotes
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-primary/30 dark:border-primary/20 pl-4 my-6 italic text-muted-foreground bg-muted/50 py-2 pr-2 rounded-r-md"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Pre (for code blocks)
  pre: ({ children, ...props }: any) => (
    <pre className="overflow-x-auto" {...props}>
      {children}
    </pre>
  ),

  // Tables
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-8 rounded-lg border border-border">
      <table className="min-w-full divide-y divide-border" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }: any) => (
    <thead className="bg-muted" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }: any) => (
    <tbody className="divide-y divide-border bg-card" {...props}>
      {children}
    </tbody>
  ),

  tr: ({ children, ...props }: any) => (
    <tr className="transition-colors hover:bg-muted/50" {...props}>
      {children}
    </tr>
  ),

  th: ({ children, ...props }: any) => (
    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground" {...props}>
      {children}
    </th>
  ),

  td: ({ children, ...props }: any) => (
    <td className="px-4 py-3 text-sm text-muted-foreground" {...props}>
      {children}
    </td>
  ),

  // Horizontal rule
  hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,

  // Strong and emphasis
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),

  em: ({ children, ...props }: any) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),

  // Image
  img: ({ alt, ...props }: any) => (
    <img className="rounded-lg my-6 border border-border shadow-sm" alt={alt || ""} {...props} />
  ),

  // Details and Summary
  details: ({ children, ...props }: any) => (
    <details className="my-4 border border-border rounded-lg overflow-hidden" {...props}>
      {children}
    </details>
  ),

  summary: ({ children, ...props }: any) => (
    <summary className="bg-muted px-4 py-2 cursor-pointer font-medium" {...props}>
      {children}
    </summary>
  ),
}
