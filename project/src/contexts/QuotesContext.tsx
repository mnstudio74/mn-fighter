import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Quote, QuotesContextType } from '../types';
import { useAuth } from './AuthContext';

const QuotesContext = createContext<QuotesContextType | undefined>(undefined);

export const useQuotes = () => {
  const context = useContext(QuotesContext);
  if (!context) {
    throw new Error('useQuotes must be used within a QuotesProvider');
  }
  return context;
};

interface QuotesProviderProps {
  children: ReactNode;
}

// Sample quotes data
const sampleQuotes: Quote[] = [
  {
    id: '1',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'Motivation',
    image: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['motivation', 'work', 'passion'],
    likes: 45,
    saves: 23,
    shares: 12,
    uploadedBy: 'admin',
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: '2',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    category: 'Success',
    image: 'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['success', 'courage', 'perseverance'],
    likes: 67,
    saves: 34,
    shares: 18,
    uploadedBy: 'admin',
    createdAt: '2024-01-14T09:00:00Z',
  },
  {
    id: '3',
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    category: 'Dreams',
    image: 'https://images.pexels.com/photos/1329296/pexels-photo-1329296.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['dreams', 'future', 'belief'],
    likes: 89,
    saves: 45,
    shares: 23,
    uploadedBy: 'admin',
    createdAt: '2024-01-13T09:00:00Z',
  },
  {
    id: '4',
    text: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
    category: 'Leadership',
    image: 'https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['innovation', 'leadership', 'creativity'],
    likes: 56,
    saves: 29,
    shares: 15,
    uploadedBy: 'admin',
    createdAt: '2024-01-12T09:00:00Z',
  },
];

export const QuotesProvider: React.FC<QuotesProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>(sampleQuotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());
  const [userSaves, setUserSaves] = useState<Set<string>>(new Set());

  const categories = ['All', ...Array.from(new Set(quotes.map(quote => quote.category)))];

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || quote.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    if (user) {
      const savedLikes = localStorage.getItem(`likes-${user.id}`);
      const savedSaves = localStorage.getItem(`saves-${user.id}`);
      
      if (savedLikes) setUserLikes(new Set(JSON.parse(savedLikes)));
      if (savedSaves) setUserSaves(new Set(JSON.parse(savedSaves)));
    }
  }, [user]);

  const likeQuote = (quoteId: string) => {
    if (!user) return;
    
    const newLikes = new Set(userLikes);
    if (newLikes.has(quoteId)) {
      newLikes.delete(quoteId);
      setQuotes(prev => prev.map(quote => 
        quote.id === quoteId ? { ...quote, likes: quote.likes - 1 } : quote
      ));
    } else {
      newLikes.add(quoteId);
      setQuotes(prev => prev.map(quote => 
        quote.id === quoteId ? { ...quote, likes: quote.likes + 1 } : quote
      ));
    }
    
    setUserLikes(newLikes);
    localStorage.setItem(`likes-${user.id}`, JSON.stringify([...newLikes]));
  };

  const saveQuote = (quoteId: string) => {
    if (!user) return;
    
    const newSaves = new Set(userSaves);
    if (newSaves.has(quoteId)) {
      newSaves.delete(quoteId);
      setQuotes(prev => prev.map(quote => 
        quote.id === quoteId ? { ...quote, saves: quote.saves - 1 } : quote
      ));
    } else {
      newSaves.add(quoteId);
      setQuotes(prev => prev.map(quote => 
        quote.id === quoteId ? { ...quote, saves: quote.saves + 1 } : quote
      ));
    }
    
    setUserSaves(newSaves);
    localStorage.setItem(`saves-${user.id}`, JSON.stringify([...newSaves]));
  };

  const shareQuote = (quoteId: string) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId ? { ...quote, shares: quote.shares + 1 } : quote
    ));
  };

  const addQuote = (newQuote: Omit<Quote, 'id' | 'likes' | 'saves' | 'shares' | 'createdAt'>) => {
    const quote: Quote = {
      ...newQuote,
      id: Date.now().toString(),
      likes: 0,
      saves: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
    };
    
    setQuotes(prev => [quote, ...prev]);
  };

  const value: QuotesContextType = {
    quotes,
    filteredQuotes,
    categories,
    searchTerm,
    selectedCategory,
    userLikes,
    userSaves,
    setSearchTerm,
    setSelectedCategory,
    likeQuote,
    saveQuote,
    shareQuote,
    addQuote,
  };

  return (
    <QuotesContext.Provider value={value}>
      {children}
    </QuotesContext.Provider>
  );
};