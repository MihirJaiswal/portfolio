import About from "@/components/about/About";
import Cards from "@/components/Cards/Cards";
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

export default function Home() {
  return (
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
        <div className="pb-4 overflow-hidden">
          <Cards />
          <div className="lg:hidden">
            <ContactForm />
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      
    </LenisProvider>
  );
}
