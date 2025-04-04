
import {useRef, useState} from 'react';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Button} from '@/components/ui/button';
import {CheckCircle2, Copy, Eye} from 'lucide-react';
import {Placeholder} from '@/types';

interface PreviewPanelProps {
  content: string;
  onCopy: () => void;
  placeholders: Placeholder[];
}

export function PreviewPanel({content, onCopy, placeholders}: PreviewPanelProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Helper function to escape special characters in regex
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Helper function to escape HTML entities
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Function to format content based on placeholder modes
  const formatContentWithSyntaxHighlighting = (text: string) => {
    let formattedText = text;

    // First pass: process tag-mode placeholders (with opening and closing tags)
    placeholders.forEach(placeholder => {
      if (placeholder.mode === 'tag' && placeholder.content) {
        const placeholderPattern = `<${escapeRegExp(placeholder.name)}>`;
        const placeholderRegex = new RegExp(placeholderPattern, 'g');
        
        if (placeholderRegex.test(formattedText)) {
          formattedText = formattedText.replace(placeholderRegex, () => {
            const openingTag = `<span class="text-primary font-mono">&lt;${escapeHtml(placeholder.name)}&gt;</span>`;
            const content = `<br/><span class="pl-4 border-l-2 border-primary/20 text-foreground whitespace-pre-wrap">${escapeHtml(placeholder.content)}</span><br/>`;
            const closingTag = `<span class="text-primary font-mono">&lt;/${escapeHtml(placeholder.name)}&gt;</span>`;
            
            return `${openingTag}${content}${closingTag}`;
          });
        }
      } else if (placeholder.mode === 'replace' && placeholder.content) {
        // For replace mode, just replace the tag with the content
        const placeholderPattern = `<${escapeRegExp(placeholder.name)}>`;
        const placeholderRegex = new RegExp(placeholderPattern, 'g');
        formattedText = formattedText.replace(
          placeholderRegex, 
          `<span class="bg-primary/10 text-primary px-1 rounded">${escapeHtml(placeholder.content)}</span>`
        );
      }
    });

    // Second pass: handle any remaining placeholder tags that weren't explicitly processed
    // Safely process any remaining tags without breaking HTML
    formattedText = formattedText.replace(
      /<([^<>]+)>/g,
      (match, p1) => `<span class="text-primary/70 font-mono">&lt;${escapeHtml(p1)}&gt;</span>`
    );

    return formattedText;
  };

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <div className="border-b border-border/50 bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Eye className="h-4 w-4"/>
            <h2 className="text-lg font-medium">Preview</h2>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="gap-1.5 border-border/50 text-xs shadow-sm hover:bg-accent/10"
            disabled={!content || copied}
          >
            {copied ? (
              <>
                <CheckCircle2 size={14} className="text-green-500"/>
                <span className="text-green-500">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14}/>
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Complete prompt with placeholders</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          {content ? (
            <div
              ref={previewRef}
              className="whitespace-pre-wrap text-sm"
              dangerouslySetInnerHTML={{
                __html: formatContentWithSyntaxHighlighting(content),
              }}
            />
          ) : (
            <div className="text-sm italic text-muted-foreground">
              Your preview will appear here...
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
