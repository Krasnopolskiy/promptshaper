import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Placeholder } from '@/types';
import { Plus } from 'lucide-react';
import { PLACEHOLDER_COLORS } from '@/hooks/usePlaceholders';

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
  onNameChange
}: PlaceholderCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(placeholder.name);
  const [content, setContent] = useState(placeholder.content);
  const [originalName, setOriginalName] = useState(placeholder.name);

  useEffect(() => {
    // Update form values when placeholder changes
    setName(placeholder.name);
    setContent(placeholder.content);
    setOriginalName(placeholder.name);
  }, [placeholder]);

  // Get a random color from the PLACEHOLDER_COLORS array
  const getRandomColor = () => {
    return PLACEHOLDER_COLORS[Math.floor(Math.random() * PLACEHOLDER_COLORS.length)];
  };

  const handleSave = () => {
    if (!name.trim() || !content.trim()) return;
    
    const trimmedName = name.trim();
    const trimmedContent = content.trim();
    
    // Update placeholders in the prompt if name changed
    if (originalName !== trimmedName && onNameChange) {
      onNameChange(originalName, trimmedName);
    }
    
    // Assign a new random color when saving
    const newColor = getRandomColor();
    
    onUpdate(placeholder.id, {
      name: trimmedName,
      content: trimmedContent,
      color: newColor
    });
    
    setIsEditing(false);
    setOriginalName(trimmedName);
  };

  const handleCancel = () => {
    setName(placeholder.name);
    setContent(placeholder.content);
    setIsEditing(false);
  };

  const getColorStyle = (color: string) => {
    return {
      backgroundColor: `${color}10`, // 10% opacity
      color: color,
      borderColor: `${color}30` // 30% opacity
    };
  };

  const handleInsert = () => {
    if (onInsert) {
      onInsert(placeholder.name);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 animate-scale group hover:shadow-md">
      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Placeholder name"
              className="mb-2"
            />
            
            <Textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Placeholder content"
              rows={3}
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm">
                <span 
                  className="px-1.5 py-0.5 rounded-md border"
                  style={getColorStyle(placeholder.color)}
                >
                  {placeholder.name}
                </span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {placeholder.content}
            </p>
          </>
        )}
      </CardContent>
      <CardFooter className="p-2 bg-secondary/50 dark:bg-secondary/30 flex justify-between gap-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90"
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/50"
              >
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onDelete(placeholder.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/50"
              >
                Delete
              </Button>
            </div>
            {onInsert && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleInsert}
                title={'Insert <' + placeholder.name + '> into prompt'}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/50"
              >
                <Plus size={14} className="mr-1" />
                Insert
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
