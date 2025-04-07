import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import {ThemeToggle} from '@/components/ui/theme-toggle';

/**
 * Logo component for the header
 *
 * @returns {JSX.Element} Logo with site name
 */
const Logo = (): JSX.Element => (
  <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
      <span className="text-lg font-semibold text-primary-foreground">P</span>
    </div>
    <div>
      <h1 className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-xl font-semibold text-transparent">
        Prompt Shaper
      </h1>
      <p className="text-xs text-muted-foreground">Create perfect AI prompts</p>
    </div>
  </Link>
);

/**
 * Navigation actions for the header
 *
 * @returns {JSX.Element} Navigation buttons
 */
const HeaderActions = (): JSX.Element => (
  <div className="flex items-center gap-2">
    <ThemeToggle/>
    <Link to="/app">
      <Button size="sm" className="flex items-center gap-1 text-xs shadow-sm sm:text-sm">
        <span>Get Started</span>
        <ArrowRight className="h-3.5 w-3.5"/>
      </Button>
    </Link>
  </div>
);

/**
 * Landing page header component with logo and navigation
 *
 * @returns {JSX.Element} Landing page header
 */
export function LandingHeader(): JSX.Element {
  return (
    <header className="z-10 w-full border-b border-border/50 bg-white/80 shadow-sm backdrop-blur-sm dark:bg-background/80">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        <Logo />
        <HeaderActions />
      </div>
    </header>
  );
}
