
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

export function usePlaceholders() {
  const [placeholders, setPlaceholders] = useState<Placeholder[]>(() => {
    const saved = localStorage.getItem('promptGenerator_placeholders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('promptGenerator_placeholders', JSON.stringify(placeholders));
  }, [placeholders]);

  const addPlaceholder = useCallback((name: string, content: string, color: string) => {
    setPlaceholders(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        content,
        color,
        createdAt: Date.now(),
        mode: 'replace', // Default mode is 'replace'
      },
    ]);
  }, []);

  const updatePlaceholder = useCallback((id: string, updates: Partial<Placeholder>) => {
    setPlaceholders(prev =>
      prev.map(placeholder =>
        placeholder.id === id ? {...placeholder, ...updates} : placeholder
      )
    );
  }, []);

  const deletePlaceholder = useCallback((id: string) => {
    setPlaceholders(prev => prev.filter(placeholder => placeholder.id !== id));
  }, []);

  const clearPlaceholders = useCallback(() => {
    setPlaceholders([]);
    localStorage.removeItem('promptGenerator_placeholders');
  }, []);

  return {
    placeholders,
    addPlaceholder,
    updatePlaceholder,
    deletePlaceholder,
    clearPlaceholders,
    setPlaceholders,
  };
}
