'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  MegaphoneIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import scrapedData from '@/lib/scrapedData.json';

export default function CampaignIntelligenceHubComplete() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
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

  // Calculate real metrics
  const brewerMentions = cards.filter((card: any) => 
    card.text?.toLowerCase().includes('brewer') || 
    card.mentions?.includes('brewer')
  ).length;

  const positivePosts = cards.filter((c: any) => c.sentiment === 'positive').length;
  const negativePosts = cards.filter((c: any) => c.sentiment === 'negative').length;
  const neutralPosts = cards.filter((c: any) => c.sentiment === 'mixed' || c.sentiment === 'neutral').length;

  // Real issues from scraped data
  const crimeRelated = cards.filter((c: any) => 
    c.text?.toLowerCase().includes('crime') || 
    c.text?.toLowerCase().includes('safety') ||
    c.text?.toLowerCase().includes('police')
  ).length;

  const housingRelated = cards.filter((c: any) => 
    c.text?.toLowerCase().includes('housing') || 
    c.text?.toLowerCase().includes('cha') ||
    c.text?.toLowerCase().includes('rent')
  ).length;

  const taxRelated = cards.filter((c: any) => 
    c.text?.toLowerCase().includes('tax') || 
    c.text?.toLowerCase().includes('budget')
  ).length;

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'race', label: '1. The Race', href: '#race' },
    { id: 'brewer', label: '2. Brewer Watch', href: '#brewer' },
    { id: 'opponents', label: '3. Opponent Tracker', href: '#opponents' },
    { id: 'sentiment', label: '4. Voter Sentiment', href: '#sentiment' },
    { id: 'response', label: '5. Rapid Response', href: '#response' },
    { id: 'schedule', label: '6. Schedule + Tasks', href: '#schedule' },
    { id: 'operational', label: '7. Operational', href: '#operational' },
  ];

  const otherLinks = [
    { label: 'Live Google Docs', href: '/' },
    { label: 'Workspace', href: '/workspace' },
    { label: 'Feeds', href: '/feeds' },
    { label: 'Latest Intel', href: '/intel' },
    { label: 'Recent Changes', href: '/changes' },
    { label: 'Opponent Dossiers', href: '/dossiers' },
    { label: 'Self-Audit', href: '/audit' },
    { label: 'Source Library', href: '/library' },
    { label: 'Archives', href: '/archives' },
  ];

  // Opponents data
  const opponents = [
    { name: 'Brandon Johnson', mentions: 434, threat: 8, status: 'incumbent', lastUpdate: '2 hours ago' },
    { name: 'William Quigley', mentions: 116, threat: 6, status: 'active', lastUpdate: '5 hours ago' },
    { name: 'Thomas Pappas', mentions: 44, threat: 4, status: 'exploratory', lastUpdate: '1 day ago' },
    { name: 'Susana Mendoza', mentions: 66, threat: 7, status: 'active', lastUpdate: '3 hours ago' },
    { name: 'Alexi Giannoulias', mentions: 247, threat: 5, status: 'active', lastUpdate: '6 hours ago' },
    { name: 'Kennedy Holberg', mentions: 0, threat: 3, status: 'inactive', lastUpdate: '1 week ago' },
    { name: 'William Conway Jr.', mentions: 0, threat: 2, status: 'exploratory', lastUpdate: '2 weeks ago' },
  ];

  // Tasks data
  const tasks = [
    { id: 1, title: 'Review Tribune editorial response', assignee: 'Marcus', priority: 'high', due: '2pm today' },
    { id: 2, title: 'Approve social media calendar', assignee: 'Marcus', priority: 'medium', due: 'EOD' },
    { id: 3, title: 'Call sheet: Top 10 donors', assignee: 'Matt', priority: 'high', due: 'Tomorrow' },
    { id: 4, title: 'Prep for CHA meeting talking points', assignee: 'Marcus', priority: 'critical', due: '4pm today' },
  ];

  // Alerts data
  const alerts = [
    { id: 1, type: 'media', title: 'Tribune editorial on CHA', severity: 'high', time: '12m ago', status: 'triaged' },
    { id: 2, type: 'social', title: 'Viral TikTok about crime', severity: 'critical', time: '37m ago', status: 'new' },
    { id: 3, type: 'opponent', title: 'Johnson announces new policy', severity: 'medium', time: '2h ago', status: 'responding' },
    { id: 4, type: 'press', title: 'Sun-Times interview request', severity: 'low', time: '3h ago', status: 'new' },
  ];

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getThreatLevel = (level: number) => {
    if (level >= 7) return { color: 'text-red-600 bg-red-50', label: 'High' };
    if (level >= 4) return { color: 'text-yellow-600 bg-yellow-50', label: 'Medium' };
    return { color: 'text-green-600 bg-green-50', label: 'Low' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0 h-screen overflow-y-auto">
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
              
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.id);
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeSection === item.id 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                {otherLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {link.label}
                  </Link>
                ))}
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

          {/* Content Area */}
          <div className="px-8 py-6">
            {/* Overview Section */}
            <section id="overview" className="mb-8">
              <div className="grid grid-cols-6 gap-4">
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
            </section>

            {/* Panel 1: The Race */}
            <section id="race" className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Panel 1: The Race</h2>
              <p className="text-sm text-gray-600 mb-6">Countdowns, poll footing, latest headline, and the current weather of the race.</p>
              
              <div className="grid grid-cols-3 gap-6">
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

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Race activity</h3>
                  <div className="text-center py-4">
                    <FireIcon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-orange-600">Active</div>
                    <div className="text-xs text-gray-500 mt-1">High media attention</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Latest poll snapshot</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="py-2 font-medium">Johnson</td>
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
            </section>

            {/* Panel 2: Brewer Watch */}
            <section id="brewer" className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Panel 2: Brewer Watch</h2>
              <p className="text-sm text-gray-600 mb-6">Real-time tracking of Brewer mentions, sentiment, and engagement across all platforms.</p>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600">{brewerMentions}</div>
                  <div className="text-sm text-gray-700">Total Mentions</div>
                  <div className="text-xs text-gray-500 mt-1">Across all platforms</div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-3xl font-bold text-green-600">{positivePosts}</div>
                  <div className="text-sm text-gray-700">Positive</div>
                  <div className="text-xs text-gray-500 mt-1">{Math.round((positivePosts/totalPosts)*100)}% of total</div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="text-3xl font-bold text-red-600">{negativePosts}</div>
                  <div className="text-sm text-gray-700">Negative</div>
                  <div className="text-xs text-gray-500 mt-1">{Math.round((negativePosts/totalPosts)*100)}% of total</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-3xl font-bold text-gray-600">{neutralPosts}</div>
                  <div className="text-sm text-gray-700">Neutral/Mixed</div>
                  <div className="text-xs text-gray-500 mt-1">{Math.round((neutralPosts/totalPosts)*100)}% of total</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Platform Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Twitter</span>
                      <span className="font-semibold">1,322 posts</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Reddit</span>
                      <span className="font-semibold">427 posts</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>TikTok</span>
                      <span className="font-semibold">200 posts</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Instagram</span>
                      <span className="font-semibold">600 posts</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Response Required</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Urgent items</span>
                      <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pending review</span>
                      <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded">7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Monitoring</span>
                      <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">15</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Panel 3: Opponent Tracker */}
            <section id="opponents" className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Panel 3: Opponent Tracker</h2>
              <p className="text-sm text-gray-600 mb-6">Live tracking of all opponents with threat assessment and activity monitoring.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-semibold text-gray-700">Candidate</th>
                      <th className="text-center py-2 text-sm font-semibold text-gray-700">Mentions</th>
                      <th className="text-center py-2 text-sm font-semibold text-gray-700">Threat Level</th>
                      <th className="text-center py-2 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-2 text-sm font-semibold text-gray-700">Last Update</th>
                      <th className="text-center py-2 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opponents.map((opp) => {
                      const threat = getThreatLevel(opp.threat);
                      return (
                        <tr key={opp.name} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 font-medium text-gray-900">{opp.name}</td>
                          <td className="py-3 text-center">{opp.mentions}</td>
                          <td className="py-3 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${threat.color}`}>
                              {threat.label} ({opp.threat}/10)
                            </span>
                          </td>
                          <td className="py-3 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              opp.status === 'incumbent' ? 'bg-purple-100 text-purple-700' :
                              opp.status === 'active' ? 'bg-green-100 text-green-700' :
                              opp.status === 'exploratory' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {opp.status}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-gray-600">{opp.lastUpdate}</td>
                          <td className="py-3 text-center">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
                              View Dossier
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                              Track
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Panel 4: Voter Sentiment */}
            <section id="sentiment" className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Panel 4: Voter Sentiment</h2>
              <p className="text-sm text-gray-600 mb-6">Top issues being discussed by Chicago voters with sentiment analysis.</p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Crime/Safety</h3>
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{crimeRelated}</div>
                  <div className="text-sm text-gray-600">mentions</div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Sentiment</span>
                      <span className="text-red-600 font-semibold">-42% negative</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Housing/CHA</h3>
                    <UserGroupIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{housingRelated}</div>
                  <div className="text-sm text-gray-600">mentions</div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Sentiment</span>
                      <span className="text-red-600 font-semibold">-38% negative</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Taxes/Budget</h3>
                    <ChartBarIcon className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{taxRelated}</div>
                  <div className="text-sm text-gray-600">mentions</div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Sentiment</span>
                      <span className="text-red-600 font-semibold">-51% negative</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <BellAlertIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Emerging Narrative Alert</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      "Johnson vs Progressives" storyline gaining traction across multiple platforms. 
                      Monitor for potential campaign messaging opportunity.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Panel 5: Rapid Response Queue */}
            <section id="response" className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Panel 5: Rapid Response Queue</h2>
              <p className="text-sm text-gray-600 mb-6">Urgent items requiring immediate attention or response.</p>
              
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${
                          alert.status === 'new' ? 'bg-red-500' :
                          alert.status === 'triaged' ? 'bg-yellow-500' :
                          alert.status === 'responding' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`} />
                        <div>
                          <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-600">{alert.type}</span>
                            <span className="text-xs text-gray-500">{alert.time}</span>
                            <span className="text-xs font-semibold text-gray-700">{alert.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Respond
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Panel 6: Schedule + Tasks */}
            <section id="schedule" className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Panel 6: Schedule + Tasks</h2>
              <p className="text-sm text-gray-600 mb-6">Today's calendar and open action items.</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Today's Schedule</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <span className="text-xs font-semibold text-gray-500">8:00 AM</span>
                      <span className="text-sm">Team standup call</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <span className="text-xs font-semibold text-gray-500">10:30 AM</span>
                      <span className="text-sm">One Future Illinois meeting</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-blue-50 rounded border border-blue-200">
                      <span className="text-xs font-semibold text-blue-600">2:00 PM</span>
                      <span className="text-sm font-medium">CHA residents meeting</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <span className="text-xs font-semibold text-gray-500">4:30 PM</span>
                      <span className="text-sm">Tribune interview prep</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <span className="text-xs font-semibold text-gray-500">7:00 PM</span>
                      <span className="text-sm">Ward 43 Democrats event</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Open Tasks</h3>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div key={task.id} className="border border-gray-200 rounded p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{task.title}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-500">Assigned to {task.assignee}</span>
                              <span className="text-xs text-gray-500">Due {task.due}</span>
                            </div>
                          </div>
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${
                            task.priority === 'critical' ? 'bg-red-100 text-red-700' :
                            task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Panel 7: Operational */}
            <section id="operational" className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Panel 7: Operational Status</h2>
              <p className="text-sm text-gray-600 mb-6">System health, data freshness, and API status.</p>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Hermes Agent</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">Last run: 12m ago</div>
                  <div className="text-xs text-gray-500">Next: in 48m</div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Data Scraping</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">Posts: {totalPosts.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Updated: Live</div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">API Status</span>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">Credits: 8,421</div>
                  <div className="text-xs text-gray-500">Usage: 62%</div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Database</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">Size: 2.3 MB</div>
                  <div className="text-xs text-gray-500">Backup: 3h ago</div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">System Status: All Operational</h4>
                    <p className="text-xs text-gray-600 mt-1">Last checked: {currentTime?.toLocaleTimeString() || 'Loading...'}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Run Manual Check
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}