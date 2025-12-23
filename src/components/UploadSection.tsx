import { useState } from "react";
import { Image, Layers, Clock, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import UploadZone from "./UploadZone";
import StatsCard from "./StatsCard";
import { useProcessing } from "@/hooks/useProcessing";

interface UploadSectionProps {
  onProcessingComplete?: (images: any[]) => void;
}

const UploadSection = ({ onProcessingComplete }: UploadSectionProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { isProcessing, progress, currentStep, processImages, images } = useProcessing();

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const handleStartProcessing = async () => {
    const results = await processImages(files);
    if (results && onProcessingComplete) {
      onProcessingComplete(results);
    }
  };

  const estimatedTime = Math.ceil(files.length * 0.5);

  return (
    <section id="upload" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Upload <span className="text-gradient">Chapter</span>
            </h2>
            <p className="text-muted-foreground">
              Drop your raw manhwa pages and let the pipeline work its magic
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Zone */}
            <div className="lg:col-span-2 space-y-4">
              <UploadZone onFilesSelect={handleFilesSelect} />
              
              {/* Processing Controls */}
              {files.length > 0 && (
                <div className="space-y-4">
                  {isProcessing ? (
                    <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        <span className="font-display text-sm">{currentStep}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground text-center">
                        {progress}% complete
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={handleStartProcessing}
                      className="w-full glow-primary"
                      size="lg"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Start Processing ({files.length} images)
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <StatsCard
                icon={<Image className="w-5 h-5" />}
                label="Images Loaded"
                value={files.length}
                accentColor="primary"
              />
              <StatsCard
                icon={<Layers className="w-5 h-5" />}
                label="Processed"
                value={images.filter(i => i.status === "done").length}
                accentColor="secondary"
              />
              <StatsCard
                icon={<Clock className="w-5 h-5" />}
                label="Est. Processing"
                value={files.length > 0 ? `~${estimatedTime} min` : "—"}
                accentColor="accent"
              />
              <StatsCard
                icon={<Zap className="w-5 h-5" />}
                label="API Status"
                value={isProcessing ? "Active" : "Ready"}
                trend={isProcessing ? "LIVE" : "OK"}
                accentColor="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
