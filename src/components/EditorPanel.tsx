
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
    <div className="w-full md:flex-1 flex flex-col overflow-hidden bg-white/50 backdrop-blur-sm shadow-lg rounded-lg border border-border/50">
      <PromptEditor
        value={promptText}
        onChange={setPromptText}
        placeholders={placeholders}
        onInsertPlaceholder={onInsertPlaceholder}
      />
    </div>
  );
}
