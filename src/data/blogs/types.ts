export interface BlogSection {
  type: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'list';
  content: string | string[];
}

export interface BlogPostProps {
  title: string;
  date: string;
  content: BlogSection[];
} 