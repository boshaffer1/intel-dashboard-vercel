'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { DocumentIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import scrapedData from '@/lib/scrapedData.json';

export default function IntelPage() {
  const cards = (scrapedData as any).cards || [];
  
  // Process real scraped data into intel format
  const processIntel = () => {
    const processed = cards
      .filter((card: any) => card.text || card.content)
      .slice(0, 20) // Get latest 20 items
      .map((card: any, index: number) => {
        const text = card.text || card.content || '';
        const platform = card.platform || 'Twitter';
        
        // Determine type based on content
        let type = 'social';
        let priority = 'low';
        
        if (text.toLowerCase().includes('johnson')) {
          type = 'opponent';
          priority = 'high';
        } else if (text.toLowerCase().includes('housing') || text.toLowerCase().includes('cha')) {
          type = 'policy';
          priority = 'medium';
        } else if (text.toLowerCase().includes('crime') || text.toLowerCase().includes('safety')) {
          type = 'breaking';
          priority = 'high';
        } else if (text.toLowerCase().includes('brewer')) {
          type = 'breaking';
          priority = 'high';
        }
        
        // Calculate time ago
        const created = new Date(card.created_at || card.timestamp || '2026-05-26');
        const now = new Date();
        const hoursAgo = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));
        let timeAgo = `${hoursAgo} hours ago`;
        if (hoursAgo < 1) {
          const minutesAgo = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
          timeAgo = `${minutesAgo} minutes ago`;
        } else if (hoursAgo > 24) {
          const daysAgo = Math.floor(hoursAgo / 24);
          timeAgo = `${daysAgo} days ago`;
        }
        
        return {
          id: index + 1,
          type,
          title: text.slice(0, 80) + (text.length > 80 ? '...' : ''),
          source: platform,
          author: card.author || '@unknown',
          time: timeAgo,
          priority,
          summary: text.slice(0, 150) + (text.length > 150 ? '...' : ''),
          engagement: card.engagement || { likes: 0, replies: 0, reposts: 0 }
        };
      });
      
    return processed;
  };
  
  const latestIntel = processIntel();
  
  // OLD MOCK DATA REMOVED - NOW USING REAL DATA
  // Mock data removed - using real scraped data above
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'breaking': return '🚨';
      case 'social': return '💬';
      case 'opponent': return '👤';
      case 'policy': return '📋';
      case 'media': return '📰';
      default: return '📌';
    }
  };
  
  return (
    <DashboardLayout>
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Latest Intelligence</h1>
            <p className="text-gray-600">Real-time updates from all monitoring channels</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Auto-refresh</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="space-y-4">
          {latestIntel.map((item) => (
            <div key={item.id} className={`bg-white rounded-lg border p-6 ${getPriorityColor(item.priority)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{getTypeIcon(item.type)}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.summary}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">{item.source} • {item.author}</span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {item.time}
                      </span>
                      <span className={`font-semibold px-2 py-0.5 rounded text-xs ${
                        item.priority === 'high' ? 'bg-red-100 text-red-700' :
                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.priority} priority
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Analyze
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Archive
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-blue-900">
              <strong>Intelligence Summary:</strong> Increased activity around housing policy and CHA privatization. 
              Multiple opponents positioning on this issue. Recommend preparing comprehensive housing platform response.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}