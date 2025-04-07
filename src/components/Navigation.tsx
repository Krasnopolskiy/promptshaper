import {Link, useLocation} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Home, Info} from 'lucide-react';

/**
 * Navigation button component
 *
 * @param {Object} props - Component props
 * @param {string} props.to - Navigation path
 * @param {React.ReactNode} props.icon - Button icon
 * @param {string} props.label - Button label
 * @param {boolean} props.isActive - Whether the button is active
 * @returns {JSX.Element} Navigation button
 */
const NavButton = ({
  to,
  icon,
  label,
  isActive
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}): JSX.Element => (
  <Link to={to}>
    <Button
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      className="gap-1"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Button>
  </Link>
);

/**
 * Main navigation component for the application
 *
 * @returns {JSX.Element} Navigation bar
 */
export const Navigation = (): JSX.Element => {
  const location = useLocation();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border/30 bg-background/80 px-4 py-3 backdrop-blur-md">
      <Link to="/" className="app-logo">
        Prompt<span>Gen</span>
      </Link>

      <div className="flex items-center gap-2">
        <NavButton
          to="/"
          icon={<Home className="h-4 w-4"/>}
          label="Home"
          isActive={location.pathname === '/'}
        />

        <NavButton
          to="/about"
          icon={<Info className="h-4 w-4"/>}
          label="About"
          isActive={location.pathname === '/about'}
        />
      </div>
    </nav>
  );
};
