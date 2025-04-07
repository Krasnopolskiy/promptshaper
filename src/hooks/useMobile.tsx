import * as React from 'react';

// Increase the breakpoint to consider mid-size devices as "mobile" for layout purposes
const MOBILE_BREAKPOINT = 1024; // Changed from 768 to 1024 (lg breakpoint in Tailwind)

/**
 * Creates event listener handler for media query changes
 *
 * @param {React.Dispatch<React.SetStateAction<boolean | undefined>>} setIsMobile - State setter function
 * @returns {(event: MediaQueryListEvent) => void} Media query change handler
 */
const createMediaQueryHandler = (
  setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>
): (() => void) => {
  return () => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  };
};

/**
 * Sets the initial mobile state based on window width
 * @returns {boolean} Initial mobile state
 */
function getInitialMobileState(): boolean {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

/**
 * Sets up media query listener for mobile detection
 * @param {React.Dispatch<React.SetStateAction<boolean | undefined>>} setIsMobile - State setter
 * @returns {() => void} Cleanup function
 */
function setupMobileListener(setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>): () => void {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  const onChange = createMediaQueryHandler(setIsMobile);

  mql.addEventListener('change', onChange);
  setIsMobile(getInitialMobileState());

  return (): void => mql.removeEventListener('change', onChange);
}

/**
 * Hook to detect if the current viewport is mobile-sized
 *
 * @returns {boolean} True if the viewport is mobile-sized
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    return setupMobileListener(setIsMobile);
  }, []);

  return !!isMobile;
}
