/**
 * HeroLeft Component
 *
 * Left side of the hero section
 *
 * @module components/LandingHero/HeroLeft
 */
import { Header } from './Header';
import { GetStartedButton } from './GetStartedButton';

/**
 * HeroLeft component
 * @returns {JSX.Element} The rendered left side
 */
export function HeroLeft(): JSX.Element {
  return (
    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
      <Header />
      <GetStartedButton />
    </div>
  );
}
