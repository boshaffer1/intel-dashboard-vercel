const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlPath = path.join(__dirname, '../public/dashboard.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Extract all card data using regex
const cardRegex = /<article class="card"[^>]*>([\s\S]*?)<\/article>/g;
const cards = [];
let match;

while ((match = cardRegex.exec(html)) !== null) {
  const cardHtml = match[0];
  
  // Extract data attributes
  const dataKind = (cardHtml.match(/data-kind="([^"]*)"/) || [])[1];
  const dataLean = (cardHtml.match(/data-lean="([^"]*)"/) || [])[1];
  const dataCands = (cardHtml.match(/data-cands="([^"]*)"/) || [])[1];
  const dataIssues = (cardHtml.match(/data-issues="([^"]*)"/) || [])[1];
  const dataEngagement = (cardHtml.match(/data-engagement="([^"]*)"/) || [])[1];
  const dataText = (cardHtml.match(/data-text="([^"]*)"/) || [])[1];
  
  // Extract badges
  const badges = [];
  const badgeMatches = cardHtml.matchAll(/<span class="badge ([^"]*)"[^>]*>([^<]*)<\/span>/g);
  for (const badgeMatch of badgeMatches) {
    if (!badgeMatch[1].includes('cand') && !badgeMatch[1].includes('issue')) {
      badges.push({
        type: badgeMatch[1],
        text: badgeMatch[2]
      });
    }
  }
  
  // Extract time and author
  const timeMatch = cardHtml.match(/<span class="time">([^<]*)<\/span>/);
  const date = timeMatch ? timeMatch[1] : '';
  const authorMatch = cardHtml.match(/<span class="time">@([^<]*)<\/span>/);
  const author = authorMatch ? authorMatch[1] : '';
  
  // Extract URL
  const urlMatch = cardHtml.match(/href="(https:\/\/[^"]*)"[^>]*rel="noopener"/);
  const url = urlMatch ? urlMatch[1] : '';
  
  // Extract text content
  const textMatch = cardHtml.match(/<div class="text">([^<]*(?:<a[^>]*>[^<]*<\/a>[^<]*)*)<\/div>/);
  const text = textMatch ? textMatch[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#x27;/g, "'") : '';
  
  // Extract engagement metrics
  const engagement = {};
  if (cardHtml.includes('❤')) {
    const likesMatch = cardHtml.match(/❤\s*<b>(\d+)<\/b>/);
    engagement.likes = likesMatch ? parseInt(likesMatch[1]) : 0;
  }
  if (cardHtml.includes('↻')) {
    const retweetsMatch = cardHtml.match(/↻\s*<b>(\d+)<\/b>/);
    engagement.retweets = retweetsMatch ? parseInt(retweetsMatch[1]) : 0;
  }
  if (cardHtml.includes('💬')) {
    const commentsMatch = cardHtml.match(/💬\s*<b>(\d+)<\/b>/);
    engagement.comments = commentsMatch ? parseInt(commentsMatch[1]) : 0;
  }
  if (cardHtml.includes('⬆')) {
    const upvotesMatch = cardHtml.match(/⬆\s*<b>(\d+)<\/b>/);
    engagement.upvotes = upvotesMatch ? parseInt(upvotesMatch[1]) : 0;
  }
  
  // Determine platform
  let platform = 'unknown';
  if (url.includes('x.com') || url.includes('twitter.com')) platform = 'twitter';
  else if (url.includes('reddit.com')) platform = 'reddit';
  else if (url.includes('tiktok.com')) platform = 'tiktok';
  else if (url.includes('instagram.com')) platform = 'instagram';
  else if (badges.some(b => b.text.includes('Reddit'))) platform = 'reddit';
  else if (badges.some(b => b.text.includes('X '))) platform = 'twitter';
  else if (badges.some(b => b.text.includes('TikTok'))) platform = 'tiktok';
  else if (badges.some(b => b.text.includes('IG'))) platform = 'instagram';
  
  cards.push({
    id: `card-${cards.length + 1}`,
    platform,
    type: dataKind || 'post',
    sentiment: dataLean || 'neutral',
    candidates: dataCands ? dataCands.split(',') : [],
    issues: dataIssues ? dataIssues.split(',') : [],
    engagementScore: parseInt(dataEngagement) || 0,
    date,
    author,
    url,
    text,
    engagement,
    badges
  });
}

// Extract opposition research sections
const oppoRegex = /<div class="intel-section[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
const oppoSections = [];

while ((match = oppoRegex.exec(html)) !== null) {
  const sectionHtml = match[0];
  const titleMatch = sectionHtml.match(/<h2[^>]*>([^<]*)<\/h2>/);
  const contentMatch = sectionHtml.match(/<div class="intel-body">([^]*)<\/div>/);
  
  if (titleMatch && contentMatch) {
    oppoSections.push({
      id: `oppo-${oppoSections.length + 1}`,
      title: titleMatch[1],
      content: contentMatch[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&')
    });
  }
}

// Group by platform
const byPlatform = {
  twitter: cards.filter(c => c.platform === 'twitter'),
  reddit: cards.filter(c => c.platform === 'reddit'),
  tiktok: cards.filter(c => c.platform === 'tiktok'),
  instagram: cards.filter(c => c.platform === 'instagram'),
  unknown: cards.filter(c => c.platform === 'unknown')
};

// Group by candidate
const byCandidates = {};
['brewer', 'johnson', 'quigley', 'pappas', 'mendoza', 'giannoulias'].forEach(cand => {
  byCandidates[cand] = cards.filter(c => 
    c.candidates.some(candidate => candidate.toLowerCase().includes(cand))
  );
});

// Calculate statistics
const stats = {
  total: cards.length,
  byPlatform: Object.entries(byPlatform).map(([platform, items]) => ({
    platform,
    count: items.length
  })),
  bySentiment: {
    positive: cards.filter(c => c.sentiment === 'pos').length,
    negative: cards.filter(c => c.sentiment === 'neg').length,
    mixed: cards.filter(c => c.sentiment === 'mixed').length,
    neutral: cards.filter(c => !c.sentiment || c.sentiment === 'neutral').length
  },
  byCandidate: Object.entries(byCandidates).map(([candidate, items]) => ({
    candidate,
    count: items.length
  })),
  topEngagement: cards.sort((a, b) => b.engagementScore - a.engagementScore).slice(0, 10)
};

// Save to JSON file
const output = {
  metadata: {
    extractedAt: new Date().toISOString(),
    totalCards: cards.length,
    oppositionSections: oppoSections.length
  },
  stats,
  cards,
  oppositionResearch: oppoSections,
  byPlatform,
  byCandidates
};

fs.writeFileSync(
  path.join(__dirname, '../lib/scrapedData.json'),
  JSON.stringify(output, null, 2)
);

console.log(`✅ Extracted ${cards.length} cards from dashboard`);
console.log(`📊 Platform breakdown:`, stats.byPlatform);
console.log(`📈 Sentiment:`, stats.bySentiment);
console.log(`🎯 By candidate:`, stats.byCandidate);
console.log(`📁 Data saved to lib/scrapedData.json`);