'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { id: 'overview', label: 'Overview', href: '/hub' },
    { id: 'race', label: '1. The Race', href: '/hub/race' },
    { id: 'brewer', label: '2. Brewer Watch', href: '/hub/brewer' },
    { id: 'opponents', label: '3. Opponent Tracker', href: '/hub/opponents' },
    { id: 'sentiment', label: '4. Voter Sentiment', href: '/hub/sentiment' },
    { id: 'response', label: '5. Rapid Response', href: '/hub/response' },
    { id: 'schedule', label: '6. Schedule + Tasks', href: '/hub/schedule' },
    { id: 'operational', label: '7. Operational', href: '/hub/operational' },
  ];

  const otherLinks = [
    { label: 'Daily Briefs', href: '/daily-briefs' },
    { label: 'Live Google Docs', href: '/google-docs' },
    { label: 'Latest Intel', href: '/intel' },
    { label: 'Feeds', href: '/feeds' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0 h-screen overflow-y-auto">
          <div className="p-6">
            {/* Dashboard Title */}
            <div className="mb-8">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Dashboard</span>
              <h1 className="text-xl font-bold text-gray-900 mt-1">Campaign command center</h1>
            </div>

            {/* Navigation */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Seven Panels</span>
              
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                {otherLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === link.href
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
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
          {children}
        </div>
      </div>
    </div>
  );
}