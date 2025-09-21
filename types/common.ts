import { StaticImageData } from "next/image"

export type ViewMode = "grid" | "list"
export type SortOption = string

// Generic interfaces that can be extended
export interface BaseItem {
  id: string
  title: string
  description: string
  image?: string | StaticImageData
}

// Extend for specific use cases
export interface BlogPost extends BaseItem {
  slug: string
  date: string
  author: string
  tags: string[]
}

export interface Project extends BaseItem {
  category: string
  year: string
  technologies: string[]
  mainImage?: string | StaticImageData 
  link?: string
  youtube?: string
}