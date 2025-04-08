import React from 'react';
import { ColorPicker } from '../ColorPicker';

interface ColorPickerSectionProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

/**
 * Component for selecting a color with a label
 * @description Displays a color picker with a descriptive label
 * @param {Object} props - Component props
 * @param {string} props.selectedColor - The currently selected color
 * @param {Function} props.setSelectedColor - Function to update the selected color
 * @returns {JSX.Element} The rendered color picker section
 */
export function ColorPickerSection(props: ColorPickerSectionProps): JSX.Element {
  const { selectedColor, setSelectedColor } = props;
  return (
    <div className="flex items-center gap-2">
      <ColorPicker selectedColor={selectedColor} onSelectColor={setSelectedColor} />
      <span className="text-xs text-muted-foreground">Select color</span>
    </div>
  );
}
