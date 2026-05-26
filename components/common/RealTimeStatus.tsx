'use client';

import { useState, useEffect } from 'react';
import { 
  SignalIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface RealTimeStatusProps {
  lastUpdated?: string;
  status?: 'connected' | 'disconnected' | 'warning';
  alertCount?: number;
}

export default function RealTimeStatus({ 
  lastUpdated = new Date().toISOString(), 
  status = 'connected',
  alertCount = 0 
}: RealTimeStatusProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    // Only set time on client side to avoid hydration mismatch
    setCurrentTime(new Date());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (alertCount > 0) {
      setIsBlinking(true);
      const timer = setTimeout(() => setIsBlinking(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertCount]);

  const getTimeSince = (timestamp: string) => {
    if (!currentTime) return '...'; // Return placeholder during SSR
    const diff = currentTime.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (minutes > 0) {
      return `${minutes}m ${seconds}s ago`;
    }
    return `${seconds}s ago`;
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: CheckCircleIcon,
          label: 'Live'
        };
      case 'warning':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: ExclamationTriangleIcon,
          label: 'Issues'
        };
      case 'disconnected':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: ExclamationTriangleIcon,
          label: 'Offline'
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: ClockIcon,
          label: 'Unknown'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="flex items-center space-x-4 text-sm">
      {/* Status Indicator */}
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${statusConfig.bgColor}`}>
        <div className="relative">
          <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
          {status === 'connected' && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>
        <span className={`font-medium ${statusConfig.color}`}>
          {statusConfig.label}
        </span>
      </div>

      {/* Last Updated */}
      <div className="flex items-center space-x-1 text-[var(--text-secondary)]">
        <ClockIcon className="w-4 h-4" />
        <span>Updated {getTimeSince(lastUpdated)}</span>
      </div>

      {/* Alerts */}
      {alertCount > 0 && (
        <div className={`flex items-center space-x-2 px-3 py-2 bg-red-100 rounded-lg ${
          isBlinking ? 'animate-pulse' : ''
        }`}>
          <ExclamationTriangleIcon className="w-4 h-4 text-red-600" />
          <span className="text-red-600 font-medium">
            {alertCount} alert{alertCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Real-time Signal */}
      <div className="flex items-center space-x-1">
        <SignalIcon className="w-4 h-4 text-[var(--primary)]" />
        <div className="flex space-x-1">
          <div className="w-1 h-3 bg-[var(--primary)] rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-4 bg-[var(--primary)] rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-3 bg-[var(--primary)] rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Current Time */}
      <div className="text-[var(--text-secondary)] font-mono">
        {currentTime ? currentTime.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        }) : '--:--:--'}
      </div>
    </div>
  );
}