import { PromptEditor } from './PromptEditor';
import { Placeholder } from '@/types';

interface EditorPanelProps {
  promptText: string;
  setPromptText: (text: string) => void;
  placeholders: Placeholder[];
  onInsertPlaceholder: (name: string, position: number) => number;
}

export function EditorPanel({
  promptText,
  setPromptText,
  placeholders,
  onInsertPlaceholder
}: EditorPanelProps) {
  return (
    <PromptEditor
      value={promptText}
      onChange={setPromptText}
      placeholders={placeholders}
      onInsertPlaceholder={onInsertPlaceholder}
    />
  );
}
