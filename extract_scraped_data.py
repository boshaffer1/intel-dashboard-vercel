#!/usr/bin/env python3
import re
import json
import html
from typing import Dict, List, Any
from datetime import datetime

def parse_html_dashboard(file_path: str) -> Dict[str, Any]:
    """Parse the HTML dashboard file and extract all card data"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract all cards using regex
    card_pattern = r'<article class="card"[^>]*data-kind="([^"]*)"[^>]*data-lean="([^"]*)"[^>]*data-cands="([^"]*)"[^>]*data-issues="([^"]*)"[^>]*data-engagement="([^"]*)"[^>]*data-text="([^"]*)"[^>]*>(.*?)</article>'
    
    cards = []
    matches = re.finditer(card_pattern, content, re.DOTALL)
    
    for i, match in enumerate(matches):
        kind, lean, cands, issues, engagement, text, card_html = match.groups()
        
        # Extract additional info from card HTML
        platform_match = re.search(r'<span class="badge ([^"]*)"', card_html)
        platform = 'unknown'
        if platform_match:
            badge_class = platform_match.group(1)
            if 'reddit' in badge_class:
                platform = 'reddit'
            elif 'tiktok' in badge_class:
                platform = 'tiktok'
            elif 'ig' in badge_class:
                platform = 'instagram'
            elif 'mention' in badge_class:
                platform = 'twitter'
            else:
                platform = 'twitter'
        
        # Extract timestamp
        time_match = re.search(r'<span class="time">([^<]+)</span>', card_html)
        timestamp = time_match.group(1) if time_match else ''
        
        # Extract author
        author_match = re.search(r'<span class="time">@([^<]+)</span>', card_html)
        author = author_match.group(1) if author_match else ''
        
        # Extract URL
        url_match = re.search(r'<a class="ext" href="([^"]*)"', card_html)
        url = url_match.group(1) if url_match else ''
        
        # Extract engagement metrics
        engagement_metrics = {}
        meta_match = re.search(r'<div class="meta">(.*?)</div>', card_html, re.DOTALL)
        if meta_match:
            meta_content = meta_match.group(1)
            # Extract various metrics
            heart_match = re.search(r'❤ <b>([^<]+)</b>', meta_content)
            retweet_match = re.search(r'↻ <b>([^<]+)</b>', meta_content)
            comment_match = re.search(r'💬 <b>([^<]+)</b>', meta_content)
            view_match = re.search(r'👁 <b>([^<]+)</b>', meta_content)
            upvote_match = re.search(r'⬆ <b>([^<]+)</b>', meta_content)
            play_match = re.search(r'▶ <b>([^<]+)</b>', meta_content)
            share_match = re.search(r'↗ <b>([^<]+)</b>', meta_content)
            
            if heart_match:
                engagement_metrics['likes'] = heart_match.group(1)
            if retweet_match:
                engagement_metrics['retweets'] = retweet_match.group(1)
            if comment_match:
                engagement_metrics['comments'] = comment_match.group(1)
            if view_match:
                engagement_metrics['views'] = view_match.group(1)
            if upvote_match:
                engagement_metrics['likes'] = upvote_match.group(1)
            if play_match:
                engagement_metrics['views'] = play_match.group(1)
            if share_match:
                engagement_metrics['shares'] = share_match.group(1)
        
        # Parse candidates and issues
        candidates_list = [c.strip() for c in cands.split(',') if c.strip()]
        issues_list = [i.strip() for i in issues.split(',') if i.strip()]
        
        # Decode HTML entities in text
        text_content = html.unescape(text)
        
        card_data = {
            'id': i + 1,
            'kind': kind,
            'lean': lean,
            'candidates': candidates_list,
            'issues': issues_list,
            'engagementScore': int(engagement) if engagement.isdigit() else 0,
            'text': text_content,
            'textContent': text_content,
            'timestamp': timestamp,
            'author': author,
            'url': url,
            'platform': platform,
            'engagementMetrics': engagement_metrics
        }
        
        cards.append(card_data)
    
    # Extract intelligence sections
    intel_pattern = r'<section class="intel-section(?:[^"]*)"?>(.*?)</section>'
    intel_matches = re.finditer(intel_pattern, content, re.DOTALL)
    
    intel_sections = []
    for match in intel_matches:
        section_html = match.group(1)
        
        # Extract title
        title_match = re.search(r'<h2 class="section-h">([^<]+)</h2>', section_html)
        title = title_match.group(1) if title_match else ''
        
        # Extract body content
        body_match = re.search(r'<div class="intel-body">(.*?)</div>', section_html, re.DOTALL)
        body = body_match.group(1) if body_match else ''
        
        # Clean up HTML in body
        body_text = re.sub(r'<[^>]+>', '', body)
        body_text = html.unescape(body_text).strip()
        
        intel_sections.append({
            'title': title,
            'content': body_text,
            'html': body
        })
    
    return {
        'cards': cards,
        'intelligence': intel_sections,
        'totalCards': len(cards),
        'extractedAt': datetime.now().isoformat()
    }

def main():
    html_file = '/Users/boshaffer/Downloads/Campaign 2/intel-dashboard-vercel/public/dashboard.html'
    output_file = '/Users/boshaffer/Downloads/Campaign 2/intel-dashboard-vercel/lib/extractedData.json'
    
    print(f"Parsing HTML file: {html_file}")
    data = parse_html_dashboard(html_file)
    
    print(f"Extracted {data['totalCards']} cards")
    print(f"Extracted {len(data['intelligence'])} intelligence sections")
    
    # Write to JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Data saved to: {output_file}")
    
    # Print some stats
    platforms = {}
    sentiments = {}
    for card in data['cards']:
        platform = card['platform']
        lean = card['lean']
        platforms[platform] = platforms.get(platform, 0) + 1
        sentiments[lean] = sentiments.get(lean, 0) + 1
    
    print("\nPlatform breakdown:")
    for platform, count in sorted(platforms.items()):
        print(f"  {platform}: {count}")
    
    print("\nSentiment breakdown:")
    for sentiment, count in sorted(sentiments.items()):
        print(f"  {sentiment}: {count}")

if __name__ == "__main__":
    main()