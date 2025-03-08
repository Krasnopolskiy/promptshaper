export type PlaceholderCategory = 'style' | 'tone' | 'format' | 'terminology' | 'other';

export interface Placeholder {
  id: string;
  name: string;
  content: string;
  color: string;
  createdAt: number;
}

export interface Template {
  id: string;
  name: string;
  prompt: string;
  placeholders: Placeholder[];
  createdAt: number;
}
