import {useEffect, useState} from 'react';
import {Theme, ThemeContext} from './theme-types';

/**
 * Theme provider component
 */
export function ThemeProvider({children}: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
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
    });

    useEffect(() => {
        // Update localStorage when theme changes
        localStorage.setItem('theme', theme);

        // Update the document class for Tailwind
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Listen for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            // Only update if the user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
} 