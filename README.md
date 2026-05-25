# Intel Dashboard - Secure Deployment

## Password Protected Campaign Intelligence Dashboard

This dashboard is deployed with password protection on Vercel.

### Access Credentials
- **Password**: `MB4M@yor2027!`

### Features
- Complete campaign intelligence dashboard with 2,549+ data points
- Opposition research sections
- Candidate tracking
- Social media monitoring
- Professional black & white design
- Secure password protection via HTTP Basic Auth

### Local Development
```bash
npm install
npm run dev
```

### Deployment
The dashboard is configured for automatic deployment to Vercel with password protection enabled through middleware.

### Security
- Password protected using Next.js middleware
- HTTP Basic Authentication
- Credentials are checked on every request
- No data is stored on the client side without authentication