# Campaign Intelligence Dashboard

A comprehensive Next.js dashboard for campaign intelligence monitoring and analysis, built for the Brewer 2027 campaign.

## Features

### 📊 Daily Intelligence Briefs
- **Timeline View**: Chronological visualization of daily briefs with sentiment indicators
- **Interactive Details**: Click-through functionality to view full brief content
- **Real-time Metrics**: Live mention counts, sentiment scores, and key events
- **Search & Filter**: Advanced filtering by date range, sentiment, and content

### 📈 Weekly Analytics & Trends
- **Sentiment Tracking**: Interactive charts showing sentiment trends over time
- **Mention Volume**: Visual representation of campaign mention frequency
- **Viral Moments**: Automated detection of high-engagement content
- **Competitive Analysis**: Real-time positioning against opponents

### 👥 Opponent Intelligence Dossiers
- **Living Documents**: Real-time editing of opponent profiles
- **Vulnerability Mapping**: Structured tracking of weaknesses and attack vectors
- **Version History**: Complete change tracking with diff visualization
- **Strength Analysis**: Comprehensive opponent capabilities assessment

### 🚨 Real-time Monitoring
- **Live Status Indicators**: Connection health and data freshness
- **Smart Alerts**: Categorized notifications for critical events
- **Alert Management**: Mark as read, dismiss, and filter functionality
- **Activity Timeline**: Real-time feed of all intelligence updates

### 📤 Export & Reporting
- **Multiple Formats**: PDF reports, CSV data, and JSON exports
- **Custom Date Ranges**: Flexible time period selection
- **Visual Reports**: Charts and graphs included in PDF exports
- **Automated Scheduling**: Set up recurring report generation

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Heroicons for consistent iconography
- **Database**: Supabase (PostgreSQL) integration ready
- **Real-time**: WebSocket support for live updates

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd intel-dashboard-vercel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# API Keys
NEXT_PUBLIC_API_URL=your_api_endpoint

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── globals.css        # Global styles with CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main dashboard page
├── components/            # Reusable React components
│   ├── alerts/           # Alert system components
│   ├── briefs/           # Daily brief components
│   ├── charts/           # Data visualization components
│   ├── common/           # Shared UI components
│   ├── dossier/          # Opponent intelligence components
│   └── export/           # Export functionality
├── public/               # Static assets
└── middleware.js         # Next.js middleware
```

## Key Components

### Dashboard Navigation
- **Tabbed Interface**: Switch between Daily, Weekly, and Dossiers views
- **Real-time Status**: Live connection and update indicators
- **Search Integration**: Global search across all content types

### Data Visualization
- **Interactive Charts**: Hover tooltips and responsive design
- **Sentiment Analysis**: Color-coded visualization of campaign sentiment
- **Timeline Views**: Chronological organization of intelligence data

### Intelligence Management
- **Version Control**: Complete history tracking for dossier updates
- **Change Detection**: Automated highlighting of document modifications
- **Collaborative Editing**: Support for multiple team members

## Design System

The dashboard uses a sophisticated design system with:

- **Color Palette**: Primary blue (#2563eb), semantic colors for status
- **Typography**: Inter font family for optimal readability
- **Spacing**: Consistent 4px grid system
- **Shadows**: Layered depth with subtle shadows
- **Animations**: Smooth transitions and micro-interactions

### CSS Variables
```css
:root {
  --primary: #2563eb;
  --primary-dark: #1e40af;
  --bg-main: #f8fafc;
  --bg-card: #ffffff;
  --bg-sidebar: #0f172a;
  --border-light: #e2e8f0;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
}
```

## Database Integration

The dashboard is designed to integrate with Supabase PostgreSQL database. Expected table structure:

### Daily Briefs
```sql
CREATE TABLE daily_briefs (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  mentions INTEGER DEFAULT 0,
  sentiment DECIMAL(3,2),
  key_events JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Opponent Dossiers
```sql
CREATE TABLE opponent_dossiers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT,
  vulnerabilities JSONB,
  strengths JSONB,
  version INTEGER DEFAULT 1,
  last_updated TIMESTAMP DEFAULT NOW(),
  updated_by TEXT
);
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## Development

### Adding New Features
1. Create components in appropriate subdirectories
2. Follow the established naming conventions
3. Use TypeScript for type safety
4. Implement responsive design with Tailwind CSS

### Testing
```bash
npm run test        # Run test suite
npm run test:watch  # Watch mode for development
```

## Security Considerations

- All API keys stored in environment variables
- Supabase Row Level Security (RLS) enabled
- Input validation on all user inputs
- Secure WebSocket connections for real-time updates

## Performance Optimizations

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Caching**: Static generation where possible
- **Bundle Analysis**: Regular monitoring of bundle size

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is proprietary and confidential. All rights reserved.

---

**Built for Brewer 2027 Campaign**  
Intelligence Dashboard v1.0.0