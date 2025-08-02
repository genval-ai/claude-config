/**
 * Performance monitoring utilities for tracking web vitals and custom metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric[]> = new Map();
  private isProduction = process.env.NODE_ENV === 'production';

  /**
   * Initialize performance monitoring
   */
  init(): void {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    this.monitorWebVitals();
    
    // Monitor navigation timing
    this.monitorNavigationTiming();
    
    // Monitor resource timing
    this.monitorResourceTiming();
  }

  /**
   * Monitor Core Web Vitals (LCP, FID, CLS)
   */
  private monitorWebVitals(): void {
    // Dynamically import web-vitals to avoid SSR issues
    import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB, onFCP }) => {
      onCLS((metric) => this.logMetric('CLS', metric.value, this.getCLSRating(metric.value)));
      onFID((metric) => this.logMetric('FID', metric.value, this.getFIDRating(metric.value)));
      onLCP((metric) => this.logMetric('LCP', metric.value, this.getLCPRating(metric.value)));
      onTTFB((metric) => this.logMetric('TTFB', metric.value, this.getTTFBRating(metric.value)));
      onFCP((metric) => this.logMetric('FCP', metric.value, this.getFCPRating(metric.value)));
    }).catch(console.error);
  }

  /**
   * Monitor navigation timing
   */
  private monitorNavigationTiming(): void {
    if (!window.performance || !window.performance.getEntriesByType) return;

    const navigationEntries = window.performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0) {
      const navigation = navigationEntries[0];
      
      // DNS lookup time
      const dnsTime = navigation.domainLookupEnd - navigation.domainLookupStart;
      this.logMetric('DNS Lookup', dnsTime, this.getTimingRating(dnsTime, 50, 100));
      
      // TCP connection time
      const tcpTime = navigation.connectEnd - navigation.connectStart;
      this.logMetric('TCP Connection', tcpTime, this.getTimingRating(tcpTime, 50, 150));
      
      // Time to First Byte
      const ttfb = navigation.responseStart - navigation.requestStart;
      this.logMetric('Server Response', ttfb, this.getTimingRating(ttfb, 200, 600));
      
      // DOM Content Loaded
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      this.logMetric('DOM Content Loaded', domContentLoaded, this.getTimingRating(domContentLoaded, 100, 300));
    }
  }

  /**
   * Monitor resource timing
   */
  private monitorResourceTiming(): void {
    if (!window.performance || !window.performance.getEntriesByType) return;

    const resourceEntries = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    // Group resources by type
    const resourcesByType = new Map<string, number>();
    const slowResources: Array<{name: string; duration: number}> = [];
    
    resourceEntries.forEach(resource => {
      const resourceType = this.getResourceType(resource.name);
      const currentSize = resourcesByType.get(resourceType) || 0;
      resourcesByType.set(resourceType, currentSize + (resource.transferSize || 0));
      
      // Track slow resources (> 500ms)
      if (resource.duration > 500) {
        slowResources.push({
          name: resource.name,
          duration: resource.duration
        });
      }
    });
    
    // Log resource metrics
    resourcesByType.forEach((size, type) => {
      this.logMetric(`${type} Size`, size / 1024, this.getResourceSizeRating(size));
    });
    
    // Log slow resources
    if (slowResources.length > 0 && !this.isProduction) {
      console.warn('Slow resources detected:', slowResources);
    }
  }

  /**
   * Get resource type from URL
   */
  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js':
        return 'JavaScript';
      case 'css':
        return 'CSS';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
      case 'webp':
        return 'Images';
      case 'woff':
      case 'woff2':
      case 'ttf':
      case 'eot':
        return 'Fonts';
      default:
        return 'Other';
    }
  }

  /**
   * Log a performance metric
   */
  private logMetric(name: string, value: number, rating: PerformanceMetric['rating']): void {
    const metric: PerformanceMetric = {
      name,
      value,
      rating,
      timestamp: Date.now()
    };

    // Store metric
    const metrics = this.metrics.get(name) || [];
    metrics.push(metric);
    this.metrics.set(name, metrics);

    // Log to console in development
    if (!this.isProduction) {
      const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
      console.log(`${emoji} ${name}: ${value.toFixed(2)}ms (${rating})`);
    }

    // Send to analytics (placeholder)
    this.sendToAnalytics(metric);
  }

  /**
   * Send metrics to analytics service
   */
  private sendToAnalytics(metric: PerformanceMetric): void {
    // This is a placeholder for sending metrics to your analytics service
    // You could integrate with Google Analytics, Sentry, or a custom service
    if (this.isProduction && typeof window !== 'undefined' && 'sendBeacon' in navigator) {
      // Example: navigator.sendBeacon('/api/metrics', JSON.stringify(metric));
    }
  }

  /**
   * Get all collected metrics
   */
  getMetrics(): Map<string, PerformanceMetric[]> {
    return this.metrics;
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics.clear();
  }

  // Rating functions based on Google's Web Vitals thresholds
  private getCLSRating(value: number): PerformanceMetric['rating'] {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  private getFIDRating(value: number): PerformanceMetric['rating'] {
    if (value <= 100) return 'good';
    if (value <= 300) return 'needs-improvement';
    return 'poor';
  }

  private getLCPRating(value: number): PerformanceMetric['rating'] {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  private getTTFBRating(value: number): PerformanceMetric['rating'] {
    if (value <= 800) return 'good';
    if (value <= 1800) return 'needs-improvement';
    return 'poor';
  }

  private getFCPRating(value: number): PerformanceMetric['rating'] {
    if (value <= 1800) return 'good';
    if (value <= 3000) return 'needs-improvement';
    return 'poor';
  }

  private getTimingRating(value: number, goodThreshold: number, poorThreshold: number): PerformanceMetric['rating'] {
    if (value <= goodThreshold) return 'good';
    if (value <= poorThreshold) return 'needs-improvement';
    return 'poor';
  }

  private getResourceSizeRating(bytes: number): PerformanceMetric['rating'] {
    const kb = bytes / 1024;
    if (kb <= 100) return 'good';
    if (kb <= 300) return 'needs-improvement';
    return 'poor';
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();