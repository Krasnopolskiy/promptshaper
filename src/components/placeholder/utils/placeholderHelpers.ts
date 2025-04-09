/**
 * Helper functions for placeholder components
 *
 * @module components/placeholder/utils/placeholderHelpers
 */
import { Placeholder } from '@/types';

/**
 * Basic payload with name and content
 * @interface BasicPayload
 */
interface BasicPayload {
  /** Name value */
  name: string;
  /** Content value */
  content: string;
}

/**
 * Creates name and content payload for placeholder update
 * @param {string} newName - New name value
 * @param {string} newContent - New content value
 * @returns {BasicPayload} Basic payload
 */
export function createBasicPayload(
  newName: string,
  newContent: string
): BasicPayload {
  return {
    name: newName,
    content: newContent
  };
}

/**
 * Creates update payload for the placeholder
 * @param {string} newName - New name value
 * @param {string} newContent - New content value
 * @param {string} selectedColor - Selected color value
 * @returns {Partial<Placeholder>} Update payload
 */
export function createUpdatePayload(
  newName: string,
  newContent: string,
  selectedColor: string
): Partial<Placeholder> {
  return {
    ...createBasicPayload(newName, newContent),
    color: selectedColor
  };
}

/**
 * Mode description getter
 * @param {string} mode - Current mode
 * @returns {string} Description text
 */
export function getModeDescription(mode: string): string {
  return mode === 'replace'
    ? "Replace Mode: Placeholder will be replaced with its content"
    : "Tag Mode: Content will be displayed between opening and closing tags";
}

/**
 * Handle name change notification
 * @param {string} oldName - Old placeholder name
 * @param {string} newName - New placeholder name
 * @param {Function|undefined} onNameChange - Name change callback
 * @returns {void} Nothing
 */
export function handleNameChangeNotification(
  oldName: string,
  newName: string,
  onNameChange?: (oldName: string, newName: string) => void
): void {
  if (newName !== oldName && onNameChange) {
    onNameChange(oldName, newName);
  }
}

/**
 * Creates a state update for save operation
 * @param {Placeholder} placeholder - Placeholder data
 * @param {string} newName - New name value
 * @param {Function|undefined} onNameChange - Name change callback
 * @returns {void} Nothing
 */
export function handleNameUpdateIfChanged(
  placeholder: Placeholder,
  newName: string,
  onNameChange?: (oldName: string, newName: string) => void
): void {
  handleNameChangeNotification(placeholder.name, newName, onNameChange);
}

/**
 * Creates a mode toggle handler
 * @param {Placeholder} placeholder - Placeholder data
 * @param {Function} onUpdate - Update function
 * @returns {Function} Mode toggle handler
 */
export function createModeToggler(
  placeholder: Placeholder,
  onUpdate: (id: string, updates: Partial<Placeholder>) => void
): () => void {
  return (): void => {
    const currentMode = placeholder.mode || 'replace';
    const newMode = currentMode === 'replace' ? 'tag' : 'replace';
    onUpdate(placeholder.id, { mode: newMode });
  };
}
