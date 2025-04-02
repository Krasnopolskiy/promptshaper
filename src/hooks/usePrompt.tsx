
import {useCallback, useState} from 'react';
import {Placeholder} from '@/types';

export function usePrompt() {
  const [promptText, setPromptText] = useState<string>(() => {
    const saved = localStorage.getItem('promptGenerator_prompt');
    return saved || '';
  });

  // Save promptText to localStorage whenever it changes
  const handleSetPromptText = useCallback((text: string) => {
    setPromptText(text);
    localStorage.setItem('promptGenerator_prompt', text);
  }, []);

  // Reset the prompt text to empty
  const resetPromptText = useCallback(() => {
    setPromptText('');
    localStorage.removeItem('promptGenerator_prompt');
  }, []);

  // Function to generate the full prompt by replacing placeholders with their values
  const generateFullPrompt = useCallback(
    (text: string, placeholders: Placeholder[]): string => {
      if (!text) return '';

      let fullPrompt = text;
      placeholders.forEach(placeholder => {
        const regex = new RegExp(`<${placeholder.name}>`, 'g');
        fullPrompt = fullPrompt.replace(regex, placeholder.content || `<${placeholder.name}>`);
      });

      return fullPrompt;
    },
    []
  );

  // Function to insert a placeholder tag at a specific position
  const insertPlaceholderTag = useCallback(
    (name: string, position: number): number => {
      if (position < 0) return -1;

      const tag = `<${name}>`;
      const newPrompt = [
        promptText.slice(0, position),
        tag,
        promptText.slice(position),
      ].join('');

      handleSetPromptText(newPrompt);
      return position + tag.length;
    },
    [promptText, handleSetPromptText]
  );

  // Function to update placeholder names in the prompt
  const updatePlaceholdersInPrompt = useCallback(
    (oldName: string, newName: string) => {
      // Update all instances of the placeholder in the prompt
      const regex = new RegExp(`<${oldName}>`, 'g');
      const updatedPrompt = promptText.replace(regex, `<${newName}>`);
      handleSetPromptText(updatedPrompt);
    },
    [promptText, handleSetPromptText]
  );

  // Function to copy text to clipboard
  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      return true;
    } catch (err) {
      console.error('Failed to copy text:', err);
      return false;
    }
  }, []);

  return {
    promptText,
    setPromptText: handleSetPromptText,
    resetPromptText,
    generateFullPrompt,
    insertPlaceholderTag,
    updatePlaceholdersInPrompt,
    copyToClipboard,
  };
}
