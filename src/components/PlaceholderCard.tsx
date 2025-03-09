
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Placeholder } from '@/types';
import { Plus, Edit, Trash } from 'lucide-react';
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
            <div className="flex gap-1">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsEditing(true)}
                className="bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800/60"
              >
                <Edit size={14} className="mr-1" />
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onDelete(placeholder.id)}
                className="bg-red-100 text-red-700 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800/60"
              >
                <Trash size={14} className="mr-1" />
                Delete
              </Button>
            </div>
            {onInsert && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleInsert}
                title={'Insert <' + placeholder.name + '> into prompt'}
                className="bg-green-100 text-green-700 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-800/60"
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
