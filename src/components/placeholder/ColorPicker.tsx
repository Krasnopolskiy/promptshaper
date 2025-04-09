/**
 * Color Picker Component
 *
 * A color picker component with a popover
 *
 * @module components/placeholder/ColorPicker
 */
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

interface ColorButtonProps {
  color: string;
  onClick: () => void;
}

interface ColorPickerContentProps {
  color: string;
  onChange: (color: string) => void;
}

/**
 * Create button style based on color
 * @param {string} color - Color value
 * @returns {React.CSSProperties} Button style
 */
function createButtonStyle(color: string): React.CSSProperties {
  return { backgroundColor: color };
}

/**
 * Create button props based on color and click handler
 * @param {string} color - Color value
 * @param {Function} onClick - Click handler function
 * @returns {Object} Button props
 */
function createButtonProps(color: string, onClick: () => void): React.ComponentProps<typeof Button> {
  return {
    variant: "outline",
    size: "icon",
    onClick,
    style: createButtonStyle(color),
    className: "h-8 w-8 rounded-full border-2"
  };
}

/**
 * Color button component
 * @param {ColorButtonProps} props - Component props
 * @returns {JSX.Element} Color button
 */
function ColorButton({ color, onClick }: ColorButtonProps): JSX.Element {
  const buttonProps = createButtonProps(color, onClick);
  return <Button {...buttonProps} />;
}

/**
 * Color picker content component
 * @param {ColorPickerContentProps} props - Component props
 * @returns {JSX.Element} Color picker content
 */
function ColorPickerContent({ color, onChange }: ColorPickerContentProps): JSX.Element {
  return (
    <PopoverContent className="w-auto border-none p-0">
      <HexColorPicker color={color} onChange={onChange} />
    </PopoverContent>
  );
}

/**
 * Color picker component
 * @param {ColorPickerProps} props - Component props
 * @returns {JSX.Element} Color picker
 */
export function ColorPicker({ color, onChange }: ColorPickerProps): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ColorButton color={color} onClick={() => {}} />
      </PopoverTrigger>
      <ColorPickerContent color={color} onChange={onChange} />
    </Popover>
  );
}
