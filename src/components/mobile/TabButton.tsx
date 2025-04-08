/**
 * Tab Button Component
 *
 * A button component for mobile tab navigation
 *
 * @module components/mobile/TabButton
 */
import { getButtonClass } from './utils/tabButtonUtils';

/**
 * Props for the TabButton component
 */
interface TabButtonProps {
  /** Icon to display */
  icon: React.ReactNode;
  /** Label for the button */
  label: string;
  /** Whether the tab is active */
  isActive: boolean;
  /** Click handler */
  onClick: () => void;
}

/**
 * Renders the button content
 * @param {React.ReactNode} icon - Icon element to display
 * @param {string} label - Text label for the button
 * @returns {JSX.Element} Button content
 */
function renderButtonContent(icon: React.ReactNode, label: string): JSX.Element {
  return (
    <>
      {icon}
      <span className="text-xs">{label}</span>
    </>
  );
}

/**
 * Renders a tab button for mobile navigation
 *
 * @param {TabButtonProps} props - Component props
 * @param {React.ReactNode} props.icon - Icon element to display in the button
 * @param {string} props.label - Text label for the button
 * @param {boolean} props.isActive - Whether the tab is currently active
 * @param {() => void} props.onClick - Function to call when button is clicked
 * @returns {JSX.Element} Button component
 */
export default function TabButton({ icon, label, isActive, onClick }: TabButtonProps): JSX.Element {
  return (
    <button
      className={getButtonClass(isActive)}
      onClick={onClick}
    >
      {renderButtonContent(icon, label)}
    </button>
  );
}
