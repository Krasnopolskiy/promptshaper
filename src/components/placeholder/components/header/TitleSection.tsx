/**
 * Title Section Component
 *
 * Renders the title section of a placeholder card header
 *
 * @module components/placeholder/components/header/TitleSection
 */
import React from 'react';
import { Placeholder } from '@/types';
import { ModeIndicator } from '../ModeIndicator';

/**
 * Props for TitleSection component
 * @interface TitleSectionProps
 */
interface TitleSectionProps {
  /** Placeholder data */
  placeholder: Placeholder;
  /** Current mode */
  mode: string;
  /** Toggle expand handler */
  onToggleExpand: () => void;
}

/**
 * Creates the color indicator element
 * @param {string} color - Color value
 * @returns {JSX.Element} Color indicator element
 */
function createColorIndicator(color: string): JSX.Element {
  return <div className="h-4 w-4 rounded-full" style={{backgroundColor: color}} />;
}

/**
 * Creates the title text element
 * @param {string} name - Placeholder name
 * @param {string} mode - Current mode
 * @returns {JSX.Element} Title text element
 */
function createTitleText(name: string, mode: string): JSX.Element {
  return <h3 className="flex-1 font-medium group">{name}<ModeIndicator mode={mode} /></h3>;
}

/**
 * Creates title content elements
 * @param {Placeholder} placeholder - Placeholder data
 * @param {string} mode - Current mode
 * @returns {React.ReactNode[]} Title content elements
 */
function createTitleContent(placeholder: Placeholder, mode: string): React.ReactNode[] {
  return [
    createColorIndicator(placeholder.color),
    createTitleText(placeholder.name, mode)
  ];
}

/**
 * Renders the title section of a placeholder card header
 * @param {TitleSectionProps} props - Component props
 * @returns {JSX.Element} Title section
 */
export function TitleSection(props: TitleSectionProps): JSX.Element {
  const { placeholder, mode, onToggleExpand } = props;
  const content = createTitleContent(placeholder, mode);

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={onToggleExpand}>
      {content}
    </div>
  );
}
