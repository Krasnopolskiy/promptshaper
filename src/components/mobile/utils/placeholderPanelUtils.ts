/**
 * Placeholder Panel Utilities
 *
 * Utility functions for placeholder panel components
 *
 * @module components/mobile/utils/placeholderPanelUtils
 */
import { Placeholder } from '@/types';

/**
 * Type for basic placeholder props
 */
type BasicPlaceholderProps = {
  placeholders: Placeholder[];
  onAddPlaceholder: (name: string, content: string, color: string) => void;
  onUpdatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  onDeletePlaceholder: (id: string) => void;
};

/**
 * Type for insertion props
 */
type InsertionProps = {
  onInsertPlaceholder: (name: string) => void;
  onPlaceholderNameChange: (oldName: string, newName: string) => void;
};

/**
 * Type for final panel props
 */
type FinalPanelProps = BasicPlaceholderProps & InsertionProps;

/**
 * Placeholders tab panel props
 * @interface PlaceholdersTabPanelProps
 */
export interface PlaceholdersTabPanelProps {
  /** Array of placeholder objects */
  placeholders: Placeholder[];
  /** Function to add a new placeholder */
  onAddPlaceholder: (name: string, content: string, color: string) => void;
  /** Function to update an existing placeholder */
  onUpdatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  /** Function to delete a placeholder */
  onDeletePlaceholder: (id: string) => void;
  /** Function to insert a placeholder from the panel */
  onInsertPlaceholderFromPanel: (name: string) => void;
  /** Function to handle placeholder name changes */
  onPlaceholderNameChange: (oldName: string, newName: string) => void;
}

/**
 * Extracts basic placeholder props from the panel props
 * @param {PlaceholdersTabPanelProps} props - Panel properties
 * @returns {Object} Basic placeholder props
 */
export function extractBasicPlaceholderProps(props: PlaceholdersTabPanelProps): BasicPlaceholderProps {
  const { placeholders, onAddPlaceholder, onUpdatePlaceholder, onDeletePlaceholder } = props;
  return { placeholders, onAddPlaceholder, onUpdatePlaceholder, onDeletePlaceholder };
}

/**
 * Extracts insertion and name change props from the panel props
 * @param {PlaceholdersTabPanelProps} props - Panel properties
 * @returns {Object} Insertion and name change props
 */
export function extractInsertionProps(props: PlaceholdersTabPanelProps): {
  onInsertPlaceholderFromPanel: (name: string) => void;
  onPlaceholderNameChange: (oldName: string, newName: string) => void;
} {
  const { onInsertPlaceholderFromPanel, onPlaceholderNameChange } = props;
  return { onInsertPlaceholderFromPanel, onPlaceholderNameChange };
}

/**
 * Creates the insertion props for the final panel
 * @param {Object} insertionProps - Insertion and name change props
 * @returns {Object} Insertion props for final panel
 */
function createInsertionPropsForPanel(
  insertionProps: ReturnType<typeof extractInsertionProps>
): InsertionProps {
  return {
    onInsertPlaceholder: insertionProps.onInsertPlaceholderFromPanel,
    onPlaceholderNameChange: insertionProps.onPlaceholderNameChange
  };
}

/**
 * Merges basic and insertion props for the final panel
 * @param {Object} basicProps - Basic placeholder props
 * @param {Object} insertionProps - Insertion props for panel
 * @returns {Object} Merged props for final panel
 */
function mergePanelProps(
  basicProps: BasicPlaceholderProps,
  insertionProps: InsertionProps
): FinalPanelProps {
  return { ...basicProps, ...insertionProps };
}

/**
 * Creates the final panel props object
 * @param {Object} basicProps - Basic placeholder props
 * @param {Object} insertionProps - Insertion and name change props
 * @returns {Object} Final panel props
 */
export function createFinalPanelProps(
  basicProps: ReturnType<typeof extractBasicPlaceholderProps>,
  insertionProps: ReturnType<typeof extractInsertionProps>
): ReturnType<typeof mergePanelProps> {
  const panelInsertionProps = createInsertionPropsForPanel(insertionProps);
  return mergePanelProps(basicProps, panelInsertionProps);
}

/**
 * Combines basic and insertion props for the PlaceholderPanel
 * @param {Object} basicProps - Basic placeholder props
 * @param {Object} insertionProps - Insertion and name change props
 * @returns {Object} Combined props for PlaceholderPanel
 */
export function combinePanelProps(
  basicProps: ReturnType<typeof extractBasicPlaceholderProps>,
  insertionProps: ReturnType<typeof extractInsertionProps>
): ReturnType<typeof createFinalPanelProps> {
  return createFinalPanelProps(basicProps, insertionProps);
}

/**
 * Creates props for the PlaceholderPanel component
 * @param {PlaceholdersTabPanelProps} props - Panel properties
 * @returns {Object} Props for PlaceholderPanel
 */
export function createPlaceholderPanelProps(props: PlaceholdersTabPanelProps): ReturnType<typeof combinePanelProps> {
  const basicProps = extractBasicPlaceholderProps(props);
  const insertionProps = extractInsertionProps(props);
  return combinePanelProps(basicProps, insertionProps);
}
