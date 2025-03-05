
import { useState, useCallback, useEffect } from 'react';
import { Placeholder } from '@/types';

export function usePrompt() {
  const [promptText, setPromptText] = useState<string>(() => {
    const saved = localStorage.getItem('promptGenerator_promptText');
    return saved || '';
  });
  
  useEffect(() => {
    localStorage.setItem('promptGenerator_promptText', promptText);
  }, [promptText]);

  const generateFullPrompt = useCallback((promptText: string, placeholders: Placeholder[]) => {
    if (placeholders.length === 0) return promptText;
    
    // Create the beginning part with placeholder references
    const placeholderRefs = placeholders
      .map(p => `<${p.name}></${p.name}>`)
      .join(', ');
    
    const beginningPart = placeholders.length > 0 ? `Write in style ${placeholderRefs}, ` : '';
    
    // Create the ending part with full placeholders
    const endingPart = placeholders
      .map(p => `<${p.name}>${p.content}</${p.name}>`)
      .join('\n');
    
    return `${beginningPart}${promptText}\n\n${endingPart}`;
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  }, []);

  return {
    promptText,
    setPromptText,
    generateFullPrompt,
    copyToClipboard
  };
}
