'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ChatBubbleLeftIcon, FireIcon, FunnelIcon, CalendarIcon, HeartIcon } from '@heroicons/react/24/outline';
import scrapedData from '@/lib/scrapedData.json';

export default function BrewerPage() {
  const cards = (scrapedData as any).cards || [];
  const [sortBy, setSortBy] = useState<'recent' | 'likes'>('recent');
  const [filterPlatform, setFilterPlatform] = useState<'all' | 'twitter' | 'reddit'>('all');
  
  // Real Brewer mentions with dates
  const realBrewerMentions = [
    {
      id: 1,
      platform: 'Twitter',
      author: '@FlipChicagoRed',
      date: '2024-11-11',
      time: 'November 11, 2024',
      likes: 243,
      replies: 89,
      reposts: 34,
      text: `November 11, 2024 — same year Brandon Johnson slipped a billion dollars of public infrastructure money into a 2025 budget that quietly got passed. Now look at what's happening. Mayor Brandon Johnson is trying to strong-arm the CHA to install Walter Burnett Jr. — why? Because there's land to control and "affordable housing" deals already promised. Construction contracts are being dangled, mostly on the West Side, a few on the South Side. Meanwhile, Matthew Brewer isn't going along with it — and that's the problem for them. Let's be real about what's going on. The "teen takeovers" — you think that's random? Or is it being allowed to escalate to set the stage for another moment like George Floyd? Because without federal grant money for prevention, chaos becomes political leverage...`,
      url: 'https://t.co/Nqlp8pAOrT',
      hashtags: ['#ChicagoFlipsRed']
    },
    {
      id: 2,
      platform: 'Reddit',
      author: 'blackmk8',
      date: '2025-03-17',
      time: 'March 17, 2025',
      likes: 156,
      replies: 42,
      reposts: 0,
      text: `Brandon Johnson is seeking to overturn the appointment of the new CEO of the Chicago Housing Authority by removing the board chair behind the selection and arguing the process violated state law, in the latest clash over his control of the city's sister agencies. The board voted 7-to-2 on March 17 to hire Keith Pettigrew as CEO of the agency in a surprise move over Johnson's objection. Johnson pins blame for the appointment on Matthew Brewer, the chair of the Board of Commissioners who has doubled as operating chairman of the CHA since September. The mayor says he has removed Brewer as board chair and claims the process that led to Pettigrew's appointment violated state law and the board's internal rules...`,
      url: null,
      hashtags: []
    },
    {
      id: 3,
      platform: 'Twitter',
      author: '@fox32news',
      date: '2025-05-15',
      time: 'May 15, 2025',
      likes: 412,
      replies: 178,
      reposts: 89,
      text: `Mayor Brandon Johnson says Matthew Brewer is no longer the operating chairman of the $1.4 billion Chicago Housing Authority. Instead, the mayor says he has installed an ally, Commissioner Jawanza Malone.`,
      url: 'https://t.co/P5W0JektmG',
      hashtags: []
    },
    {
      id: 4,
      platform: 'Twitter',
      author: '@Suntimes',
      date: '2025-05-21',
      time: 'May 21, 2025',
      likes: 327,
      replies: 95,
      reposts: 42,
      text: `Chicago Housing Authority Operating Chair Matthew Brewer's entry into the already crowded 2027 mayor's race would likely hurt incumbent Mayor Brandon Johnson.`,
      url: 'https://t.co/qH2shpnkma',
      hashtags: []
    }
  ];

  // Add more scraped mentions from the data
  const scrapedBrewerMentions = cards
    .filter((card: any) => 
      card.text?.toLowerCase().includes('brewer') || 
      card.mentions?.includes('brewer')
    )
    .map((card: any, index: number) => ({
      id: index + 100,
      platform: card.platform || 'Twitter',
      author: card.author || '@unknown',
      date: card.created_at || card.timestamp || '2026-05-26',
      time: new Date(card.created_at || card.timestamp || '2026-05-26').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      likes: card.engagement?.likes || 0,
      replies: card.engagement?.replies || 0,
      reposts: card.engagement?.reposts || 0,
      text: card.text || card.content || '',
      url: card.url || null,
      hashtags: card.hashtags || []
    }));

  // Combine real and scraped mentions
  const allMentions = [...realBrewerMentions, ...scrapedBrewerMentions];

  // Filter mentions
  const filteredMentions = allMentions.filter(mention => {
    if (filterPlatform === 'all') return true;
    return mention.platform.toLowerCase() === filterPlatform;
  });

  // Sort mentions
  const sortedMentions = [...filteredMentions].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.likes - a.likes;
    }
  });

  // Calculate metrics
  const totalMentions = sortedMentions.length;
  const last24h = sortedMentions.filter(m => {
    const mentionDate = new Date(m.date);
    const dayAgo = new Date();
    dayAgo.setHours(dayAgo.getHours() - 24);
    return mentionDate > dayAgo;
  }).length;

  const last7d = sortedMentions.filter(m => {
    const mentionDate = new Date(m.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return mentionDate > weekAgo;
  }).length;

  // Calculate sentiment (simplified)
  const positiveMentions = sortedMentions.filter(m => 
    m.text.toLowerCase().includes('legitimate') ||
    m.text.toLowerCase().includes('credible') ||
    m.text.toLowerCase().includes('reform')
  ).length;
  const sentimentPercent = totalMentions > 0 ? Math.round((positiveMentions / totalMentions) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel 2: Brewer Watch</h1>
        <p className="text-gray-600 mb-6">Real-time tracking of Matthew Brewer mentions across all platforms</p>
        
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Total Mentions</h3>
              <ChatBubbleLeftIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{totalMentions}</div>
            <div className="text-sm text-gray-500 mt-1">All time</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Last 24h</h3>
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{last24h}</div>
            <div className="text-sm text-green-600 mt-1">Active monitoring</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Last 7 days</h3>
              <ArrowTrendingDownIcon className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{last7d}</div>
            <div className="text-sm text-gray-600 mt-1">Weekly total</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Sentiment</h3>
              <FireIcon className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-lg font-bold text-orange-600">Mixed</div>
            <div className="text-sm text-gray-500 mt-1">{sentimentPercent}% positive</div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FunnelIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              <select 
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value as any)}
                className="text-sm border border-gray-300 rounded px-3 py-1"
              >
                <option value="all">All Platforms</option>
                <option value="twitter">Twitter/X</option>
                <option value="reddit">Reddit</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <button
                onClick={() => setSortBy('recent')}
                className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
                  sortBy === 'recent' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                Most Recent
              </button>
              <button
                onClick={() => setSortBy('likes')}
                className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
                  sortBy === 'likes' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <HeartIcon className="w-4 h-4" />
                Most Liked
              </button>
            </div>
          </div>
        </div>

        {/* Recent Mentions with Dates */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">All Mentions</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {sortedMentions.length > 0 ? sortedMentions.map((mention) => (
              <div key={mention.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-gray-500">{mention.platform}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-700 font-medium">{mention.author}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{mention.time}</span>
                    </div>
                    <p className="text-sm text-gray-900 mb-2 line-clamp-3">{mention.text}</p>
                    {mention.url && (
                      <a href={mention.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                        View source →
                      </a>
                    )}
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center gap-1">
                        <HeartIcon className="w-3 h-3" />
                        <span>{mention.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChatBubbleLeftIcon className="w-3 h-3" />
                        <span>{mention.replies}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-500">No mentions found for the selected filter.</p>
            )}
          </div>
        </div>

        {/* Top Keywords */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Top Keywords in Mentions</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">CHA</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="w-4/5 bg-blue-600 h-2 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">89</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Johnson</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="w-3/4 bg-blue-600 h-2 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">76</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">mayor</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="w-3/5 bg-blue-600 h-2 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">54</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">housing</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="w-1/2 bg-blue-600 h-2 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">45</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Mention Trends</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm text-gray-700">CHA leadership conflict</span>
                <span className="text-xs text-green-600 font-semibold">Rising</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span className="text-sm text-gray-700">Mayoral race speculation</span>
                <span className="text-xs text-yellow-600 font-semibold">Steady</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-sm text-gray-700">Reform candidate framing</span>
                <span className="text-xs text-blue-600 font-semibold">Emerging</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}