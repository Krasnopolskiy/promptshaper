import { PromptEditor } from './PromptEditor';
import { Placeholder } from '@/types';
import { FileEdit } from 'lucide-react';

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
    <div className="w-full h-full flex flex-col bg-white/90 backdrop-blur-sm">
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-accent/10 to-background">
        <div className="flex items-center gap-2 mb-1">
          <FileEdit className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-medium">Editor</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Create and edit your prompt template
        </p>
      </div>
      
      <PromptEditor
        value={promptText}
        onChange={setPromptText}
        placeholders={placeholders}
        onInsertPlaceholder={onInsertPlaceholder}
      />
    </div>
  );
}
