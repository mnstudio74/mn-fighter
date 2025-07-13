import React from 'react';
import { Home, TrendingUp, Heart, Bookmark, Settings, Users } from 'lucide-react';
import { useQuotes } from '../contexts/QuotesContext';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { categories, selectedCategory, setSelectedCategory } = useQuotes();
  const { user } = useAuth();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        md:static md:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 space-y-6">
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Navigation</h3>
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                <Home size={20} />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                <TrendingUp size={20} />
                <span>Trending</span>
              </a>
              {user && (
                <>
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                    <Heart size={20} />
                    <span>Liked Quotes</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                    <Bookmark size={20} />
                    <span>Saved Quotes</span>
                  </a>
                </>
              )}
              {user?.isAdmin && (
                <>
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                    <Settings size={20} />
                    <span>Admin Panel</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                    <Users size={20} />
                    <span>User Management</span>
                  </a>
                </>
              )}
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              MN STUDIO Quotes © 2024
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Inspiring minds daily
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;