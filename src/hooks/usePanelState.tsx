/**
 * Panel State Hook
 *
 * Custom hook to manage panel state and resizing
 *
 * @module hooks/usePanelState
 */
import { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/useMobile';

// Default panel sizes
export const DEFAULT_PANEL_SIZES = {
  placeholders: 25,
  editor: 50,
  preview: 25,
};

// Panel types
export type PanelType = 'placeholders' | 'editor' | 'preview';

/**
 * Panel state hook return type
 */
export interface PanelStateReturn {
  activePanel: PanelType;
  setActivePanel: React.Dispatch<React.SetStateAction<PanelType>>;
  panelSizes: typeof DEFAULT_PANEL_SIZES;
  handlePanelResize: (newSizes: number[]) => void;
  resetPanelSizes: () => void;
}

/**
 * Saves panel sizes to localStorage
 * @param {typeof DEFAULT_PANEL_SIZES} sizes - Panel sizes to save
 */
function savePanelSizes(sizes: typeof DEFAULT_PANEL_SIZES): void {
  localStorage.setItem('promptShaper_panelSizes', JSON.stringify(sizes));
}

/**
 * Loads panel sizes from localStorage
 * @returns {typeof DEFAULT_PANEL_SIZES | null} Loaded panel sizes or null
 */
function loadPanelSizes(): typeof DEFAULT_PANEL_SIZES | null {
  const savedSizes = localStorage.getItem('promptShaper_panelSizes');
  if (!savedSizes) return null;

  try {
    return JSON.parse(savedSizes);
  } catch {
    return null;
  }
}

/**
 * Creates new panel sizes from numeric array
 * @param {number[]} sizes - Array of sizes [placeholders, editor, preview]
 * @returns {typeof DEFAULT_PANEL_SIZES} Panel sizes object
 */
function createPanelSizes(sizes: number[]): typeof DEFAULT_PANEL_SIZES {
  const [placeholders, editor, preview] = sizes;
  return { placeholders, editor, preview };
}

/**
 * Hook for initial panel state
 * @returns Panel state and setter
 */
function useInitialPanelState(): [PanelType, React.Dispatch<React.SetStateAction<PanelType>>] {
  const isMobile = useIsMobile();
  const [activePanel, setActivePanel] = useState<PanelType>(
    isMobile ? 'editor' : 'placeholders'
  );

  // Handle mobile changes
  useEffect(() => {
    setActivePanel(isMobile ? 'editor' : 'placeholders');
  }, [isMobile]);

  return [activePanel, setActivePanel];
}

/**
 * Loads panel sizes effect
 * @param {boolean} isMobile Whether the device is mobile
 * @param {Function} setPanelSizes Function to set panel sizes
 */
function useLoadPanelSizesEffect(
  isMobile: boolean,
  setPanelSizes: React.Dispatch<React.SetStateAction<typeof DEFAULT_PANEL_SIZES>>
): void {
  useEffect(() => {
    if (isMobile) return;
    const loaded = loadPanelSizes();
    if (loaded) setPanelSizes(loaded);
  }, [isMobile, setPanelSizes]);
}

/**
 * Hook for panel sizes
 * @param {boolean} isMobile Whether the device is mobile
 * @returns Panel sizes and setter
 */
function usePanelSizes(isMobile: boolean): [
  typeof DEFAULT_PANEL_SIZES,
  React.Dispatch<React.SetStateAction<typeof DEFAULT_PANEL_SIZES>>
] {
  const [panelSizes, setPanelSizes] = useState(DEFAULT_PANEL_SIZES);
  useLoadPanelSizesEffect(isMobile, setPanelSizes);
  return [panelSizes, setPanelSizes];
}

/**
 * Hook for panel resize handler
 * @param {Function} setPanelSizes Function to set panel sizes
 * @returns Function to handle panel resize
 */
function useResizeHandler(
  setPanelSizes: React.Dispatch<React.SetStateAction<typeof DEFAULT_PANEL_SIZES>>
): (newSizes: number[]) => void {
  return useCallback((newSizes: number[]) => {
    const sizes = createPanelSizes(newSizes);
    setPanelSizes(sizes);
    requestAnimationFrame(() => savePanelSizes(sizes));
  }, [setPanelSizes]);
}

/**
 * Hook for panel reset handler
 * @param {Function} setPanelSizes Function to set panel sizes
 * @returns Function to reset panel sizes
 */
function useResetHandler(
  setPanelSizes: React.Dispatch<React.SetStateAction<typeof DEFAULT_PANEL_SIZES>>
): () => void {
  return useCallback(() => {
    setPanelSizes(DEFAULT_PANEL_SIZES);
    savePanelSizes(DEFAULT_PANEL_SIZES);
  }, [setPanelSizes]);
}

/**
 * Panel Size Handlers
 */
interface PanelSizeHandlers {
  panelSizes: typeof DEFAULT_PANEL_SIZES;
  handlePanelResize: (newSizes: number[]) => void;
  resetPanelSizes: () => void;
}

/**
 * Active Panel State
 */
interface ActivePanelState {
  activePanel: PanelType;
  setActivePanel: React.Dispatch<React.SetStateAction<PanelType>>;
}

/**
 * Gets active panel state
 * @returns {ActivePanelState} Active panel state
 */
function useActivePanelState(): ActivePanelState {
  const [activePanel, setActivePanel] = useInitialPanelState();
  return { activePanel, setActivePanel };
}

/**
 * Gets panel size handlers
 * @param {boolean} isMobile Whether the device is mobile
 * @returns {PanelSizeHandlers} Panel size handlers
 */
function usePanelSizeHandlers(isMobile: boolean): PanelSizeHandlers {
  const [panelSizes, setPanelSizes] = usePanelSizes(isMobile);
  const handlePanelResize = useResizeHandler(setPanelSizes);
  const resetPanelSizes = useResetHandler(setPanelSizes);

  return {
    panelSizes,
    handlePanelResize,
    resetPanelSizes
  };
}

/**
 * Creates panel state components
 * @returns {PanelStateReturn} Panel state return object
 */
function usePanelStateComponents(): PanelStateReturn {
  const isMobile = useIsMobile();
  const activeState = useActivePanelState();
  const sizeHandlers = usePanelSizeHandlers(isMobile);

  return {
    ...activeState,
    ...sizeHandlers
  };
}

/**
 * Hook for managing panel state and sizes
 * @returns {PanelStateReturn} Panel state management utilities
 */
export function usePanelState(): PanelStateReturn {
  return usePanelStateComponents();
}
