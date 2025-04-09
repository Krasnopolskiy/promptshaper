/**
 * Placeholders Panel Component
 *
 * Renders the placeholders panel
 *
 * @module components/DesktopPanelView/PlaceholdersPanel
 */
import { PlaceholderPanel } from '@/components/PlaceholderPanel';
import { DesktopPanelViewProps } from './types';

/**
 * Renders the Placeholders panel
 * @param {DesktopPanelViewProps} props - Component props
 * @returns {JSX.Element} PlaceholdersPanel component
 */
export function PlaceholdersPanel({
  placeholders,
  onAddPlaceholder,
  onUpdatePlaceholder,
  onDeletePlaceholder,
  onInsertPlaceholderFromPanel,
  onPlaceholderNameChange,
}: DesktopPanelViewProps): JSX.Element {
  return <PlaceholderPanel placeholders={placeholders} onAddPlaceholder={onAddPlaceholder} onUpdatePlaceholder={onUpdatePlaceholder} onDeletePlaceholder={onDeletePlaceholder} onInsertPlaceholder={onInsertPlaceholderFromPanel} onPlaceholderNameChange={onPlaceholderNameChange} />;
}
