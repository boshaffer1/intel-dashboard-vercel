'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { BellAlertIcon, ExclamationTriangleIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ResponsePage() {
  const [activeTab, setActiveTab] = useState('pending');
  
  const alerts = [
    {
      id: 1,
      priority: 'HIGH',
      type: 'Opposition Attack',
      source: 'Johnson Campaign',
      time: '12 min ago',
      content: 'Johnson team releasing video attacking housing record',
      status: 'pending',
      action: 'Draft response highlighting CHA achievements'
    },
    {
      id: 2,
      priority: 'MEDIUM',
      type: 'Media Inquiry',
      source: 'Chicago Tribune',
      time: '37 min ago',
      content: 'Request for comment on progressive coalition fracture',
      status: 'pending',
      action: 'Prepare unity message, emphasize broad coalition'
    },
    {
      id: 3,
      priority: 'HIGH',
      type: 'Viral Misinformation',
      source: 'Twitter/X',
      time: '1 hour ago',
      content: 'False claim about CHA privatization plan spreading',
      status: 'in-progress',
      action: 'Fact-check thread posted, monitoring engagement'
    },
    {
      id: 4,
      priority: 'LOW',
      type: 'Policy Question',
      source: 'Reddit AMA',
      time: '2 hours ago',
      content: 'Detailed question about rent control position',
      status: 'completed',
      action: 'Comprehensive response posted'
    },
    {
      id: 5,
      priority: 'MEDIUM',
      type: 'Endorsement News',
      source: 'SEIU Healthcare',
      time: '3 hours ago',
      content: 'Union considering endorsement, needs healthcare plan details',
      status: 'completed',
      action: 'Policy brief sent, meeting scheduled'
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    if (activeTab === 'all') return true;
    return alert.status === activeTab;
  });

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'HIGH': return 'text-red-600 bg-red-50';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50';
      case 'LOW': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <BellAlertIcon className="w-5 h-5 text-red-500" />;
      case 'in-progress': return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'completed': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel 5: Rapid Response</h1>
        <p className="text-gray-600 mb-6">Monitor and respond to real-time campaign developments</p>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 rounded-lg border border-red-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-red-900">Critical Alerts</h3>
              <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-900">2</div>
            <div className="text-xs text-red-700 mt-1">Require immediate action</div>
          </div>

          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-yellow-900">In Progress</h3>
              <ClockIcon className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-900">1</div>
            <div className="text-xs text-yellow-700 mt-1">Being addressed</div>
          </div>

          <div className="bg-green-50 rounded-lg border border-green-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-green-900">Resolved Today</h3>
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-900">8</div>
            <div className="text-xs text-green-700 mt-1">Successfully handled</div>
          </div>

          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-blue-900">Avg Response</h3>
              <ClockIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-900">23m</div>
            <div className="text-xs text-blue-700 mt-1">Time to first action</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['pending', 'in-progress', 'completed', 'all'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.replace('-', ' ')}
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">
                    {alerts.filter(a => tab === 'all' || a.status === tab).length}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(alert.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getPriorityColor(alert.priority)}`}>
                            {alert.priority}
                          </span>
                          <span className="text-sm font-medium text-gray-900">{alert.type}</span>
                          <span className="text-sm text-gray-500">from {alert.source}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{alert.content}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <div className="mt-3 pl-8">
                    <span className="text-xs font-semibold text-gray-600 uppercase">Action: </span>
                    <span className="text-sm text-gray-700">{alert.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}