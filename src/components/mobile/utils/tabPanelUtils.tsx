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
 * Creates props for placeholders panel
 * @param {MobilePanelContentProps} props - Panel props
 * @returns {Object} Placeholders panel props
 */
function createPlaceholderPanelProps(props: MobilePanelContentProps): Omit<React.ComponentProps<typeof PlaceholdersTabPanel>, 'ref'> {
  return {
    placeholders: props.placeholders,
    onAddPlaceholder: props.onAddPlaceholder,
    onUpdatePlaceholder: props.onUpdatePlaceholder,
    onDeletePlaceholder: props.onDeletePlaceholder,
    onInsertPlaceholderFromPanel: props.onInsertPlaceholderFromPanel,
    onPlaceholderNameChange: props.onPlaceholderNameChange
  };
}

/**
 * Renders the Placeholders panel
 * @param {MobilePanelContentProps} props - Panel props
 * @returns {JSX.Element} Placeholders panel
 */
function renderPlaceholdersPanel(props: MobilePanelContentProps): JSX.Element {
  const panelProps = createPlaceholderPanelProps(props);
  return <PlaceholdersTabPanel {...panelProps} />;
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
 * Handles placeholders panel rendering
 * @param {MobilePanelContentProps} props - Panel content props
 * @returns {JSX.Element} Placeholders panel
 */
function handlePlaceholdersPanel(props: MobilePanelContentProps): JSX.Element {
  return renderPlaceholdersPanel(props);
}

/**
 * Handles editor panel rendering
 * @param {MobilePanelContentProps} props - Panel content props
 * @returns {JSX.Element} Editor panel
 */
function handleEditorPanel(props: MobilePanelContentProps): JSX.Element {
  return renderEditorPanel(props);
}

/**
 * Handles preview panel rendering
 * @param {MobilePanelContentProps} props - Panel content props
 * @returns {JSX.Element} Preview panel
 */
function handlePreviewPanel(props: MobilePanelContentProps): JSX.Element {
  return renderPreviewPanel(props);
}

/**
 * Maps panel type to panel handler function
 * @param {PanelType} panelType - Panel type
 * @returns {(props: MobilePanelContentProps) => JSX.Element} Panel handler function
 */
function getPanelHandler(panelType: PanelType): (props: MobilePanelContentProps) => JSX.Element {
  const handlers = {
    placeholders: handlePlaceholdersPanel,
    editor: handleEditorPanel,
    preview: handlePreviewPanel
  };

  return handlers[panelType] || handleEditorPanel;
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
  const handler = getPanelHandler(activePanel);
  return handler(props);
}
