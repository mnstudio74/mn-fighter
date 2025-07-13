import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { QuotesProvider } from './contexts/QuotesContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import QuotesList from './components/QuotesList';
import AdminPanel from './components/AdminPanel';
import SEO from './components/SEO';
import { useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO />
      
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isMenuOpen={sidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 md:ml-64">
          <div className="max-w-4xl mx-auto">
            {user?.isAdmin && <AdminPanel />}
            <QuotesList />
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <QuotesProvider>
          <AppContent />
        </QuotesProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;