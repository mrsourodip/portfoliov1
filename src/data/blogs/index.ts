import { BlogPostProps } from './types';
import reactPerformanceBlog from './react-performance';
import futureWebDevBlog from './future-web-dev';

export const blogPosts: Record<string, BlogPostProps> = {
  'react-performance': reactPerformanceBlog,
  'future-web-dev': futureWebDevBlog
};

export type { BlogPostProps, BlogSection } from './types'; 