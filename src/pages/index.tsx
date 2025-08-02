import {lazy, Suspense, type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageHeader from '@site/src/components/HomepageHeader';
import ErrorBoundary from '@site/src/components/ErrorBoundary';
import PerformanceDashboard from '@site/src/components/PerformanceDashboard';
import { usePerformanceMonitor } from '@site/src/hooks/usePerformanceMonitor';

import styles from './index.module.css';

// Lazy load HomepageFeatures for code splitting
const HomepageFeatures = lazy(() => import('@site/src/components/HomepageFeatures'));

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  // Initialize performance monitoring
  usePerformanceMonitor();
  
  return (
    <Layout
      title={siteConfig.title}
      description="Configuration system for Claude AI assistants - specialized agents and commands for enhanced development workflows">
      <ErrorBoundary>
        <HomepageHeader />
      </ErrorBoundary>
      <main>
        <ErrorBoundary>
          <Suspense fallback={<div className={styles.featuresSkeleton}>Loading features...</div>}>
            <HomepageFeatures />
          </Suspense>
        </ErrorBoundary>
      </main>
      <PerformanceDashboard />
    </Layout>
  );
}
