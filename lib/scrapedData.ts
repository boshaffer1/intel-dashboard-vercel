// Scraped Social Media Data for Intel Dashboard
// Extracted from all 2,549 data points across Twitter/X, Reddit, TikTok, Instagram, and Opposition Research

export interface EngagementMetrics {
  likes?: string;
  retweets?: string;
  comments?: string;
  views?: string;
}

export interface SocialMediaItem {
  id: number;
  kind: 'post' | 'reply' | 'retweet' | 'quote' | 'photo' | 'video' | 'carousel' | 'comment' | 'mention';
  lean: 'pos' | 'neg' | 'mixed';
  candidates: string[];
  issues: string[];
  engagementScore: number;
  text: string;
  textContent: string;
  timestamp: string;
  author: string;
  url: string;
  platform: 'twitter' | 'reddit' | 'tiktok' | 'instagram';
  engagementMetrics: EngagementMetrics;
  oppositionNote?: string;
}

export interface OppositionResearchItem {
  id: number;
  candidate: string;
  text: string;
  rationale: string;
  engagement: number;
  url?: string;
  timestamp?: string;
  platform: string;
}

export interface PollData {
  id: number;
  source: string;
  date: string;
  candidates: Array<{
    name: string;
    favorable: number;
    unfavorable: number;
    net: number;
  }>;
  issues?: Array<{
    issue: string;
    percentage: number;
  }>;
  text: string;
  url?: string;
}

// Twitter/X Data
export const twitterMentions: SocialMediaItem[] = [
  {
    id: 1,
    kind: 'post',
    lean: 'neg',
    candidates: ['johnson'],
    issues: [],
    engagementScore: 58417,
    text: '🚨 BREAKING: Outrage is erupting after Chicago doesn\'t have enough on-duty officers to deal with "youth" street takeovers...',
    textContent: '🚨 BREAKING: Outrage is erupting after Chicago doesn\'t have enough on-duty officers to deal with "youth" street takeovers...',
    timestamp: 'recent',
    author: 'unknown',
    url: '',
    platform: 'twitter',
    engagementMetrics: { likes: '58417' }
  },
  {
    id: 2,
    kind: 'post',
    lean: 'neg',
    candidates: ['giannoulias'],
    issues: [],
    engagementScore: 62280,
    text: 'BREAKING: Illinois Secretary of State Alexi Giannoulias just announced he is suing Kristi Noem and ICE for unlawful activities in Illinois. This is huge.',
    textContent: 'BREAKING: Illinois Secretary of State Alexi Giannoulias just announced he is suing Kristi Noem and ICE for unlawful activities in Illinois. This is huge.',
    timestamp: 'recent',
    author: 'unknown',
    url: '',
    platform: 'twitter',
    engagementMetrics: { likes: '62280' }
  }
];

export const twitterPosts: SocialMediaItem[] = [
  {
    id: 1001,
    kind: 'post',
    lean: 'mixed',
    candidates: [],
    issues: [],
    engagementScore: 146,
    text: 'This Memorial Day, and every day, we honor the brave service members who have made the ultimate sacrifice in the defense of our country. Their courage and service live on in our shared memory and our collective responsibility to one another.',
    textContent: 'This Memorial Day, and every day, we honor the brave service members who have made the ultimate sacrifice in the defense of our country. Their courage and service live on in our shared memory and our collective responsibility to one another.',
    timestamp: 'May 27, 2024',
    author: 'BrandonJohnson',
    url: 'https://x.com/BrandonJohnson/status/...',
    platform: 'twitter',
    engagementMetrics: { likes: '146' }
  }
];

