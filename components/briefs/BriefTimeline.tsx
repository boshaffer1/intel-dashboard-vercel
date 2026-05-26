'use client';

import { useState } from 'react';
import { 
  CalendarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface Brief {
  id: number;
  date: string;
  title: string;
  mentions: number;
  sentiment: number;
  summary: string;
  keyEvents: string[];
}

interface BriefTimelineProps {
  briefs: Brief[];
  onBriefSelect?: (brief: Brief) => void;
  selectedBriefId?: number;
}

export default function BriefTimeline({ briefs, onBriefSelect, selectedBriefId }: BriefTimelineProps) {
  const getSentimentTrend = (currentBrief: Brief, index: number) => {
    if (index === briefs.length - 1) return null;
    
    const previousBrief = briefs[index + 1];
    const sentimentChange = currentBrief.sentiment - previousBrief.sentiment;
    
    return {
      direction: sentimentChange > 0 ? 'up' : 'down',
      magnitude: Math.abs(sentimentChange)
    };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    };
  };

  return (
    <div className="bg-white border border-[var(--border-light)] rounded-lg shadow-sm">
      <div className="p-4 border-b border-[var(--border-light)]">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          Intelligence Timeline
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Chronological view of daily intelligence briefs
        </p>
      </div>

      <div className="max-h-96 overflow-y-auto p-4">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--border-light)]"></div>
          
          {briefs.map((brief, index) => {
            const { day, month, weekday } = formatDate(brief.date);
            const sentimentTrend = getSentimentTrend(brief, index);
            const isSelected = selectedBriefId === brief.id;
            
            return (
              <div key={brief.id} className="relative mb-6 last:mb-0">
                {/* Timeline Dot */}
                <div className={`absolute left-4 w-4 h-4 rounded-full border-2 ${
                  isSelected 
                    ? 'bg-[var(--primary)] border-[var(--primary)]' 
                    : 'bg-white border-[var(--border-light)]'
                }`}></div>
                
                {/* Content */}
                <div className="ml-12">
                  <div 
                    className={`p-4 border border-[var(--border-light)] rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      isSelected 
                        ? 'ring-2 ring-[var(--primary)] border-[var(--primary)] bg-blue-50' 
                        : 'hover:border-[var(--primary)]'
                    }`}
                    onClick={() => onBriefSelect?.(brief)}
                  >
                    {/* Date Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          <div className="text-xl font-bold text-[var(--text-primary)]">{day}</div>
                          <div className="text-xs text-[var(--text-secondary)] uppercase">{month}</div>
                        </div>
                        <div>
                          <div className="font-medium text-[var(--text-primary)]">{weekday}</div>
                          <div className="text-sm text-[var(--text-secondary)] flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            Daily Brief
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-sm text-[var(--text-secondary)]">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          {brief.mentions}
                        </div>
                        <div className={`flex items-center text-sm ${
                          brief.sentiment > 0.6 ? 'text-green-600' :
                          brief.sentiment > 0.4 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" />
                          {Math.round(brief.sentiment * 100)}%
                        </div>
                        {sentimentTrend && (
                          <div className={`flex items-center text-sm ${
                            sentimentTrend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {sentimentTrend.direction === 'up' ? (
                              <ArrowTrendingUpIcon className="w-4 h-4" />
                            ) : (
                              <ArrowTrendingDownIcon className="w-4 h-4" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                      {brief.summary}
                    </p>

                    {/* Key Events Preview */}
                    {brief.keyEvents.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {brief.keyEvents.slice(0, 2).map((event, eventIndex) => (
                          <span 
                            key={eventIndex}
                            className="text-xs bg-gray-100 text-[var(--text-secondary)] px-2 py-1 rounded truncate max-w-48"
                          >
                            {event.split(' ').slice(0, 4).join(' ')}...
                          </span>
                        ))}
                        {brief.keyEvents.length > 2 && (
                          <span className="text-xs text-[var(--text-secondary)]">
                            +{brief.keyEvents.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}