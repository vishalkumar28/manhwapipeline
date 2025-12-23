import { Download, Play, Film, Image, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcessedImage } from "@/hooks/useProcessing";

interface OutputSectionProps {
  processedImages?: ProcessedImage[];
  onDownloadAll?: () => void;
}

interface OutputItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  fileType: string;
  ready: boolean;
  onDownload?: () => void;
}

const OutputItem = ({ icon, title, description, fileType, ready, onDownload }: OutputItemProps) => (
  <div className="border-gradient p-5 rounded-xl bg-card group hover:bg-card/80 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
        {fileType}
      </span>
    </div>
    
    <h4 className="font-display text-sm mb-1">{title}</h4>
    <p className="text-xs text-muted-foreground mb-4">{description}</p>
    
    <Button
      variant={ready ? "default" : "outline"}
      size="sm"
      className="w-full"
      disabled={!ready}
      onClick={onDownload}
    >
      <Download className="w-4 h-4" />
      {ready ? "Download" : "Pending"}
    </Button>
  </div>
);

const OutputSection = ({ processedImages = [], onDownloadAll }: OutputSectionProps) => {
  const hasProcessedImages = processedImages.some(img => img.status === "done");
  const processedCount = processedImages.filter(img => img.status === "done").length;
  const processingCount = processedImages.filter(img => img.status === "processing").length;
  const errorCount = processedImages.filter(img => img.status === "error").length;

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="output" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Pipeline <span className="text-gradient">Output</span>
            </h2>
            <p className="text-muted-foreground">
              Download individual assets or the complete processed images
            </p>
          </div>

          {/* Status Summary */}
          {processedImages.length > 0 && (
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{processedCount} processed</span>
              </div>
              {processingCount > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span>{processingCount} processing</span>
                </div>
              )}
              {errorCount > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span>{errorCount} failed</span>
                </div>
              )}
            </div>
          )}

          {/* Processed Images Preview */}
          {hasProcessedImages && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg">Processed Images</h3>
                <Button onClick={onDownloadAll} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-64 overflow-y-auto p-2 bg-card/50 rounded-xl border border-border">
                {processedImages
                  .filter(img => img.enhanced)
                  .map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted cursor-pointer group"
                      onClick={() => img.enhanced && downloadBlob(img.enhanced, `enhanced_${String(idx + 1).padStart(3, "0")}.png`)}
                    >
                      <img
                        src={URL.createObjectURL(img.enhanced!)}
                        alt={`Processed ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Download className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Video Preview Placeholder */}
          <div className="mb-12 rounded-2xl overflow-hidden border border-border bg-card/50 aspect-video flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            <div className="text-center z-10">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                <Play className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-muted-foreground">Video generation requires additional backend processing</p>
            </div>
            
            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
            </div>
          </div>

          {/* Output Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <OutputItem
              icon={<Image className="w-5 h-5" />}
              title="Cleaned Images"
              description="Denoised and enhanced panels"
              fileType=".png"
              ready={hasProcessedImages}
              onDownload={onDownloadAll}
            />
            <OutputItem
              icon={<Film className="w-5 h-5" />}
              title="Enhanced Frames"
              description="Bordered and cropped frames"
              fileType=".zip"
              ready={hasProcessedImages}
              onDownload={onDownloadAll}
            />
            <OutputItem
              icon={<Image className="w-5 h-5" />}
              title="Long Panel"
              description="Combined vertical image"
              fileType=".jpg"
              ready={false}
            />
            <OutputItem
              icon={<Play className="w-5 h-5" />}
              title="Final Video"
              description="YouTube-ready video"
              fileType=".mp4"
              ready={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutputSection;
