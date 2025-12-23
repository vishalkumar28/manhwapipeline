import { useState } from "react";
import { Image, Layers, Clock, Zap } from "lucide-react";
import UploadZone from "./UploadZone";
import StatsCard from "./StatsCard";

const UploadSection = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const estimatedTime = Math.ceil(files.length * 0.5); // ~30 sec per image

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
            <div className="lg:col-span-2">
              <UploadZone onFilesSelect={handleFilesSelect} />
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
                label="Estimated Frames"
                value={files.length > 0 ? Math.ceil(files.length * 2.5) : 0}
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
                label="Output Quality"
                value="1080p"
                trend="PRO"
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
