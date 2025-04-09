import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, History, HelpCircle } from 'lucide-react';

const navigationItems = [
  { to: '/', icon: <Home className="h-4 w-4" />, label: 'Home' },
  { to: '/history', icon: <History className="h-4 w-4" />, label: 'History' },
  { to: '/settings', icon: <Settings className="h-4 w-4" />, label: 'Settings' },
  { to: '/help', icon: <HelpCircle className="h-4 w-4" />, label: 'Help' },
];

interface NavButtonProps {
  to: string;
  icon: JSX.Element;
  label: string;
  isActive: boolean;
}

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
const NavButton = ({ to, icon, label, isActive }: NavButtonProps): JSX.Element => (
  <Link to={to} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}>
    {icon}
    <span className="hidden sm:inline">{label}</span>
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
    <nav className="flex items-center gap-1">
      {navigationItems.map(({ to, icon, label }) => (
        <NavButton key={to} to={to} icon={icon} label={label} isActive={location.pathname === to} />
      ))}
    </nav>
  );
};
