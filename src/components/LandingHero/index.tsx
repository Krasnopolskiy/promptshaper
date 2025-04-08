/**
 * LandingHero Component
 *
 * Hero section for the landing page
 *
 * @module components/LandingHero
 */
import { HeroLeft } from './HeroLeft';
import { HeroRight } from './HeroRight';

/**
 * HeroContent component
 * @returns {JSX.Element} The rendered hero content
 */
function HeroContent(): JSX.Element {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
      <HeroLeft />
      <HeroRight />
    </div>
  );
}

/**
 * LandingHero component
 * @returns {JSX.Element} The rendered hero section
 */
export function LandingHero(): JSX.Element {
  return (
    <div className="relative isolate overflow-hidden">
      <HeroContent />
    </div>
  );
}
