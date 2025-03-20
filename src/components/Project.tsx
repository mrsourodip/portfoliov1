import React from 'react';
import { motion } from 'framer-motion';

const Work: React.FC = () => {
  const workItems = ['Project 1', 'Project 2', 'Project 3'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section id="work">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Selected Work
      </motion.h2>
      <motion.div
        className="work-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {workItems.map((project, index) => (
          <motion.div
            key={index}
            className="work-item"
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {project}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Work;