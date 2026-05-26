'use client';

import { useState } from 'react';
import { 
  DocumentTextIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import GoogleDocsViewer from './GoogleDocsViewer';
import { googleDocs, getDocsByCategory, GoogleDoc } from '@/lib/googleDocsData';

export default function GoogleDocsPanel() {
  const [selectedCategory, setSelectedCategory] = useState<GoogleDoc['category'] | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmbeds, setShowEmbeds] = useState(false);

  const categories: Array<{ value: GoogleDoc['category'] | 'all'; label: string; count: number }> = [
    { value: 'all', label: 'All Documents', count: googleDocs.length },
    { value: 'daily-brief', label: 'Daily Briefs', count: getDocsByCategory('daily-brief').length },
    { value: 'weekly-report', label: 'Weekly Reports', count: getDocsByCategory('weekly-report').length },
    { value: 'dossier', label: 'Dossiers', count: getDocsByCategory('dossier').length },
    { value: 'strategy', label: 'Strategy', count: getDocsByCategory('strategy').length },
    { value: 'research', label: 'Research', count: getDocsByCategory('research').length }
  ];

  const filteredDocs = googleDocs.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[var(--border-light)] rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <DocumentTextIcon className="w-7 h-7 text-[var(--primary)]" />
              Live Google Docs
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Real-time access to campaign documents • Auto-refreshes every 5 minutes
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-[var(--primary)] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Squares2X2Icon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-[var(--primary)] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ListBulletIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-4 py-2 border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label} ({cat.count})
                </option>
              ))}
            </select>
          </div>

          {/* Embed Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showEmbeds}
              onChange={(e) => setShowEmbeds(e.target.checked)}
              className="w-4 h-4 text-[var(--primary)] rounded focus:ring-[var(--primary)]"
            />
            <span className="text-sm text-gray-700">Show Previews</span>
          </label>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat.value
                ? 'bg-[var(--primary)] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            {cat.label}
            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
              selectedCategory === cat.value
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Documents Grid/List */}
      {filteredDocs.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid lg:grid-cols-2 gap-6' 
            : 'space-y-4'
        }>
          {filteredDocs.map(doc => (
            <GoogleDocsViewer 
              key={doc.id} 
              doc={doc} 
              showEmbed={showEmbeds}
              autoRefresh={true}
              refreshInterval={300}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No documents found matching your filters</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white rounded-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold">{googleDocs.length}</div>
            <div className="text-sm opacity-90">Total Documents</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {googleDocs.filter(d => d.priority === 'high').length}
            </div>
            <div className="text-sm opacity-90">High Priority</div>
          </div>
          <div>
            <div className="text-3xl font-bold">Live</div>
            <div className="text-sm opacity-90">Real-time Updates</div>
          </div>
          <div>
            <div className="text-3xl font-bold">5 min</div>
            <div className="text-sm opacity-90">Auto-refresh</div>
          </div>
        </div>
      </div>
    </div>
  );
}