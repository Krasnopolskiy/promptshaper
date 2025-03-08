import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PLACEHOLDER_COLORS } from '@/hooks/usePlaceholders';

interface PlaceholderFormProps {
  onSubmit: (name: string, content: string, color: string) => void;
}

export function PlaceholderForm({ onSubmit }: PlaceholderFormProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('');
  
  // Set a random color when the component mounts
  useEffect(() => {
    const randomColor = PLACEHOLDER_COLORS[Math.floor(Math.random() * PLACEHOLDER_COLORS.length)];
    setColor(randomColor);
  }, []);
  
  // Select a new random color when form is submitted
  const getRandomColor = () => {
    return PLACEHOLDER_COLORS[Math.floor(Math.random() * PLACEHOLDER_COLORS.length)];
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !content.trim()) return;
    
    onSubmit(name.trim(), content.trim(), color);
    
    // Clear form and set a new random color
    setName('');
    setContent('');
    setColor(getRandomColor());
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
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90"
      >
        Add Placeholder
      </Button>
    </form>
  );
}
