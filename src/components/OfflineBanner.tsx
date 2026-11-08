import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-amber-600 text-white text-xs sm:text-sm font-medium py-2 px-4 text-center sticky top-0 z-50 flex items-center justify-center space-x-2 shadow-md">
      <WifiOff className="w-4 h-4 animate-pulse" />
      <span>You are currently offline. You can still browse previously loaded content.</span>
    </div>
  );
};

export default OfflineBanner;
