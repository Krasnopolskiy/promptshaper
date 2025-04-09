/**
 * Textarea Components
 *
 * Combined components for textarea functionality in the ContentEditor
 *
 * @module components/placeholder/components/ContentEditor/TextareaComponents
 */
import React from 'react';
import { TextareaControls } from './TextareaControls';
import {
  createTextareaInput,
  TextareaProps
} from './TextareaInput';

/**
 * Parameters for creating textarea content
 * @interface TextareaContentParams
 */
export interface TextareaContentParams {
  /** Props for the textarea element */
  textareaProps: TextareaProps;
  /** Whether in editing mode */
  isEditing: boolean;
  /** Handler for cancel button click */
  handleCancelClick: () => void;
  /** Handler for accept button click */
  handleAcceptClick: () => void;
  /** Maximum height for textarea */
  maxHeight?: number;
}

/**
 * Params for creating textarea input
 */
type TextareaInputParams = Pick<
  TextareaContentParams,
  'textareaProps' | 'isEditing' | 'maxHeight'
>;

/**
 * Default placeholder for textarea input
 */
const DEFAULT_PLACEHOLDER = "Enter content...";

/**
 * Creates textarea input config
 * @param {TextareaInputParams} params - Input parameters
 * @returns {Object} Input configuration
 */
const createInputConfig = (params: TextareaInputParams): Parameters<typeof createTextareaInput>[0] => ({
  textareaProps: params.textareaProps,
  placeholder: DEFAULT_PLACEHOLDER,
  isEditing: params.isEditing,
  maxHeight: params.maxHeight
});

/**
 * Creates the input element for the textarea content
 * @param {TextareaInputParams} params - Parameters for creating textarea input
 * @returns {JSX.Element} Textarea input element
 */
export const createContentInput = (
  params: TextareaInputParams
): JSX.Element => createTextareaInput(createInputConfig(params));

/**
 * Parameters for content structure
 */
interface ContentStructureParams {
  /** The textarea input element */
  textareaInput: JSX.Element;
  /** Whether in editing mode */
  isEditing: boolean;
  /** Handler for cancel action */
  handleCancelClick: () => void;
  /** Handler for accept action */
  handleAcceptClick: () => void;
}

/**
 * Creates the structure for textarea content
 * @param {ContentStructureParams} params - Structure parameters
 * @returns {JSX.Element} Textarea content structure
 */
export const createContentStructure = (params: ContentStructureParams): JSX.Element => (
  <div className="flex flex-col">
    {params.textareaInput}
    {params.isEditing && <TextareaControls {...params} />}
  </div>
);

/**
 * Creates input configuration for textarea
 * @param {TextareaContentParams} params - Content parameters
 * @returns {Object} Input configuration
 */
const createFullInputConfig = (
  params: TextareaContentParams
): Parameters<typeof createTextareaInput>[0] => ({
  textareaProps: params.textareaProps,
  placeholder: DEFAULT_PLACEHOLDER,
  isEditing: params.isEditing,
  maxHeight: params.maxHeight
});

/**
 * Creates input element with proper params
 * @param {TextareaContentParams} params - Content parameters
 * @returns {JSX.Element} Textarea input element
 */
const createInputElement = (
  params: TextareaContentParams
): JSX.Element => createTextareaInput(createFullInputConfig(params));

/**
 * Creates structure params from content params and input
 * @param {TextareaContentParams} params - Content parameters
 * @param {JSX.Element} input - Input element
 * @returns {ContentStructureParams} Structure parameters
 */
const createStructureParams = (
  params: TextareaContentParams,
  input: JSX.Element
): ContentStructureParams => ({
  textareaInput: input,
  isEditing: params.isEditing,
  handleCancelClick: params.handleCancelClick,
  handleAcceptClick: params.handleAcceptClick
});

/**
 * Creates the textarea content including input and controls
 * @param {TextareaContentParams} params - Parameters for creating textarea content
 * @returns {JSX.Element} Textarea content component
 */
export const createTextareaContent = (params: TextareaContentParams): JSX.Element =>
  createContentStructure(createStructureParams(params, createInputElement(params)));

// Re-export types from TextareaInput
export type { TextareaProps } from './TextareaInput';
