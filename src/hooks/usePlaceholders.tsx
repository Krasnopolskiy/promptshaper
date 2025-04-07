/**
 * Placeholders Hook
 *
 * Custom hook to manage placeholder items for prompt templates
 *
 * @module hooks/usePlaceholders
 */
import {useCallback, useEffect, useState} from 'react';
import {Placeholder} from '@/types';

// Array of colors for placeholders
export const PLACEHOLDER_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#ec4899', // pink
  '#6366f1', // indigo
  '#14b8a6', // teal
  '#f97316', // orange
  '#84cc16', // lime
];

/**
 * Load saved placeholders from localStorage
 * @returns {Placeholder[]} Saved placeholders or empty array
 */
function loadSavedPlaceholders(): Placeholder[] {
  const saved = localStorage.getItem('promptGenerator_placeholders');
  return saved ? JSON.parse(saved) : [];
}

/**
 * Save placeholders to localStorage
 * @param {Placeholder[]} placeholders - Placeholders to save
 */
function savePlaceholders(placeholders: Placeholder[]): void {
  localStorage.setItem('promptGenerator_placeholders', JSON.stringify(placeholders));
}

/**
 * Create a new placeholder object
 * @param {string} name - Placeholder name
 * @param {string} content - Placeholder content
 * @param {string} color - Placeholder color
 * @returns {Placeholder} New placeholder object
 */
function createPlaceholder(name: string, content: string, color: string): Placeholder {
  return {
    id: crypto.randomUUID(),
    name,
    content,
    color,
    createdAt: Date.now(),
    mode: 'replace', // Default mode is 'replace'
  };
}

/**
 * Return type for the usePlaceholders hook
 */
export interface UsePlaceholdersReturn {
  placeholders: Placeholder[];
  addPlaceholder: (name: string, content: string, color: string) => void;
  updatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  deletePlaceholder: (id: string) => void;
  clearPlaceholders: () => void;
  setPlaceholders: React.Dispatch<React.SetStateAction<Placeholder[]>>;
}

/**
 * Hook for adding placeholders
 * @param {Function} setPlaceholders State setter
 * @returns Add function
 */
function useAddPlaceholder(
  setPlaceholders: React.Dispatch<React.SetStateAction<Placeholder[]>>
): (name: string, content: string, color: string) => void {
  return useCallback((name: string, content: string, color: string) => {
    setPlaceholders(prev => [...prev, createPlaceholder(name, content, color)]);
  }, [setPlaceholders]);
}

/**
 * Hook for updating placeholders
 * @param {Function} setPlaceholders State setter
 * @returns Update function
 */
function useUpdatePlaceholder(
  setPlaceholders: React.Dispatch<React.SetStateAction<Placeholder[]>>
): (id: string, updates: Partial<Placeholder>) => void {
  return useCallback((id: string, updates: Partial<Placeholder>) => {
    setPlaceholders(prev =>
      prev.map(p => p.id === id ? {...p, ...updates} : p)
    );
  }, [setPlaceholders]);
}

/**
 * Hook for deleting placeholders
 * @param {Function} setPlaceholders State setter
 * @returns Delete function
 */
function useDeletePlaceholder(
  setPlaceholders: React.Dispatch<React.SetStateAction<Placeholder[]>>
): (id: string) => void {
  return useCallback((id: string) => {
    setPlaceholders(prev => prev.filter(p => p.id !== id));
  }, [setPlaceholders]);
}

/**
 * Hook for clearing all placeholders
 * @param {Function} setPlaceholders State setter
 * @returns Clear function
 */
function useClearPlaceholders(
  setPlaceholders: React.Dispatch<React.SetStateAction<Placeholder[]>>
): () => void {
  return useCallback(() => {
    setPlaceholders([]);
    localStorage.removeItem('promptGenerator_placeholders');
  }, [setPlaceholders]);
}

