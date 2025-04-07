/**
 * Welcome Dialog Hook
 *
 * Custom hook to manage welcome dialog state
 *
 * @module hooks/useWelcomeDialog
 */
import { useState, useEffect, useCallback } from 'react';

/**
 * Type for welcome dialog return values
 */
export interface WelcomeDialogReturn {
  showWelcome: boolean;
  handleSkipWelcome: () => void;
}

/**
 * Checks if user has seen welcome dialog before
 * @returns {boolean} Whether user has seen welcome dialog
 */
function hasUserSeenWelcome(): boolean {
  return !!localStorage.getItem('promptShaper_hasSeenWelcome');
}

/**
 * Sets welcome dialog as seen in localStorage
 * @returns {void}
 */
function markWelcomeAsSeen(): void {
  localStorage.setItem('promptShaper_hasSeenWelcome', 'true');
}

/**
 * Creates return object for welcome dialog hook
 * @param {boolean} showWelcome - Show welcome flag
 * @param {() => void} handleSkipWelcome - Skip welcome handler
 * @returns {WelcomeDialogReturn} Welcome dialog hook return
 */
function createWelcomeReturn(
  showWelcome: boolean,
  handleSkipWelcome: () => void
): WelcomeDialogReturn {
  return { showWelcome, handleSkipWelcome };
}

/**
 * Sets up welcome effect
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setShowWelcome - State setter function for welcome dialog
 * @returns {void}
 */
function useInitialWelcomeEffect(
  setShowWelcome: React.Dispatch<React.SetStateAction<boolean>>
): void {
  useEffect(() => {
    if (!hasUserSeenWelcome()) {
      setShowWelcome(true);
    }
  }, [setShowWelcome]);
}

/**
 * Creates skip welcome handler
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setShowWelcome - State setter function for welcome dialog
 * @returns {() => void} Skip welcome handler
 */
function useSkipWelcomeHandler(
  setShowWelcome: React.Dispatch<React.SetStateAction<boolean>>
): () => void {
  return useCallback((): void => {
    setShowWelcome(false);
    markWelcomeAsSeen();
  }, [setShowWelcome]);
}

/**
 * Hook for managing welcome dialog state
 * @returns {WelcomeDialogReturn} Welcome dialog state and handlers
 */
export function useWelcomeDialog(): WelcomeDialogReturn {
  const [showWelcome, setShowWelcome] = useState(false);

  useInitialWelcomeEffect(setShowWelcome);
  const handleSkipWelcome = useSkipWelcomeHandler(setShowWelcome);

  return createWelcomeReturn(showWelcome, handleSkipWelcome);
}
