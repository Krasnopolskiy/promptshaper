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
 * Panel for previewing the formatted prompt with placeholders
 * @param {PreviewPanelProps} props - Component props
 * @returns {JSX.Element} The rendered preview panel
 */
export function PreviewPanel({content, onCopy, placeholders}: PreviewPanelProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  /**
   * Handles the copy button click
   */
  const handleCopy = (): void => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <PreviewHeader
        onCopy={handleCopy}
        content={content}
        copied={copied}
      />
      <PreviewContent
        content={content}
        placeholders={placeholders}
      />
    </div>
  );
}
