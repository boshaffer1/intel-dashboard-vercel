import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if user is authenticated
  const basicAuth = request.headers.get('authorization');
  
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');
    
    // Check password
    if (pwd === 'MB4M@yor2027!') {
      return NextResponse.next();
    }
  }
  
  // If not authenticated, request authentication
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};