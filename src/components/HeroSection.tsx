import { Play, Zap, Film, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Automated Manhwa to Video Pipeline</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transform <span className="text-gradient">Manhwa</span>
            <br />
            Into Pro Recaps
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            8-step automated pipeline that converts raw manhwa pages into 
            YouTube-ready recap videos with AI voice narration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              <Play className="w-5 h-5" />
              Start Pipeline
            </Button>
            <Button variant="glass" size="lg">
              <Film className="w-5 h-5" />
              View Demo
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
            {[
              { icon: <Wand2 className="w-4 h-4" />, label: "Auto Cleaning" },
              { icon: <Film className="w-4 h-4" />, label: "Smart Cropping" },
              { icon: <Zap className="w-4 h-4" />, label: "AI Voice" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50"
              >
                <span className="text-primary">{feature.icon}</span>
                <span className="text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
