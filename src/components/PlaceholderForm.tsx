
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlaceholderCategory } from '@/types';

interface PlaceholderFormProps {
  onSubmit: (name: string, content: string, category: PlaceholderCategory) => void;
}

export function PlaceholderForm({ onSubmit }: PlaceholderFormProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PlaceholderCategory>('style');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !content.trim()) return;
    
    onSubmit(name.trim(), content.trim(), category);
    
    // Clear form
    setName('');
    setContent('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="placeholder-name">Placeholder Name</Label>
        <Input 
          id="placeholder-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., style, tone, format"
          autoComplete="off"
          className="bg-background"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="placeholder-category">Category</Label>
        <Select 
          value={category} 
          onValueChange={(value) => setCategory(value as PlaceholderCategory)}
        >
          <SelectTrigger id="placeholder-category" className="w-full bg-background">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent position="popper" className="w-full min-w-[8rem]">
            <SelectItem value="style">Style</SelectItem>
            <SelectItem value="tone">Tone</SelectItem>
            <SelectItem value="format">Format</SelectItem>
            <SelectItem value="terminology">Terminology</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="placeholder-content">Content</Label>
        <Textarea 
          id="placeholder-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter the content for this placeholder"
          rows={4}
          className="resize-none bg-background"
        />
      </div>
      
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
        Add Placeholder
      </Button>
    </form>
  );
}
