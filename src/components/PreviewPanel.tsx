import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Copy, Eye, CheckCircle2 } from 'lucide-react';

interface PreviewPanelProps {
  content: string;
  onCopy: () => void;
}

export function PreviewPanel({ content, onCopy }: PreviewPanelProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Function to highlight XML tags in the preview
  const formatContentWithSyntaxHighlighting = (text: string) => {
    // Replace XML tags with highlighted spans, supporting non-Latin characters like Cyrillic
    const formattedText = text.replace(
      /<(\/?[\p{L}0-9]+)>/gu, 
      '<span class="text-primary font-mono">&#60;$1&#62;</span>'
    );
    
    return formattedText;
  };

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white/90 backdrop-blur-sm">
      <div className="p-4 border-b border-border/50 bg-white">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-medium">Preview</h2>
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleCopy} 
            className="text-xs gap-1.5 border-border/50 shadow-sm hover:bg-accent/10"
            disabled={!content || copied}
          >
            {copied ? (
              <>
                <CheckCircle2 size={14} className="text-green-500" />
                <span className="text-green-500">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Complete prompt with placeholders
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-6">
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
    </div>
  );
}
