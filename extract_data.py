#!/usr/bin/env python3
"""
Extract all social media data from the HTML dashboard file
"""

import re
import json
from html import unescape
from typing import Dict, List, Any

def extract_all_data():
    """Extract all card data from the HTML file"""
    
    # Read the entire file
    with open('/Users/boshaffer/Downloads/Campaign 2/intel-dashboard-vercel/public/dashboard.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all article elements with their complete content
    article_pattern = r'<article class="card"[^>]*>(.*?)</article>'
    articles = re.findall(article_pattern, content, re.DOTALL)
    
    extracted_data = []
    
    for article_html in articles:
        # Extract the opening tag to get data attributes
        full_article = f'<article class="card"{article_html.split(">")[0]}>'
        
        # Extract data attributes
        data_kind = re.search(r'data-kind="([^"]*)"', full_article)
        data_lean = re.search(r'data-lean="([^"]*)"', full_article)
        data_cands = re.search(r'data-cands="([^"]*)"', full_article)
        data_issues = re.search(r'data-issues="([^"]*)"', full_article)
        data_engagement = re.search(r'data-engagement="([^"]*)"', full_article)
        data_text = re.search(r'data-text="([^"]*)"', full_article)
        
        # Extract time/author from card-head
        time_match = re.search(r'<span class="time">([^<]*)</span>', article_html)
        author_match = re.search(r'<span class="time">@([^<]*)</span>', article_html)
        
        # Extract URL from external link
        url_match = re.search(r'<a class="ext" href="([^"]*)"', article_html)
        
        # Extract text content
        text_section = re.search(r'<div class="text">(.*?)</div>', article_html, re.DOTALL)
        text_content = ""
        if text_section:
            text_raw = text_section.group(1)
            # Remove HTML tags and decode HTML entities
            text_content = re.sub(r'<[^>]+>', '', text_raw)
            text_content = unescape(text_content).strip()
        
        # Extract engagement metrics
        meta_section = re.search(r'<div class="meta">(.*?)</div>', article_html, re.DOTALL)
        engagement_metrics = {}
        if meta_section:
            likes = re.search(r'❤ <b>([^<]*)</b>', meta_section.group(1))
            retweets = re.search(r'↻ <b>([^<]*)</b>', meta_section.group(1))
            comments = re.search(r'💬 <b>([^<]*)</b>', meta_section.group(1))
            views = re.search(r'👁 <b>([^<]*)</b>', meta_section.group(1))
            
            if likes:
                engagement_metrics['likes'] = likes.group(1)
            if retweets:
                engagement_metrics['retweets'] = retweets.group(1)
            if comments:
                engagement_metrics['comments'] = comments.group(1)
            if views:
                engagement_metrics['views'] = views.group(1)
        
        # Extract opposition research notes if present
        oppo_note = ""
        oppo_match = re.search(r'<div class="oppo-note">(.*?)</div>', article_html, re.DOTALL)
        if oppo_match:
            oppo_note = re.sub(r'<[^>]+>', '', oppo_match.group(1))
            oppo_note = unescape(oppo_note).strip()
        
        # Build the data object
        item = {
            'id': len(extracted_data) + 1,
            'kind': data_kind.group(1) if data_kind else '',
            'lean': data_lean.group(1) if data_lean else '',
            'candidates': data_cands.group(1).split(',') if data_cands and data_cands.group(1) else [],
            'issues': data_issues.group(1).split(',') if data_issues and data_issues.group(1) else [],
            'engagement_score': int(data_engagement.group(1)) if data_engagement and data_engagement.group(1).isdigit() else 0,
            'data_text': unescape(data_text.group(1)) if data_text else '',
            'text_content': text_content,
            'timestamp': time_match.group(1) if time_match else '',
            'author': author_match.group(1) if author_match else '',
            'url': url_match.group(1) if url_match else '',
            'engagement_metrics': engagement_metrics,
            'opposition_note': oppo_note
        }
        
        extracted_data.append(item)
    
    return extracted_data

def categorize_data(data):
    """Categorize data by type and source"""
    categories = {
        'twitter_mentions': [],
        'twitter_posts': [],
        'reddit_posts': [],
        'reddit_comments': [],
        'tiktok_videos': [],
        'instagram_posts': [],
        'instagram_videos': [],
        'instagram_carousels': [],
        'opposition_research': [],
        'poll_data': []
    }
    
    for item in data:
        kind = item['kind']
        
        if 'oppo' in item.get('url', '') or item['opposition_note']:
            categories['opposition_research'].append(item)
        elif 'poll' in item['text_content'].lower() or 'favorability' in item['text_content'].lower():
            categories['poll_data'].append(item)
        elif kind == 'post' and 'x.com' in item.get('url', ''):
            if any(cand in item['text_content'].lower() for cand in ['johnson', 'brewer', 'giannoulias']):
                categories['twitter_mentions'].append(item)
            else:
                categories['twitter_posts'].append(item)
        elif kind == 'reply' and 'x.com' in item.get('url', ''):
            categories['twitter_mentions'].append(item)
        elif kind == 'post' and 'reddit' in item.get('url', ''):
            categories['reddit_posts'].append(item)
        elif kind == 'comment':
            categories['reddit_comments'].append(item)
        elif kind == 'video' and 'tiktok' in item.get('url', ''):
            categories['tiktok_videos'].append(item)
        elif kind == 'photo':
            categories['instagram_posts'].append(item)
        elif kind == 'video' and 'instagram' in item.get('url', ''):
            categories['instagram_videos'].append(item)
        elif kind == 'carousel':
            categories['instagram_carousels'].append(item)
    
    return categories

if __name__ == "__main__":
    print("Extracting all data from dashboard.html...")
    
    # Extract all data
    all_data = extract_all_data()
    print(f"Extracted {len(all_data)} total items")
    
    # Categorize the data
    categorized = categorize_data(all_data)
    
    # Print summary
    print("\nData summary by category:")
    for category, items in categorized.items():
        print(f"{category}: {len(items)} items")
    
    # Save to JSON for verification
    with open('/Users/boshaffer/Downloads/Campaign 2/intel-dashboard-vercel/extracted_data.json', 'w', encoding='utf-8') as f:
        json.dump({
            'all_data': all_data,
            'categorized': categorized,
            'total_count': len(all_data)
        }, f, indent=2, ensure_ascii=False)
    
    print(f"\nData exported to extracted_data.json")
    print("Ready to generate TypeScript file...")