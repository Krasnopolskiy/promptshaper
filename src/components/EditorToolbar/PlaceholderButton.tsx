/**
 * PlaceholderButton Component
 *
 * Button for a single placeholder in the list
 *
 * @module components/EditorToolbar/PlaceholderButton
 */
import { Button } from '@/components/ui/button';
import { Placeholder } from '@/types';

/**
 * PlaceholderButton component props
 * @interface PlaceholderButtonProps
 */
interface PlaceholderButtonProps {
  /** Placeholder data */
  placeholder: Placeholder;
  /** Insert placeholder handler */
  handleInsertPlaceholder: (name: string) => void;
}

/**
 * Renders a button for a single placeholder
 * @param {PlaceholderButtonProps} props - Component props
 * @returns {JSX.Element} The placeholder button component
 */
export function PlaceholderButton({ placeholder, handleInsertPlaceholder }: PlaceholderButtonProps): JSX.Element {
  return <Button variant="ghost" size="sm" className="justify-start font-normal" onClick={() => handleInsertPlaceholder(placeholder.name)}>
    <span className="mr-2 h-2 w-2 rounded-full" style={{backgroundColor: placeholder.color}} />
    {placeholder.name}
  </Button>;
}
