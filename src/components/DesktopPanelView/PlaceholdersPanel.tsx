/**
 * Placeholders Panel Component
 *
 * Renders the placeholders panel
 *
 * @module components/DesktopPanelView/PlaceholdersPanel
 */
import { PlaceholderPanel } from '@/components/PlaceholderPanel';
import { DesktopPanelViewProps } from '../DesktopPanelView';

/**
 * Renders the Placeholders panel
 * @param {Object} props - Component props
 * @param {Placeholder[]} props.placeholders - Array of placeholder objects
 * @param {Function} props.onAddPlaceholder - Handler for adding new placeholders
 * @param {Function} props.onUpdatePlaceholder - Handler for updating placeholders
 * @param {Function} props.onDeletePlaceholder - Handler for deleting placeholders
 * @param {Function} props.onInsertPlaceholderFromPanel - Handler for inserting placeholders from panel
 * @param {Function} props.onPlaceholderNameChange - Handler for placeholder name changes
 * @returns {JSX.Element} The rendered Placeholders panel
 */
export function PlaceholdersPanel({ placeholders, onAddPlaceholder, onUpdatePlaceholder, onDeletePlaceholder, onInsertPlaceholderFromPanel, onPlaceholderNameChange }: Partial<DesktopPanelViewProps>): JSX.Element {
  return (
    <PlaceholderPanel
      placeholders={placeholders}
      onAddPlaceholder={onAddPlaceholder}
      onUpdatePlaceholder={onUpdatePlaceholder}
      onDeletePlaceholder={onDeletePlaceholder}
      onInsertPlaceholder={onInsertPlaceholderFromPanel}
      onPlaceholderNameChange={onPlaceholderNameChange}
    />
  );
}
