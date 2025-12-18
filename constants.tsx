
import { Tool } from './types';

export const TOOLS: Tool[] = [
  // Design Tools
  { id: 'picker', name: 'Color Picker & Converter', description: 'Pick colors visually and convert between HEX, RGB, and HSL.', path: '/tools/picker', icon: '🎨', category: 'Design Tools' },
  { id: 'gradient', name: 'Gradient Generator', description: 'Create beautiful CSS gradients with multiple color stops.', path: '/tools/gradient', icon: '🌈', category: 'Design Tools' },
  { id: 'harmonies', name: 'Color Harmonies Generator', description: 'Discover perfect color combinations for your designs.', path: '/tools/harmonies', icon: '⚖️', category: 'Design Tools' },
  { id: 'palette', name: 'Random Color Palette Generator', description: 'Generate fresh color inspiration with a single click.', path: '/tools/palette', icon: '🎲', category: 'Design Tools' },
  { id: 'mood', name: 'Mood Board Generator', description: 'Generate thematic color palettes using Gemini AI.', path: '/tools/mood', icon: '✨', category: 'Design Tools' },
  
  // Accessibility
  { id: 'contrast', name: 'Contrast Checker', description: 'Test color accessibility based on WCAG guidelines.', path: '/tools/contrast', icon: '🔍', category: 'Accessibility' },
  { id: 'readability', name: 'Readability Tester', description: 'Preview text readability across different sizes and backgrounds.', path: '/tools/readability', icon: '📖', category: 'Accessibility' },
  { id: 'accessibility-checker', name: 'Accessibility Color Checker', description: 'Check full palette accessibility compliance.', path: '/tools/accessibility-checker', icon: '♿', category: 'Accessibility' },
  
  // Image Tools
  { id: 'extractor', name: 'Image Color Extractor', description: 'Upload images to extract dominant color palettes.', path: '/tools/extractor', icon: '📷', category: 'Image Tools' },
  { id: 'palette-url', name: 'Color Palette from Image URL', description: 'Extract color palettes from any online image URL.', path: '/tools/palette-url', icon: '🔗', category: 'Image Tools' },
  
  // Converters
  { id: 'hex-to-rgb', name: 'HEX to RGB Converter', description: 'Fast HEX to RGB color code conversion.', path: '/tools/hex-to-rgb', icon: '🧪', category: 'Converters' },
  { id: 'rgb-to-hex', name: 'RGB to HEX Converter', description: 'Fast RGB to HEX color code conversion.', path: '/tools/rgb-to-hex', icon: '🧪', category: 'Converters' },
  { id: 'hsl-converter', name: 'HSL Color Converter', description: 'Convert HSL values to RGB and HEX formats.', path: '/tools/hsl-converter', icon: '🧪', category: 'Converters' },
  
  // Discovery
  { id: 'namer', name: 'Name That Color', description: 'Identify names for specific color codes.', path: '/tools/namer', icon: '🏷️', category: 'Discovery' },
  { id: 'finder', name: 'Color Finder by Code', description: 'Find similar shades and variations for any color.', path: '/tools/finder', icon: '🔭', category: 'Discovery' },
  { id: 'css-names', name: 'CSS Color Names Finder', description: 'Search and find official CSS color keywords.', path: '/tools/css-names', icon: '💻', category: 'Discovery' },
];

export const COLOR_NAMES_MAP: Record<string, string> = {
  "#000000": "Black",
  "#FFFFFF": "White",
  "#FF0000": "Red",
  "#00FF00": "Lime",
  "#0000FF": "Blue",
  "#FFFF00": "Yellow",
  "#00FFFF": "Cyan",
  "#FF00FF": "Magenta",
  "#C0C0C0": "Silver",
  "#808080": "Gray",
  "#800000": "Maroon",
  "#808000": "Olive",
  "#008000": "Green",
  "#800080": "Purple",
  "#008080": "Teal",
  "#000080": "Navy",
};
