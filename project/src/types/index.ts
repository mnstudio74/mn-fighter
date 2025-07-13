export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  avatar?: string;
  createdAt: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  image?: string;
  tags: string[];
  likes: number;
  saves: number;
  shares: number;
  uploadedBy: string;
  createdAt: string;
  scheduled?: boolean;
  scheduledDate?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  signInWithGoogle: () => void;
  logout: () => void;
  loading: boolean;
  googleAvailable: boolean;
}

export interface QuotesContextType {
  quotes: Quote[];
  filteredQuotes: Quote[];
  categories: string[];
  searchTerm: string;
  selectedCategory: string;
  userLikes: Set<string>;
  userSaves: Set<string>;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  likeQuote: (quoteId: string) => void;
  saveQuote: (quoteId: string) => void;
  shareQuote: (quoteId: string) => void;
  addQuote: (quote: Omit<Quote, 'id' | 'likes' | 'saves' | 'shares' | 'createdAt'>) => void;
}