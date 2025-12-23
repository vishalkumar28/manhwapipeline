import { Sparkles, Github, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-xl opacity-30 blur-lg -z-10" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-wider">
              MANHWA<span className="text-primary">FLOW</span>
            </h1>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
              Video Pipeline
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#pipeline" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pipeline
          </a>
          <a href="#upload" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Upload
          </a>
          <a href="#output" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Output
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Github className="w-5 h-5" />
          </Button>
          <Button variant="glass" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
