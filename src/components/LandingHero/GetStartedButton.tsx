/**
 * GetStartedButton Component
 *
 * Get started button for the landing hero
 *
 * @module components/LandingHero/GetStartedButton
 */
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

/**
 * GetStartedButton component
 * @returns {JSX.Element} The rendered button
 */
export function GetStartedButton(): JSX.Element {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Link to="/app">
        <Button size="lg" className="w-full sm:w-auto">
          Get Started <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </Link>
    </div>
  );
}
