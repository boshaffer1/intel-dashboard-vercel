'use client';

import { useState, useEffect } from 'react';
import { 
  CalendarIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserGroupIcon,
  BellAlertIcon,
  FireIcon,
  DocumentTextIcon,
  ChartBarIcon,
  NewspaperIcon,
  FolderIcon,
  RssIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';
import scrapedData from '@/lib/scrapedData.json';

export default function CampaignIntelligenceHub() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [electionDate] = useState(new Date('2027-02-23')); // Chicago primary
  const [runoffDate] = useState(new Date('2027-04-06')); // Potential runoff
  const [filingDeadline] = useState(new Date('2026-10-25')); 
  
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const daysUntilElection = currentTime ? Math.floor((electionDate.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const daysUntilFiling = currentTime ? Math.floor((filingDeadline.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  // Process scraped data
  const cards = (scrapedData as any).cards || [];
  const totalPosts = cards.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            {/* Dashboard Title */}
            <div className="mb-8">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Dashboard</span>
              <h1 className="text-xl font-bold text-gray-900 mt-1">Campaign command center</h1>
              <p className="text-sm text-gray-600 mt-2">
                Bloomberg Terminal for the race: live docs, scraped feeds, dossiers, and action lanes.
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Seven Panels</span>
              
              <a href="#overview" className="block px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md">
                Overview
              </a>
              
              <a href="#race" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                1. The Race
              </a>
              
              <a href="#brewer" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                2. Brewer Watch
              </a>
              
              <a href="#opponents" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                3. Opponent Tracker
              </a>
              
              <a href="#sentiment" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                4. Voter Sentiment
              </a>
              
              <a href="#response" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                5. Rapid Response
              </a>
              
              <a href="#schedule" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                6. Schedule + Tasks
              </a>
              
              <a href="#operational" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                7. Operational
              </a>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <a href="/documents" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Live Google Docs
                </a>
                
                <a href="#workspace" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Workspace
                </a>
                
                <a href="#feeds" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Feeds
                </a>
                
                <a href="#intel" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Latest Intel
                </a>
                
                <a href="#changes" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Recent Changes
                </a>
                
                <a href="#dossiers" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Opponent Dossiers
                </a>
                
                <a href="#audit" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Self-Audit
                </a>
                
                <a href="#library" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Source Library
                </a>
                
                <a href="#archives" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Archives
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50">
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

          {/* Quick Stats Cards */}
          <div className="px-8 py-6">
            <div className="grid grid-cols-6 gap-4 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-xs text-gray-500 mt-1">Daily briefs</div>
                <div className="text-xs text-gray-400">Latest: Not yet generated</div>
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
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-xs text-gray-500 mt-1">Legacy intel cards</div>
                <div className="text-xs text-gray-400">Recent changes: 7</div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="text-2xl font-bold text-gray-900">17</div>
                <div className="text-xs text-gray-500 mt-1">Legacy feed panes</div>
                <div className="text-xs text-gray-400">Full scraped collections</div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="text-2xl font-bold text-gray-900">7</div>
                <div className="text-xs text-gray-500 mt-1">Google Docs</div>
                <div className="text-xs text-gray-400">Live external documents</div>
              </div>
            </div>

            {/* Panel 1: The Race */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Panel 1: The Race</h2>
              <p className="text-sm text-gray-600 mb-6">Countdowns, poll footing, latest headline, and the current weather of the race.</p>
              
              <div className="grid grid-cols-3 gap-6">
                {/* Race Clock */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Race clock</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-500">Days until election</div>
                      <div className="text-3xl font-bold text-gray-900">{daysUntilElection}</div>
                      <div className="text-xs text-gray-400">Feb 23, 2027</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Days until filing deadline</div>
                      <div className="text-2xl font-bold text-yellow-600">{daysUntilFiling}</div>
                      <div className="text-xs text-gray-400">Oct 25, 2026</div>
                    </div>
                  </div>
                </div>

                {/* Race Activity */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Race activity</h3>
                  <div className="text-center py-4">
                    <div className="text-sm font-medium text-yellow-600">Active</div>
                  </div>
                </div>

                {/* Latest Poll Snapshot */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Latest poll snapshot</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-500">
                        <th className="text-left py-1"></th>
                        <th className="text-right py-1">Suffolk / Tribune</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="py-2 font-medium">Brewer</td>
                        <td className="text-right">Not in latest surfaced poll</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="py-2">Johnson</td>
                        <td className="text-right font-semibold">34% fav / 44% unfav</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="py-2">Giannoulias</td>
                        <td className="text-right">42% fav / 7% unfav</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="py-2">Quigley</td>
                        <td className="text-right">21% fav / 12% unfav</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Latest Headlines */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Latest race headline</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <NewspaperIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-blue-600 font-medium">Imported signal</span>
                  </div>
                  <p className="text-sm text-gray-900">
                    Interim Chicago Housing Authority head Matthew Brewer considering mayoral run
                  </p>
                  <a href="#" className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                    https://x.co/wkvw0sMwe
                  </a>
                </div>
              </div>

              {/* Poll Description */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  Suffolk/Chicago Tribune (4/11-4/15) poll surfaced in scrape: Giannoulias 42% fav / 7% unfav (+35) leads the field, 
                  Mendoza +27, Quigley +9, Johnson 34% fav / 44% unfav (-10). Brewer is not yet in the poll. Both major contenders 
                  run anti-Trump campaigns, leaving Chicago kitchen-table issues (taxes, schools, housing, transit, crime) underserved. 
                  Progressive insurgency probable.
                </p>
              </div>
            </div>

            {/* Additional Panels would go here... */}
            {/* Panel 2: Brewer Watch */}
            {/* Panel 3: Opponent Tracker */}
            {/* Panel 4: Voter Sentiment */}
            {/* Panel 5: Rapid Response */}
            {/* Panel 6: Schedule + Tasks */}
            {/* Panel 7: Operational */}
          </div>
        </div>
      </div>
    </div>
  );
}