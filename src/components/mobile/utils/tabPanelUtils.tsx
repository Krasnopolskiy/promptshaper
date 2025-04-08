/**
 * Tab Panel Utilities
 *
 * Utility functions for tab panels
 *
 * @module components/mobile/utils/tabPanelUtils
 */
import React from 'react';
import { PanelType } from '../TabNavigation';
import {
  PlaceholdersTabPanel,
  EditorTabPanel,
  PreviewTabPanel,
  MobilePanelContentProps
} from '../TabPanels';

/**
 * Renders the Placeholders panel
 * @param {MobilePanelContentProps} props - Panel props
 * @returns {JSX.Element} Placeholders panel
 */
function renderPlaceholdersPanel(props: MobilePanelContentProps): JSX.Element {
  return (
    <PlaceholdersTabPanel
      placeholders={props.placeholders}
      onAddPlaceholder={props.onAddPlaceholder}
      onUpdatePlaceholder={props.onUpdatePlaceholder}
      onDeletePlaceholder={props.onDeletePlaceholder}
      onInsertPlaceholderFromPanel={props.onInsertPlaceholderFromPanel}
      onPlaceholderNameChange={props.onPlaceholderNameChange}
    />
  );
}

/**
 * Renders the Editor panel
 * @param {MobilePanelContentProps} props - Panel props
 * @returns {JSX.Element} Editor panel
 */
function renderEditorPanel(props: MobilePanelContentProps): JSX.Element {
  return (
    <EditorTabPanel
      promptText={props.promptText}
      setPromptText={props.setPromptText}
      placeholders={props.placeholders}
      onInsertPlaceholderAtPosition={props.onInsertPlaceholderAtPosition}
    />
  );
}

/**
 * Renders the Preview panel
 * @param {MobilePanelContentProps} props - Panel props
 * @returns {JSX.Element} Preview panel
 */
function renderPreviewPanel(props: MobilePanelContentProps): JSX.Element {
  return (
    <PreviewTabPanel
      fullPrompt={props.fullPrompt}
      onCopyPrompt={props.onCopyPrompt}
      placeholders={props.placeholders}
    />
  );
}

/**
 * Returns the active panel component based on panel type
 *
 * @param {PanelType} activePanel - Currently active panel type
 * @param {MobilePanelContentProps} props - Panel content props
 * @returns {JSX.Element} Active panel component
 */
export function getActivePanel(
  activePanel: PanelType,
  props: MobilePanelContentProps
): JSX.Element {
  switch (activePanel) {
    case 'placeholders':
      return renderPlaceholdersPanel(props);
    case 'editor':
      return renderEditorPanel(props);
    case 'preview':
      return renderPreviewPanel(props);
    default:
      return renderEditorPanel(props);
  }
}
