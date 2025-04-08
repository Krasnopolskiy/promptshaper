import {Button} from '@/components/ui/button';
import {CheckCircle2, Copy, Eye} from 'lucide-react';

interface PreviewHeaderProps {
  onCopy: () => void;
  content: string;
  copied: boolean;
}

/**
 * Title component for the preview header
 * @returns {JSX.Element} The rendered title
 */
function PreviewTitle(): JSX.Element {
  return (
    <div className="flex items-center gap-2 text-primary mb-2">
      <Eye className="h-4 w-4"/>
      <h2 className="text-lg font-medium">Preview</h2>
    </div>
  );
}

/**
 * CopyButton component for the preview header
 * @param {Object} props - Component props
 * @param {() => void} props.onCopy - Copy handler function
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {boolean} props.copied - Whether content has been copied
 * @returns {JSX.Element} The rendered copy button
 */
function CopyButton({onCopy, disabled, copied}: {onCopy: () => void; disabled: boolean; copied: boolean}): JSX.Element {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={onCopy}
      className="gap-1.5 border-border/50 text-xs shadow-sm hover:bg-accent/10"
      disabled={disabled}
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
  );
}

/**
 * Header component for the preview panel
 * @param {PreviewHeaderProps} props - Component props
 * @returns {JSX.Element} The rendered header
 */
export function PreviewHeader({onCopy, content, copied}: PreviewHeaderProps): JSX.Element {
  return (
    <div className="border-b border-border/50 bg-background p-4">
      <div className="flex items-center justify-between">
        <PreviewTitle />
        <CopyButton onCopy={onCopy} disabled={!content || copied} copied={copied} />
      </div>
      <p className="text-sm text-muted-foreground">Complete prompt with placeholders</p>
    </div>
  );
}
