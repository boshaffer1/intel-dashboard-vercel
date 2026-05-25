import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if user is authenticated
  const basicAuth = request.headers.get('authorization');
  
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const decoded = atob(authValue);
    
    // Accept password in either format: ":password" or "anything:password"
    const colonIndex = decoded.indexOf(':');
    const pwd = colonIndex >= 0 ? decoded.substring(colonIndex + 1) : decoded;
    
    // Check password only
    if (pwd === 'MB4M@yor2027!') {
      return NextResponse.next();
    }
  }
  
  // If not authenticated, request authentication
  return new Response('Password required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Enter Password (leave username blank)"',
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};