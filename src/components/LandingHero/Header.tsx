/**
 * Header Component
 *
 * Header section of the landing hero
 *
 * @module components/LandingHero/Header
 */
import { Sparkles } from 'lucide-react';

/**
 * Header component
 * @returns {JSX.Element} The rendered header
 */
export function Header(): JSX.Element {
  return (
    <>
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
    </>
  );
}
