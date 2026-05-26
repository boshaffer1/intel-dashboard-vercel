'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { ChartBarIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

export default function SentimentPage() {
  const topIssues = [
    { issue: 'Crime & Safety', mentions: 1842, sentiment: -0.3, trend: 'up', change: '+12%' },
    { issue: 'Housing Affordability', mentions: 1563, sentiment: -0.4, trend: 'up', change: '+8%' },
    { issue: 'Public Transit', mentions: 1289, sentiment: -0.5, trend: 'up', change: '+15%' },
    { issue: 'Property Taxes', mentions: 987, sentiment: -0.6, trend: 'stable', change: '+2%' },
    { issue: 'City Budget', mentions: 876, sentiment: -0.4, trend: 'down', change: '-5%' },
    { issue: 'Education/CPS', mentions: 743, sentiment: -0.2, trend: 'up', change: '+6%' },
    { issue: 'Economic Development', mentions: 621, sentiment: 0.1, trend: 'stable', change: '+1%' },
    { issue: 'Climate/Environment', mentions: 432, sentiment: 0.2, trend: 'down', change: '-3%' }
  ];

  const platforms = [
    { name: 'Twitter/X', posts: 1243, sentiment: 'Mixed', topEmotion: '😤 Frustrated' },
    { name: 'Reddit (r/chicago)', posts: 876, sentiment: 'Negative', topEmotion: '😔 Disappointed' },
    { name: 'Instagram', posts: 234, sentiment: 'Neutral', topEmotion: '🤔 Curious' },
    { name: 'TikTok', posts: 196, sentiment: 'Mixed', topEmotion: '😂 Sarcastic' }
  ];

  const getSentimentColor = (sentiment: number) => {
    if (sentiment < -0.3) return 'text-red-600';
    if (sentiment < 0) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment < -0.3) return 'Very Negative';
    if (sentiment < -0.1) return 'Negative';
    if (sentiment < 0.1) return 'Neutral';
    if (sentiment < 0.3) return 'Positive';
    return 'Very Positive';
  };

  return (
    <DashboardLayout>
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel 4: Voter Sentiment</h1>
        <p className="text-gray-600 mb-6">Track top issues and voter sentiment across platforms</p>
        
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Top Issues by Volume</h3>
              <div className="space-y-3">
                {topIssues.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {idx + 1}. {item.issue}
                        </span>
                        {item.trend === 'up' && <ArrowUpIcon className="w-3 h-3 text-green-500" />}
                        {item.trend === 'down' && <ArrowDownIcon className="w-3 h-3 text-red-500" />}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">{item.mentions.toLocaleString()} mentions</span>
                        <span className={`text-xs font-medium ${getSentimentColor(item.sentiment)}`}>
                          {getSentimentLabel(item.sentiment)}
                        </span>
                        <span className="text-xs text-gray-500">{item.change} this week</span>
                      </div>
                    </div>
                    <div className="w-32">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${(item.mentions / topIssues[0].mentions) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Overall Mood</h3>
              <div className="text-center">
                <div className="text-4xl mb-2">😟</div>
                <div className="text-lg font-semibold text-gray-900">Concerned</div>
                <div className="text-sm text-gray-600 mt-1">62% negative sentiment</div>
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Angry</span>
                    <span className="font-semibold">31%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Frustrated</span>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Hopeful</span>
                    <span className="font-semibold">23%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Satisfied</span>
                    <span className="font-semibold">18%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Platform Breakdown</h3>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  <div key={platform.name} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-900">{platform.name}</span>
                      <span className="text-gray-500">{platform.posts}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">{platform.sentiment}</span>
                      <span>{platform.topEmotion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Key Insight</h3>
          <p className="text-sm text-gray-700">
            Crime, housing, and transit dominate voter concerns with consistently negative sentiment. Johnson's approval 
            correlates strongly with CTA service disruptions (-0.67 correlation). Opportunity exists for candidate who can 
            credibly address public safety while maintaining progressive coalition. Messaging should acknowledge frustration 
            while offering concrete solutions.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}