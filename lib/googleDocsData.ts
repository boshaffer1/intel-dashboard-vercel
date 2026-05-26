export interface GoogleDoc {
  id: string;
  title: string;
  category: 'daily-brief' | 'weekly-report' | 'dossier' | 'strategy' | 'research';
  url: string;
  lastUpdated?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  embedUrl?: string;
}

export const googleDocs: GoogleDoc[] = [
  {
    id: '14QZQoHUWqGo9DJYBNeddRqHVm0xl4Hts7_Z9n117a8I',
    title: 'Opponent Dossier: Brandon Johnson',
    category: 'dossier',
    url: 'https://docs.google.com/document/d/14QZQoHUWqGo9DJYBNeddRqHVm0xl4Hts7_Z9n117a8I/edit',
    embedUrl: 'https://docs.google.com/document/d/14QZQoHUWqGo9DJYBNeddRqHVm0xl4Hts7_Z9n117a8I/preview',
    description: 'Brandon Johnson - Complete opposition research dossier with voting record, finances, and vulnerabilities',
    priority: 'high',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '13UHI4n79-MOd9SMPuqIsKwOkxwWsqHVvjTljyY4rxsE',
    title: 'Opponent Dossier: William Quigley',
    category: 'dossier',
    url: 'https://docs.google.com/document/d/13UHI4n79-MOd9SMPuqIsKwOkxwWsqHVvjTljyY4rxsE/edit',
    embedUrl: 'https://docs.google.com/document/d/13UHI4n79-MOd9SMPuqIsKwOkxwWsqHVvjTljyY4rxsE/preview',
    description: 'William "Bill" Quigley - Progressive challenger analysis with policy positions and attack vectors',
    priority: 'high',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '16ZvFVtNZVVIa4JKGRtfrIYPdaSNU84-1yzQgkBz_39I',
    title: 'Opponent Dossier: Thomas Pappas',
    category: 'dossier',
    url: 'https://docs.google.com/document/d/16ZvFVtNZVVIa4JKGRtfrIYPdaSNU84-1yzQgkBz_39I/edit',
    embedUrl: 'https://docs.google.com/document/d/16ZvFVtNZVVIa4JKGRtfrIYPdaSNU84-1yzQgkBz_39I/preview',
    description: 'Thomas Pappas - Republican candidate profile with donor network and messaging strategy',
    priority: 'high',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '10Gmph3DDYQT1axzCaHtHESUQjN_XKcqceOTC1iNaZAI',
    title: 'Opponent Dossier: Susana Mendoza',
    category: 'dossier',
    url: 'https://docs.google.com/document/d/10Gmph3DDYQT1axzCaHtHESUQjN_XKcqceOTC1iNaZAI/edit',
    embedUrl: 'https://docs.google.com/document/d/10Gmph3DDYQT1axzCaHtHESUQjN_XKcqceOTC1iNaZAI/preview',
    description: 'Susana Mendoza - State Comptroller background with financial management record and controversies',
    priority: 'high',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '1n64g7PSMNPrmaamdoGSMS9Kc9HY7rWLlRFKXE13tz8E',
    title: 'Opponent Dossier: Alexi Giannoulias',
    category: 'dossier',
    url: 'https://docs.google.com/document/d/1n64g7PSMNPrmaamdoGSMS9Kc9HY7rWLlRFKXE13tz8E/edit',
    embedUrl: 'https://docs.google.com/document/d/1n64g7PSMNPrmaamdoGSMS9Kc9HY7rWLlRFKXE13tz8E/preview',
    description: 'Alexi Giannoulias - Secretary of State with banking history and political connections analysis',
    priority: 'high',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '1yIaaAm9qu0lmfcz4YoKxiFx0dvjwQvunKwxPXHVkuTs',
    title: 'Self-Audit: Marcus Brewer Vulnerability Assessment',
    category: 'research',
    url: 'https://docs.google.com/document/d/1yIaaAm9qu0lmfcz4YoKxiFx0dvjwQvunKwxPXHVkuTs/edit',
    embedUrl: 'https://docs.google.com/document/d/1yIaaAm9qu0lmfcz4YoKxiFx0dvjwQvunKwxPXHVkuTs/preview',
    description: 'Internal vulnerability assessment - Marcus Brewer self-opposition research and mitigation strategies',
    priority: 'high',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '1hqrTksUscPud0FRzu0DFjEtnkp7EcpxTAwwtZEa0PSA',
    title: 'Daily Intelligence Brief - Real-Time Updates',
    category: 'daily-brief',
    url: 'https://docs.google.com/document/d/1hqrTksUscPud0FRzu0DFjEtnkp7EcpxTAwwtZEa0PSA/edit',
    embedUrl: 'https://docs.google.com/document/d/1hqrTksUscPud0FRzu0DFjEtnkp7EcpxTAwwtZEa0PSA/preview',
    description: 'Daily intelligence summary with social media monitoring, news clips, and emerging threats',
    priority: 'high',
    lastUpdated: new Date().toISOString()
  }
];

export function getDocsByCategory(category: GoogleDoc['category']): GoogleDoc[] {
  return googleDocs.filter(doc => doc.category === category);
}

export function getDocById(id: string): GoogleDoc | undefined {
  return googleDocs.find(doc => doc.id === id);
}