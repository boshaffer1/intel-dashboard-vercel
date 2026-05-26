'use client';

import { useState, useEffect } from 'react';
import { 
  CalendarIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  UserGroupIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShareIcon,
  Cog6ToothIcon,
  BellIcon
} from '@heroicons/react/24/outline';

import SentimentChart from '@/components/charts/SentimentChart';
import MentionVolumeChart from '@/components/charts/MentionVolumeChart';
import BriefTimeline from '@/components/briefs/BriefTimeline';
import DossierVersionHistory from '@/components/dossier/DossierVersionHistory';
import SearchAndFilter from '@/components/common/SearchAndFilter';
import RealTimeStatus from '@/components/common/RealTimeStatus';
import AlertPanel from '@/components/alerts/AlertPanel';
import DocumentModal from '@/components/common/DocumentModal';
import GoogleDocsPanel from '@/components/google/GoogleDocsPanel';
import DataFeed from '@/components/data/DataFeed';
import { dossierData, dailyBriefs, scrapedIntelData } from '@/lib/dossierData';
import scrapedData from '@/lib/scrapedData.json';

// Real campaign intelligence data
const realDossiers = Object.values(dossierData);

const mockTrendData = [
  { date: '2026-05-20', sentiment: 0.65, mentions: 34 },
  { date: '2026-05-21', sentiment: 0.58, mentions: 41 },
  { date: '2026-05-22', sentiment: 0.62, mentions: 38 },
  { date: '2026-05-23', sentiment: 0.45, mentions: 32 },
  { date: '2026-05-24', sentiment: 0.52, mentions: 67 },
  { date: '2026-05-25', sentiment: 0.68, mentions: 89 }
];

