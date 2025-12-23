import { cn } from "@/lib/utils";
import { Check, Loader2, Circle } from "lucide-react";

interface PipelineStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "pending" | "running" | "completed";
  isLast?: boolean;
}

const PipelineStep = ({ number, title, description, icon, status, isLast }: PipelineStepProps) => {
  return (
    <div className="relative flex items-start gap-4 group">
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-6 top-14 w-0.5 h-[calc(100%+1rem)] bg-gradient-to-b from-border to-transparent" />
      )}
      
      {/* Step Number Circle */}
      <div
        className={cn(
          "relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-500",
          status === "completed" && "bg-primary border-primary glow-primary",
          status === "running" && "bg-secondary/20 border-secondary glow-secondary animate-pulse",
          status === "pending" && "bg-muted border-border"
        )}
      >
        {status === "completed" ? (
          <Check className="w-5 h-5 text-primary-foreground" />
        ) : status === "running" ? (
          <Loader2 className="w-5 h-5 text-secondary animate-spin" />
        ) : (
          <span className="font-display text-sm text-muted-foreground">{String(number).padStart(2, '0')}</span>
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex-1 p-4 rounded-xl border transition-all duration-300 group-hover:border-primary/30",
          status === "completed" && "bg-card border-primary/20",
          status === "running" && "bg-secondary/5 border-secondary/30 border-gradient",
          status === "pending" && "bg-card/50 border-border/50"
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "p-2 rounded-lg",
              status === "completed" && "bg-primary/10 text-primary",
              status === "running" && "bg-secondary/10 text-secondary",
              status === "pending" && "bg-muted text-muted-foreground"
            )}
          >
            {icon}
          </div>
          <h3
            className={cn(
              "font-display text-sm tracking-wide",
              status === "completed" && "text-primary",
              status === "running" && "text-secondary",
              status === "pending" && "text-muted-foreground"
            )}
          >
            {title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        
        {status === "running" && (
          <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-secondary to-primary rounded-full animate-shimmer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PipelineStep;
