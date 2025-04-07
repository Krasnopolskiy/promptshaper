import {useContext} from 'react';
import {ThemeContext, ThemeContextType} from './themeTypes';

/**
 * Hook for accessing the theme context
 *
 * @returns Theme context value with theme state and control functions
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
