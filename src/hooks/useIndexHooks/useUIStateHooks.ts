import { useIsMobile } from '@/hooks/useMobile';
import { usePanelState } from '@/hooks/usePanelState';
import { useWelcomeDialog } from '@/hooks/useWelcomeDialog';

/**
 * Initializes UI state hooks
 *
 * @returns UI state management hooks
 */
export function useUIStateHooks(): {
  isMobile: boolean
} & ReturnType<typeof usePanelState> & ReturnType<typeof useWelcomeDialog> {
  const isMobile = useIsMobile();
  const panelState = usePanelState();
  const welcomeDialog = useWelcomeDialog();

  return { isMobile, ...panelState, ...welcomeDialog };
}
