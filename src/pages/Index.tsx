import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PipelineSection from "@/components/PipelineSection";
import UploadSection from "@/components/UploadSection";
import OutputSection from "@/components/OutputSection";
import Footer from "@/components/Footer";
import { ProcessedImage } from "@/hooks/useProcessing";

const Index = () => {
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);

  const handleProcessingComplete = (images: ProcessedImage[]) => {
    setProcessedImages(images);
  };

  const handleDownloadAll = () => {
    processedImages
      .filter((img) => img.enhanced)
      .forEach((img, idx) => {
        if (img.enhanced) {
          const url = URL.createObjectURL(img.enhanced);
          const a = document.createElement("a");
          a.href = url;
          a.download = `enhanced_${String(idx + 1).padStart(3, "0")}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PipelineSection />
        <UploadSection onProcessingComplete={handleProcessingComplete} />
        <OutputSection 
          processedImages={processedImages} 
          onDownloadAll={handleDownloadAll}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
