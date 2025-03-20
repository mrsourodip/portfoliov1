/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Card from './components/Card';
import BlogPost from './components/BlogPost';
import { initialCardsData, CardData } from './data/cards';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('All');
  const { isDark } = useTheme();

  // Store initial cards order
  const [cards, setCards] = useState<CardData[]>(initialCardsData);

  // Always reset to initial order when selecting "All"
  const handleSectionChange = (section: string) => {
    if (section === 'All') {
      setCards([...initialCardsData]);
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
                className="card-wrapper inactive"
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
          <Route path="*" element={<AppContent />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;