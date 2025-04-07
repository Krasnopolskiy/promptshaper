import {useEffect, useState} from 'react';
import {Theme, ThemeContext} from './themeTypes';

/**
 * Gets the initial theme based on user preferences and system settings
 * @returns {Theme} The initial theme
 */
function getInitialTheme(): Theme {
  // Try to get the theme from localStorage
  const savedTheme = localStorage.getItem('theme') as Theme | null;

  if (savedTheme) {
    return savedTheme;
  }

  // If no theme in localStorage, check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  // Default to light theme
  return 'light';
}

/**
 * Applies the current theme to document
 * @param {Theme} theme - Current theme
 * @returns {void}
 */
function applyThemeToDocument(theme: Theme): void {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

/**
 * Handle theme changes by updating localStorage and document classes
 * @param {Theme} theme - Current theme
 * @returns {void}
 */
function handleThemeChange(theme: Theme): void {
  // Update localStorage when theme changes
  localStorage.setItem('theme', theme);

  // Update the document class for Tailwind
  applyThemeToDocument(theme);
}

/**
 * Handle system color scheme changes
 * @param {MediaQueryListEvent} e - The media query event
 * @param {(theme: Theme) => void} setTheme - Theme state setter
 * @returns {void}
 */
function handleColorSchemeChange(e: MediaQueryListEvent, setTheme: (theme: Theme) => void): void {
  // Only update if the user hasn't manually set a preference
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
}

/**
 * Create media query change handler
 * @param {(theme: Theme) => void} setTheme - Theme state setter
 * @returns {(e: MediaQueryListEvent) => void} Media query event handler
 */
function createMediaQueryHandler(setTheme: (theme: Theme) => void): (e: MediaQueryListEvent) => void {
  return (e: MediaQueryListEvent): void => {
    handleColorSchemeChange(e, setTheme);
  };
}

/**
 * Set up listener for system color scheme changes
 * @param {(theme: Theme) => void} setTheme - Theme state setter
 * @returns {() => void} Cleanup function
 */
function setupSystemThemeListener(setTheme: (theme: Theme) => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = createMediaQueryHandler(setTheme);

  mediaQuery.addEventListener('change', handleChange);

  return (): void => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}

/**
 * Create a theme toggler function
 * @param {(value: React.SetStateAction<Theme>) => void} setTheme - Theme state setter
 * @returns {() => void} Theme toggle function
 */
function createThemeToggler(setTheme: (value: React.SetStateAction<Theme>) => void): () => void {
  return (): void => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
}

/**
 * Type for theme context value
 */
interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Create theme context value
 * @param {Theme} theme - Current theme
 * @param {(theme: Theme) => void} setTheme - Theme state setter
 * @param {() => void} toggleTheme - Theme toggle function
 * @returns {ThemeContextValue} Theme context value
 */
function createThemeContextValue(
  theme: Theme,
  setTheme: (theme: Theme) => void,
  toggleTheme: () => void
): ThemeContextValue {
  return { theme, setTheme, toggleTheme };
}

/**
 * Set up theme-related effects
 * @param {Theme} theme - Current theme
 * @param {(theme: Theme) => void} setTheme - Theme setter function
 * @returns {void}
 */
function useThemeEffects(theme: Theme, setTheme: (theme: Theme) => void): void {
  // Update document when theme changes
  useEffect(() => {
    handleThemeChange(theme);
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    return setupSystemThemeListener(setTheme);
  }, [setTheme]);
}

/**
 * Theme provider component
 * @param {Object} root0 - The component props
 * @param {React.ReactNode} root0.children - The child components
 * @returns {JSX.Element} The theme provider component
 */
export function ThemeProvider({children}: { children: React.ReactNode }): JSX.Element {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useThemeEffects(theme, setTheme);

  const toggleTheme = createThemeToggler(setTheme);
  const contextValue = createThemeContextValue(theme, setTheme, toggleTheme);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
