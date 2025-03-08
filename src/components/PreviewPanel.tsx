import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface PreviewPanelProps {
  content: string;
  onCopy: () => void;
}

export function PreviewPanel({ content, onCopy }: PreviewPanelProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  // Function to highlight XML tags in the preview
  const formatContentWithSyntaxHighlighting = (text: string) => {
    // Replace XML tags with highlighted spans, supporting non-Latin characters like Cyrillic
    const formattedText = text.replace(
      /<(\/?[\p{L}0-9]+)>/gu, 
      '<span class="text-primary font-mono">&#60;$1&#62;</span>'
    );
    
    return formattedText;
  };

  return (
    <aside className="w-full md:w-80 border-l border-border h-full flex flex-col bg-background/90">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Preview</h2>
          <p className="text-sm text-muted-foreground">
            Complete prompt with placeholders
          </p>
        </div>
        
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={onCopy} 
          className="text-sm gap-1.5"
        >
          <Copy size={14} />
          Copy
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {content ? (
            <div 
              ref={previewRef}
              className="whitespace-pre-wrap text-sm" 
              dangerouslySetInnerHTML={{ 
                __html: formatContentWithSyntaxHighlighting(content) 
              }}
            />
          ) : (
            <div className="text-muted-foreground italic text-sm">
              Your preview will appear here...
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
