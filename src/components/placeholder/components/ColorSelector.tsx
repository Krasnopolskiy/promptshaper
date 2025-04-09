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
 * Creates button type and class
 * @param {string} selectedColor - Currently selected color
 * @param {string} buttonColor - The color of this button
 * @returns {Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'>} Button type and class
 */
function createButtonTypeAndClass(
  selectedColor: string,
  buttonColor: string
): { type: 'button'; className: string } {
  return {
    type: 'button',
    className: getColorButtonClass(selectedColor, buttonColor)
  };
}

/**
 * Creates base style and attributes for a color button
 * @param {string} color - The color value
 * @param {string} selectedColor - Currently selected color
 * @returns {Object} Base button style and attributes
 */
function createButtonAttributes(
  color: string,
  selectedColor: string
): { type: 'button'; className: string; style: React.CSSProperties } {
  return {
    ...createButtonTypeAndClass(selectedColor, color),
    style: { backgroundColor: color }
  };
}

/**
 * Creates button props including key
 * @param {string} color - The color value
 * @param {string} selectedColor - Currently selected color
 * @returns {Object} Button base props
 */
function createButtonBaseProps(
  color: string,
  selectedColor: string
): { type: 'button'; className: string; style: React.CSSProperties; key: string } {
  const attrs = createButtonAttributes(color, selectedColor);
  // We're separating this to avoid TypeScript errors with the key property
  return { ...attrs, key: color };
}

/**
 * Creates button element props with click handler
 * @param {string} color - Color value
 * @param {string} selectedColor - Selected color
 * @param {Function} onClick - Click handler
 * @returns {React.ButtonHTMLAttributes<HTMLButtonElement> & { key?: string }} Button props
 */
function createColorButtonWithHandler(
  color: string,
  selectedColor: string,
  onClick: () => void
): React.ButtonHTMLAttributes<HTMLButtonElement> & { key?: string } {
  const baseProps = createButtonBaseProps(color, selectedColor);
  return { ...baseProps, onClick };
}

/**
 * Creates button element props
 * @param {Object} params - Button parameters
 * @param {string} params.color - Color value
 * @param {string} params.selectedColor - Selected color
 * @param {Function} params.onClick - Click handler
 * @returns {React.ButtonHTMLAttributes<HTMLButtonElement> & { key?: string }} Button props
 */
function createButtonProps(params: {
  color: string;
  selectedColor: string;
  onClick: () => void
}): React.ButtonHTMLAttributes<HTMLButtonElement> & { key?: string } {
  return createColorButtonWithHandler(params.color, params.selectedColor, params.onClick);
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
function ColorButton(props: {
  color: string;
  selectedColor: string;
  onClick: () => void
}): JSX.Element {
  const buttonProps = createButtonProps(props);
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
 * Creates props for a grid button
 * @description Prepares properties for a color grid button
 * @param {string} color - Color value
 * @param {string} selectedColor - Selected color
 * @param {Function} setSelectedColor - Color setter function
 * @returns {Object} Props for the button
 */
function createGridButtonProps(
  color: string,
  selectedColor: string,
  setSelectedColor: (color: string) => void
): { key: string; color: string; selectedColor: string; onClick: () => void } {
  /**
   * Click handler for color selection
   * @description Updates the selected color when button is clicked
   * @returns {void} No return value
   */
  const onClick = (): void => setSelectedColor(color);
  return { key: color, color, selectedColor, onClick };
}

/**
 * Creates a color button for the grid
 * @description Creates a button component with appropriate props
 * @param {string} color - The color value
 * @param {string} selectedColor - Currently selected color
 * @param {Function} setSelectedColor - Function to update selected color
 * @returns {JSX.Element} Color button component
 */
function createColorGridButton(
  color: string,
  selectedColor: string,
  setSelectedColor: (color: string) => void
): JSX.Element {
  const props = createGridButtonProps(color, selectedColor, setSelectedColor);
  return <ColorButton {...props} />;
}

/**
 * Creates an array of color buttons
 * @param {string[]} colors - Available colors
 * @param {string} selectedColor - Currently selected color
 * @param {Function} setSelectedColor - Function to update selected color
 * @returns {JSX.Element[]} Array of color buttons
 */
function createColorButtons(
  colors: string[],
  selectedColor: string,
  setSelectedColor: (color: string) => void
): JSX.Element[] {
  return colors.map(color =>
    createColorGridButton(color, selectedColor, setSelectedColor)
  );
}

/**
 * Creates color grid props
 * @param {Object} props - Component properties
 * @param {string[]} props.colors - Available colors array
 * @param {string} props.selectedColor - Currently selected color
 * @param {Function} props.setSelectedColor - Function to update selected color
 * @returns {Object} Color grid props
 */
function createColorGridProps(props: {
  colors: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}): { children: JSX.Element[] } {
  const { colors, selectedColor, setSelectedColor } = props;
  return { children: createColorButtons(colors, selectedColor, setSelectedColor) };
}

/**
 * Renders color selection grid
 * @description Renders a grid of color buttons
 * @param {Object} props - Component properties
 * @param {string[]} props.colors - Available colors array
 * @param {string} props.selectedColor - Currently selected color
 * @param {Function} props.setSelectedColor - Function to update selected color
 * @returns {JSX.Element} Grid of color buttons
 */
function ColorGrid(props: {
  colors: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void
}): JSX.Element {
  const gridProps = createColorGridProps(props);
  return <ColorGridContainer>{gridProps.children}</ColorGridContainer>;
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
 * Creates the color selector content
 * @param {ColorSelectorProps} props - Component props
 * @returns {JSX.Element[]} Selector content elements
 */
function createSelectorContent(props: ColorSelectorProps): JSX.Element[] {
  const { colors, selectedColor, setSelectedColor } = props;
  return [
    <ColorSelectorLabel key="label" />,
    <ColorGrid key="grid" colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
  ];
}

/**
 * Renders color selector
 * @description Component for selecting colors from a predefined palette
 * @param {ColorSelectorProps} props - Component props
 * @returns {JSX.Element} Color selector
 */
export function ColorSelector(props: ColorSelectorProps): JSX.Element {
  const content = createSelectorContent(props);
  return <div className="space-y-1">{content}</div>;
}
