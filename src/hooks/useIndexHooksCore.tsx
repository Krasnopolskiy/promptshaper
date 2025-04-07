/**
 * Core hooks for Index page
 *
 * @module hooks/useIndexHooksCore
 */
import { usePlaceholders } from '@/hooks/usePlaceholders';
import { usePrompt } from '@/hooks/usePrompt';

/**
 * Initializes core hooks for placeholders and prompt
 * @returns Core hooks for placeholders and prompt
 */
export function useCoreHooks(): ReturnType<typeof usePlaceholders> & ReturnType<typeof usePrompt> {
  const placeholdersHook = usePlaceholders();
  const promptHook = usePrompt();

  return { ...placeholdersHook, ...promptHook };
}
