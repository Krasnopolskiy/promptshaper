import {Placeholder} from '@/types';
import {ManageTabHeader} from './ManageTabHeader';
import {ManageTabBody} from './ManageTabBody';

/**
 * Props for the manage tab content
 */
export interface ManageTabContentProps {
  placeholders: Placeholder[];
  onUpdatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  onDeletePlaceholder: (id: string) => void;
  onInsertPlaceholder?: (name: string) => void;
  onPlaceholderNameChange?: (oldName: string, newName: string) => void;
}

/**
 * Renders the content of the manage tab
 * @param {ManageTabContentProps} props - Component properties
 * @returns {JSX.Element} The manage tab content
 */
export function ManageTabContent(props: ManageTabContentProps): JSX.Element {
  return <ManageTabLayout {...props} />;
}

/**
 * Renders the manage tab layout
 * @param {ManageTabContentProps} props - Component properties
 * @returns {JSX.Element} The manage tab layout
 */
function ManageTabLayout(props: ManageTabContentProps): JSX.Element {
  return (
    <>
      <ManageTabHeader count={props.placeholders.length} />
      <ManageTabBody {...props} />
    </>
  );
}
