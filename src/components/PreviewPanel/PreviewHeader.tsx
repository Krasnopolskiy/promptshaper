import {Button} from '@/components/ui/button';
import {CheckCircle2, Copy, Eye} from 'lucide-react';

interface PreviewHeaderProps {
  onCopy: () => void;
  content: string;
  copied: boolean;
}

/**
 * Renders the title component for the preview header
 * @returns {JSX.Element} The preview title component
 */
function PreviewTitle(): JSX.Element {
  return <div className="flex items-center gap-2 text-primary mb-2">
    <Eye className="h-4 w-4"/>
    <h2 className="text-lg font-medium">Preview</h2>
  </div>;
}

/**
 * Renders the description text
 * @returns {JSX.Element} The description component
 */
function PreviewDescription(): JSX.Element {
  return <p className="text-sm text-muted-foreground">Complete prompt with placeholders</p>;
}

/**
 * Renders the copied state content of the button
 * @returns {JSX.Element} The copied state component
 */
function CopiedState(): JSX.Element {
  return <>
    <CheckCircle2 size={14} className="text-green-500"/>
    <span className="text-green-500">Copied</span>
  </>;
}

/**
 * Renders the default state content of the button
 * @returns {JSX.Element} The default state component
 */
function DefaultState(): JSX.Element {
  return <>
    <Copy size={14}/>
    <span>Copy</span>
  </>;
}

/**
 * Creates the button props object
 * @param {() => void} onCopy - Copy handler function
 * @param {boolean} disabled - Whether the button is disabled
 * @returns {object} The button props
 */
function createButtonProps(onCopy: () => void, disabled: boolean): object {
  return {
    size: "sm" as const,
    variant: "outline" as const,
    onClick: onCopy,
    className: "gap-1.5 border-border/50 text-xs shadow-sm hover:bg-accent/10",
    disabled
  };
}

/**
 * Renders the copy button for the preview header
 * @param {Object} props - Component props
 * @param {() => void} props.onCopy - Copy handler function
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {boolean} props.copied - Whether content has been copied
 * @returns {JSX.Element} The copy button component
 */
function CopyButton({onCopy, disabled, copied}: {onCopy: () => void; disabled: boolean; copied: boolean}): JSX.Element {
  const buttonProps = createButtonProps(onCopy, disabled);
  return <Button {...buttonProps}>
    {copied ? <CopiedState /> : <DefaultState />}
  </Button>;
}

/**
 * Renders the header component for the preview panel
 * @param {PreviewHeaderProps} props - Component props
 * @returns {JSX.Element} The preview header component
 */
export function PreviewHeader({onCopy, content, copied}: PreviewHeaderProps): JSX.Element {
  return <div className="border-b border-border/50 bg-background p-4">
    <div className="flex items-center justify-between">
      <PreviewTitle />
      <CopyButton onCopy={onCopy} disabled={!content || copied} copied={copied} />
    </div>
    <PreviewDescription />
  </div>;
}
