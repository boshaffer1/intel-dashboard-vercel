'use client';

import { useState, useEffect } from 'react';
import { 
  DocumentTextIcon, 
  ArrowTopRightOnSquareIcon, 
  ArrowPathIcon,
  ClockIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { GoogleDoc } from '@/lib/googleDocsData';

interface GoogleDocsViewerProps {
  doc: GoogleDoc;
  showEmbed?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number; // in seconds
}

export default function GoogleDocsViewer({ 
  doc, 
  showEmbed = false,
  autoRefresh = true,
  refreshInterval = 300 // 5 minutes default
}: GoogleDocsViewerProps) {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [embedKey, setEmbedKey] = useState(0);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      handleRefresh();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setEmbedKey(prev => prev + 1); // Force iframe reload
    setLastRefresh(new Date());
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getCategoryColor = (category: GoogleDoc['category']) => {
    switch (category) {
      case 'daily-brief': return 'bg-blue-100 text-blue-800';
      case 'weekly-report': return 'bg-purple-100 text-purple-800';
      case 'dossier': return 'bg-red-100 text-red-800';
      case 'strategy': return 'bg-green-100 text-green-800';
      case 'research': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority?: GoogleDoc['priority']) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className={`bg-white border-2 ${getPriorityColor(doc.priority)} rounded-lg shadow-sm hover:shadow-md transition-all duration-200`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <DocumentTextIcon className="w-5 h-5 text-[var(--primary)]" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {doc.title}
              </h3>
            </div>
            
            {doc.description && (
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                {doc.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className={`px-2 py-1 rounded-full ${getCategoryColor(doc.category)}`}>
                <TagIcon className="w-3 h-3 inline mr-1" />
                {doc.category.replace('-', ' ')}
              </span>
              
              {doc.lastUpdated && (
                <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                  <ClockIcon className="w-3 h-3" />
                  <span>Updated: {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                </div>
              )}

              {autoRefresh && (
                <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                  <ArrowPathIcon className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Auto-refresh: {refreshInterval}s</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-gray-50 rounded-lg transition-colors"
              title="Refresh Document"
            >
              <ArrowPathIcon className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-gray-50 rounded-lg transition-colors"
              title="Open in Google Docs"
            >
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Embedded Preview */}
      {showEmbed && doc.embedUrl && (
        <div className="p-4 bg-gray-50">
          <div className="relative w-full h-96 rounded-lg overflow-hidden bg-white">
            <iframe
              key={embedKey}
              src={doc.embedUrl}
              className="w-full h-full"
              frameBorder="0"
              title={doc.title}
              allowFullScreen
            />
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-2 text-center">
            Last refreshed: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex gap-3">
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
          >
            Edit in Google Docs
          </a>
          <button
            onClick={() => window.open(doc.url.replace('/edit', '/export?format=pdf'), '_blank')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}