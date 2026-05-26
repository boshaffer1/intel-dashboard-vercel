'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ArrowPathIcon,
  ArrowUpIcon,
  EyeIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import scrapedData from '@/lib/scrapedData.json';

interface DataCard {
  id: string;
  platform: string;
  type: string;
  sentiment: string;
  candidates: string[];
  issues: string[];
  engagementScore: number;
  date: string;
  author: string;
  url: string;
  text: string;
  engagement: {
    likes?: number;
    retweets?: number;
    comments?: number;
    upvotes?: number;
  };
  badges: Array<{ type: string; text: string }>;
}

interface DataFeedProps {
  platform?: 'all' | 'twitter' | 'reddit' | 'tiktok' | 'instagram';
  candidate?: string;
  sentiment?: 'all' | 'positive' | 'negative' | 'mixed' | 'neutral';
  limit?: number;
  showEngagement?: boolean;
}

export default function DataFeed({
  platform = 'all',
  candidate = 'all',
  sentiment = 'all',
  limit = 50,
  showEngagement = true
}: DataFeedProps) {
  const [cards, setCards] = useState<DataCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Load real scraped data
    const allCards = scrapedData.cards as DataCard[];
    setCards(allCards);
    setLoading(false);
  }, []);

  // Filter cards based on props
  const filteredCards = useMemo(() => {
    let filtered = [...cards];
    
    // Platform filter
    if (platform !== 'all') {
      filtered = filtered.filter(card => card.platform === platform);
    }
    
    // Candidate filter
    if (candidate !== 'all') {
      filtered = filtered.filter(card => 
        card.candidates.some(c => c.toLowerCase().includes(candidate.toLowerCase()))
      );
    }
    
    // Sentiment filter
    if (sentiment !== 'all') {
      const sentimentMap: { [key: string]: string } = {
        'positive': 'pos',
        'negative': 'neg',
        'mixed': 'mixed',
        'neutral': 'neutral'
      };
      filtered = filtered.filter(card => card.sentiment === sentimentMap[sentiment]);
    }
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(card => 
        card.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [cards, platform, candidate, sentiment, searchTerm]);

  // Paginated results
  const displayCards = filteredCards.slice(0, limit + (page * limit));

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'bg-blue-500';
      case 'reddit': return 'bg-orange-500';
      case 'tiktok': return 'bg-black';
      case 'instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'pos': return 'text-green-600 bg-green-50';
      case 'neg': return 'text-red-600 bg-red-50';
      case 'mixed': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr; // Return original if invalid
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <ArrowPathIcon className="w-8 h-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search & Stats */}
      <div className="bg-white p-4 rounded-lg border border-[var(--border-light)] shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
            <span>Showing {displayCards.length} of {filteredCards.length} posts</span>
            <FunnelIcon className="w-4 h-4" />
          </div>
        </div>
        
        {/* Platform stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {Object.entries(scrapedData.stats.byPlatform).map(([idx, stat]: [string, any]) => (
            <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-[var(--text-primary)]">
                {stat.count.toLocaleString()}
              </div>
              <div className="text-xs text-[var(--text-secondary)] capitalize">
                {stat.platform}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards Feed */}
      <div className="space-y-3">
        {displayCards.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-[var(--border-light)] rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => window.open(card.url, '_blank')}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-1 rounded text-white text-xs font-medium ${getPlatformColor(card.platform)}`}>
                  {card.platform.toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getSentimentColor(card.sentiment)}`}>
                  {card.sentiment === 'pos' ? '👍' : card.sentiment === 'neg' ? '👎' : '🤔'} {card.sentiment}
                </span>
                {card.candidates.map((cand, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium">
                    {cand}
                  </span>
                ))}
              </div>
              <span className="text-xs text-[var(--text-secondary)]">
                {formatDate(card.date)}
              </span>
            </div>

            {/* Author */}
            {card.author && (
              <div className="text-sm text-[var(--text-secondary)] mb-2">
                @{card.author}
              </div>
            )}

            {/* Content */}
            <div className="text-sm text-[var(--text-primary)] mb-3 line-clamp-4">
              {card.text}
            </div>

            {/* Engagement */}
            {showEngagement && (
              <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                {card.engagement.likes !== undefined && (
                  <span className="flex items-center gap-1">
                    <HeartIcon className="w-4 h-4" />
                    {card.engagement.likes}
                  </span>
                )}
                {card.engagement.retweets !== undefined && (
                  <span className="flex items-center gap-1">
                    <ArrowPathIcon className="w-4 h-4" />
                    {card.engagement.retweets}
                  </span>
                )}
                {card.engagement.comments !== undefined && (
                  <span className="flex items-center gap-1">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    {card.engagement.comments}
                  </span>
                )}
                {card.engagement.upvotes !== undefined && (
                  <span className="flex items-center gap-1">
                    <ArrowUpIcon className="w-4 h-4" />
                    {card.engagement.upvotes}
                  </span>
                )}
                <span className="ml-auto text-[var(--primary)] hover:underline">
                  View on {card.platform} →
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More */}
      {displayCards.length < filteredCards.length && (
        <div className="text-center py-4">
          <button
            onClick={() => setPage(page + 1)}
            className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
          >
            Load More ({filteredCards.length - displayCards.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}