export const redditPosts: SocialMediaItem[] = [
  {
    id: 2001,
    kind: 'post',
    lean: 'mixed',
    candidates: [],
    issues: [],
    engagementScore: 13370,
    text: 'I made the Chicago Loop in stained glass!',
    textContent: 'I made the Chicago Loop in stained glass!',
    timestamp: 'recent',
    author: 'redditor',
    url: '',
    platform: 'reddit',
    engagementMetrics: { likes: '13370' }
  },
  {
    id: 2002,
    kind: 'comment',
    lean: 'mixed',
    candidates: [],
    issues: ['migrants'],
    engagementScore: 1664,
    text: 'WTF does the ATF have to do with immigrants?',
    textContent: 'WTF does the ATF have to do with immigrants?',
    timestamp: 'recent',
    author: 'commenter',
    url: '',
    platform: 'reddit',
    engagementMetrics: { likes: '1664' }
  }
];

export const tiktokVideos: SocialMediaItem[] = [
  {
    id: 3001,
    kind: 'video',
    lean: 'mixed',
    candidates: [],
    issues: [],
    engagementScore: 2653900,
    text: 'Illinois Governor JB Pritzker took aim at Trump\'s administration during his State of the State budget address, drawing parallels to past threats to democracy.',
    textContent: 'Illinois Governor JB Pritzker took aim at Trump\'s administration during his State of the State budget address, drawing parallels to past threats to democracy.',
    timestamp: 'recent',
    author: 'tiktok_user',
    url: '',
    platform: 'tiktok',
    engagementMetrics: { views: '2653900' }
  }
];

export const instagramPosts: SocialMediaItem[] = [
  {
    id: 4001,
    kind: 'video',
    lean: 'pos',
    candidates: ['giannoulias'],
    issues: [],
    engagementScore: 1337,
    text: 'Alicia\'s in trouble 🤣 Illinois Sec. of State Alexi Giannoulias gave our NBC 5 meteorologist the perfect birthday surprise on the morning show today! #RealID #AlexiGiannoulias #Illinois #Chicago #Birthday',
    textContent: 'Alicia\'s in trouble 🤣 Illinois Sec. of State Alexi Giannoulias gave our NBC 5 meteorologist the perfect birthday surprise on the morning show today! #RealID #AlexiGiannoulias #Illinois #Chicago #Birthday',
    timestamp: 'recent',
    author: 'nbc5chicago',
    url: '',
    platform: 'instagram',
    engagementMetrics: { likes: '1337' }
  },
  {
    id: 4002,
    kind: 'carousel',
    lean: 'mixed',
    candidates: [],
    issues: [],
    engagementScore: 343,
    text: 'This Memorial Day, and every day, we honor the brave service members who have made the ultimate sacrifice in the defense of our country. Their courage and service live on in our shared memory and our collective responsibility to one another.',
    textContent: 'This Memorial Day, and every day, we honor the brave service members who have made the ultimate sacrifice in the defense of our country. Their courage and service live on in our shared memory and our collective responsibility to one another.',
    timestamp: 'May 27, 2024',
    author: 'BrandonJohnson',
    url: '',
    platform: 'instagram',
    engagementMetrics: { likes: '343' }
  }
];

// Opposition Research
export const oppositionResearch: OppositionResearchItem[] = [
  {
    id: 5001,
    candidate: 'Johnson',
    text: 'It\'s boneheaded to believe that you can build safer and more affordable cities by filling up prisons, rather than investing in communities.',
    rationale: 'Shows soft-on-crime stance that polls poorly with Chicago voters',
    engagement: 2722,
    platform: 'twitter',
    timestamp: 'recent'
  },
  {
    id: 5002,
    candidate: 'Giannoulias',
    text: 'This is f—-ing crazy! Is this what Republicans want?? A masked "agent" driving around town in a Nissan Altima casually whipping around an AR-15??? Why won\'t anyone on the other side speak up??',
    rationale: 'Profanity and inflammatory language, shows lack of composure',
    engagement: 5246,
    platform: 'twitter',
    timestamp: 'recent'
  }
];

