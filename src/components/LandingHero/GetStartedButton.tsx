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
 * Renders the get started button for the landing hero
 * @returns {JSX.Element} The get started button component
 */
export function GetStartedButton(): JSX.Element {
  return <Link to="/app">
    <Button size="lg" className="w-full sm:w-auto">Get Started <ArrowRight className="ml-2 h-4 w-4"/></Button>
  </Link>;
}
