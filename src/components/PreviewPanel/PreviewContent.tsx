import {useRef} from 'react';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Placeholder} from '@/types';
import {formatContentWithSyntaxHighlighting} from './utils';

interface PreviewContentProps {
  content: string;
  placeholders: Placeholder[];
}

/**
 * EmptyPreviewContent component for when there's no content
 * @returns {JSX.Element} The rendered empty content
 */
function EmptyPreviewContent(): JSX.Element {
  return (
    <div className="text-sm italic text-muted-foreground">
      Your preview will appear here...
    </div>
  );
}

/**
 * Component for rendering formatted preview content
 * @param {PreviewContentProps} props - Component props
 * @returns {JSX.Element} The rendered content
 */
export function PreviewContent({content, placeholders}: PreviewContentProps): JSX.Element {
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollArea className="flex-1">
      <div className="p-6">
        {content ? (
          <div
            ref={previewRef}
            className="whitespace-pre-wrap text-sm"
            dangerouslySetInnerHTML={{
              __html: formatContentWithSyntaxHighlighting(content, placeholders),
            }}
          />
        ) : (
          <EmptyPreviewContent />
        )}
      </div>
    </ScrollArea>
  );
}
