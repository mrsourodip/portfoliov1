/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Card from './components/Card';
import BlogPost from './components/BlogPost';
import InteractiveAvatar from './components/InteractiveAvatar';
import DadJokeCard from './components/DadJokeCard';
import { ThemeProvider, useTheme } from './context/ThemeContext';

interface CardData {
  id: string;
  section: string;
  title: string;
  description?: string;
  bgColor: string;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'featured';
  hasToggle?: boolean;
  hasMusic?: boolean;
  hasTwitter?: boolean;
  hasMap?: boolean;
  hasImage?: boolean;
  hasEmail?: boolean;
  hasReadMore?: boolean;
  hasThemeToggle?: boolean;
  date?: string;
  link?: string;
  order?: number;
  githubUrl?: string;
  isIntroCard?: boolean;
  avatar?: React.ReactNode;
  spotifyTrackId?: string;
  customContent?: React.ReactNode;
}

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('All');
  const { isDark } = useTheme();

  // Store initial cards order
  const initialCardsOrder: CardData[] = [
    {
      id: '1',
      section: 'About',
      title: "I'm Sourodip",
      description: "A developer from Kolkata, interested in full stack development in MERN Stack along with integrating agentic AI. I love Brooklyn 99 and The Office, and when I am not coding, you will find me playing Fifa with Bingo Chilli Sprinkles and a coke.",
      bgColor: '#fff',
      size: 'featured',
      isIntroCard: true,
      avatar: <InteractiveAvatar />
    },
    {
      id: '2',
      section: 'Fun',
      title: 'Dad Joke of the Day',
      bgColor: '#FFE0E8',
      size: 'wide',
      customContent: <DadJokeCard />
    },
    {
      id: '3',
      section: 'Media',
      title: 'Location',
      bgColor: '#fff',
      size: 'wide',
      hasMap: true
    },
    {
      id: '4',
      section: 'Projects',
      title: 'Weather App',
      description: 'A beautiful weather application with real-time updates.',
      bgColor: '#E0F8F0',
      size: 'small',
      githubUrl: 'https://github.com/yourusername/weather-app'
    },
    {
      id: '5',
      section: 'Contact',
      title: 'Get in Touch',
      description: 'Feel free to reach out for collaborations or just to say hi!',
      bgColor: '#FFE8F0',
      size: 'small',
      hasReadMore: true,
      link: 'mailto:sourodip.works@gmail.com'
    },
    {
      id: '6',
      section: 'Blog',
      title: 'Understanding React Performance',
      description: 'Deep dive into optimization techniques for React applications.',
      bgColor: '#E8F0FF',
      size: 'wide',
      hasReadMore: true,
      date: 'Mar 15, 2024',
      link: '/blog/react-performance'
    },
    {
      id: '7',
      section: 'Music',
      title: 'Currently Playing',
      description: 'Check out what I\'m listening to right now.',
      bgColor: '#FFF3F3',
      size: 'wide',
      hasMusic: true,
      spotifyTrackId: '6ORqU0bHbVCRjXm9AjyHyZ'
    },
    {
      id: '8',
      section: 'Projects',
      title: 'E-commerce Platform',
      description: 'A full-featured online shopping platform with modern UI/UX.',
      bgColor: '#FFE8C8',
      size: 'wide',
      githubUrl: 'https://github.com/yourusername/ecommerce'
    },
    {
      id: '9',
      section: 'Blog',
      title: 'The Future of Web Development',
      description: 'Exploring upcoming trends and technologies in web development.',
      bgColor: '#E0F8F0',
      size: 'small',
      hasReadMore: true,
      date: 'Mar 10, 2024',
      link: '/blog/future-web-dev'
    },
    {
      id: '10',
      section: 'Projects',
      title: 'AI Chat Assistant',
      description: 'An intelligent chatbot powered by machine learning.',
      bgColor: '#FFE0E8',
      size: 'small',
      githubUrl: 'https://github.com/yourusername/ai-chat'
    }
  ];

  const [cards, setCards] = useState<CardData[]>(initialCardsOrder);

  // Always reset to initial order when selecting "All"
  const handleSectionChange = (section: string) => {
    if (section === 'All') {
      setCards([...initialCardsOrder]);
    }
    setActiveSection(section);
  };

  const filteredCards = cards.filter(card => 
    activeSection === 'All' || card.section === activeSection
  );

  const nonFilteredCards = cards.filter(card => 
    activeSection !== 'All' && card.section !== activeSection
  );

  const onDragEnd = (cardId: string, info: any) => {
    const { point } = info;
    const container = document.querySelector('.card-container');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const relativeY = point.y - containerRect.top;
    
    setCards(prevCards => {
      const cardIndex = prevCards.findIndex(c => c.id === cardId);
      const updatedCards = [...prevCards];
      const [movedCard] = updatedCards.splice(cardIndex, 1);
      
      const cardElements = document.querySelectorAll('.card');
      const positions: { index: number; distance: number; rect: DOMRect }[] = [];
      
      cardElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const distance = Math.hypot(centerX - point.x, centerY - point.y);
        positions.push({ index, distance, rect });
      });
      
      positions.sort((a, b) => a.distance - b.distance);
      
      let insertIndex = positions[0]?.index ?? 0;
      
      if (relativeY > containerRect.height - 100) {
        insertIndex = updatedCards.length;
      } else {
        const targetPosition = positions.find(pos => 
          point.y < pos.rect.y + pos.rect.height / 2
        );
        if (targetPosition) {
          insertIndex = targetPosition.index;
        }
      }
      
      updatedCards.splice(insertIndex, 0, movedCard);
      return updatedCards;
    });
  };

  return (
    <motion.div 
      className={isDark ? 'dark-mode' : ''}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="app">
        <Nav setActiveSection={handleSectionChange} activeSection={activeSection} />
        <motion.div 
          className="card-container"
          layout
          transition={{
            duration: 0.8,
            ease: [0.19, 1, 0.22, 1]
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                layoutId={card.id}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                dragSnapToOrigin={false}
                dragTransition={{
                  bounceStiffness: 300,
                  bounceDamping: 30,
                  power: 0.1
                }}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }
                }}
                onDragEnd={(_, info) => onDragEnd(card.id, info)}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    mass: 0.1
                  }
                }}
                exit={{ scale: 0.95, opacity: 0 }}
                whileDrag={{ 
                  scale: 1.02,
                  zIndex: 50,
                  transition: { duration: 0.2 }
                }}
                className="card-wrapper"
                style={{
                  position: 'relative',
                  transformOrigin: 'center center'
                }}
              >
                <Card
                  {...card}
                  isActive={true}
                  isDarkMode={isDark}
                />
              </motion.div>
            ))}
            {nonFilteredCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                layoutId={card.id}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ 
                  scale: 0.95,
                  opacity: 0.3,
                  transition: {
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    duration: 0.6
                  }
                }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="card-wrapper"
              >
                <Card
                  {...card}
                  isActive={false}
                  isDarkMode={isDark}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;