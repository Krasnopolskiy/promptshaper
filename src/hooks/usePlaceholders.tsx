
import { useState, useCallback, useEffect } from 'react';
import { Placeholder, PlaceholderCategory } from '@/types';

export function usePlaceholders() {
  const [placeholders, setPlaceholders] = useState<Placeholder[]>(() => {
    const saved = localStorage.getItem('promptGenerator_placeholders');
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('promptGenerator_placeholders', JSON.stringify(placeholders));
  }, [placeholders]);

  const addPlaceholder = useCallback((name: string, content: string, category: PlaceholderCategory = 'other') => {
    setPlaceholders(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        content,
        category,
        createdAt: Date.now()
      }
    ]);
  }, []);

  const updatePlaceholder = useCallback((id: string, updates: Partial<Placeholder>) => {
    setPlaceholders(prev => 
      prev.map(placeholder => 
        placeholder.id === id ? { ...placeholder, ...updates } : placeholder
      )
    );
  }, []);

  const deletePlaceholder = useCallback((id: string) => {
    setPlaceholders(prev => prev.filter(placeholder => placeholder.id !== id));
  }, []);

  const clearPlaceholders = useCallback(() => {
    setPlaceholders([]);
  }, []);

  return {
    placeholders,
    addPlaceholder,
    updatePlaceholder,
    deletePlaceholder,
    clearPlaceholders,
    setPlaceholders
  };
}
