/**
 * Landing Hero Component
 *
 * Hero section for the landing page with main message and demo
 *
 * @module components/LandingHero
 */
import { Header } from './LandingHero/Header';
import { GetStartedButton } from './LandingHero/GetStartedButton';
import { DemoWindowTemplate } from './LandingHero/DemoWindowTemplate';
import { DemoWindowValues } from './LandingHero/DemoWindowValues';
import { DemoWindowResult } from './LandingHero/DemoWindowResult';

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
 * Renders the demo window header
 * @returns {JSX.Element} The demo header component
 */
function DemoHeader(): JSX.Element {
  return <div className="flex items-center gap-2 border-b border-border/50 p-4">
    <div className="h-3 w-3 rounded-full bg-red-400"></div>
    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
    <div className="h-3 w-3 rounded-full bg-green-400"></div>
    <div className="ml-2 text-sm font-medium">Prompt Shaper</div>
  </div>;
}

/**
 * Renders the main content section with heading and CTA
 * @returns {JSX.Element} The hero content component
 */
function HeroContent(): JSX.Element {
  return <div className="flex-1">
    <Header />
    <GetStartedButton />
  </div>;
}

/**
 * Renders the demo content section
 * @returns {JSX.Element} The demo content component
 */
function DemoContent(): JSX.Element {
  return <div className="p-6">
    <DemoWindowTemplate />
    <DemoWindowValues />
    <DemoWindowResult />
  </div>;
}

/**
 * Renders the demo interface
 * @returns {JSX.Element} The hero demo component
 */
function HeroDemo(): JSX.Element {
  return <div className="relative z-10 overflow-hidden rounded-2xl border border-border/50 bg-white shadow-xl backdrop-blur-none dark:bg-background">
    <DemoHeader />
    <DemoContent />
  </div>;
}

/**
 * Renders the content container with hero content and demo
 * @param {boolean} isVisible - Whether the section is visible
 * @returns {JSX.Element} The content container component
 */
function ContentContainer({ isVisible }: { isVisible: boolean }): JSX.Element {
  const visibilityClass = isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0';
  return <div className={`mx-auto max-w-6xl transition-all duration-1000 ${visibilityClass}`}>
    <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
      <HeroContent />
      <div className="relative flex-1"><HeroDemo /></div>
    </div>
  </div>;
}

/**
 * Renders the hero section for the landing page
 * @param {LandingHeroProps} props - Component props
 * @returns {JSX.Element} The hero section component
 */
export function LandingHero({ isVisible, heroRef }: LandingHeroProps): JSX.Element {
  return <section ref={heroRef} className="relative overflow-hidden px-4 py-20 md:py-32">
    <ContentContainer isVisible={isVisible} />
  </section>;
}
