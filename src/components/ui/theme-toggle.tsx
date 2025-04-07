import {Moon, Sun} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useTheme} from '@/hooks';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';

/**
 * Theme toggle button content
 *
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {() => void} props.toggleTheme - Function to toggle theme
 * @returns {JSX.Element} Button with icon
 */
const ThemeToggleButton = ({
  theme,
  toggleTheme
}: {
  theme: string;
  toggleTheme: () => void;
}): JSX.Element => (
  <Button
    variant="outline"
    size="icon"
    onClick={toggleTheme}
    className="h-8 w-8 border-border/50 shadow-sm hover:bg-accent/10"
  >
    {theme === 'light' ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
    <span className="sr-only">Toggle theme</span>
  </Button>
);

/**
 * Theme toggle component with tooltip
 *
 * @returns {JSX.Element} Theme toggle with tooltip
 */
export function ThemeToggle(): JSX.Element {
  const {theme, toggleTheme} = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle {theme === 'light' ? 'dark' : 'light'} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
