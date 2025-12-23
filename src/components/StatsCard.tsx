import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  accentColor?: "primary" | "secondary" | "accent";
}

const StatsCard = ({ icon, label, value, trend, accentColor = "primary" }: StatsCardProps) => {
  return (
    <div className="border-gradient p-4 rounded-xl bg-card">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "p-2 rounded-lg",
            accentColor === "primary" && "bg-primary/10 text-primary",
            accentColor === "secondary" && "bg-secondary/10 text-secondary",
            accentColor === "accent" && "bg-accent/10 text-accent"
          )}
        >
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-2xl font-display font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;
