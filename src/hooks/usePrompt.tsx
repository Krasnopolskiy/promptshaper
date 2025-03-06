
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
    
    // For each placeholder, include just the name tag in the main prompt section
    const placeholderTags = placeholders
      .map(p => `<${p.name}>`)
      .join(' ');
    
    // Full placeholders with content for the bottom section
    const fullPlaceholders = placeholders
      .map(p => `<${p.name}>${p.content}</${p.name}>`)
      .join('\n');
    
    // Combine prompt with placeholders
    return `${promptText} ${placeholderTags}\n\n${fullPlaceholders}`;
  }, []);

  const insertPlaceholderTag = useCallback((name: string, cursorPosition: number) => {
    const tag = `<${name}>`;
    const newText = 
      promptText.substring(0, cursorPosition) +
      tag +
      promptText.substring(cursorPosition);
    
    setPromptText(newText);
    
    // Return the new cursor position (after the inserted tag)
    return cursorPosition + tag.length;
  }, [promptText]);

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
    insertPlaceholderTag,
    copyToClipboard
  };
}
