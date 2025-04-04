
import React, {useState, useRef, useEffect} from 'react';
import {Placeholder} from '@/types';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent} from '@/components/ui/card';
import {Check, ChevronDown, ChevronUp, Copy, Pencil, Plus, Trash, Tag, RefreshCw} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {PLACEHOLDER_COLORS} from '@/hooks/usePlaceholders';

interface PlaceholderCardProps {
  placeholder: Placeholder;
  onUpdate: (id: string, updates: Partial<Placeholder>) => void;
  onDelete: (id: string) => void;
  onInsert?: (name: string) => void;
  onNameChange?: (oldName: string, newName: string) => void;
}

export function PlaceholderCard({
                                  placeholder,
                                  onUpdate,
                                  onDelete,
                                  onInsert,
                                  onNameChange,
                                }: PlaceholderCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newName, setNewName] = useState(placeholder.name);
  const [newContent, setNewContent] = useState(placeholder.content);
  const [selectedColor, setSelectedColor] = useState(placeholder.color);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize mode if not present
  const mode = placeholder.mode || 'replace';

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (newName.trim() === '') return;

    // If the name has changed, we need to update all instances in the prompt
    if (newName !== placeholder.name && onNameChange) {
      onNameChange(placeholder.name, newName);
    }

    onUpdate(placeholder.id, {
      name: newName,
      content: newContent,
      color: selectedColor,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewName(placeholder.name);
    setNewContent(placeholder.content);
    setSelectedColor(placeholder.color);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`<${placeholder.name}>`);
  };

  const handleDelete = () => {
    onDelete(placeholder.id);
  };

  const handleInsert = () => {
    if (onInsert) {
      onInsert(placeholder.name);
    }
  };

  const toggleMode = () => {
    // Toggle between 'replace' and 'tag' modes
    const newMode = mode === 'replace' ? 'tag' : 'replace';
    onUpdate(placeholder.id, { mode: newMode });
  };

  const cardBorderStyle = {
    borderLeft: `4px solid ${placeholder.color}`,
  };

  return (
    <Card
      className={`relative overflow-hidden shadow-sm transition-all duration-200 ${
        isEditing ? 'ring-2 ring-primary/20' : ''
      } ${isExpanded ? 'bg-card/80' : 'bg-card/50'}`}
      style={cardBorderStyle}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between gap-2">
          {isEditing ? (
            <Input
              ref={inputRef}
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-8 flex-1 text-sm"
              placeholder="Placeholder name"
            />
          ) : (
            <div className="flex items-center gap-2" onClick={() => setIsExpanded(!isExpanded)}>
              <div
                className="h-4 w-4 rounded-full"
                style={{backgroundColor: placeholder.color}}
              />
              <h3 className="flex-1 cursor-pointer font-medium">
                {placeholder.name}
                <span className="ml-2 text-xs text-muted-foreground">
                  {mode === 'tag' ? '(Tag Mode)' : '(Replace Mode)'}
                </span>
              </h3>
            </div>
          )}

          <div className="flex items-center gap-1">
            {isEditing ? (
              <>
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleSave}>
                  <Check className="h-4 w-4 text-green-500"/>
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleCancel}>
                  <Trash className="h-4 w-4 text-destructive"/>
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={toggleMode}
                  title={mode === 'replace' ? 'Switch to tag mode' : 'Switch to replace mode'}
                >
                  {mode === 'replace' ? (
                    <RefreshCw className="h-4 w-4 text-muted-foreground"/>
                  ) : (
                    <Tag className="h-4 w-4 text-primary"/>
                  )}
                </Button>
                {!isExpanded && (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={handleCopyToClipboard}
                    >
                      <Copy className="h-4 w-4 text-muted-foreground"/>
                    </Button>
                    {onInsert && (
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleInsert}>
                        <Plus className="h-4 w-4 text-muted-foreground"/>
                      </Button>
                    )}
                  </>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground"/>
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground"/>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-2 space-y-2">
            <div className="rounded-md border p-2 text-sm">
              <code className="font-mono text-xs text-muted-foreground">{`<${placeholder.name}>`}</code>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Content:</label>
                {!isEditing && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="h-3 w-3 text-muted-foreground"/>
                  </Button>
                )}
              </div>
              {isEditing ? (
                <Textarea
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Escape') handleCancel();
                  }}
                  className="min-h-[80px] text-sm"
                  placeholder="Placeholder content"
                />
              ) : (
                <div
                  className="min-h-[40px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  onClick={() => setIsEditing(true)}
                >
                  {placeholder.content ? (
                    <span className="whitespace-pre-line">{placeholder.content}</span>
                  ) : (
                    <span className="italic text-muted-foreground">Empty</span>
                  )}
                </div>
              )}
            </div>

            {isEditing && (
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Color:</label>
                <div className="flex flex-wrap gap-1">
                  {PLACEHOLDER_COLORS.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`h-6 w-6 rounded-full ${
                        selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''
                      }`}
                      style={{backgroundColor: color}}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between">
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                onClick={handleCopyToClipboard}
              >
                <Copy className="mr-1 h-3 w-3"/>
                Copy Tag
              </Button>
              {onInsert && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={handleInsert}
                >
                  <Plus className="mr-1 h-3 w-3"/>
                  Insert
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="destructive" className="h-7 text-xs">
                    <Trash className="mr-1 h-3 w-3"/>
                    Delete
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    Confirm Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
