import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { blogPosts, BlogSection } from '../data/blogs';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isDark } = useTheme();
  const post = slug ? blogPosts[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <h1>Post not found</h1>
        <Link to="/">Return home</Link>
      </div>
    );
  }

  const renderContent = (section: BlogSection) => {
    switch (section.type) {
      case 'heading1':
        return <h1>{section.content}</h1>;
      case 'heading2':
        return <h2>{section.content}</h2>;
      case 'heading3':
        return <h3>{section.content}</h3>;
      case 'list':
        return (
          <ul>
            {(section.content as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      default:
        return <p>{section.content}</p>;
    }
  };

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
            {post.content.map((section, index) => (
              <div key={index} className={`blog-section ${section.type}`}>
                {renderContent(section)}
              </div>
            ))}
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export default BlogPost; 