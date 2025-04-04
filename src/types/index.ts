
export type PlaceholderCategory = 'style' | 'tone' | 'format' | 'terminology' | 'other';
export type PlaceholderMode = 'replace' | 'tag';

export interface Placeholder {
  id: string;
  name: string;
  content: string;
  color: string;
  createdAt: number;
  mode?: PlaceholderMode; // New field to determine how placeholder is rendered
}

export interface Template {
  id: string;
  name: string;
  prompt: string;
  placeholders: Placeholder[];
  createdAt: number;
}

// Navigation related types
export interface NavLink {
  label: string;
  href: string;
  icon?: JSX.Element;
}
