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
 * Color button component
 * @param {ColorButtonProps} props - Component props
 * @returns {JSX.Element} Color button
 */
function ColorButton({ color, onClick }: ColorButtonProps): JSX.Element {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="h-8 w-8 rounded-full border-2"
    />
  );
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
