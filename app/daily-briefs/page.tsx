'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { DocumentTextIcon, CalendarIcon, ExclamationTriangleIcon, CheckCircleIcon, ArrowTopRightOnSquareIcon, LinkIcon } from '@heroicons/react/24/outline';

export default function DailyBriefsPage() {
  const [briefs, setBriefs] = useState<any[]>([]);
  const [selectedBrief, setSelectedBrief] = useState<any>(null);

  // Today's actual brief from Hermes
  const todaysBrief = {
    id: 'brief-2026-05-25',
    date: '2026-05-25',
    time: '6:00 AM',
    title: 'Daily Brief — Monday, May 25, 2026 (Memorial Day)',
    urgent: true,
    sections: {
      urgentAlert: {
        title: '🚨 URGENT',
        content: `Johnson is at the Vatican while Chicago bleeds. Memorial Day weekend has produced ~24 shootings (including children), 5 police officers struck by a vehicle during a "teen takeover" on the West Side, and a national right-wing pile-on. Johnson released a written statement Sunday but did not return. He flew to meet Pope Leo XIV with a plan to discuss "Trump, affordability, and the Bears stadium."`,
        window: 'Window today (8am–noon CT): Brewer can step into the leadership vacuum with a single short statement on public safety. Not a political shot — a presence move.'
      },
      dominantNarrative: {
        title: 'Dominant narrative',
        content: `The race is, today, about whether Chicago's mayor can run the city. The "Johnson is silent / Johnson is absent" frame consolidated this morning. The Vatican trip is the punchline. The Aye_Pain tweet — "Brandon Johnson, the mayor of Chicago is useless" — got 13.6K views and 839 likes overnight; it's the meme of the day. This is a meaningful shift from last week's tax-and-affordability story, and it cuts the same direction.`
      },
      johnsonWatch: [
        'Vatican optics are bad and visible. Tribune coverage of his "stop by a South Side restaurant before his Vatican visit" is generating a heavy negative reply ratio.',
        'The teen-takeover statement was post-only, not on-camera. Standard playbook is to fly back; he didn\'t.',
        'His affordability post is being dunked on — 247 replies against 53 likes. The credibility on affordability is gone.',
        'Dr. Olusimbo Ige resigned as Public Health Commissioner with reporting of "hostile work environment."',
        'Brandon Gill\'s "gift list" video keeps spreading — 100K+ views and climbing.'
      ],
      opponentWatch: {
        'Quigley': 'Silent yesterday',
        'Pappas': 'Silent yesterday',
        'Mendoza': 'Silent yesterday',
        'Giannoulias': 'Silent yesterday — but insiders read him as governor-bound when JB runs for president',
        'Conway': 'Silent yesterday',
        'Holberg': 'Silent yesterday'
      },
      brewerMentions: [
        'Sun-Times\' May 21 piece still circulating: "Brewer\'s entry would likely hurt incumbent Mayor Brandon Johnson"',
        'No Brewer-specific posts in last 24 hours',
        'Sentiment from available coverage is neutral-to-positive ("legitimate threat to Johnson," "credible Black reformer")'
      ],
      emergingNarratives: [
        {
          title: 'ShotSpotter regret',
          content: 'Starting to surface in voter content. "ShotSpotter saves lives… Chicago voluntarily shut it down for political reasons." Brewer opening to talk evidence-based public safety.'
        },
        {
          title: 'CTU internal fight',
          content: 'CTU members rejected dues hike for political campaigns. The union backing Johnson is not the unified machine it was.'
        },
        {
          title: 'Good guys aren\'t in politics',
          content: 'Michelle Obama: "Corruption, incompetence... Good guys aren\'t in politics." Exact terrain for Brewer\'s "honest city" pillar.'
        }
      ],
      recommendedActions: [
        {
          priority: 1,
          action: 'Post Memorial Day statement before noon CT',
          details: 'Three sentences, no politics, no Johnson reference. Draft provided. Contrast frame writes itself — Brewer in Chicago, mayor in Rome.'
        },
        {
          priority: 2,
          action: 'Reach out to Mariah Woelfel and Alice Yin',
          details: 'Offer quick CHA-Operating-Chair quote on whether candidates should be present during crises.'
        },
        {
          priority: 3,
          action: 'Run small ($200) targeted boost on ShotSpotter angle',
          details: 'Test whether public-safety lane is recoverable for Black reform candidate before announcement.'
        }
      ],
      sources: [
        'https://x.com/EricLDaugh/status/2058604026208358428',
        'https://x.com/chicagotribune/status/2058680083380895858',
        'https://x.com/byaliceyin/status/2058627050924040452',
        'https://x.com/ChicagosMayor/status/2058563681395286108',
        'https://x.com/Suntimes/status/2057482111980830745',
        'https://www.tiktok.com/@nbcchicago/video/7643896984704732429',
        'https://www.tiktok.com/@abc7chicago/video/7643309143356460319',
        'https://www.tiktok.com/@vidportai714/video/7642475432440286478'
      ]
    }
  };

  useEffect(() => {
    // Always show only today's brief
    const initialBriefs = [todaysBrief];
    setBriefs(initialBriefs);
    localStorage.setItem('dailyBriefs', JSON.stringify(initialBriefs));
  }, []);

  const BriefContent = ({ brief }: { brief: any }) => {
    if (!brief) return null;
    
    return (
      <div className="space-y-6">
        {/* Urgent Alert */}
        {brief.sections.urgentAlert && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-sm font-bold text-red-900 mb-2">{brief.sections.urgentAlert.title}</h4>
            <p className="text-sm text-red-800 mb-3">{brief.sections.urgentAlert.content}</p>
            {brief.sections.urgentAlert.window && (
              <div className="mt-3 pt-3 border-t border-red-200">
                <p className="text-sm font-medium text-red-900">{brief.sections.urgentAlert.window}</p>
              </div>
            )}
          </div>
        )}

        {/* Dominant Narrative */}
        {brief.sections.dominantNarrative && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">{brief.sections.dominantNarrative.title}</h4>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{brief.sections.dominantNarrative.content}</p>
          </div>
        )}

        {/* Johnson Watch */}
        {brief.sections.johnsonWatch && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">Johnson Watch</h4>
            <ul className="space-y-2">
              {brief.sections.johnsonWatch.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Opponent Watch */}
        {brief.sections.opponentWatch && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">Opponent Watch</h4>
            <div className="space-y-1">
              {Object.entries(brief.sections.opponentWatch).map(([opponent, status]) => (
                <div key={opponent} className="flex items-start gap-2 py-1">
                  <span className="text-sm font-medium text-gray-900 min-w-[100px]">{opponent}:</span>
                  <span className="text-sm text-gray-600">{status as string}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Brewer Mentions */}
        {brief.sections.brewerMentions && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">Brewer Mentions</h4>
            <ul className="space-y-2">
              {brief.sections.brewerMentions.map((mention: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{mention}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Emerging Narratives */}
        {brief.sections.emergingNarratives && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">Emerging Narratives</h4>
            <div className="space-y-3">
              {brief.sections.emergingNarratives.map((narrative: any, idx: number) => (
                <div key={idx} className="bg-blue-50 rounded p-3">
                  <h5 className="font-medium text-gray-900 mb-1">{narrative.title}</h5>
                  <p className="text-sm text-gray-700">{narrative.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Actions */}
        {brief.sections.recommendedActions && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">Today\'s Recommended Actions</h4>
            <div className="space-y-3">
              {brief.sections.recommendedActions.map((action: any) => (
                <div key={action.priority} className="border-l-4 border-blue-500 pl-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center">
                      {action.priority}
                    </span>
                    <span className="font-medium text-gray-900">{action.action}</span>
                  </div>
                  <p className="text-sm text-gray-600">{action.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        {brief.sections.sources && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">Sources Cited</h4>
            <div className="space-y-1">
              {brief.sections.sources.map((source: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <LinkIcon className="w-3 h-3 text-gray-400" />
                  <a href={source} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline truncate">
                    {source}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Daily Intelligence Briefs</h1>
            <p className="text-gray-600">Comprehensive daily analysis from Hermes AI agent</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Generated daily at 6:00 AM</p>
            <p className="text-xs text-gray-400 mt-1">{briefs.length} brief{briefs.length !== 1 ? 's' : ''} saved</p>
          </div>
        </div>
        
        {/* All Saved Briefs Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {briefs.map((brief) => (
            <div 
              key={brief.id} 
              className={`bg-white rounded-lg border ${brief.urgent ? 'border-red-300' : 'border-gray-200'} p-6 hover:shadow-lg transition-shadow cursor-pointer`}
              onClick={() => setSelectedBrief(brief)}
            >
              <div className="flex items-start justify-between mb-3">
                {brief.urgent ? (
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <DocumentTextIcon className="w-6 h-6 text-gray-400" />
                )}
                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                  brief.urgent ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {brief.urgent ? 'URGENT' : 'Daily Brief'}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {brief.title}
              </h3>
              
              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <div>Generated: {brief.time}</div>
                {brief.sections.urgentAlert && (
                  <div className="text-xs text-red-600 font-medium mt-2">
                    ⚠️ Urgent action required
                  </div>
                )}
              </div>
              
              <button className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                View brief
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Selected Brief Display */}
        {selectedBrief && (
          <div className={`bg-white rounded-lg border-2 ${selectedBrief.urgent ? 'border-red-300' : 'border-blue-200'} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{selectedBrief.title}</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{selectedBrief.time}</span>
                <button 
                  onClick={() => setSelectedBrief(null)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Close ✕
                </button>
              </div>
            </div>
            <BriefContent brief={selectedBrief} />
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Integration:</strong> This page receives daily briefs from the Hermes Intelligence Agent. 
            Briefs are stored locally and persist across sessions. Each brief contains urgent alerts, narrative analysis, 
            opponent tracking, and actionable recommendations.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}