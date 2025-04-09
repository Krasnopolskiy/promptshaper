import {useState} from 'react';
import {Placeholder} from '@/types';
import {PreviewHeader} from './PreviewHeader';
import {PreviewContent} from './PreviewContent';

interface PreviewPanelProps {
  content: string;
  onCopy: () => void;
  placeholders: Placeholder[];
}

/**
 * Creates a copy handler with timeout to reset copied state
 * @param {() => void} onCopy - The original copy handler
 * @param {(value: boolean) => void} setCopied - Function to set copied state
 * @returns {() => void} The enhanced copy handler
 */
function createCopyHandler(onCopy: () => void, setCopied: (value: boolean) => void): () => void {
  return () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
}

/**
 * Renders the panel container
 * @param {React.ReactNode} children - The content to render inside
 * @returns {JSX.Element} The panel container component
 */
function PanelContainer({children}: {children: React.ReactNode}): JSX.Element {
  return <div className="flex h-full w-full flex-col bg-background">{children}</div>;
}

/**
 * Panel for previewing the formatted prompt with placeholders
 * @param {PreviewPanelProps} props - Component props
 * @returns {JSX.Element} The rendered preview panel
 */
export function PreviewPanel({content, onCopy, placeholders}: PreviewPanelProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const handleCopy = createCopyHandler(onCopy, setCopied);

  return <PanelContainer>
    <PreviewHeader onCopy={handleCopy} content={content} copied={copied} />
    <PreviewContent content={content} placeholders={placeholders} />
  </PanelContainer>;
}