/**
 * Hook to create placeholder state
 * @returns {[Placeholder[], React.Dispatch<React.SetStateAction<Placeholder[]>>]} State and setter
 */
function usePlaceholderState(): [
  Placeholder[],
  React.Dispatch<React.SetStateAction<Placeholder[]>>
] {
  const [placeholders, setPlaceholders] = useState<Placeholder[]>(loadSavedPlaceholders);

  // Auto-save when placeholders change
  useEffect(() => {
    savePlaceholders(placeholders);
  }, [placeholders]);

  return [placeholders, setPlaceholders];
}

/**
 * Custom hook for creating placeholder add and update handlers
 * @param {Function} setPlaceholders State setter
 * @returns Add and update handlers
 */
function useAddUpdateHandlers(
  setPlaceholders: React.Dispatch<React.SetStateAction<Placeholder[]>>
): Pick<UsePlaceholdersReturn, 'addPlaceholder' | 'updatePlaceholder'> {
  return {
    addPlaceholder: useAddPlaceholder(setPlaceholders),
    updatePlaceholder: useUpdatePlaceholder(setPlaceholders)
  };
}

/**
 * Custom hook for creating placeholder delete and clear handlers
 * @param {Function} setPlaceholders State setter
 * @returns Delete and clear handlers
 */
function useDeleteClearHandlers(
  setPlaceholders: React.Dispatch<React.SetStateAction<Placeholder[]>>
): Pick<UsePlaceholdersReturn, 'deletePlaceholder' | 'clearPlaceholders'> {
  return {
    deletePlaceholder: useDeletePlaceholder(setPlaceholders),
    clearPlaceholders: useClearPlaceholders(setPlaceholders)
  };
}

/**
 * Combine handlers for return object
 * @param {object} addUpdate Add/update handlers
 * @param {object} deleteClear Delete/clear handlers
 * @returns {Pick<UsePlaceholdersReturn, 'addPlaceholder' | 'updatePlaceholder' | 'deletePlaceholder' | 'clearPlaceholders'>} Combined handlers
 */
function combineHandlers(
  addUpdate: Pick<UsePlaceholdersReturn, 'addPlaceholder' | 'updatePlaceholder'>,
  deleteClear: Pick<UsePlaceholdersReturn, 'deletePlaceholder' | 'clearPlaceholders'>
): Pick<UsePlaceholdersReturn, 'addPlaceholder' | 'updatePlaceholder' | 'deletePlaceholder' | 'clearPlaceholders'> {
  return { ...addUpdate, ...deleteClear };
}

/**
 * Helper function to create the full return object
 * @param {Placeholder[]} placeholders Placeholders
 * @param {Function} setPlaceholders Set function
 * @param {object} addUpdate Add/update handlers
 * @param {object} deleteClear Delete/clear handlers
 * @returns {UsePlaceholdersReturn} Full return object
 */
function createReturnObject(
  placeholders: Placeholder[],
  setPlaceholders: React.Dispatch<React.SetStateAction<Placeholder[]>>,
  addUpdate: Pick<UsePlaceholdersReturn, 'addPlaceholder' | 'updatePlaceholder'>,
  deleteClear: Pick<UsePlaceholdersReturn, 'deletePlaceholder' | 'clearPlaceholders'>
): UsePlaceholdersReturn {
  const handlers = combineHandlers(addUpdate, deleteClear);
  return { placeholders, setPlaceholders, ...handlers };
}

/**
 * Custom hook for managing placeholders
 * @returns {UsePlaceholdersReturn} Placeholder state and handlers
 */
export function usePlaceholders(): UsePlaceholdersReturn {
  const [placeholders, setPlaceholders] = usePlaceholderState();
  const addUpdate = useAddUpdateHandlers(setPlaceholders);
  const deleteClear = useDeleteClearHandlers(setPlaceholders);
  return createReturnObject(placeholders, setPlaceholders, addUpdate, deleteClear);
}
