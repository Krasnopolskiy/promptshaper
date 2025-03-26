import {createContext} from 'react';

/**
 * Theme type definition
 */
export type Theme = 'dark' | 'light';

/**
 * Theme context type definition
 */
export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Theme context for managing application theme
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
