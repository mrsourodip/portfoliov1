import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface BlogPostProps {
  title: string;
  date: string;
  content: string;
}

const blogPosts: Record<string, BlogPostProps> = {
  'react-performance': {
    title: 'Understanding React Performance',
    date: 'Mar 15, 2024',
    content: `
Performance optimization is a crucial aspect of building React applications that scale. In this post, we'll explore various techniques and best practices for improving React application performance.

## Key Areas of Focus

### 1. Component Rendering Optimization

React's virtual DOM is incredibly efficient, but we can help it perform even better. Here are some key strategies:

- Use React.memo() for preventing unnecessary re-renders
- Implement shouldComponentUpdate wisely
- Leverage useMemo and useCallback hooks effectively

### 2. State Management

Efficient state management is crucial for performance:

- Keep state as local as possible
- Use appropriate state management tools
- Implement proper data structures

### 3. Code Splitting

Breaking your app into smaller chunks can significantly improve initial load time:

- Use React.lazy() for component-level code splitting
- Implement route-based splitting
- Optimize bundle size

## Best Practices

1. Always profile before optimizing
2. Use the React DevTools Performance tab
3. Measure impact of changes
4. Consider the trade-offs

## Conclusion

Performance optimization is an ongoing process. Start with measuring, make incremental improvements, and always validate the impact of your changes.

Remember: Premature optimization is the root of all evil. Always measure first, then optimize where needed.
    `
  },
  'future-web-dev': {
    title: 'The Future of Web Development',
    date: 'Mar 10, 2024',
    content: `
The web development landscape is constantly evolving. Let's explore some emerging trends and technologies that are shaping the future of web development.

## Current Trends

### 1. AI-Powered Development

Artificial Intelligence is revolutionizing how we write and maintain code:

- AI-powered code completion
- Automated testing and debugging
- Smart code refactoring

### 2. WebAssembly

WebAssembly is enabling high-performance web applications:

- Near-native performance
- Language interoperability
- Enhanced security

### 3. Edge Computing

The edge is becoming increasingly important:

- Reduced latency
- Improved performance
- Better user experience

## What's Next?

The future of web development looks exciting with:

1. More AI integration
2. Enhanced performance capabilities
3. Better developer experience
4. Improved accessibility tools

## Conclusion

Stay curious and keep learning. The web platform continues to evolve, bringing new opportunities and challenges.
    `
  }
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isDark } = useTheme();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <h1>Post not found</h1>
        <Link to="/">Return home</Link>
      </div>
    );
  }

  return (
    <motion.div
      className={`blog-post-container ${isDark ? 'dark-mode' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="blog-post">
        <Link to="/" className="back-link">
          ← Back to home
        </Link>
        <article>
          <header>
            <h1>{post.title}</h1>
            <time>{post.date}</time>
          </header>
          <div className="content">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export default BlogPost; 