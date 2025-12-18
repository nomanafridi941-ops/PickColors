
export interface ColorState {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export type ToolCategory = 'Design Tools' | 'Converters' | 'Accessibility' | 'Image Tools' | 'Discovery';

export interface Tool {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  category: ToolCategory;
}
