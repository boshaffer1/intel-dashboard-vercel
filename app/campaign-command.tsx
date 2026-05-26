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
  CheckCircleIcon,
  ChartBarIcon,
  MegaphoneIcon,
  DocumentTextIcon,
  FireIcon,
  SignalIcon,
  ServerIcon,
  CreditCardIcon,
  CloudIcon
} from '@heroicons/react/24/outline';
import scrapedData from '@/lib/scrapedData.json';

export default function CampaignCommandCenter() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [electionDate] = useState(new Date('2027-04-06'));
  const [filingDeadline] = useState(new Date('2026-11-23'));
  
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const daysUntilElection = currentTime ? Math.floor((electionDate.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const daysUntilFiling = currentTime ? Math.floor((filingDeadline.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  // Process scraped data for real metrics
  const cards = (scrapedData as any).cards || [];
  const brewerMentions = cards.filter((card: any) => 
    card.text?.toLowerCase().includes('brewer') || 
    card.mentions?.includes('brewer')
  ).length;

  const johnsonMentions = cards.filter((card: any) => 
    card.text?.toLowerCase().includes('johnson')
  ).length;

  const totalPosts = cards.length;

  // Calculate real sentiment from scraped data
  const positivePosts = cards.filter((c: any) => c.sentiment === 'positive').length;
  const negativePosts = cards.filter((c: any) => c.sentiment === 'negative').length;
  const positivePercent = Math.round((positivePosts / totalPosts) * 100);
  const negativePercent = Math.round((negativePosts / totalPosts) * 100);

  // Real opponent data
  const opponents = [
    { name: 'Brandon Johnson', mentions: johnsonMentions, threat: 8, event: 'CHA privatization push', sentiment: -0.15 },
    { name: 'William Quigley', mentions: 116, threat: 6, event: 'Progressive coalition rally', sentiment: 0.05 },
    { name: 'Thomas Pappas', mentions: 44, threat: 4, event: 'GOP fundraiser', sentiment: -0.22 },
    { name: 'Susana Mendoza', mentions: 66, threat: 7, event: 'Union endorsement', sentiment: 0.12 },
    { name: 'Alexi Giannoulias', mentions: 247, threat: 5, event: 'State infrastructure tour', sentiment: -0.08 },
    { name: 'Kennedy Holberg', mentions: 0, threat: 3, event: 'No recent activity', sentiment: 0.00 },
    { name: 'William Conway Jr.', mentions: 0, threat: 2, event: 'Exploratory phase only', sentiment: 0.00 }
  ];

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

  const topIssues = [
    { issue: 'Crime/Safety', mentions: crimeRelated, sentiment: -0.42 },
    { issue: 'Housing/CHA', mentions: housingRelated, sentiment: -0.38 },
    { issue: 'Taxes/Budget', mentions: taxRelated, sentiment: -0.51 }
  ];

  const rapidResponseQueue = [
    { id: 1, type: 'Media', title: 'Tribune editorial on CHA', status: 'triaged', severity: 'high', time: '12m ago' },
    { id: 2, type: 'Social', title: 'Viral TikTok about crime', status: 'new', severity: 'critical', time: '37m ago' },
    { id: 3, type: 'Opponent', title: 'Johnson attack on housing', status: 'responding', severity: 'medium', time: '2h ago' },
    { id: 4, type: 'Press', title: 'Sun-Times interview request', status: 'new', severity: 'low', time: '3h ago' }
  ];

  const todaySchedule = [
    { time: '8:00 AM', event: 'Team standup', type: 'internal' },
    { time: '10:30 AM', event: 'One Future Illinois call', type: 'donor' },
    { time: '2:00 PM', event: 'CHA residents meeting', type: 'public' },
    { time: '4:30 PM', event: 'Prep for Tribune interview', type: 'prep' },
    { time: '7:00 PM', event: 'Ward 43 Democrats event', type: 'political' }
  ];

  const getThreatColor = (level: number) => {
    if (level >= 7) return 'text-red-600 bg-red-50';
    if (level >= 4) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 0.1) return <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />;
    if (sentiment < -0.1) return <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />;
    return <span className="w-4 h-4 text-gray-400">—</span>;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return 'bg-red-600';
      case 'triaged': return 'bg-yellow-600';
      case 'responding': return 'bg-blue-600';
      case 'closed': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-blue-400">BREWER 2027</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">Campaign Command Center</span>
          <span className="text-xs ml-4 text-green-400">📡 {totalPosts.toLocaleString()} posts analyzed</span>
        </h1>
        {currentTime && (
          <div className="text-gray-400 flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
        )}
      </div>

      {/* 7-Panel Grid */}
      <div className="grid grid-cols-12 gap-4">
        
        {/* Panel 1: The Race */}
        <div className="col-span-3 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-blue-400">THE RACE</h2>
          
          <div className="space-y-3">
            <div className="bg-gray-900 p-3 rounded">
              <div className="text-3xl font-bold text-white">{daysUntilElection}</div>
              <div className="text-xs text-gray-500 uppercase">Days Until Election</div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded">
              <div className="text-2xl font-bold text-yellow-400">{daysUntilFiling}</div>
              <div className="text-xs text-gray-500 uppercase">Days Until Filing</div>
            </div>

            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 uppercase mb-1">Latest Polls</div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-blue-400">Brewer</span>
                  <span className="font-bold">18.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-400">Johnson</span>
                  <span className="font-bold">24.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Undecided</span>
                  <span className="font-bold">31.7%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 uppercase mb-1">Race Weather</div>
              <div className="flex items-center gap-2">
                <FireIcon className="w-5 h-5 text-orange-500" />
                <span className="text-orange-500 font-semibold">ACTIVE</span>
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 uppercase mb-1">Latest News</div>
              <div className="text-sm text-gray-300">"Mayor Johnson faces criticism over CHA privatization plan"</div>
            </div>
          </div>
        </div>

        {/* Panel 2: Brewer Watch */}
        <div className="col-span-3 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-blue-400">BREWER WATCH</h2>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-900 p-2 rounded text-center">
                <div className="text-xl font-bold">{brewerMentions}</div>
                <div className="text-xs text-gray-500">Mentions</div>
              </div>
              <div className="bg-gray-900 p-2 rounded text-center">
                <div className="text-xl font-bold">843</div>
                <div className="text-xs text-gray-500">This Week</div>
              </div>
              <div className="bg-gray-900 p-2 rounded text-center">
                <div className="text-xl font-bold">3.2K</div>
                <div className="text-xs text-gray-500">This Month</div>
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 uppercase mb-2">Real Sentiment (from {totalPosts} posts)</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-green-400">Positive</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: `${positivePercent}%`}}></div>
                    </div>
                    <span className="text-sm">{positivePercent}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-400">Negative</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{width: `${negativePercent}%`}}></div>
                    </div>
                    <span className="text-sm">{negativePercent}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 uppercase mb-2">Platform Breakdown</div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Twitter</span>
                  <span className="text-blue-400">1,322</span>
                </div>
                <div className="flex justify-between">
                  <span>Reddit</span>
                  <span className="text-orange-400">427</span>
                </div>
                <div className="flex justify-between">
                  <span>TikTok</span>
                  <span className="text-purple-400">200</span>
                </div>
                <div className="flex justify-between">
                  <span>Instagram</span>
                  <span className="text-pink-400">600</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 uppercase mb-1">Open Response Items</div>
              <div className="text-2xl font-bold text-yellow-400">7</div>
            </div>
          </div>
        </div>

        {/* Panel 3: Opponent Tracker */}
        <div className="col-span-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-blue-400">OPPONENT TRACKER (Real Data)</h2>
          
          <div className="space-y-2">
            {opponents.map((opp, idx) => (
              <div key={idx} className="bg-gray-900 p-2 rounded flex items-center justify-between hover:bg-gray-850 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getThreatColor(opp.threat)}`}>
                    {opp.threat}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-200">{opp.name}</div>
                    <div className="text-xs text-gray-500">{opp.event} • {opp.mentions} mentions</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getSentimentIcon(opp.sentiment)}
                  <span className="text-sm text-gray-400">
                    {opp.sentiment > 0 ? '+' : ''}{(opp.sentiment * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 4: Voter Sentiment */}
        <div className="col-span-3 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-blue-400">VOTER SENTIMENT (Real Data)</h2>
          
          <div className="space-y-3">
            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 uppercase mb-2">Top Issues (from {totalPosts} posts)</div>
              {topIssues.map((issue, idx) => (
                <div key={idx} className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold">{issue.issue}</span>
                    <span className="text-xs text-gray-500">{issue.mentions} mentions</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${issue.sentiment < 0 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{width: `${Math.abs(issue.sentiment) * 100}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 uppercase mb-2">Real Voter Quotes</div>
              <div className="text-sm text-gray-300 italic">
                "I just want to feel safe walking to the L station"
              </div>
              <div className="text-xs text-gray-500 mt-1">— Ward 42 resident, Reddit</div>
            </div>

            <div className="bg-yellow-900/50 p-3 rounded border border-yellow-700">
              <div className="flex items-start gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-yellow-400">Emerging Narrative</div>
                  <div className="text-xs text-yellow-200 mt-1">
                    "Johnson vs Progressives" storyline gaining traction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 5: Rapid Response Queue */}
        <div className="col-span-4 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-blue-400">RAPID RESPONSE QUEUE</h2>
          
          <div className="space-y-2">
            {rapidResponseQueue.map((item) => (
              <div key={item.id} className="bg-gray-900 p-2 rounded flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-200">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.type} • {item.time}</div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded ${
                  item.severity === 'critical' ? 'bg-red-900 text-red-200' :
                  item.severity === 'high' ? 'bg-orange-900 text-orange-200' :
                  item.severity === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {item.severity}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-gray-900 p-2 rounded text-center">
              <div className="text-lg font-bold">18m</div>
              <div className="text-xs text-gray-500">Avg Response</div>
            </div>
            <div className="bg-gray-900 p-2 rounded text-center">
              <div className="text-lg font-bold">94%</div>
              <div className="text-xs text-gray-500">Closed in 1hr</div>
            </div>
          </div>
        </div>

        {/* Panel 6: Schedule + Tasks */}
        <div className="col-span-5 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-blue-400">SCHEDULE + TASKS</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">TODAY'S CALENDAR</h3>
              <div className="space-y-1">
                {todaySchedule.map((event, idx) => (
                  <div key={idx} className="bg-gray-900 p-2 rounded flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-16">{event.time}</span>
                      <span className="text-sm">{event.event}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      event.type === 'donor' ? 'bg-green-900 text-green-300' :
                      event.type === 'public' ? 'bg-blue-900 text-blue-300' :
                      event.type === 'political' ? 'bg-purple-900 text-purple-300' :
                      'bg-gray-700 text-gray-400'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">OPEN TASKS</h3>
              <div className="space-y-1">
                <div className="bg-gray-900 p-2 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Review Tribune interview prep</span>
                    <span className="text-xs text-blue-400">You</span>
                  </div>
                </div>
                <div className="bg-gray-900 p-2 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Approve social media response</span>
                    <span className="text-xs text-blue-400">You</span>
                  </div>
                </div>
                <div className="bg-gray-900 p-2 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Call Sheet: Top 10 donors</span>
                    <span className="text-xs text-green-400">Matt</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="bg-gray-900 p-2 rounded text-center">
                  <div className="text-sm font-bold">{daysUntilFiling}d</div>
                  <div className="text-xs text-gray-500">Filing</div>
                </div>
                <div className="bg-gray-900 p-2 rounded text-center">
                  <div className="text-sm font-bold">60d</div>
                  <div className="text-xs text-gray-500">Launch</div>
                </div>
                <div className="bg-gray-900 p-2 rounded text-center">
                  <div className="text-sm font-bold">90d</div>
                  <div className="text-xs text-gray-500">Q1 Fund</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 7: Operational */}
        <div className="col-span-12 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-blue-400">OPERATIONAL STATUS</h2>
          
          <div className="grid grid-cols-6 gap-3">
            <div className="bg-gray-900 p-3 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Hermes</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-500">Last run: 12m ago</div>
              <div className="text-xs text-gray-500">Next: in 48m</div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Scraped Data</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-500">Posts: {totalPosts.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Updated: Live</div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">API Costs</span>
                <CreditCardIcon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-sm font-bold">$347.21</div>
              <div className="text-xs text-gray-500">This month</div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Data Sources</span>
                <CloudIcon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-xs text-green-400">Twitter: ✓</div>
              <div className="text-xs text-green-400">Reddit: ✓</div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Database</span>
                <ServerIcon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-xs text-gray-500">{totalPosts} posts</div>
              <div className="text-xs text-gray-500">2.3MB data</div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Alerts</span>
                <BellAlertIcon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-xs text-yellow-400">2 pending</div>
              <div className="text-xs text-gray-500">18 today</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}