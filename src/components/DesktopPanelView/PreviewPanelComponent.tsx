/**
 * Preview Panel Component
 *
 * Renders the preview panel
 *
 * @module components/DesktopPanelView/PreviewPanelComponent
 */
import { PreviewPanel } from '@/components/PreviewPanel/index';
import { DesktopPanelViewProps } from '../DesktopPanelView';

/**
 * Renders the Preview panel
 * @param {Object} props - Component props
 * @param {string} props.fullPrompt - Full prompt with placeholders resolved
 * @param {Function} props.onCopyPrompt - Handler for copying prompt
 * @param {Placeholder[]} props.placeholders - Array of placeholder objects
 * @returns {JSX.Element} The rendered Preview panel
 */
export function PreviewPanelComponent({ fullPrompt, onCopyPrompt, placeholders }: Partial<DesktopPanelViewProps>): JSX.Element {
  return (
    <PreviewPanel
      content={fullPrompt}
      onCopy={onCopyPrompt}
      placeholders={placeholders}
    />
  );
}
