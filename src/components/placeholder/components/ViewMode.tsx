import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ViewModeProps {
  content: string;
  handleInsert?: () => void;
}

/**
 * Displays the placeholder content in a formatted container
 * @description Renders the content text in a bordered container with proper formatting
 * @param {Object} root0 - Component props
 * @param {string} root0.content - The content text to display
 * @returns {JSX.Element} The formatted content display element
 */
function ContentDisplay({ content }: { content: string }): JSX.Element {
  return (
    <div className="relative rounded border border-border bg-card/50 p-2">
      <div className="whitespace-pre-wrap text-sm">
        {content || <span className="text-muted-foreground italic">No content</span>}
      </div>
    </div>
  );
}

// Button props type
type InsertButtonProps = {
  handleInsert: () => void;
};

// Button styles for the insert button
const insertButtonProps = {
  size: "sm" as const,
  variant: "outline" as const,
  className: "mt-2 h-8 w-full text-xs"
};

/**
 * Button component for inserting placeholder content into the prompt
 * @description Renders an insert button with a plus icon
 * @param {Object} root0 - Component props
 * @param {Function} root0.handleInsert - Function to call when insert button is clicked
 * @returns {JSX.Element} The rendered insert button
 */
function InsertButton({ handleInsert }: InsertButtonProps): JSX.Element {
  return (
    <Button {...insertButtonProps} onClick={handleInsert}>
      <Plus className="mr-1 h-3 w-3" /> Insert in prompt
    </Button>
  );
}

/**
 * Component for displaying placeholder content in view mode
 * @description Provides a UI to view placeholder content and insert it if needed
 * @param {Object} props - Component props
 * @param {string} props.content - The content to display
 * @param {Function} [props.handleInsert] - Optional function to handle insert action
 * @returns {JSX.Element} The rendered view mode component
 */
export function ViewMode(props: ViewModeProps): JSX.Element {
  const { content, handleInsert } = props;
  return (
    <>
      <ContentDisplay content={content} />
      {handleInsert && <InsertButton handleInsert={handleInsert} />}
    </>
  );
}
