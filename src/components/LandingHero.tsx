/**
 * Landing Hero Component
 *
 * Hero section for the landing page with main message and demo
 *
 * @module components/LandingHero
 */
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * LandingHero component props
 * @interface LandingHeroProps
 */
interface LandingHeroProps {
  /** Whether the hero section is visible */
  isVisible: boolean;
  /** Ref to attach to the component */
  heroRef: React.RefObject<HTMLDivElement>;
}

/**
 * HeroContent component for the main message and CTA
 * @returns {JSX.Element} The rendered hero content
 */
function HeroContent(): JSX.Element {
  return (
    <div className="flex-1">
      <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
        <Sparkles className="mr-2 h-3.5 w-3.5"/>
        AI Prompt Management
      </div>

      <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        Create <span className="text-primary">perfect AI prompts</span> with reusable
        placeholders
      </h1>

      <p className="mb-8 max-w-xl text-lg text-muted-foreground md:text-xl">
        Prompt Shaper helps you create, manage, and reuse placeholders for consistent AI
        interactions across your team or projects.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link to="/app">
          <Button size="lg" className="w-full sm:w-auto">
            Get Started <ArrowRight className="ml-2 h-4 w-4"/>
          </Button>
        </Link>
      </div>
    </div>
  );
}

/**
 * DemoHeader component for the demo window header
 * @returns {JSX.Element} The rendered demo header
 */
function DemoHeader(): JSX.Element {
  return (
    <div className="flex items-center gap-2 border-b border-border/50 p-4">
      <div className="h-3 w-3 rounded-full bg-red-400"></div>
      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
      <div className="h-3 w-3 rounded-full bg-green-400"></div>
      <div className="ml-2 text-sm font-medium">Prompt Shaper</div>
    </div>
  );
}

/**
 * DemoValues component for displaying placeholder values
 * @returns {JSX.Element} The rendered demo values
 */
function DemoValues(): JSX.Element {
  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center">
        <div className="w-24 text-xs text-muted-foreground">company:</div>
        <div className="text-sm">Acme Inc</div>
      </div>
      <div className="flex items-center">
        <div className="w-24 text-xs text-muted-foreground">product:</div>
        <div className="text-sm">Smart Home Hub</div>
      </div>
      <div className="flex items-center">
        <div className="w-24 text-xs text-muted-foreground">audience:</div>
        <div className="text-sm">tech enthusiasts</div>
      </div>
    </div>
  );
}

/**
 * DemoTemplate component for displaying the template with placeholders
 * @returns {JSX.Element} The rendered demo template
 */
function DemoTemplate(): JSX.Element {
  return (
    <div className="mb-4 rounded-md border border-border/50 bg-background/50 p-3 text-sm">
      Write a compelling ad for{' '}
      <span className="inline-block rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-800/70 dark:text-blue-200 dark:shadow-[0_0_10px_rgba(59,130,246,0.3)]">
        {'<company>'}
      </span>{' '}
      promoting their{' '}
      <span className="inline-block rounded bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-800/70 dark:text-purple-200 dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]">
        {'<product>'}
      </span>{' '}
      to{' '}
      <span className="inline-block rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-800/70 dark:text-amber-200 dark:shadow-[0_0_10px_rgba(245,158,11,0.3)]">
        {'<audience>'}
      </span>
    </div>
  );
}

/**
 * DemoResult component for displaying the final result
 * @returns {JSX.Element} The rendered demo result
 */
function DemoResult(): JSX.Element {
  return (
    <div className="rounded-md border border-green-100 bg-green-50 p-3 text-sm dark:border-green-900/50 dark:bg-green-900/20">
      Write a compelling ad for Acme Inc promoting their Smart Home Hub to tech
      enthusiasts.
    </div>
  );
}

/**
 * Demo component showing the app interface
 * @returns {JSX.Element} The rendered demo component
 */
function HeroDemo(): JSX.Element {
  return (
    <div className="relative z-10 overflow-hidden rounded-2xl border border-border/50 bg-white shadow-xl backdrop-blur-none dark:bg-background">
      <DemoHeader />
      <div className="p-6">
        <div className="mb-4 text-sm font-medium">Template:</div>
        <DemoTemplate />
        <div className="mb-4 text-sm font-medium">Values:</div>
        <DemoValues />
        <div className="mb-4 text-sm font-medium">Result:</div>
        <DemoResult />
      </div>
    </div>
  );
}

/**
 * Hero section for the landing page
 * @param {LandingHeroProps} props - Component props
 * @returns {JSX.Element} The rendered hero section
 */
export function LandingHero({ isVisible, heroRef }: LandingHeroProps): JSX.Element {
  return (
    <section ref={heroRef} className="relative overflow-hidden px-4 py-20 md:py-32">
      <div className={`mx-auto max-w-6xl transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
          <HeroContent />
          <div className="relative flex-1">
            <HeroDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
