import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PipelineSection from "@/components/PipelineSection";
import UploadSection from "@/components/UploadSection";
import OutputSection from "@/components/OutputSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PipelineSection />
        <UploadSection />
        <OutputSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
