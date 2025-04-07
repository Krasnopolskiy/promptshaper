import {Loader2} from 'lucide-react';

/**
 * LoadingSpinner component displays an animated loading icon.
 *
 * @param {Object} root0 - Component props
 * @param {string} root0.className - Optional CSS class name to apply to the spinner
 * @returns {JSX.Element} JSX element of the loading spinner
 */
export function LoadingSpinner({className}: { className?: string }): JSX.Element {
  return <Loader2 className={`h-4 w-4 animate-spin ${className}`}/>;
}
