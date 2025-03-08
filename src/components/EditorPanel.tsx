
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
    <aside className="w-full md:w-80 h-full flex flex-col bg-white/50 backdrop-blur-sm shadow-lg rounded-lg border border-border/50">
      <PromptEditor
        value={promptText}
        onChange={setPromptText}
        placeholders={placeholders}
        onInsertPlaceholder={onInsertPlaceholder}
      />
    </aside>
  );
}
