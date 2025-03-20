import React from 'react';
import InteractiveAvatar from '../components/InteractiveAvatar';
import DadJokeCard from '../components/DadJokeCard';

export interface CardData {
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
  hasDownload?: boolean;
  date?: string;
  link?: string;
  order?: number;
  githubUrl?: string;
  isIntroCard?: boolean;
  avatar?: React.ReactNode;
  spotifyTrackId?: string;
  customContent?: React.ReactNode;
  downloadUrl?: string;
}

export const initialCardsData: CardData[] = [
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
    githubUrl: 'https://github.com/mrsourodip/weather-app'
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
    id: '11',
    section: 'About',
    title: 'Download Resume',
    description: 'Get a copy of my detailed resume in PDF format.',
    bgColor: '#E8F0FF',
    size: 'small',
    hasDownload: true,
    downloadUrl: 'https://portfoliov1-mu-two.vercel.app/Sourodip_Kundu_FullStack.pdf'
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
    githubUrl: 'https://github.com/mrsourodip/ecommerce'
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
    githubUrl: 'https://github.com/mrsourodip/ai-chat'
  }
]; 