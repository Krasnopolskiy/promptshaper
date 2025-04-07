import { usePlaceholders } from '@/hooks/usePlaceholders';
import { usePrompt } from '@/hooks/usePrompt';

/**
 * Type for core hooks
 */
export type CoreHooks = ReturnType<typeof usePlaceholders> & ReturnType<typeof usePrompt>;

/**
 * Initializes core hooks for placeholders and prompt
 * @returns {CoreHooks} Core hooks for placeholders and prompt management
 */
export function useCoreHooks(): CoreHooks {
  return { ...usePlaceholders(), ...usePrompt() };
}
