import { useEffect } from 'react';
import { performanceMonitor } from '@site/src/utils/performanceMonitor';

/**
 * Hook to initialize performance monitoring
 * 
 * @example
 * ```tsx
 * function MyApp() {
 *   usePerformanceMonitor();
 *   return <div>...</div>;
 * }
 * ```
 */
export function usePerformanceMonitor(): void {
  useEffect(() => {
    // Initialize performance monitoring once the component mounts
    performanceMonitor.init();

    // Optional: Log metrics on page unload
    const handleUnload = () => {
      const metrics = performanceMonitor.getMetrics();
      if (metrics.size > 0) {
        console.log('Performance metrics summary:', Object.fromEntries(metrics));
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);
}