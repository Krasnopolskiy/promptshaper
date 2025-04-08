/**
 * Feature Data
 *
 * Data and types for feature components
 *
 * @module components/dialog/FeatureData
 */
import { ReactNode } from 'react';

/**
 * Feature configuration type
 * @interface FeatureConfig
 */
export interface FeatureConfig {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Feature icon */
  icon: ReactNode;
}

/**
 * Creates feature items
 * @returns {FeatureConfig[]} Array of feature configurations
 */
export function createFeatureItems(): FeatureConfig[] {
  return [
    {
      title: 'Placeholders',
      description: 'Create reusable content blocks that can be inserted into your prompts.',
      icon: null // Icon will be provided by the component
    },
    {
      title: 'Templates',
      description: 'Save and load prompt templates for quick access.',
      icon: null // Icon will be provided by the component
    },
    {
      title: 'Preview',
      description: 'See how your prompt will look with placeholders filled in.',
      icon: null // Icon will be provided by the component
    }
  ];
}
