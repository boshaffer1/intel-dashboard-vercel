'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { ServerIcon, CircleStackIcon, ShieldCheckIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function OperationalPage() {
  const systemMetrics = [
    { name: 'Dashboard Uptime', value: '99.98%', status: 'healthy', trend: 'stable' },
    { name: 'Data Pipeline', value: 'Active', status: 'healthy', trend: 'processing' },
    { name: 'API Response Time', value: '243ms', status: 'healthy', trend: 'improving' },
    { name: 'Database Size', value: '3.2 GB', status: 'warning', trend: 'growing' }
  ];

  const dataStreams = [
    { source: 'Twitter/X API', posts: 1243, lastSync: '2 min ago', status: 'active', health: 100 },
    { source: 'Reddit Scraper', posts: 876, lastSync: '15 min ago', status: 'active', health: 95 },
    { source: 'Instagram Feed', posts: 234, lastSync: '1 hour ago', status: 'delayed', health: 75 },
    { source: 'TikTok Monitor', posts: 196, lastSync: '45 min ago', status: 'active', health: 85 },
    { source: 'News RSS', posts: 89, lastSync: '5 min ago', status: 'active', health: 100 },
    { source: 'Google Alerts', posts: 12, lastSync: '30 min ago', status: 'active', health: 90 }
  ];

  const recentLogs = [
    { time: '14:23:45', level: 'INFO', message: 'Successfully scraped 47 new posts from Twitter/X' },
    { time: '14:22:13', level: 'WARNING', message: 'Instagram API rate limit approaching (80% used)' },
    { time: '14:18:02', level: 'INFO', message: 'Automated backup completed successfully' },
    { time: '14:15:30', level: 'ERROR', message: 'Failed to connect to TikTok API - retrying...' },
    { time: '14:15:35', level: 'SUCCESS', message: 'TikTok API connection restored' },
    { time: '14:10:00', level: 'INFO', message: 'Daily report generation started' }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'active': return 'text-green-600';
      case 'delayed': return 'text-yellow-600';
      case 'offline': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getLogColor = (level: string) => {
    switch(level) {
      case 'SUCCESS': return 'text-green-600 bg-green-50';
      case 'INFO': return 'text-blue-600 bg-blue-50';
      case 'WARNING': return 'text-yellow-600 bg-yellow-50';
      case 'ERROR': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <DashboardLayout>
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel 7: Operational</h1>
        <p className="text-gray-600 mb-6">System health, data pipeline status, and performance monitoring</p>
        
        {/* System Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {systemMetrics.map((metric) => (
            <div key={metric.name} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-gray-600 uppercase">{metric.name}</h3>
                <ServerIcon className="w-4 h-4 text-gray-400" />
              </div>
              <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                {metric.value}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Status: <span className={getStatusColor(metric.status)}>{metric.status}</span> • {metric.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Data Streams */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Data Streams</h3>
              <CircleStackIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {dataStreams.map((stream) => (
                <div key={stream.source} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{stream.source}</span>
                      <span className={`text-xs font-medium ${getStatusColor(stream.status)}`}>
                        • {stream.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {stream.posts} posts • Last: {stream.lastSync}
                    </div>
                  </div>
                  <div className="w-16">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          stream.health > 90 ? 'bg-green-500' :
                          stream.health > 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{width: `${stream.health}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Logs */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Recent Activity</h3>
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-2">
              {recentLogs.map((log, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 font-mono">{log.time}</span>
                    <span className={`px-1.5 py-0.5 rounded font-medium ${getLogColor(log.level)}`}>
                      {log.level}
                    </span>
                    <span className="text-gray-700 flex-1">{log.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Status */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Security & Compliance</h3>
            <ShieldCheckIcon className="w-5 h-5 text-green-500" />
          </div>
          <div className="grid grid-cols-4 gap-6 text-sm">
            <div>
              <div className="text-gray-500">Last Security Scan</div>
              <div className="font-semibold text-gray-900">2 hours ago</div>
              <div className="text-xs text-green-600 mt-1">No issues found</div>
            </div>
            <div>
              <div className="text-gray-500">SSL Certificate</div>
              <div className="font-semibold text-gray-900">Valid</div>
              <div className="text-xs text-gray-600 mt-1">Expires in 45 days</div>
            </div>
            <div>
              <div className="text-gray-500">Data Encryption</div>
              <div className="font-semibold text-gray-900">AES-256</div>
              <div className="text-xs text-green-600 mt-1">Active</div>
            </div>
            <div>
              <div className="text-gray-500">Access Control</div>
              <div className="font-semibold text-gray-900">MFA Enabled</div>
              <div className="text-xs text-green-600 mt-1">7 authorized users</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}