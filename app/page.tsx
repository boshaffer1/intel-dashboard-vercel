'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to hub dashboard
    router.push('/hub');
  }, [router]);
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Loading Campaign Intelligence Dashboard...</h1>
        <p className="text-gray-400">Redirecting to hub</p>
      </div>
    </div>
  );
}