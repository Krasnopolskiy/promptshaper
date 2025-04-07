import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

/**
 * Merges className values with Tailwind CSS classes using clsx and tailwind-merge
 *
 * @param {ClassValue[]} inputs - Class values to be merged
 * @returns {string} String of merged className values
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