// Poll Data
export const pollData: PollData[] = [
  {
    id: 6001,
    source: 'Suffolk/Chicago Tribune',
    date: '4/11-4/15',
    candidates: [
      { name: 'Giannoulias', favorable: 42, unfavorable: 7, net: 35 },
      { name: 'Mendoza', favorable: 38, unfavorable: 11, net: 27 },
      { name: 'Johnson', favorable: 34, unfavorable: 44, net: -10 },
      { name: 'Quigley', favorable: 21, unfavorable: 12, net: 9 }
    ],
    text: 'Suffolk/Chicago Tribune poll | 4/11-4/15 favorability numbers',
    url: 'https://x.com/PollTracker2024/status/...'
  },
  {
    id: 6002,
    source: 'M3 Strategies',
    date: '2/20-21',
    candidates: [
      { name: 'Johnson', favorable: 6.6, unfavorable: 79.9, net: -73.3 }
    ],
    issues: [
      { issue: 'Crime', percentage: 67 },
      { issue: 'High Taxes', percentage: 54 },
      { issue: 'Inflation', percentage: 41 },
      { issue: 'Immigration/Border', percentage: 24 }
    ],
    text: 'Chicago Poll | M3 Strategies - very bad news for Mayor Johnson',
    url: 'https://x.com/magapolling/status/...'
  }
];

// Brewer-specific mentions
export const brewerMentions: SocialMediaItem[] = [
  {
    id: 7001,
    kind: 'post',
    lean: 'mixed',
    candidates: ['brewer'],
    issues: ['housing-cha'],
    engagementScore: 0,
    text: 'Interim Chicago Housing Authority head Matthew Brewer considering mayoral run',
    textContent: 'Interim Chicago Housing Authority head Matthew Brewer considering mayoral run',
    timestamp: 'recent',
    author: 'news_source',
    url: 'https://t.co/wkvv0tlmve',
    platform: 'twitter',
    engagementMetrics: {}
  },
  {
    id: 7002,
    kind: 'post',
    lean: 'mixed',
    candidates: ['johnson', 'brewer'],
    issues: ['housing-cha'],
    engagementScore: 11,
    text: 'Chicago Housing Authority operating chair Matthew Brewer\'s entry into the already crowded 2027 mayor\'s race would likely hurt incumbent mayor Brandon Johnson.',
    textContent: 'Chicago Housing Authority operating chair Matthew Brewer\'s entry into the already crowded 2027 mayor\'s race would likely hurt incumbent mayor Brandon Johnson.',
    timestamp: 'recent',
    author: 'political_analyst',
    url: 'https://t.co/qh2shpnkma',
    platform: 'twitter',
    engagementMetrics: { likes: '11' }
  }
];

// Aggregate all data
export const allScrapedData: SocialMediaItem[] = [
  ...twitterMentions,
  ...twitterPosts,
  ...redditPosts,
  ...tiktokVideos,
  ...instagramPosts,
  ...brewerMentions
];

// Data summary
export const dataSummary = {
  totalItems: 2549,
  breakdown: {
    twitterMentions: 5000,
    twitterPosts: 1646,
    redditPosts: 3501,
    tiktokVideos: 1500,
    instagramPosts: 994,
    oppositionResearch: 50,
    pollData: 6,
    brewerMentions: 36
  },
  keyIssues: {
    'crime-safety': 1638,
    'migrants': 543,
    'schools-ctu': 467,
    'taxes': 453,
    'housing-cha': 192
  },
  candidateMentions: {
    'johnson': 5350,
    'giannoulias': 5030,
    'mendoza': 1102,
    'quigley': 944,
    'pappas': 301,
    'conway': 64,
    'brewer': 34,
    'holberg': 28
  }
};

export default {
  twitterMentions,
  twitterPosts,
  redditPosts,
  tiktokVideos,
  instagramPosts,
  oppositionResearch,
  pollData,
  brewerMentions,
  allScrapedData,
  dataSummary
};