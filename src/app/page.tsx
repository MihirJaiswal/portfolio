import React from "react";
import About from "@/components/about/About";
import Cards from "@/components/Cards/Cards";
import GalleryWall from "@/components/drawing/GalleryWall";
import { HeroSection } from "@/components/hero/Hero";
import LenisProvider from "@/components/lenis/LenisProvider";
import { Navbar } from "@/components/navbar/Navbar";
import { ProcessSteps } from "@/components/process/Proccess";
import { ProjectsSection } from "@/components/projects/Project";
import { ScrollProgress } from "@/components/scroll/scroll-progress";
import { ScrollToTop } from "@/components/scroll/scroll-to-top";
import Work from "@/components/work/Work";
import BlogSection from "@/components/blog/BlogSection";
import { getAllBlogPosts } from '@/lib/mdx'
import ContactForm from "@/components/contact/Contact";

export default async function Home() {
  const posts = await getAllBlogPosts()
  return (
    <>
      <LenisProvider>
      <ScrollProgress />
      <div className="max-w-7xl mx-auto overflow-hidden">
        <Navbar />
        <HeroSection />
        <About />
        <ProjectsSection />
        <GalleryWall />
      </div>
      <Work />
      <ProcessSteps />
      <div className="overflow-hidden">
        <Cards />
        <div className="lg:hidden">
          <ContactForm />
        </div>
      </div>
      <BlogSection posts={posts} />
      <ScrollToTop />
    </LenisProvider>
    </>
  );
}