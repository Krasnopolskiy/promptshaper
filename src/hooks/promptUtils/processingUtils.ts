import { Placeholder } from '../../types';
import { replacePlaceholderInText } from './index';

/**
 * Placeholder transformer function
 */
export type PlaceholderTransformer = (text: string) => string;

/**
 * Process parameters interface
 */
export interface ProcessParams {
  /** Initial text */
  text: string;
  /** Placeholders list */
  placeholders: Placeholder[];
  /** Filter function */
  filterFn: (p: Placeholder) => boolean;
  /** Transform function */
  transformFn: (p: Placeholder) => boolean;
  /** Transformers list */
  transformers?: PlaceholderTransformer[];
}

/**
 * ProcessPlaceholders parameters
 */
export interface ProcessParams {
  text: string;
  placeholders: Placeholder[];
  filterFn: (p: Placeholder) => boolean;
  transformFn: (p: Placeholder) => boolean;
}

/**
 * Process placeholders initialization
 * @param {ProcessParams} params Processing parameters
 * @returns Initial values for processing
 */
export function initProcessPlaceholders(params: ProcessParams): {
  text: string;
  result: string;
} {
  const { text } = params;
  if (!text) return { text: '', result: '' };
  return { text, result: text };
}

/**
 * Process one placeholder
 * @param {string} result Current result
 * @param {Placeholder} placeholder Placeholder to process
 * @param {boolean} withTags Whether to include tags
 * @returns {string} Updated result
 */
export function processOnePlaceholder(
  result: string,
  placeholder: Placeholder,
  withTags: boolean
): string {
  return replacePlaceholderInText(result, placeholder, withTags);
}

/**
 * Prepare text for transformation
 * @param {string} text Input text
 * @param {PlaceholderTransformer[]} transformers List of transformers
 * @returns {string} Transformed text
 */
function prepareAndTransform(text: string, transformers: PlaceholderTransformer[] = []): string {
  if (!text || !transformers.length) {
    return text;
  }

  let result = text;
  for (const transformer of transformers) {
    result = transformer(result);
  }
  return result;
}

/**
 * Apply placeholder transformations
 * @param {Placeholder} placeholder Placeholder to transform
 * @param {ProcessParams} params Process parameters
 * @returns {string} Transformed text
 */
export function applyPlaceholderTransforms(
  placeholder: Placeholder,
  params: ProcessParams
): string {
  const { transformers = [] } = params;

  return prepareAndTransform(placeholder.content, transformers);
}

/**
 * Apply transform to a placeholder
 * @param {string} text Current text
 * @param {Placeholder} placeholder Placeholder to process
 * @param {boolean} useTransform Whether to apply transform
 * @returns {string} Updated text
 */
function applyTransform(
  text: string,
  placeholder: Placeholder,
  useTransform: boolean
): string {
  return processOnePlaceholder(text, placeholder, useTransform);
}

/**
 * Apply transforms to all placeholders
 * @param {string} text Initial text
 * @param {Placeholder[]} filtered Filtered placeholders
 * @param {Function} transformFn Transform function
 * @returns {string} Processed text
 */
function applyTransformsToAll(
  text: string,
  filtered: Placeholder[],
  transformFn: (p: Placeholder) => boolean
): string {
  return filtered.reduce(
    (result, placeholder) => applyTransform(result, placeholder, transformFn(placeholder)),
    text
  );
}

/**
 * Process filtered placeholders
 * @param {string} text Initial text
 * @param {Placeholder[]} filtered Filtered placeholders
 * @param {Function} transformFn Transform function
 * @returns {string} Processed text
 */
function processFilteredPlaceholders(
  text: string,
  filtered: Placeholder[],
  transformFn: (p: Placeholder) => boolean
): string {
  return applyTransformsToAll(text, filtered, transformFn);
}

/**
 * Process placeholders
 * @param {ProcessParams} params Process parameters
 * @returns {string} Processed text
 */
export function processPlaceholders(params: ProcessParams): string {
  const { text, placeholders, filterFn, transformFn } = params;

  if (!text) return '';

  const filtered = placeholders.filter(filterFn);
  return processFilteredPlaceholders(text, filtered, transformFn);
}

/**
 * Create mode filter for full prompt
 * @returns {Function} Filter function
 */
export function createFullPromptFilter(): (p: Placeholder) => boolean {
  return (p: Placeholder) => p.mode !== 'tag';
}

/**
 * Create mode transformer for full prompt
 * @returns {Function} Transform function
 */
export function createFullPromptTransformer(): (p: Placeholder) => boolean {
  return () => false;
}

/**
 * Create mode filter for copyable prompt
 * @returns {Function} Filter function
 */
export function createCopyablePromptFilter(): (p: Placeholder) => boolean {
  return () => true;
}

/**
 * Create mode transformer for copyable prompt
 * @returns {Function} Transform function
 */
export function createCopyablePromptTransformer(): (p: Placeholder) => boolean {
  return (p: Placeholder) => p.mode === 'tag';
}
