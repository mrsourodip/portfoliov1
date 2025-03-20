import React from 'react';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';

interface CardProps {
  id: string;
  title: string;
  description?: string;
  bgColor: string;
  isActive: boolean;
  section?: string;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'featured';
  hasMusic?: boolean;
  hasTwitter?: boolean;
  hasMap?: boolean;
  hasImage?: boolean;
  hasReadMore?: boolean;
  hasThemeToggle?: boolean;
  isDarkMode?: boolean;
  date?: string;
  link?: string;
  githubUrl?: string;
  order?: number;
  avatar?: React.ReactNode;
  isIntroCard?: boolean;
  spotifyTrackId?: string;
  customContent?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  bgColor,
  isActive,
  section,
  size = 'normal',
  hasMusic,
  hasTwitter,
  hasMap,
  hasImage,
  hasReadMore,
  hasThemeToggle,
  isDarkMode,
  date,
  link,
  githubUrl,
  avatar,
  isIntroCard,
  spotifyTrackId,
  customContent
}) => {
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDarkMode ? '#111' : bgColor,
    zIndex: isDragging ? 100 : 1,
    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isActive) return;
    if (link && !isDragging) {
      e.preventDefault();
      if (link.startsWith('mailto:')) {
        window.location.href = link;
      } else if (link.startsWith('http')) {
        window.open(link, '_blank');
      } else {
        navigate(link);
      }
    }
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    if (!isActive) return;
    e.stopPropagation();
    if (githubUrl) {
      window.open(githubUrl, '_blank');
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`card ${isDragging ? 'dragging' : ''} ${isIntroCard ? 'intro-card' : ''}`}
      data-size={size}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
      whileHover={isActive && !isDragging ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.2
      }}
      onClick={handleClick}
      layout
    >
      {avatar && (
        <div className="avatar">
          {avatar}
        </div>
      )}
      
      {hasMusic && <div className="card-icon music-icon"><i className="fas fa-music"></i></div>}
      {hasTwitter && <div className="card-icon twitter-icon"><i className="fab fa-twitter"></i></div>}
      {section === 'Projects' && (
        <button 
          className="github-button"
          onClick={handleGithubClick}
          aria-label="View on GitHub"
          disabled={!isActive}
          style={{ opacity: isActive ? 1 : 0.5 }}
        >
          <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </button>
      )}
      {hasMap && <MapComponent isDarkMode={isDarkMode} />}
      {hasImage && <div className="card-icon image-icon"><i className="fas fa-image"></i></div>}
      
      <h3>{title}</h3>
      {!customContent && <p>{description}</p>}

      {customContent && (
        <div className="custom-content" style={{ pointerEvents: isActive ? 'auto' : 'none' }}>
          {customContent}
        </div>
      )}

      {hasMusic && spotifyTrackId && (
        <div className="spotify-embed">
          <iframe 
            src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator`}
            width="100%" 
            height="152" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            style={{ 
              borderRadius: '12px',
              pointerEvents: isActive ? 'auto' : 'none',
              opacity: isActive ? 1 : 0.5
            }}
          ></iframe>
        </div>
      )}

      {hasReadMore && (
        <div className="read-more">
          <a 
            href={link}
            style={{ pointerEvents: isActive ? 'auto' : 'none' }}
          >
            {link?.startsWith('mailto:') ? 'Send email' : 'Read more'}
            <i className={`fas fa-${link?.startsWith('mailto:') ? 'envelope' : 'arrow-right'}`}></i>
          </a>
          {date && <span>{date}</span>}
        </div>
      )}

      {hasThemeToggle && (
        <div className="theme-toggle-container">
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isDarkMode}
              onChange={toggleTheme}
              disabled={!isActive}
            />
            <span className="slider round"></span>
          </label>
        </div>
      )}
    </motion.div>
  );
};

export default Card;