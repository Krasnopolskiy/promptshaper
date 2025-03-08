import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function LandingHeader() {
  return (
    <header className="w-full bg-white/80 dark:bg-background/80 backdrop-blur-sm border-b border-border/50 z-10 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-semibold text-lg">P</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Prompt Shaper
            </h1>
            <p className="text-xs text-muted-foreground">Create perfect AI prompts</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <Link to="/app">
            <Button 
              size="sm"
              className="text-xs sm:text-sm flex items-center gap-1 shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
} 