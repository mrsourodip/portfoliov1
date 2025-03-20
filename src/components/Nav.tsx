import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface NavProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

const Nav: React.FC<NavProps> = ({ setActiveSection, activeSection }) => {
  const { toggleTheme, isDark } = useTheme();
  const sections = ['All', 'Projects', 'Blog', 'Media'];

  return (
    <nav className="nav">
      <motion.div 
        className="logo"
        whileHover={{ scale: 1.05 }}
      >
        sk
      </motion.div>
      <div className="nav-links">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`nav-link ${activeSection === section ? 'active' : ''}`}
          >
            {section}
          </button>
        ))}
      </div>
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDark ? '🌞' : '🌙'}
      </button>
    </nav>
  );
};

export default Nav;