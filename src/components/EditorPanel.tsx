import {PromptEditor} from './PromptEditor';
import {Placeholder} from '@/types';
import {FileEdit} from 'lucide-react';

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
                              onInsertPlaceholder,
                            }: EditorPanelProps) {
  return (
    <div className="flex h-full w-full flex-col bg-background">
      <div className="border-b border-border/50 bg-background p-4">
        <div className="mb-1 flex items-center gap-2">
          <FileEdit className="h-4 w-4 text-primary"/>
          <h2 className="text-lg font-medium">Editor</h2>
        </div>
        <p className="text-sm text-muted-foreground">Create and edit your prompt template</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <PromptEditor
          value={promptText}
          onChange={setPromptText}
          placeholders={placeholders}
          onInsertPlaceholder={onInsertPlaceholder}
        />
      </div>
    </div>
  );
}
