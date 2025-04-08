/**
 * Header Icons Component
 *
 * Contains the SVG icons used in the header
 *
 * @module components/icons/HeaderIcons
 */

/**
 * Load icon component
 * @returns {JSX.Element} Load icon
 */
export function LoadIcon(): JSX.Element {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
  );
}

/**
 * Save icon component
 * @returns {JSX.Element} Save icon
 */
export function SaveIcon(): JSX.Element {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
    </svg>
  );
}

/**
 * Reset icon component
 * @returns {JSX.Element} Reset icon
 */
export function ResetIcon(): JSX.Element {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
    </svg>
  );
}
