import { useState } from "react";
import { 
  Eraser, 
  ListOrdered, 
  Layers, 
  Crop, 
  Sparkles, 
  FileText, 
  Mic, 
  Film,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PipelineStep from "./PipelineStep";

type StepStatus = "pending" | "running" | "completed";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: StepStatus;
}

const initialSteps: Step[] = [
  {
    id: 1,
    title: "IMAGE CLEANER",
    description: "Remove white margins, normalize brightness, resize to consistent width with zero quality loss.",
    icon: <Eraser className="w-5 h-5" />,
    status: "pending",
  },
  {
    id: 2,
    title: "IMAGE SORTER",
    description: "Rename and order images sequentially (001.jpg, 002.jpg...) to lock story flow.",
    icon: <ListOrdered className="w-5 h-5" />,
    status: "pending",
  },
  {
    id: 3,
    title: "CHAPTER COMBINER",
    description: "Merge all pages into one ultra-long vertical image for seamless scrolling.",
    icon: <Layers className="w-5 h-5" />,
    status: "pending",
  },
  {
    id: 4,
    title: "SMART CROPPER",
    description: "Auto-crop with face & bubble detection. YouTube-perfect frame heights with overlap.",
    icon: <Crop className="w-5 h-5" />,
    status: "pending",
  },
  {
    id: 5,
    title: "PANEL ENHANCER",
    description: "Add black borders, safe-area padding. Netflix-style polish for YouTube compression.",
    icon: <Sparkles className="w-5 h-5" />,
    status: "pending",
  },
  {
    id: 6,
    title: "SCRIPT GENERATOR",
    description: "OCR extraction with duplicate removal. Creates copyright-safe English narration.",
    icon: <FileText className="w-5 h-5" />,
    status: "pending",
  },
  {
    id: 7,
    title: "VOICE ENGINE",
    description: "AI-powered text-to-speech with consistent tone, speed, and professional quality.",
    icon: <Mic className="w-5 h-5" />,
    status: "pending",
  },
  {
    id: 8,
    title: "VIDEO BUILDER",
    description: "Auto-sync frames with voice. Export final video with zero editing needed.",
    icon: <Film className="w-5 h-5" />,
    status: "pending",
  },
];

const PipelineSection = () => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [isRunning, setIsRunning] = useState(false);

  const runPipeline = async () => {
    setIsRunning(true);
    setSteps(initialSteps);

    for (let i = 0; i < steps.length; i++) {
      setSteps(prev =>
        prev.map((step, idx) => ({
          ...step,
          status: idx === i ? "running" : idx < i ? "completed" : "pending",
        }))
      );

      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

      setSteps(prev =>
        prev.map((step, idx) => ({
          ...step,
          status: idx <= i ? "completed" : "pending",
        }))
      );
    }

    setIsRunning(false);
  };

  const completedCount = steps.filter(s => s.status === "completed").length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <section id="pipeline" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              8-Step <span className="text-gradient">Pipeline</span>
            </h2>
            <p className="text-muted-foreground">
              Professional-grade processing that transforms raw manhwa into YouTube-ready videos
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {completedCount} of {steps.length} steps completed
              </span>
              <span className="font-display text-sm text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Run Button */}
          <div className="flex justify-center mb-12">
            <Button
              variant="hero"
              size="lg"
              onClick={runPipeline}
              disabled={isRunning}
            >
              <Play className="w-5 h-5" />
              {isRunning ? "Processing..." : "Run Full Pipeline"}
            </Button>
          </div>

          {/* Pipeline Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <PipelineStep
                key={step.id}
                number={step.id}
                title={step.title}
                description={step.description}
                icon={step.icon}
                status={step.status}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
