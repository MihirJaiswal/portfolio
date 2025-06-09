// Fixed Home component
import About from "@/components/about/About";
import Cards from "@/components/Cards/Cards";
import ClientWrapper from "@/components/ClientWrapper";
import ContactForm from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import GalleryWall from "@/components/GalleryWall";
import { HeroSection } from "@/components/Hero";
import LenisProvider from "@/components/lenis/LenisProvider";
import { Navbar } from "@/components/navbar/Navbar";
import { ProcessSteps } from "@/components/Proccess";
import { ProjectsSection } from "@/components/projects/Project";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollToTop } from "@/components/scroll-to-top";
import Work from "@/components/Work";
import BlogSection from "@/components/BlogSection";
import { getAllBlogPosts } from '@/lib/mdx'

export default async function Home() {
  const posts = await getAllBlogPosts()

  const MainContent = () => (
    <LenisProvider>
      <ScrollProgress />
      <CustomCursor />
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
      <Footer />
      <ScrollToTop />
    </LenisProvider>
  )

  return (
    <div>
      <ClientWrapper>
        <MainContent />
      </ClientWrapper>
    </div>
  );
}