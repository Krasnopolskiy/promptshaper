import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import {ThemeToggle} from '@/components/ui/theme-toggle';

/**
 * Renders the logo icon
 * @returns {JSX.Element} Logo icon
 */
function LogoIcon(): JSX.Element {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
      <span className="text-lg font-semibold text-primary-foreground">P</span>
    </div>
  );
}

/**
 * Renders the logo text
 * @returns {JSX.Element} Logo text
 */
function LogoText(): JSX.Element {
  return (
    <div>
      <h1 className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-xl font-semibold text-transparent">
        Prompt Shaper
      </h1>
      <p className="text-xs text-muted-foreground">Create perfect AI prompts</p>
    </div>
  );
}

/**
 * Logo component for the header
 * @returns {JSX.Element} Logo with site name
 */
function Logo(): JSX.Element {
  return (
    <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
      <LogoIcon />
      <LogoText />
    </Link>
  );
}

/**
 * Get started button component
 * @returns {JSX.Element} Button component
 */
function GetStartedButton(): JSX.Element {
  return (
    <Link to="/app">
      <Button size="sm" className="flex items-center gap-1 text-xs shadow-sm sm:text-sm">
        <span>Get Started</span>
        <ArrowRight className="h-3.5 w-3.5"/>
      </Button>
    </Link>
  );
}

/**
 * Navigation actions for the header
 * @returns {JSX.Element} Navigation buttons
 */
function HeaderActions(): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle/>
      <GetStartedButton />
    </div>
  );
}

/**
 * Landing page header component with logo and navigation
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
