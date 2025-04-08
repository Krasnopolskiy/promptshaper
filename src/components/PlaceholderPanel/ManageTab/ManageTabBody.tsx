import {ScrollArea} from '@/components/ui/scroll-area';
import {PlaceholderList} from './PlaceholderList';
import {ManageTabContentProps} from './index';

/**
 * Renders the body content for the manage tab
 * @param {ManageTabContentProps} props - Component properties
 * @returns {JSX.Element} The manage tab body
 */
export function ManageTabBody(props: ManageTabContentProps): JSX.Element {
  return (
    <div className="flex-1 overflow-auto">
      <ScrollArea className="h-[calc(100vh-250px)]">
        <ListContainer {...props} />
      </ScrollArea>
    </div>
  );
}

/**
 * Renders the container for the placeholder list
 * @param {ManageTabContentProps} props - Component properties
 * @returns {JSX.Element} The list container
 */
function ListContainer(props: ManageTabContentProps): JSX.Element {
  return (
    <div className="space-y-3 p-4">
      <PlaceholderList {...props} />
    </div>
  );
}
