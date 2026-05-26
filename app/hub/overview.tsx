'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import scrapedData from '@/lib/scrapedData.json';

export default function HubOverview() {
  const cards = (scrapedData as any).cards || [];
  const totalPosts = cards.length;
  const brewerMentions = cards.filter((card: any) => 
    card.text?.toLowerCase().includes('brewer') || 
    card.mentions?.includes('brewer')
  ).length;
  
  const [dailyBriefsCount, setDailyBriefsCount] = useState(0);
  const [latestBriefDate, setLatestBriefDate] = useState<string>('Not yet generated');
  
  useEffect(() => {
    // Get daily briefs from localStorage
    const savedBriefs = localStorage.getItem('dailyBriefs');
    if (savedBriefs) {
      const briefs = JSON.parse(savedBriefs);
      setDailyBriefsCount(briefs.length);
      if (briefs.length > 0) {
        const latest = briefs[0];
        const date = new Date(latest.date);
        setLatestBriefDate(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
      }
    }
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Internal Dashboard</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">Campaign intelligence hub</h1>
            <p className="text-gray-600 mt-2">
              Central place for daily briefs, weekly deep-dives, self-audits, and living opponent dossiers with dated change history.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Imported from the existing dashboard snapshot: Strategic intel + opposition catalog + candidate broadcast + voter-side data 
              (X mentions, r/chicago, TikTok). {totalPosts.toLocaleString()} datasets, ~20,000 items.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Source of truth</p>
            <p className="text-sm font-mono text-gray-600 mt-1">
              CAMPAIGN_CONTENT_ROOT
            </p>
            <p className="text-xs text-gray-500 mt-1">or parent campaign repo</p>
            <p className="text-xs text-gray-400 mt-3">App copy: intel-dashboard-vercel-codex</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-8 py-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{dailyBriefsCount}</div>
            <div className="text-xs text-gray-500 mt-1">Daily briefs</div>
            <div className="text-xs text-gray-400">Latest: {latestBriefDate}</div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-xs text-gray-500 mt-1">Weekly reports</div>
            <div className="text-xs text-gray-400">Latest: Not yet generated</div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">7</div>
            <div className="text-xs text-gray-500 mt-1">Opponent dossiers</div>
            <div className="text-xs text-gray-400">History snapshots: 0</div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{totalPosts.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">Scraped posts</div>
            <div className="text-xs text-gray-400">Live data feed</div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{brewerMentions}</div>
            <div className="text-xs text-gray-500 mt-1">Brewer mentions</div>
            <div className="text-xs text-gray-400">All platforms</div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">7</div>
            <div className="text-xs text-gray-500 mt-1">Google Docs</div>
            <div className="text-xs text-gray-400">Live external documents</div>
          </div>
        </div>

        {/* Quick Links to Panels */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
            <div className="space-y-3">
              <a href="/hub/race" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <span className="font-medium">The Race</span>
                <span className="text-sm text-gray-600 block">Election countdown and polling data</span>
              </a>
              <a href="/hub/brewer" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <span className="font-medium">Brewer Watch</span>
                <span className="text-sm text-gray-600 block">Real-time mention tracking</span>
              </a>
              <a href="/hub/opponents" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <span className="font-medium">Opponent Tracker</span>
                <span className="text-sm text-gray-600 block">Monitor all candidates</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                <div>
                  <span className="font-medium text-sm">New Intel Alert</span>
                  <span className="text-xs text-gray-600 block">Johnson announces CHA plan</span>
                </div>
                <span className="text-xs text-yellow-600 font-semibold">2m ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                <div>
                  <span className="font-medium text-sm">Feed Update</span>
                  <span className="text-xs text-gray-600 block">47 new social posts</span>
                </div>
                <span className="text-xs text-blue-600 font-semibold">15m ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                <div>
                  <span className="font-medium text-sm">Dossier Updated</span>
                  <span className="text-xs text-gray-600 block">Brandon Johnson profile</span>
                </div>
                <span className="text-xs text-green-600 font-semibold">1h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}