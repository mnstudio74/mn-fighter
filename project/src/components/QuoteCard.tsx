import React, { useState } from 'react';
import { Heart, Bookmark, Share2, Calendar, Tag, Copy, Check } from 'lucide-react';
import { Quote } from '../types';
import { useQuotes } from '../contexts/QuotesContext';
import { useAuth } from '../contexts/AuthContext';

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  const { user } = useAuth();
  const { userLikes, userSaves, likeQuote, saveQuote, shareQuote } = useQuotes();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [saveAnimation, setSaveAnimation] = useState(false);

  const isLiked = userLikes.has(quote.id);
  const isSaved = userSaves.has(quote.id);

  const handleLike = () => {
    if (!user) return;
    
    setLikeAnimation(true);
    setTimeout(() => setLikeAnimation(false), 600);
    likeQuote(quote.id);
  };

  const handleSave = () => {
    if (!user) return;
    
    setSaveAnimation(true);
    setTimeout(() => setSaveAnimation(false), 600);
    saveQuote(quote.id);
  };

  const handleShare = () => {
    shareQuote(quote.id);
    setShowShareMenu(!showShareMenu);
  };

  const copyToClipboard = async () => {
    const text = `"${quote.text}" - ${quote.author}\n\nShared from MN STUDIO Quotes`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareToSocial = (platform: string) => {
    const text = encodeURIComponent(`"${quote.text}" - ${quote.author}`);
    const url = encodeURIComponent(window.location.href);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
      {/* Quote Image */}
      {quote.image && (
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <div className={`absolute inset-0 bg-gray-200 animate-pulse ${imageLoaded ? 'hidden' : 'block'}`} />
          <img
            src={quote.image}
            alt="Quote background"
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </div>
      )}

      {/* Quote Content */}
      <div className="p-6">
        <blockquote className="text-gray-800 text-lg leading-relaxed mb-4 font-medium">
          "{quote.text}"
        </blockquote>
        
        <cite className="text-blue-600 font-semibold text-sm block mb-4">
          — {quote.author}
        </cite>

        {/* Tags */}
        {quote.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {quote.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-pointer"
              >
                <Tag size={12} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Category and Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
            {quote.category}
          </span>
          <span className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDate(quote.createdAt)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {/* Like Button */}
            <button
              onClick={handleLike}
              disabled={!user}
              className={`relative flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isLiked
                  ? 'bg-red-100 text-red-600 scale-105'
                  : 'text-gray-600 hover:bg-red-50 hover:text-red-500'
              } ${!user ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${
                likeAnimation ? 'animate-bounce' : ''
              }`}
            >
              <Heart 
                size={18} 
                className={`transition-all duration-300 ${
                  isLiked ? 'fill-current scale-110' : ''
                } ${likeAnimation ? 'animate-pulse' : ''}`} 
              />
              <span className="text-sm font-medium">{quote.likes}</span>
              {likeAnimation && (
                <div className="absolute -top-2 -right-2 text-red-500 animate-ping">
                  <Heart size={12} className="fill-current" />
                </div>
              )}
            </button>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={!user}
              className={`relative flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isSaved
                  ? 'bg-yellow-100 text-yellow-600 scale-105'
                  : 'text-gray-600 hover:bg-yellow-50 hover:text-yellow-500'
              } ${!user ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${
                saveAnimation ? 'animate-bounce' : ''
              }`}
            >
              <Bookmark 
                size={18} 
                className={`transition-all duration-300 ${
                  isSaved ? 'fill-current scale-110' : ''
                } ${saveAnimation ? 'animate-pulse' : ''}`} 
              />
              <span className="text-sm font-medium">{quote.saves}</span>
              {saveAnimation && (
                <div className="absolute -top-2 -right-2 text-yellow-500 animate-ping">
                  <Bookmark size={12} className="fill-current" />
                </div>
              )}
            </button>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all duration-300 hover:scale-105"
              >
                <Share2 size={18} className="transition-transform duration-300 hover:rotate-12" />
                <span className="text-sm font-medium">{quote.shares}</span>
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50 min-w-[200px] animate-in slide-in-from-bottom-2 duration-200">
                  <div className="space-y-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      <span>{copied ? 'Copied!' : 'Copy Quote'}</span>
                    </button>
                    
                    <div className="border-t border-gray-100 pt-2">
                      <p className="text-xs text-gray-500 mb-2 px-3">Share on social media:</p>
                      
                      <button
                        onClick={() => shareToSocial('twitter')}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      >
                        <div className="w-4 h-4 bg-blue-400 rounded"></div>
                        <span>Twitter</span>
                      </button>
                      
                      <button
                        onClick={() => shareToSocial('facebook')}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      >
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span>Facebook</span>
                      </button>
                      
                      <button
                        onClick={() => shareToSocial('linkedin')}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      >
                        <div className="w-4 h-4 bg-blue-700 rounded"></div>
                        <span>LinkedIn</span>
                      </button>
                      
                      <button
                        onClick={() => shareToSocial('whatsapp')}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                      >
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {!user && (
            <span className="text-xs text-gray-400">Sign in to interact</span>
          )}
        </div>
      </div>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default QuoteCard;