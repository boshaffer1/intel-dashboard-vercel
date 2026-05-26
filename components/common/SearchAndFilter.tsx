'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  sentimentFilter?: string;
  onSentimentFilterChange?: (sentiment: string) => void;
  onExport?: () => void;
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  sentimentFilter = 'all',
  onSentimentFilterChange,
  onExport
}: SearchAndFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const sentimentOptions = [
    { value: 'all', label: 'All Sentiment' },
    { value: 'positive', label: 'Positive (>60%)' },
    { value: 'neutral', label: 'Neutral (40-60%)' },
    { value: 'negative', label: 'Negative (<40%)' }
  ];

  const dateRangeOptions = [
    { value: '1d', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const clearFilters = () => {
    onSearchChange('');
    onDateRangeChange('7d');
    onSentimentFilterChange?.('all');
    setIsFilterOpen(false);
  };

  const hasActiveFilters = searchTerm || dateRange !== '7d' || sentimentFilter !== 'all';

  return (
    <div className="bg-white rounded-lg border border-[var(--border-light)] p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search Input */}
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search briefs, mentions, keywords, or phrases..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[var(--border-light)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Date Range */}
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
            <select 
              value={dateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className="pl-9 pr-8 py-2 border border-[var(--border-light)] rounded-lg bg-white focus:ring-2 focus:ring-[var(--primary)] appearance-none cursor-pointer"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center px-3 py-2 border rounded-lg transition-all ${
              isFilterOpen || hasActiveFilters
                ? 'border-[var(--primary)] text-[var(--primary)] bg-blue-50'
                : 'border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--primary)]'
            }`}
          >
            <FunnelIcon className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 w-2 h-2 bg-[var(--primary)] rounded-full"></span>
            )}
          </button>

          {/* Export Button */}
          {onExport && (
            <button
              onClick={onExport}
              className="flex items-center px-3 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
            >
              <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
              Export
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {isFilterOpen && (
        <div className="mt-4 pt-4 border-t border-[var(--border-light)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sentiment Filter */}
            {onSentimentFilterChange && (
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Sentiment
                </label>
                <select 
                  value={sentimentFilter}
                  onChange={(e) => onSentimentFilterChange(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border-light)] rounded-lg bg-white focus:ring-2 focus:ring-[var(--primary)]"
                >
                  {sentimentOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Mention Volume Filter */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Mention Volume
              </label>
              <select className="w-full px-3 py-2 border border-[var(--border-light)] rounded-lg bg-white focus:ring-2 focus:ring-[var(--primary)]">
                <option value="all">All Volumes</option>
                <option value="high">High (&gt;50 mentions)</option>
                <option value="medium">Medium (20-50 mentions)</option>
                <option value="low">Low (&lt;20 mentions)</option>
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Platform
              </label>
              <select className="w-full px-3 py-2 border border-[var(--border-light)] rounded-lg bg-white focus:ring-2 focus:ring-[var(--primary)]">
                <option value="all">All Platforms</option>
                <option value="twitter">Twitter/X</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="news">News Sites</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-[var(--text-secondary)]">
              {hasActiveFilters ? 'Filters active' : 'No filters applied'}
            </span>
            
            <div className="flex space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm px-3 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-sm px-3 py-1 bg-gray-100 text-[var(--text-secondary)] rounded hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}