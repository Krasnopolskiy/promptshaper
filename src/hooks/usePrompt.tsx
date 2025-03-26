import {useCallback, useEffect, useState} from 'react';
import {Placeholder} from '@/types';

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

    // Get all unique placeholders used in the prompt text
    // Updated regex to support non-Latin characters like Cyrillic
    const placeholderRegex = /<([\p{L}0-9]+)>/gu;
    const usedPlaceholderNames = new Set<string>();
    let match;

    while ((match = placeholderRegex.exec(promptText)) !== null) {
      usedPlaceholderNames.add(match[1]);
    }

    // Filter placeholders to those that are actually used in the text
    const usedPlaceholders = placeholders.filter(p => usedPlaceholderNames.has(p.name));

    // Generate full placeholders with proper newlines
    const fullPlaceholders = usedPlaceholders
      .map(p => {
        // Add newlines between tags and content for multiline content
        if (p.content.includes('\n') || p.content.length > 50) {
          return '<' + p.name + '>\n' + p.content + '\n</' + p.name + '>';
        }
        return '<' + p.name + '>' + p.content + '</' + p.name + '>';
      })
      .join('\n\n');

    // Return the prompt with placeholders section if we have any
    return usedPlaceholders.length > 0 ? promptText + '\n\n' + fullPlaceholders : promptText;
  }, []);

  const insertPlaceholderTag = useCallback(
    (name: string, cursorPosition: number) => {
      // Make sure we're inserting just the tag without any additional characters
      const tag = '<' + name + '>';
      const newText =
        promptText.substring(0, cursorPosition) + tag + promptText.substring(cursorPosition);

      setPromptText(newText);

      // Return the new cursor position (after the inserted tag)
      return cursorPosition + tag.length;
    },
    [promptText]
  );

  const updatePlaceholdersInPrompt = useCallback(
    (oldName: string, newName: string) => {
      if (oldName === newName) return;

      // Updated regex to support non-Latin characters like Cyrillic
      const pattern = new RegExp('<' + oldName + '>', 'gu');
      const closingPattern = new RegExp('</' + oldName + '>', 'gu');

      // Update both opening and closing tags
      let updatedPrompt = promptText.replace(pattern, '<' + newName + '>');
      updatedPrompt = updatedPrompt.replace(closingPattern, '</' + newName + '>');

      if (updatedPrompt !== promptText) {
        setPromptText(updatedPrompt);
      }
    },
    [promptText]
  );

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
    updatePlaceholdersInPrompt,
    copyToClipboard,
  };
}
