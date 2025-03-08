
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Placeholder, PlaceholderCategory } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

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
  const [category, setCategory] = useState<PlaceholderCategory>(placeholder.category);
  const [originalName, setOriginalName] = useState(placeholder.name);

  useEffect(() => {
    // Update form values when placeholder changes
    setName(placeholder.name);
    setContent(placeholder.content);
    setCategory(placeholder.category);
    setOriginalName(placeholder.name);
  }, [placeholder]);

  const handleSave = () => {
    if (!name.trim() || !content.trim()) return;
    
    const trimmedName = name.trim();
    const trimmedContent = content.trim();
    
    // Update placeholders in the prompt if name changed
    if (originalName !== trimmedName && onNameChange) {
      onNameChange(originalName, trimmedName);
    }
    
    onUpdate(placeholder.id, {
      name: trimmedName,
      content: trimmedContent,
      category
    });
    
    setIsEditing(false);
    setOriginalName(trimmedName);
  };

  const handleCancel = () => {
    setName(placeholder.name);
    setContent(placeholder.content);
    setCategory(placeholder.category);
    setIsEditing(false);
  };

  const getCategoryColor = (category: PlaceholderCategory) => {
    switch (category) {
      case 'style': return 'bg-blue-100 text-blue-800';
      case 'tone': return 'bg-purple-100 text-purple-800';
      case 'format': return 'bg-green-100 text-green-800';
      case 'terminology': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            
            <Select 
              value={category} 
              onValueChange={(value) => setCategory(value as PlaceholderCategory)}
            >
              <SelectTrigger className="mb-2">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="style">Style</SelectItem>
                <SelectItem value="tone">Tone</SelectItem>
                <SelectItem value="format">Format</SelectItem>
                <SelectItem value="terminology">Terminology</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
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
                <span className={`px-1.5 py-0.5 rounded-md ${getCategoryColor(placeholder.category)}`}>
                  {placeholder.name}
                </span>
              </h3>
              <Badge variant="outline" className={`text-xs ${getCategoryColor(placeholder.category)}`}>
                {placeholder.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {placeholder.content}
            </p>
          </>
        )}
      </CardContent>
      <CardFooter className="p-2 bg-secondary/50 flex justify-between gap-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <>
            <div>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(placeholder.id)}>
                Delete
              </Button>
            </div>
            {onInsert && (
              <Button 
                size="sm" 
                variant="outline" 
                className="text-primary" 
                onClick={handleInsert}
                title={'Insert <' + placeholder.name + '> into prompt'}
              >
                <Plus size={14} />
                Insert
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
