import React, { useState, useEffect } from 'react';
import { performanceMonitor } from '@site/src/utils/performanceMonitor';
import styles from './styles.module.css';

interface MetricDisplay {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export default function PerformanceDashboard(): React.ReactElement | null {
  const [metrics, setMetrics] = useState<MetricDisplay[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const updateMetrics = () => {
      const allMetrics = performanceMonitor.getMetrics();
      const latestMetrics: MetricDisplay[] = [];

      allMetrics.forEach((metricArray, name) => {
        if (metricArray.length > 0) {
          const latest = metricArray[metricArray.length - 1];
          latestMetrics.push({
            name,
            value: latest.value,
            rating: latest.rating
          });
        }
      });

      setMetrics(latestMetrics);
    };

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000);
    updateMetrics();

    return () => clearInterval(interval);
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getRatingColor = (rating: string): string => {
    switch (rating) {
      case 'good':
        return styles.good;
      case 'needs-improvement':
        return styles.needsImprovement;
      case 'poor':
        return styles.poor;
      default:
        return '';
    }
  };

  const formatValue = (name: string, value: number): string => {
    if (name.includes('Size')) {
      return `${value.toFixed(2)} KB`;
    }
    return `${value.toFixed(2)} ms`;
  };

  return (
    <>
      <button
        className={styles.toggleButton}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Toggle performance dashboard"
      >
        📊
      </button>

      {isVisible && (
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <h3>Performance Metrics</h3>
            <button
              className={styles.closeButton}
              onClick={() => setIsVisible(false)}
              aria-label="Close dashboard"
            >
              ×
            </button>
          </div>
          
          <div className={styles.metrics}>
            {metrics.length === 0 ? (
              <p className={styles.noData}>Loading metrics...</p>
            ) : (
              metrics.map((metric) => (
                <div key={metric.name} className={styles.metric}>
                  <span className={styles.metricName}>{metric.name}</span>
                  <span className={`${styles.metricValue} ${getRatingColor(metric.rating)}`}>
                    {formatValue(metric.name, metric.value)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}