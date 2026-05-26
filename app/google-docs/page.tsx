'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { DocumentTextIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export default function GoogleDocsPage() {
  const documents = [
    { 
      title: 'Opposition Research Brief: Matthew Brewer',
      lastUpdated: 'Live document',
      author: 'Research Team',
      type: 'Research',
      url: 'https://docs.google.com/document/d/14QZQoHUWqGo9DJYBNeddRqHVm0xl4Hts7_Z9n117a8I/edit?usp=sharing'
    },
    { 
      title: 'Opposition Research Brief: Alexi Giannoulias',
      lastUpdated: 'Live document',
      author: 'Research Team',
      type: 'Research',
      url: 'https://docs.google.com/document/d/16ZvFVtNZVVIa4JKGRtfrIYPdaSNU84-1yzQgkBz_39I/edit?usp=sharing'
    },
    { 
      title: 'Counter-Research Brief: Brandon Johnson',
      lastUpdated: 'Live document',
      author: 'Research Team',
      type: 'Research',
      url: 'https://docs.google.com/document/d/1hqrTksUscPud0FRzu0DFjEtnkp7EcpxTAwwtZEa0PSA/edit?usp=sharing'
    },
    { 
      title: 'Head-to-Head Analysis: Brewer vs Opponents',
      lastUpdated: 'Live document',
      author: 'Strategy Team',
      type: 'Strategy',
      url: 'https://docs.google.com/document/d/1g1COQiyE7l4sMnz0lWVS7TtBB_pWYWhzE6OMb-DDGcM/edit?usp=sharing'
    }
  ];

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Strategy': return 'bg-purple-100 text-purple-700';
      case 'Policy': return 'bg-blue-100 text-blue-700';
      case 'Research': return 'bg-red-100 text-red-700';
      case 'Finance': return 'bg-green-100 text-green-700';
      case 'Messaging': return 'bg-yellow-100 text-yellow-700';
      case 'Operations': return 'bg-gray-100 text-gray-700';
      case 'Prep': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Live Google Docs</h1>
        <p className="text-gray-600 mb-6">Active campaign documents and collaborative materials</p>
        
        <div className="grid grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div key={doc.title} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <DocumentTextIcon className="w-6 h-6 text-gray-400" />
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getTypeColor(doc.type)}`}>
                  {doc.type}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h3>
              
              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <div>Author: {doc.author}</div>
                <div>Updated: {doc.lastUpdated}</div>
              </div>
              
              <a 
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Open document
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> These are live Google Docs that multiple team members can edit simultaneously. 
            Changes are tracked and versioned automatically.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}