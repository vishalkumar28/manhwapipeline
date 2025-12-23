import { Download, Play, Film, Volume2, FileText, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OutputItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  fileType: string;
  ready: boolean;
}

const OutputItem = ({ icon, title, description, fileType, ready }: OutputItemProps) => (
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
    >
      <Download className="w-4 h-4" />
      {ready ? "Download" : "Pending"}
    </Button>
  </div>
);

const OutputSection = () => {
  const outputs = [
    {
      icon: <Image className="w-5 h-5" />,
      title: "Long Panel",
      description: "Combined chapter as single vertical image",
      fileType: ".jpg",
      ready: false,
    },
    {
      icon: <Film className="w-5 h-5" />,
      title: "Cropped Frames",
      description: "Smart-cropped individual frames",
      fileType: ".zip",
      ready: false,
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Narration Script",
      description: "AI-generated English recap script",
      fileType: ".txt",
      ready: false,
    },
    {
      icon: <Volume2 className="w-5 h-5" />,
      title: "Voice Audio",
      description: "AI narrator voice track",
      fileType: ".mp3",
      ready: false,
    },
    {
      icon: <Play className="w-5 h-5" />,
      title: "Final Video",
      description: "Complete YouTube-ready video",
      fileType: ".mp4",
      ready: false,
    },
  ];

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
              Download individual assets or the complete video package
            </p>
          </div>

          {/* Video Preview Placeholder */}
          <div className="mb-12 rounded-2xl overflow-hidden border border-border bg-card/50 aspect-video flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            <div className="text-center z-10">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                <Play className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-muted-foreground">Video preview will appear here after processing</p>
            </div>
            
            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
            </div>
          </div>

          {/* Output Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {outputs.map((output, index) => (
              <OutputItem key={index} {...output} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutputSection;
