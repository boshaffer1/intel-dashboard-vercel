'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function OpponentsPage() {
  const opponents = [
    {
      name: 'Brandon Johnson',
      title: 'Current Mayor',
      threat: 'HIGH',
      approval: '34% fav / 44% unfav',
      funding: '$2.3M raised',
      momentum: 'Declining',
      keyIssues: ['Unpopular budget', 'CTA crisis', 'Crime concerns'],
      lastAction: 'Announced CHA board appointments',
      strategy: 'Monitor vulnerability, prepare for defensive campaign'
    },
    {
      name: 'Alexi Giannoulias',
      title: 'IL Secretary of State',
      threat: 'HIGH',
      approval: '42% fav / 7% unfav',
      funding: '$1.5M raised',
      momentum: 'Rising',
      keyIssues: ['Strong favorability', 'State connections', 'Name recognition'],
      lastAction: 'Hired campaign manager from Biden team',
      strategy: 'Differentiate on local issues, highlight state vs city divide'
    },
    {
      name: 'Mike Quigley',
      title: 'U.S. Representative',
      threat: 'MEDIUM',
      approval: '21% fav / 12% unfav',
      funding: '$800K raised',
      momentum: 'Stable',
      keyIssues: ['Federal experience', 'Moderate positioning', 'Limited city knowledge'],
      lastAction: 'Criticized Johnson budget at town hall',
      strategy: 'Position as outsider vs establishment'
    },
    {
      name: 'Ameya Pawar',
      title: 'Former Alderman',
      threat: 'MEDIUM',
      approval: 'Not polled',
      funding: '$400K raised',
      momentum: 'Building',
      keyIssues: ['Progressive base', 'Policy depth', 'Limited resources'],
      lastAction: 'Released housing plan',
      strategy: 'Court progressive voters, contrast on experience'
    },
    {
      name: 'Pat Dowell',
      title: 'Alderman, 3rd Ward',
      threat: 'LOW',
      approval: 'Not polled',
      funding: '$250K raised',
      momentum: 'Stable',
      keyIssues: ['South Side base', 'City Council experience', 'Low name recognition'],
      lastAction: 'Endorsed by CTU leadership',
      strategy: 'Build coalition beyond base'
    },
    {
      name: 'Raymond Lopez',
      title: 'Alderman, 15th Ward',
      threat: 'LOW',
      approval: 'Not polled',
      funding: '$180K raised',
      momentum: 'Stable',
      keyIssues: ['Johnson critic', 'Conservative Democrat', 'Southwest Side'],
      lastAction: 'Crime press conference',
      strategy: 'Consolidate moderate/conservative vote'
    },
    {
      name: 'Byron Sigcho-Lopez',
      title: 'Alderman, 25th Ward',
      threat: 'LOW',
      approval: 'Not polled',
      funding: '$150K raised',
      momentum: 'Stable',
      keyIssues: ['DSA backing', 'Far-left positioning', 'Pilsen base'],
      lastAction: 'Led rent control rally',
      strategy: 'Define as too extreme for Chicago'
    }
  ];

  const getThreatColor = (threat: string) => {
    switch(threat) {
      case 'HIGH': return 'text-red-600 bg-red-50';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50';
      case 'LOW': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getThreatIcon = (threat: string) => {
    switch(threat) {
      case 'HIGH': return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'MEDIUM': return <InformationCircleIcon className="w-4 h-4" />;
      case 'LOW': return <CheckCircleIcon className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel 3: Opponent Tracker</h1>
        <p className="text-gray-600 mb-6">Monitor all mayoral candidates and assess threat levels</p>
        
        <div className="space-y-4">
          {opponents.map((opponent) => (
            <div key={opponent.name} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{opponent.name}</h3>
                  <p className="text-sm text-gray-600">{opponent.title}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getThreatColor(opponent.threat)}`}>
                  {getThreatIcon(opponent.threat)}
                  {opponent.threat} THREAT
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Approval:</span>
                  <p className="font-medium text-gray-900">{opponent.approval}</p>
                </div>
                <div>
                  <span className="text-gray-500">Funding:</span>
                  <p className="font-medium text-gray-900">{opponent.funding}</p>
                </div>
                <div>
                  <span className="text-gray-500">Momentum:</span>
                  <p className="font-medium text-gray-900">{opponent.momentum}</p>
                </div>
                <div>
                  <span className="text-gray-500">Last Action:</span>
                  <p className="font-medium text-gray-900">{opponent.lastAction}</p>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-gray-600 uppercase">Key Issues</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {opponent.keyIssues.map((issue, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-gray-600 uppercase">Strategy</span>
                    <p className="text-sm text-gray-700 mt-1">{opponent.strategy}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}