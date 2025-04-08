/**
 * Input Section Component
 *
 * Renders the input section of a placeholder card header
 *
 * @module components/placeholder/components/header/InputSection
 */
import React from 'react';
import { Input } from '@/components/ui/input';

/**
 * Props for InputSection component
 * @interface InputSectionProps
 */
export interface InputSectionProps {
  /** Current input value */
  value: string;
  /** Reference to the input element */
  inputRef: React.RefObject<HTMLInputElement>;
  /** Handler for value changes */
  onChange: (value: string) => void;
  /** Handler for keydown events */
  onKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Renders the input section of a placeholder card header
 * @param {InputSectionProps} props - Component props
 * @returns {JSX.Element} Input section
 */
export function InputSection({ value, inputRef, onChange, onKeyDown }: InputSectionProps): JSX.Element {
  return <Input ref={inputRef} value={value} onChange={e => onChange(e.target.value)} onKeyDown={onKeyDown} className="h-8 flex-1 text-sm" placeholder="Placeholder name" />;
}
