import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const IS_GOOGLE_CONFIGURED = GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== 'your_google_client_id_here.apps.googleusercontent.com';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleAvailable, setGoogleAvailable] = useState(false);

  useEffect(() => {
    // Only load Google Sign-In API if properly configured
    if (IS_GOOGLE_CONFIGURED) {
      loadGoogleAPI();
    } else {
      console.warn('Google OAuth not configured. Please add VITE_GOOGLE_CLIENT_ID to your .env file.');
    }

    // Check for existing session
    const savedUser = localStorage.getItem('mn-studio-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loadGoogleAPI = () => {
    const loadGoogleAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      script.onerror = () => {
        console.error('Failed to load Google Sign-In API');
        setGoogleAvailable(false);
      };
      document.head.appendChild(script);
    };

    loadGoogleAPI();
  };

  const initializeGoogleSignIn = () => {
    try {
      if (window.google && IS_GOOGLE_CONFIGURED) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        setGoogleAvailable(true);
      } else {
        setGoogleAvailable(false);
      }
    } catch (error) {
      console.error('Google Sign-In initialization error:', error);
      setGoogleAvailable(false);
    }
  };

  const handleGoogleSignIn = async (response: any) => {
    setLoading(true);
    
    try {
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const userData: User = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        avatar: payload.picture,
        isAdmin: payload.email === 'admin@mnstudio.com',
        createdAt: new Date().toISOString(),
      };
      
      setUser(userData);
      localStorage.setItem('mn-studio-user', JSON.stringify(userData));
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setLoading(false);
      return false;
    }
  };

  const signInWithGoogle = () => {
    if (window.google && googleAvailable && IS_GOOGLE_CONFIGURED) {
      window.google.accounts.id.prompt();
    } else {
      console.error('Google Sign-In not available. Please check your configuration.');
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    if (email && password) {
      const userData: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        isAdmin: email === 'admin@mnstudio.com',
        createdAt: new Date().toISOString(),
      };
      
      setUser(userData);
      localStorage.setItem('mn-studio-user', JSON.stringify(userData));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration logic
    if (email && password && name) {
      const userData: User = {
        id: Date.now().toString(),
        email,
        name,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      };
      
      setUser(userData);
      localStorage.setItem('mn-studio-user', JSON.stringify(userData));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    // Sign out from Google
    if (window.google && googleAvailable) {
      window.google.accounts.id.disableAutoSelect();
    }
    
    setUser(null);
    localStorage.removeItem('mn-studio-user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    signInWithGoogle,
    logout,
    loading,
    googleAvailable,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};