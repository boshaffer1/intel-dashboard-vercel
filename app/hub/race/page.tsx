'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { CalendarIcon, FireIcon, NewspaperIcon } from '@heroicons/react/24/outline';

export default function RacePage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [electionDate] = useState(new Date('2027-02-23'));
  const [filingDeadline] = useState(new Date('2026-10-25'));
  
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const daysUntilElection = currentTime ? Math.floor((electionDate.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const daysUntilFiling = currentTime ? Math.floor((filingDeadline.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <DashboardLayout>
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel 1: The Race</h1>
        <p className="text-gray-600 mb-6">Countdowns, poll footing, latest headline, and the current weather of the race.</p>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Race clock</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 uppercase">Days until election</div>
                <div className="text-4xl font-bold text-gray-900">{daysUntilElection}</div>
                <div className="text-sm text-gray-500">February 23, 2027</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase">Days until filing deadline</div>
                <div className="text-3xl font-bold text-yellow-600">{daysUntilFiling}</div>
                <div className="text-sm text-gray-500">October 25, 2026</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Race activity</h3>
            <div className="text-center py-8">
              <FireIcon className="w-12 h-12 text-orange-500 mx-auto mb-3" />
              <div className="text-lg font-semibold text-orange-600">Active</div>
              <div className="text-sm text-gray-500 mt-1">High media attention</div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Latest poll snapshot</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-600">Candidate</th>
                  <th className="text-right py-2 font-medium text-gray-600">Suffolk/Tribune</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3">Brewer</td>
                  <td className="text-right text-gray-500">Not yet polled</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 font-medium">Johnson</td>
                  <td className="text-right font-semibold">34% fav / 44% unfav</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3">Giannoulias</td>
                  <td className="text-right">42% fav / 7% unfav</td>
                </tr>
                <tr>
                  <td className="py-3">Quigley</td>
                  <td className="text-right">21% fav / 12% unfav</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Latest race headline</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <NewspaperIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <div className="text-xs text-blue-600 font-medium uppercase mb-2">Breaking</div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Interim Chicago Housing Authority head Matthew Brewer considering mayoral run
                </p>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  https://x.co/wkvw0sMwe →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Poll Analysis</h3>
          <p className="text-sm text-gray-700">
            Suffolk/Chicago Tribune (4/11-4/15) poll surfaced in scrape: Giannoulias 42% fav / 7% unfav (+35) leads the field, 
            Mendoza +27, Quigley +9, Johnson 34% fav / 44% unfav (-10). Brewer is not yet in the poll. Both major contenders 
            run anti-Trump campaigns, leaving Chicago kitchen-table issues (taxes, schools, housing, transit, crime) underserved. 
            Progressive insurgency probable.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}