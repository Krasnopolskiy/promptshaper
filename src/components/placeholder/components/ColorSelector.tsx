/**
 * Color Selector Component
 *
 * Selector for placeholder colors
 *
 * @module components/placeholder/components/ColorSelector
 */
import React from 'react';

/**
 * ColorSelector component props
 * @interface ColorSelectorProps
 */
interface ColorSelectorProps {
  /** Currently selected color */
  selectedColor: string;
  /** Available colors */
  colors: string[];
  /** Function to update selected color */
  setSelectedColor: (color: string) => void;
}

/**
 * Gets the CSS class for a color button
 * @description Determines the appropriate class for a color button based on selection state
 * @param {string} selectedColor - The currently selected color
 * @param {string} buttonColor - The color of this button
 * @returns {string} CSS class for the button
 */
function getColorButtonClass(selectedColor: string, buttonColor: string): string {
  const baseClass = 'h-6 w-6 rounded-full transition-all hover:scale-110';
  const ringClass = selectedColor === buttonColor ? 'ring-2 ring-primary ring-offset-2' : '';
  return `${baseClass} ${ringClass}`;
}

/**
 * Creates props for a color button
 * @description Builds the props object for a color button
 * @param {string} color - The color value
 * @param {string} selectedColor - Currently selected color
 * @param {Function} onClick - Click handler function
 * @returns {Object} Props for the button
 */
function createColorButtonProps(
  color: string,
  selectedColor: string,
  onClick: () => void
): React.ButtonHTMLAttributes<HTMLButtonElement> {
  return {
    key: color,
    type: 'button',
    className: getColorButtonClass(selectedColor, color),
    style: { backgroundColor: color },
    onClick
  };
}

/**
 * Renders a color button
 * @description Creates a clickable color swatch button
 * @param {Object} props - Button props
 * @param {string} props.color - The color value
 * @param {string} props.selectedColor - Currently selected color
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} Rendered color button
 */
function ColorButton({
  color,
  selectedColor,
  onClick
}: {
  color: string;
  selectedColor: string;
  onClick: () => void
}): JSX.Element {
  const buttonProps = createColorButtonProps(color, selectedColor, onClick);
  return <button {...buttonProps} />;
}

/**
 * Container for the color grid
 * @description Wrapper component for the color buttons
 * @param {React.ReactNode} children - Color buttons to render
 * @returns {JSX.Element} Container for color buttons
 */
function ColorGridContainer({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex flex-wrap gap-1 p-1 rounded-md border border-input">
      {children}
    </div>
  );
}

/**
 * Renders color selection grid
 * @description Renders a grid of color buttons
 * @param {string[]} colors - Available colors
 * @param {string} selectedColor - Currently selected color
 * @param {Function} setSelectedColor - Function to update selected color
 * @returns {JSX.Element} Grid of color buttons
 */
function ColorGrid({
  colors,
  selectedColor,
  setSelectedColor
}: {
  colors: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void
}): JSX.Element {
  const colorButtons = colors.map(color => (
    <ColorButton
      key={color}
      color={color}
      selectedColor={selectedColor}
      onClick={() => setSelectedColor(color)}
    />
  ));

  return <ColorGridContainer>{colorButtons}</ColorGridContainer>;
}

/**
 * Renders color selector label
 * @description Creates the label for the color selector
 * @returns {JSX.Element} Color selector label
 */
function ColorSelectorLabel(): JSX.Element {
  return <label className="text-xs text-muted-foreground">Color:</label>;
}

/**
 * Renders color selector
 * @description Component for selecting colors from a predefined palette
 * @param {ColorSelectorProps} props - Component props
 * @returns {JSX.Element} Color selector
 */
export function ColorSelector({
  selectedColor,
  colors,
  setSelectedColor
}: ColorSelectorProps): JSX.Element {
  return (
    <div className="space-y-1">
      <ColorSelectorLabel />
      <ColorGrid
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
}
