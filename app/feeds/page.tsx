'use client';

import DashboardLayout from '@/components/DashboardLayout';
import DataFeed from '@/components/data/DataFeed';
import scrapedData from '@/lib/scrapedData.json';

export default function FeedsPage() {
  const cards = (scrapedData as any).cards || [];
  const stats = (scrapedData as any).stats || {};
  
  return (
    <DashboardLayout>
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Live Intelligence Feeds</h1>
        <p className="text-gray-600 mb-6">Real-time social media monitoring across all platforms. {cards.length.toLocaleString()} posts tracked.</p>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-blue-400">1,322</div>
            <div className="text-sm text-gray-600">Twitter/X</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-orange-400">427</div>
            <div className="text-sm text-gray-600">Reddit</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-purple-400">200</div>
            <div className="text-sm text-gray-600">TikTok</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-pink-400">600</div>
            <div className="text-sm text-gray-600">Instagram</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">All Platform Feed</h2>
          <DataFeed 
            platform="all"
            sentiment="all"
            limit={100}
            showEngagement={true}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}