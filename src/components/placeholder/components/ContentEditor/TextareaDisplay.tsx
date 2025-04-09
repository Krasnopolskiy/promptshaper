/**
 * Textarea Display
 *
 * Components for textarea display in the ContentEditor
 *
 * @module components/placeholder/components/ContentEditor/TextareaDisplay
 */
import React from 'react';
import { Edit, ChevronRight } from 'lucide-react';

/**
 * Creates edit icon
 * @returns {JSX.Element} Edit icon
 */
export const createEditIcon = (): JSX.Element => (
  <Edit key="edit" className="h-4 w-4" />
);

/**
 * Creates chevron icon
 * @returns {JSX.Element} Chevron icon
 */
export const createChevronIcon = (): JSX.Element => (
  <ChevronRight key="chevron" className="ml-2 h-4 w-4" />
);

/**
 * Creates control icon components
 * @param {Object} params - Parameters object
 * @param {boolean} params.isEditing - Whether in edit mode
 * @returns {JSX.Element[]} Icon components
 */
export const createControlIcons = ({
  isEditing
}: {
  isEditing: boolean;
}): JSX.Element[] => {
  if (isEditing) return [];
  return [createEditIcon(), createChevronIcon()];
};

/**
 * Creates the icon container element
 * @param {Object} params - Parameters object
 * @param {boolean} params.isEditing - Whether in edit mode
 * @returns {JSX.Element} Icon container element
 */
export const createIconContainer = ({
  isEditing
}: {
  isEditing: boolean;
}): JSX.Element => (
  <div className="flex items-center text-muted-foreground">
    {createControlIcons({ isEditing })}
  </div>
);

/**
 * Creates the text content display
 * @param {Object} params - Parameters object
 * @param {string} params.value - Text value
 * @returns {JSX.Element} Text content element
 */
export const createTextContent = ({
  value
}: {
  value: string;
}): JSX.Element => (
  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
    {value || "Empty content"}
  </span>
);

/**
 * Creates a wrapper element for the text display
 * @param {Object} params - Parameters object
 * @param {React.ReactNode} params.children - Child elements
 * @returns {JSX.Element} Wrapper element
 */
export const createDisplayWrapper = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <div className="flex items-center justify-between rounded-md border border-input bg-transparent p-2 text-sm shadow-sm">
    {children}
  </div>
);

/**
 * Creates the display content
 * @param {Object} params - Parameters object
 * @param {string} params.value - Text value
 * @param {boolean} params.isEditing - Whether in edit mode
 * @returns {JSX.Element} The display content
 */
const createDisplayContent = ({
  value,
  isEditing
}: {
  value: string;
  isEditing: boolean;
}): JSX.Element => (
  <>{createTextContent({ value })}{createIconContainer({ isEditing })}</>
);

/**
 * Creates the non-editing text display
 * @param {Object} params - Parameters object
 * @param {string} params.value - Text value
 * @param {boolean} params.isEditing - Whether in edit mode
 * @returns {JSX.Element | null} The text display component
 */
export const createTextDisplay = ({
  value,
  isEditing
}: {
  value: string;
  isEditing: boolean;
}): JSX.Element | null => {
  if (isEditing) return null;
  return createDisplayWrapper({ children: createDisplayContent({ value, isEditing }) });
};
