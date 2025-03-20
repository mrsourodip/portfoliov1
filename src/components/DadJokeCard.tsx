import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DadJoke {
  id: string;
  joke: string;
  status: number;
}

const DadJokeCard: React.FC = () => {
  const [joke, setJoke] = useState<string>('Loading...');
  const [isLoading, setIsLoading] = useState(true);

  const fetchJoke = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json'
        }
      });
      const data: DadJoke = await response.json();
      setJoke(data.joke);
    } catch {
      setJoke('Why did the joke fail to load? Because it was dad tired! 😴');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
    // Fetch a new joke every 30 seconds
    const interval = setInterval(fetchJoke, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dad-joke-container">
      <motion.div 
        className="joke-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {joke}
      </motion.div>
      <motion.button
        className="refresh-button"
        onClick={fetchJoke}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? 'Loading...' : 'Another one! 😂'}
      </motion.button>
    </div>
  );
};

export default DadJokeCard; 