export default function CampaignDashboard() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'dossiers' | 'documents'>('daily');
  const [selectedBrief, setSelectedBrief] = useState<typeof dailyBriefs[0]>(dailyBriefs[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [selectedDossier, setSelectedDossier] = useState<typeof realDossiers[0]>(realDossiers[0]);

  // Document modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    content: '',
    type: 'dossier' as 'dossier' | 'brief' | 'analysis'
  });

  // Mock real-time status
  const [connectionStatus] = useState<'connected' | 'disconnected' | 'warning'>('connected');
  const [alertCount] = useState(3);

  const openDocument = (title: string, content: string, type: 'dossier' | 'brief' | 'analysis' = 'dossier') => {
    setModalState({
      isOpen: true,
      title,
      content,
      type
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      title: '',
      content: '',
      type: 'dossier'
    });
  };

  return (
    <div className="flex h-screen bg-[var(--bg-main)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[var(--sidebar-width)] bg-[var(--bg-sidebar)] flex flex-col overflow-y-auto shadow-md">
        {/* Sidebar Header */}
        <div className="p-6 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]">
          <h1 className="text-xl font-bold text-white tracking-tight">Brewer 2027</h1>
          <p className="text-sm text-blue-100 mt-1">Campaign Intelligence</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-3">
            Intelligence
          </div>
          
          <button
            onClick={() => setActiveTab('daily')}
            className={`w-full flex items-center px-3 py-3 text-sm rounded-lg transition-all ${
              activeTab === 'daily' 
                ? 'bg-white/10 text-white font-semibold border-l-4 border-[var(--primary)]' 
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-4 h-4 mr-3" />
            Daily Briefs
            <span className="ml-auto bg-white/10 text-xs px-2 py-1 rounded-full">
              {dailyBriefs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('weekly')}
            className={`w-full flex items-center px-3 py-3 text-sm rounded-lg transition-all ${
              activeTab === 'weekly' 
                ? 'bg-white/10 text-white font-semibold border-l-4 border-[var(--primary)]' 
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <ChartBarIcon className="w-4 h-4 mr-3" />
            Weekly Analytics
            <span className="ml-auto bg-white/10 text-xs px-2 py-1 rounded-full">
              {scrapedIntelData.totalItems.toLocaleString()}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('dossiers')}
            className={`w-full flex items-center px-3 py-3 text-sm rounded-lg transition-all ${
              activeTab === 'dossiers' 
                ? 'bg-white/10 text-white font-semibold border-l-4 border-[var(--primary)]' 
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <DocumentTextIcon className="w-4 h-4 mr-3" />
            Opponent Dossiers
            <span className="ml-auto bg-white/10 text-xs px-2 py-1 rounded-full">
              {realDossiers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`w-full flex items-center px-3 py-3 text-sm rounded-lg transition-all ${
              activeTab === 'documents' 
                ? 'bg-white/10 text-white font-semibold border-l-4 border-[var(--primary)]' 
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <DocumentDuplicateIcon className="w-4 h-4 mr-3" />
            Live Documents
            <span className="ml-auto bg-green-500 text-xs px-2 py-1 rounded-full text-white animate-pulse">
              LIVE
            </span>
          </button>

          <div className="pt-6">
            <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-3">
              Tools
            </div>
            
            <button className="w-full flex items-center px-3 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-lg transition-all">
              <ClipboardDocumentIcon className="w-4 h-4 mr-3" />
              Export Reports
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-[var(--border-light)] px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                {activeTab === 'daily' && 'Daily Intelligence Briefs'}
                {activeTab === 'weekly' && 'Weekly Analytics & Trends'}
                {activeTab === 'dossiers' && 'Opponent Intelligence Dossiers'}
                {activeTab === 'documents' && 'Live Google Documents'}
              </h1>
              <p className="text-[var(--text-secondary)] mt-1">
                {activeTab === 'daily' && 'Real-time monitoring of campaign mentions and sentiment'}
                {activeTab === 'weekly' && 'Strategic analysis of emerging trends and competitive positioning'}
                {activeTab === 'dossiers' && 'Living documents tracking opponent vulnerabilities and positions'}
                {activeTab === 'documents' && 'Real-time access to campaign documents with auto-refresh'}
              </p>
            </div>
            
            <div className="flex items-center">
              <RealTimeStatus 
                status={connectionStatus}
                alertCount={alertCount}
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">
          {/* Daily Briefs Tab */}
          {activeTab === 'daily' && (
            <div className="max-w-7xl mx-auto">
              {/* Search and Filter */}
              <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                sentimentFilter={sentimentFilter}
                onSentimentFilterChange={setSentimentFilter}
                onExport={() => {
                  // Export functionality
                  console.log('Exporting daily briefs...');
                  alert('Export functionality would be implemented here');
                }}
              />

              {/* Intelligence Overview Cards */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border border-[var(--border-light)] rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <EyeIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[var(--text-primary)]">
                        {scrapedIntelData.totalItems.toLocaleString()}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">Total Intel Items</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-[var(--border-light)] rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[var(--text-primary)]">
                        {scrapedIntelData.categories.twitter_mentions.toLocaleString()}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">Twitter Mentions</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[var(--border-light)] rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <ShareIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[var(--text-primary)]">
                        {scrapedIntelData.categories.tiktok_content.toLocaleString()}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">TikTok Content</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[var(--border-light)] rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg mr-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        {scrapedIntelData.topIssues['Crime/Safety'].toLocaleString()}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">Crime Mentions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Scraped Data Feed */}
              <div className="mt-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                  📡 Live Intelligence Feed ({(scrapedData as any).cards?.length?.toLocaleString() || '2,549'} items)
                </h2>
                <DataFeed 
                  platform="all"
                  sentiment="all"
                  limit={50}
                  showEngagement={true}
                />
              </div>

              {/* Daily Briefs Grid */}
              <div className="grid lg:grid-cols-3 gap-6 mt-6" style={{ display: 'none' }}>
                {/* Brief Timeline */}
                <div className="lg:col-span-1">
                  <BriefTimeline 
                    briefs={dailyBriefs}
                    onBriefSelect={(brief: typeof dailyBriefs[0]) => setSelectedBrief(brief)}
                    selectedBriefId={selectedBrief.id}
                  />
                </div>

                {/* Brief Detail */}
                <div className="lg:col-span-2">
                  <div className="bg-white border border-[var(--border-light)] rounded-lg shadow-sm">
                    <div className="p-6 border-b border-[var(--border-light)]">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                          {selectedBrief.title}
                        </h3>
                        <button 
                          onClick={() => openDocument(selectedBrief.title, (selectedBrief as any).content || selectedBrief.summary, 'brief')}
                          className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                          title="View Full Brief"
                        >
                          <DocumentDuplicateIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-[var(--text-primary)]">
                            {selectedBrief.mentions}
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">Total Mentions</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className={`text-2xl font-bold ${
                            selectedBrief.sentiment > 0.6 ? 'text-green-600' :
                            selectedBrief.sentiment > 0.4 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {Math.round(selectedBrief.sentiment * 100)}%
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">Sentiment Score</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-[var(--primary)]">
                            {selectedBrief.keyEvents.length}
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">Key Events</div>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">Executive Summary</h4>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                          {selectedBrief.summary}
                        </p>
                      </div>

                      {/* Key Events */}
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-3">Key Events</h4>
                        <div className="space-y-2">
                          {selectedBrief.keyEvents.map((event, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-[var(--text-primary)]">{event}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Analytics Tab */}
          {activeTab === 'weekly' && (
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Sentiment Trend Chart */}
                <div className="bg-white border border-[var(--border-light)] rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Sentiment Trend</h3>
                  <SentimentChart data={mockTrendData} height={240} />
                </div>

                {/* Mention Volume */}
                <div className="bg-white border border-[var(--border-light)] rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Mention Volume</h3>
                  <MentionVolumeChart data={mockTrendData} height={240} />
                </div>
              </div>

              {/* Viral Moments & Emerging Narratives */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white border border-[var(--border-light)] rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Viral Moments</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-red-800">Healthcare Town Hall</span>
                        <span className="text-xs text-red-600">+847% engagement</span>
                      </div>
                      <p className="text-sm text-red-700">
                        Video clip of healthcare response gained significant traction across platforms
                      </p>
                    </div>
                    <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-800">Education Endorsement</span>
                        <span className="text-xs text-green-600">+324% mentions</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Teachers' union endorsement sparked positive coverage surge
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[var(--border-light)] rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Opposition Tracking</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                         onClick={() => openDocument('Brandon Johnson Intelligence Summary', realDossiers.find(d => d.id === 'brandon-johnson')?.content || '', 'dossier')}>
                      <div>
                        <span className="font-medium">Brandon Johnson</span>
                        <p className="text-sm text-[var(--text-secondary)]">Incumbent Mayor • HIGH THREAT</p>
                        <p className="text-xs text-red-700">{scrapedIntelData.topCandidateMentions.Johnson.toLocaleString()} mentions</p>
                      </div>
                      <div className="flex items-center text-red-600">
                        <ArrowDownIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">-18%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                         onClick={() => openDocument('Alexi Giannoulias Intelligence Summary', realDossiers.find(d => d.id === 'alexi-giannoulias')?.content || '', 'dossier')}>
                      <div>
                        <span className="font-medium">Alexi Giannoulias</span>
                        <p className="text-sm text-[var(--text-secondary)]">Secretary of State • MEDIUM-HIGH</p>
                        <p className="text-xs text-orange-700">{scrapedIntelData.topCandidateMentions.Giannoulias.toLocaleString()} mentions</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <ArrowUpIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">+12%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                         onClick={() => openDocument('Susana Mendoza Intelligence Summary', realDossiers.find(d => d.id === 'susana-mendoza')?.content || '', 'dossier')}>
                      <div>
                        <span className="font-medium">Susana Mendoza</span>
                        <p className="text-sm text-[var(--text-secondary)]">State Comptroller • MEDIUM</p>
                        <p className="text-xs text-yellow-700">{scrapedIntelData.topCandidateMentions.Mendoza.toLocaleString()} mentions</p>
                      </div>
                      <div className="flex items-center text-yellow-600">
                        <ArrowUpIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">+4%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                         onClick={() => openDocument('Mike Quigley Intelligence Summary', realDossiers.find(d => d.id === 'mike-quigley')?.content || '', 'dossier')}>
                      <div>
                        <span className="font-medium">Mike Quigley</span>
                        <p className="text-sm text-[var(--text-secondary)]">U.S. Congressman • MEDIUM-HIGH</p>
                        <p className="text-xs text-orange-700">{scrapedIntelData.topCandidateMentions.Quigley.toLocaleString()} mentions</p>
                      </div>
                      <div className="flex items-center text-red-600">
                        <ArrowDownIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">-3%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <span className="font-medium text-blue-900">Dan Brewer</span>
                        <p className="text-sm text-blue-700">CHA Chairman • Our Campaign</p>
                        <p className="text-xs text-blue-600">{scrapedIntelData.topCandidateMentions.Brewer.toLocaleString()} mentions (growing)</p>
                      </div>
                      <div className="flex items-center text-blue-600">
                        <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Building</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dossiers Tab */}
          {activeTab === 'dossiers' && (
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Dossier List */}
                <div className="lg:col-span-1">
                  <h2 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Opponent Files</h2>
                  <div className="space-y-4">
                    {realDossiers.map((dossier) => (
                      <div
                        key={dossier.id}
                        onClick={() => setSelectedDossier(dossier)}
                        className={`bg-white border border-[var(--border-light)] rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                          selectedDossier.id === dossier.id ? 'ring-2 ring-[var(--primary)] border-[var(--primary)]' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-[var(--text-primary)]">{dossier.name}</h3>
                            <p className="text-sm text-[var(--text-secondary)]">{dossier.position}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded font-medium ${
                              dossier.threat === 'HIGH' ? 'bg-red-100 text-red-800' :
                              dossier.threat === 'MEDIUM-HIGH' ? 'bg-orange-100 text-orange-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {dossier.threat}
                            </span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              v{dossier.versions}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-[var(--text-secondary)] mb-3">
                          Updated: {dossier.lastUpdated}
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded">
                              {dossier.vulnerabilities.length} vulnerabilities
                            </span>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                              {dossier.strengths.length} strengths
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                    <UserGroupIcon className="w-5 h-5 mx-auto mb-1" />
                    Add New Dossier
                  </button>
                </div>

                {/* Dossier Detail */}
                <div className="lg:col-span-2">
                  <div className="bg-white border border-[var(--border-light)] rounded-lg shadow-sm">
                    <div className="p-6 border-b border-[var(--border-light)]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                              {selectedDossier.name}
                            </h3>
                            <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                              selectedDossier.threat === 'HIGH' ? 'bg-red-100 text-red-800' :
                              selectedDossier.threat === 'MEDIUM-HIGH' ? 'bg-orange-100 text-orange-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {selectedDossier.threat} THREAT
                            </span>
                          </div>
                          <p className="text-[var(--text-secondary)]">{selectedDossier.position}</p>
                          <p className="text-sm text-[var(--text-muted)] mt-1">Last Updated: {selectedDossier.lastUpdated}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => openDocument(`${selectedDossier.name} - Full Dossier`, selectedDossier.content, 'dossier')}
                            className="px-3 py-1 text-sm border border-[var(--border-light)] rounded hover:bg-gray-50 flex items-center space-x-1"
                          >
                            <DocumentDuplicateIcon className="w-4 h-4" />
                            <span>View Full</span>
                          </button>
                          <button className="px-3 py-1 text-sm bg-[var(--primary)] text-white rounded hover:bg-[var(--primary-dark)]">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Vulnerabilities */}
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center">
                          <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-red-500" />
                          Key Vulnerabilities ({selectedDossier.vulnerabilities.length})
                        </h4>
                        <div className="space-y-3">
                          {selectedDossier.vulnerabilities.slice(0, 3).map((vuln, index) => (
                            <div 
                              key={index} 
                              className="p-4 bg-red-50 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                              onClick={() => openDocument(`${selectedDossier.name} - Vulnerability Analysis`, `# ${vuln}\n\n**Target:** ${selectedDossier.name}\n**Category:** Political Vulnerability\n\n## Detailed Analysis\n\n${vuln}\n\n## Recommended Approach\n\n[Strategic analysis would be detailed here based on the specific vulnerability]\n\n## Risk Assessment\n\n- **Damage Potential:** ${vuln.includes('10/10') ? 'Maximum' : vuln.includes('9/10') ? 'Severe' : vuln.includes('8/10') ? 'High' : vuln.includes('7/10') ? 'Moderate-High' : 'Moderate'}\n- **Exploitability:** High\n- **Public Awareness:** ${index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low'}\n\n## Supporting Evidence\n\n[Detailed sourcing and evidence would be compiled here]`, 'analysis')}
                            >
                              <div className="font-medium text-red-800 mb-1">{vuln}</div>
                              <p className="text-sm text-red-700">
                                Click to view detailed exploitation strategy and evidence...
                              </p>
                            </div>
                          ))}
                          {selectedDossier.vulnerabilities.length > 3 && (
                            <button 
                              onClick={() => openDocument(`${selectedDossier.name} - All Vulnerabilities`, selectedDossier.content, 'dossier')}
                              className="w-full p-3 text-sm text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              View all {selectedDossier.vulnerabilities.length} vulnerabilities in full dossier
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Strengths */}
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center">
                          <ArrowTrendingUpIcon className="w-5 h-5 mr-2 text-green-500" />
                          Opponent Strengths ({selectedDossier.strengths.length})
                        </h4>
                        <div className="space-y-3">
                          {selectedDossier.strengths.map((strength, index) => (
                            <div 
                              key={index} 
                              className="p-4 bg-green-50 border border-green-200 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                              onClick={() => openDocument(`${selectedDossier.name} - Strength Analysis`, `# ${strength}\n\n**Target:** ${selectedDossier.name}\n**Category:** Opposition Strength\n\n## Analysis\n\n${strength}\n\n## Counter-Strategy\n\n[Detailed neutralization approach would be outlined here]\n\n## Risk to Brewer\n\n- **Threat Level:** ${index === 0 ? 'High' : index === 1 ? 'Medium-High' : 'Medium'}\n- **Voter Impact:** Significant\n- **Counter-Difficulty:** ${index === 0 ? 'Challenging' : 'Moderate'}\n\n## Recommended Response\n\n[Strategic counter-messaging and positioning would be detailed here]`, 'analysis')}
                            >
                              <div className="font-medium text-green-800 mb-1">{strength}</div>
                              <p className="text-sm text-green-700">
                                Click to view counter-strategy and neutralization tactics...
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Summary Stats */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">{selectedDossier.vulnerabilities.length}</div>
                          <div className="text-sm text-[var(--text-secondary)]">Vulnerabilities</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{selectedDossier.strengths.length}</div>
                          <div className="text-sm text-[var(--text-secondary)]">Strengths</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-[var(--primary)]">v{selectedDossier.versions}</div>
                          <div className="text-sm text-[var(--text-secondary)]">Version</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Version History */}
              <div className="mt-6">
                <DossierVersionHistory versions={[]} />
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="max-w-7xl mx-auto">
              <GoogleDocsPanel />
            </div>
          )}
        </main>
      </div>

      {/* Floating Alert Panel */}
      <AlertPanel />

      {/* Document Modal */}
      <DocumentModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        content={modalState.content}
      />
    </div>
  );
}