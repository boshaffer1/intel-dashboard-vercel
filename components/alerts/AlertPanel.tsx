'use client';

import { useState } from 'react';
import { 
  BellIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  category: 'sentiment' | 'volume' | 'competitor' | 'system';
  actionable?: boolean;
  read?: boolean;
}

interface AlertPanelProps {
  alerts?: Alert[];
  onMarkAsRead?: (alertId: string) => void;
  onDismiss?: (alertId: string) => void;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Negative Sentiment Spike',
    message: 'Sentiment dropped 25% in the last hour following debate coverage. Immediate response recommended.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    category: 'sentiment',
    actionable: true,
    read: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Competitor Activity Increase',
    message: 'Sarah Mitchell campaign increased social media activity by 40%. Monitor for new messaging.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    category: 'competitor',
    actionable: true,
    read: false
  },
  {
    id: '3',
    type: 'info',
    title: 'Mention Volume Peak',
    message: 'Healthcare town hall generated 150+ mentions in 2 hours. Positive engagement trending.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    category: 'volume',
    actionable: false,
    read: true
  }
];

export default function AlertPanel({ 
  alerts = mockAlerts, 
  onMarkAsRead,
  onDismiss 
}: AlertPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'actionable'>('all');

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <InformationCircleIcon className="w-5 h-5 text-blue-600" />;
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
    }
  };

  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
    }
  };

  const getCategoryIcon = (category: Alert['category']) => {
    switch (category) {
      case 'sentiment':
        return <ArrowTrendingDownIcon className="w-4 h-4" />;
      case 'volume':
        return <ArrowTrendingUpIcon className="w-4 h-4" />;
      case 'competitor':
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'system':
        return <InformationCircleIcon className="w-4 h-4" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'unread':
        return !alert.read;
      case 'actionable':
        return alert.actionable;
      default:
        return true;
    }
  });

  const unreadCount = alerts.filter(alert => !alert.read).length;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60 * 1000) return 'Just now';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m ago`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Alert Bell */}
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 bg-white border border-[var(--border-light)] rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          <BellIcon className="w-6 h-6 text-[var(--text-secondary)]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Alert Panel */}
      {isExpanded && (
        <div className="absolute top-16 right-0 w-96 bg-white border border-[var(--border-light)] rounded-lg shadow-xl max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-[var(--border-light)]">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Alerts {unreadCount > 0 && `(${unreadCount} unread)`}
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex space-x-2 mt-3">
              {[
                { key: 'all', label: 'All' },
                { key: 'unread', label: 'Unread' },
                { key: 'actionable', label: 'Action Required' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as typeof filter)}
                  className={`text-xs px-3 py-1 rounded transition-colors ${
                    filter === tab.key
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alert List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredAlerts.length === 0 ? (
              <div className="p-4 text-center text-[var(--text-secondary)]">
                No alerts to display
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 border-b border-[var(--border-light)] last:border-b-0 ${
                    !alert.read ? 'bg-blue-25' : ''
                  } hover:bg-gray-50 transition-colors`}
                >
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          !alert.read ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                        }`}>
                          {alert.title}
                        </h4>
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(alert.category)}
                          <span className="text-xs text-[var(--text-secondary)]">
                            {alert.category}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-[var(--text-secondary)] mb-2 line-clamp-2">
                        {alert.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--text-secondary)]">
                          {formatTime(alert.timestamp)}
                        </span>
                        
                        <div className="flex space-x-2">
                          {alert.actionable && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                              Action Required
                            </span>
                          )}
                          {!alert.read && onMarkAsRead && (
                            <button
                              onClick={() => onMarkAsRead(alert.id)}
                              className="text-xs text-[var(--primary)] hover:text-[var(--primary-dark)]"
                            >
                              Mark Read
                            </button>
                          )}
                          {onDismiss && (
                            <button
                              onClick={() => onDismiss(alert.id)}
                              className="text-xs text-[var(--text-secondary)] hover:text-red-600"
                            >
                              Dismiss
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}