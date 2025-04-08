/**
 * HeroRight Component
 *
 * Right side of the hero section
 *
 * @module components/LandingHero/HeroRight
 */
import { DemoWindow } from './DemoWindow';

/**
 * HeroRight component
 * @returns {JSX.Element} The rendered right side
 */
export function HeroRight(): JSX.Element {
  return (
    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
      <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
        <DemoWindow />
      </div>
    </div>
  );
}
