'use client';

import { useState } from 'react';
import { 
  ClockIcon, 
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

interface Version {
  id: number;
  version: string;
  timestamp: string;
  author: string;
  changes: string[];
  summary: string;
}

interface DossierVersionHistoryProps {
  versions: Version[];
  onVersionSelect?: (version: Version) => void;
}

const mockVersions: Version[] = [
  {
    id: 1,
    version: '1.12',
    timestamp: '2024-12-25T14:30:00Z',
    author: 'Research Team',
    changes: [
      'Added healthcare position vulnerability',
      'Updated funding source analysis',
      'Corrected voting record on Bill H.R. 2847'
    ],
    summary: 'Major update with new healthcare vulnerability and funding corrections'
  },
  {
    id: 2,
    version: '1.11',
    timestamp: '2024-12-24T16:45:00Z',
    author: 'Opposition Research',
    changes: [
      'Added new endorsement weakness',
      'Updated social media sentiment analysis'
    ],
    summary: 'Minor updates to endorsement tracking'
  },
  {
    id: 3,
    version: '1.10',
    timestamp: '2024-12-23T09:15:00Z',
    author: 'Field Team',
    changes: [
      'Added ground operation insights',
      'Updated local support metrics',
      'Revised strength assessment'
    ],
    summary: 'Field intelligence integration and strength reassessment'
  }
];

export default function DossierVersionHistory({ 
  versions = mockVersions, 
  onVersionSelect 
}: DossierVersionHistoryProps) {
  const [expandedVersions, setExpandedVersions] = useState<number[]>([]);
  
  const toggleVersion = (versionId: number) => {
    setExpandedVersions(prev => 
      prev.includes(versionId) 
        ? prev.filter(id => id !== versionId)
        : [...prev, versionId]
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="bg-white border border-[var(--border-light)] rounded-lg shadow-sm">
      <div className="p-4 border-b border-[var(--border-light)]">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center">
          <DocumentTextIcon className="w-5 h-5 mr-2" />
          Version History
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Track changes and updates to this dossier
        </p>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {versions.map((version) => {
          const { date, time } = formatTimestamp(version.timestamp);
          const isExpanded = expandedVersions.includes(version.id);
          
          return (
            <div key={version.id} className="border-b border-[var(--border-light)] last:border-b-0">
              <div 
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => toggleVersion(version.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      v{version.version}
                    </div>
                    <div>
                      <div className="font-medium text-[var(--text-primary)]">
                        Version {version.version}
                      </div>
                      <div className="text-sm text-[var(--text-secondary)] flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4" />
                        <span>{date} at {time}</span>
                        <span>•</span>
                        <UserIcon className="w-4 h-4" />
                        <span>{version.author}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {version.changes.length} changes
                    </span>
                    {isExpanded ? (
                      <ChevronUpIcon className="w-5 h-5 text-[var(--text-secondary)]" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-[var(--text-secondary)]" />
                    )}
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-[var(--text-secondary)]">
                    {version.summary}
                  </p>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 bg-gray-50">
                  <div className="ml-11">
                    <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">
                      Detailed Changes:
                    </h4>
                    <ul className="space-y-1">
                      {version.changes.map((change, index) => (
                        <li key={index} className="text-sm text-[var(--text-secondary)] flex items-start">
                          <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2 mr-2 flex-shrink-0" />
                          {change}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex space-x-2 mt-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onVersionSelect?.(version);
                        }}
                        className="text-xs bg-[var(--primary)] text-white px-3 py-1 rounded hover:bg-[var(--primary-dark)] transition-colors"
                      >
                        View This Version
                      </button>
                      <button className="text-xs border border-[var(--border-light)] text-[var(--text-secondary)] px-3 py-1 rounded hover:bg-white transition-colors">
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}