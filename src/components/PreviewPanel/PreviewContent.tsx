import {useRef} from 'react';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Placeholder} from '@/types';
import {formatContentWithSyntaxHighlighting} from './utils';

interface PreviewContentProps {
  content: string;
  placeholders: Placeholder[];
}

/**
 * Renders empty content when there's no preview content
 * @returns {JSX.Element} The empty content component
 */
function EmptyPreviewContent(): JSX.Element {
  return <div className="text-sm italic text-muted-foreground">
    Your preview will appear here...
  </div>;
}

/**
 * Renders the formatted content with syntax highlighting
 * @param {object} props - Component props
 * @param {string} props.content - The content to render
 * @param {Placeholder[]} props.placeholders - The placeholders to highlight
 * @returns {JSX.Element} The formatted content component
 */
function FormattedContent({content, placeholders}: PreviewContentProps): JSX.Element {
  const previewRef = useRef<HTMLDivElement>(null);
  const html = formatContentWithSyntaxHighlighting(content, placeholders);

  return <div
    ref={previewRef}
    className="whitespace-pre-wrap text-sm"
    dangerouslySetInnerHTML={{__html: html}}
  />;
}

/**
 * Renders the content container with appropriate padding
 * @param {React.ReactNode} children - The content to render inside the container
 * @returns {JSX.Element} The content container component
 */
function ContentContainer({children}: {children: React.ReactNode}): JSX.Element {
  return <div className="p-6">{children}</div>;
}

/**
 * Renders the preview content area with scrolling
 * @param {PreviewContentProps} props - Component props
 * @returns {JSX.Element} The preview content component
 */
export function PreviewContent({content, placeholders}: PreviewContentProps): JSX.Element {
  return <ScrollArea className="flex-1">
    <ContentContainer>
      {content ? <FormattedContent content={content} placeholders={placeholders} /> : <EmptyPreviewContent />}
    </ContentContainer>
  </ScrollArea>;
}
