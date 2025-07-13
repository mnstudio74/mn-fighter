import React from 'react';
import { useQuotes } from '../contexts/QuotesContext';
import QuoteCard from './QuoteCard';
import { Search } from 'lucide-react';

const QuotesList: React.FC = () => {
  const { filteredQuotes, searchTerm, selectedCategory } = useQuotes();

  if (filteredQuotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Search size={64} className="text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No quotes found</h3>
        <p className="text-gray-500 max-w-md">
          {searchTerm ? (
            <>No quotes match your search "{searchTerm}". Try different keywords or browse by category.</>
          ) : selectedCategory !== 'All' ? (
            <>No quotes found in the "{selectedCategory}" category.</>
          ) : (
            <>No quotes available at the moment. Check back later for daily inspiration!</>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedCategory === 'All' ? 'All Quotes' : selectedCategory} 
          {searchTerm && (
            <span className="text-lg font-normal text-gray-600 ml-2">
              for "{searchTerm}"
            </span>
          )}
        </h2>
        <span className="text-sm text-gray-500">
          {filteredQuotes.length} quote{filteredQuotes.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid gap-6 md:gap-8">
        {filteredQuotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
    </div>
  );
};

export default QuotesList;