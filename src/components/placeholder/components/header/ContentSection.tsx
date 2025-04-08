/**
 * ContentSection Component
 *
 * Content section of the placeholder card header
 *
 * @module components/placeholder/components/header/ContentSection
 */
import React from 'react';
import { Placeholder } from '@/types';
import { TitleSection } from './TitleSection';
import { InputSection } from './InputSection';

/**
 * Props for the ContentSection component
 * @interface ContentSectionProps
 */
interface ContentSectionProps {
  /** Whether the card is currently being edited */
  isEditing: boolean;
  /** Placeholder data */
  placeholder: Placeholder;
  /** Current name value in edit mode */
  newName: string;
  /** Reference to input element */
  inputRef: React.RefObject<HTMLInputElement>;
  /** Function to handle keydown events */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** Function to handle name changes */
  setNewName: (name: string) => void;
  /** Function to toggle expand */
  toggleExpand: () => void;
}

/**
 * ContentSection component
 * @param {ContentSectionProps} props - Component props
 * @returns {JSX.Element} The rendered content section
 */
export function ContentSection(props: ContentSectionProps): JSX.Element {
  return props.isEditing ? (
    <InputSection
      value={props.newName}
      inputRef={props.inputRef}
      onChange={props.setNewName}
      onKeyDown={props.handleKeyDown}
    />
  ) : (
    <TitleSection
      placeholder={props.placeholder}
      mode={props.placeholder.mode || 'replace'}
      onToggleExpand={props.toggleExpand}
    />
  );
}
