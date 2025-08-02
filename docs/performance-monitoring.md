# Performance Monitoring Setup

This document describes the performance monitoring implementation for the Claude Config documentation site.

## Overview

The performance monitoring system tracks Core Web Vitals and other important metrics to ensure optimal user experience.

## Features

### 1. Core Web Vitals Monitoring
- **LCP (Largest Contentful Paint)**: Measures loading performance
- **FID (First Input Delay)**: Measures interactivity
- **CLS (Cumulative Layout Shift)**: Measures visual stability
- **FCP (First Contentful Paint)**: Time to first content render
- **TTFB (Time to First Byte)**: Server response time

### 2. Navigation Timing
- DNS lookup time
- TCP connection time
- Server response time
- DOM content loaded time

### 3. Resource Monitoring
- JavaScript bundle sizes
- CSS file sizes
- Image sizes
- Font loading times
- Slow resource detection (>500ms)

## Usage

### Basic Setup

The performance monitoring is automatically initialized on the homepage:

```typescript
import { usePerformanceMonitor } from '@site/src/hooks/usePerformanceMonitor';

function MyPage() {
  usePerformanceMonitor();
  return <div>...</div>;
}
```

### Performance Dashboard (Development Only)

In development mode, a floating performance dashboard is available:
- Click the 📊 button in the bottom-right corner
- View real-time performance metrics
- Metrics are color-coded:
  - 🟢 Green: Good performance
  - 🟡 Yellow: Needs improvement
  - 🔴 Red: Poor performance

### Programmatic Access

```typescript
import { performanceMonitor } from '@site/src/utils/performanceMonitor';

// Get all metrics
const metrics = performanceMonitor.getMetrics();

// Clear metrics
performanceMonitor.clearMetrics();
```

## Performance Thresholds

Based on Google's Web Vitals recommendations:

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤ 2.5s | ≤ 4s | > 4s |
| FID | ≤ 100ms | ≤ 300ms | > 300ms |
| CLS | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| FCP | ≤ 1.8s | ≤ 3s | > 3s |
| TTFB | ≤ 0.8s | ≤ 1.8s | > 1.8s |

## Integration with Analytics

The performance monitoring system includes placeholders for sending metrics to analytics services:

```typescript
private sendToAnalytics(metric: PerformanceMetric): void {
  if (this.isProduction && 'sendBeacon' in navigator) {
    // Example: navigator.sendBeacon('/api/metrics', JSON.stringify(metric));
  }
}
```

To integrate with your analytics provider:
1. Update the `sendToAnalytics` method in `performanceMonitor.ts`
2. Configure your analytics endpoint
3. Handle the metrics data on your backend

## Bundle Analysis

To analyze the webpack bundle:

```bash
npm run analyze
```

This will generate:
- `build/bundle-report.html`: Visual bundle analysis
- `build/bundle-stats.json`: Raw statistics data

## Best Practices

1. **Monitor in Production**: While the dashboard is dev-only, metrics are collected in production
2. **Regular Analysis**: Run bundle analysis before major releases
3. **Set Alerts**: Configure alerts for performance regressions
4. **Optimize Images**: Use appropriate formats and lazy loading
5. **Code Splitting**: Implement route-based splitting for large components

## Troubleshooting

### Metrics Not Showing
- Ensure the page has fully loaded
- Check browser console for errors
- Verify web-vitals library is installed

### High CLS Values
- Check for dynamic content without reserved space
- Ensure fonts are preloaded
- Avoid inserting content above existing content

### Poor LCP
- Optimize largest images
- Implement lazy loading
- Use CDN for static assets
- Enable compression

## Future Enhancements

1. **Real User Monitoring (RUM)**: Send metrics to backend for analysis
2. **Performance Budgets**: Set and enforce performance budgets
3. **Automated Alerts**: Notify when metrics exceed thresholds
4. **Historical Tracking**: Track performance over time
5. **A/B Testing**: Compare performance across different implementations