/**
 * File utilities for Index hooks.
 *
 * @module hooks/useIndexHooks
 */
import { useEffect } from 'react';
import { useCoreHooks } from './useIndexHooksCore';
import { useUIStateHooks } from './useIndexHooksUI';
import { useStateManagement } from './useIndexHooksState';
import { usePlaceholderHelperHooks } from './useIndexHooksHelpers';
import { createConfig } from './useIndexHooksConfig';
import { useMainFunctions } from '@/hooks/useMainFunctions';
import type { UseIndexHooksReturn } from '@/types/UseIndexHooksReturn';

/**
 * Updates the full prompt based on changes
 * @param {ReturnType<typeof useCoreHooks>} core Core hooks
 * @param {ReturnType<typeof useStateManagement>} state State management
 */
function updateFullPrompt(core: ReturnType<typeof useCoreHooks>, state: ReturnType<typeof useStateManagement>): void {
  state.setFullPrompt(core.generateFullPrompt(core.promptText, core.placeholders));
}

/**
 * Updates the copyable prompt based on changes
 * @param {ReturnType<typeof useCoreHooks>} core Core hooks
 * @param {ReturnType<typeof useStateManagement>} state State management
 */
function updateCopyablePrompt(core: ReturnType<typeof useCoreHooks>, state: ReturnType<typeof useStateManagement>): void {
  state.setCopyablePrompt(core.generateCopyablePrompt(core.promptText, core.placeholders));
}

/**
 * Updates final prompts when text or placeholders change
 * @param {ReturnType<typeof useCoreHooks>} core Core hooks for text and placeholders
 * @param {ReturnType<typeof useStateManagement>} state State management hooks
 */
function useUpdatePromptsEffect(core: ReturnType<typeof useCoreHooks>, state: ReturnType<typeof useStateManagement>): void {
  useEffect(() => {
    updateFullPrompt(core, state);
    updateCopyablePrompt(core, state);
  }, [core, state]);
}

/**
 * Initializes core and UI hooks
 * @returns {Object} Core and UI hooks
 */
function useCoreAndUIHooks(): {
  core: ReturnType<typeof useCoreHooks>;
  ui: ReturnType<typeof useUIStateHooks>;
} {
  return { core: useCoreHooks(), ui: useUIStateHooks() };
}

/**
 * Initializes state and helper hooks
 * @param {ReturnType<typeof useCoreHooks>} core Core hooks for the index page
 * @returns {Object} State and helper hooks
 */
function useStateAndHelperHooks(core: ReturnType<typeof useCoreHooks>): {
  state: ReturnType<typeof useStateManagement>;
  helpers: ReturnType<typeof usePlaceholderHelperHooks>;
} {
  const state = useStateManagement();
  const helpers = usePlaceholderHelperHooks(core);
  useUpdatePromptsEffect(core, state);
  return { state, helpers };
}

/**
 * Combined hooks for the Index page
 * @returns {UseIndexHooksReturn} All necessary hooks and state for the Index page
 */
export function useIndexHooks(): UseIndexHooksReturn {
  const { core, ui } = useCoreAndUIHooks();
  const { state, helpers } = useStateAndHelperHooks(core);
  const config = createConfig({ core, ui, state, helpers });

  // Cast is needed due to type compatibility issues between libraries
  return { ...core, ...ui, ...state, ...helpers, ...useMainFunctions(config) } as unknown as UseIndexHooksReturn;
}
