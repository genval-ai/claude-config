import {lazy, Suspense, type ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  id: string;
  title: string;
  svgPath: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    id: 'real-dev-team',
    title: 'Real Development Team',
    svgPath: '/img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Meet the AI agents we use daily at Genval AI. Each agent represents
        a specialist on our development team, working on real production software.
      </>
    ),
  },
  {
    id: 'practical-examples',
    title: 'Practical Examples',
    svgPath: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>
        See how we orchestrate multiple agents to build features, optimize code,
        and maintain enterprise systems - not theory, but actual practice.
      </>
    ),
  },
  {
    id: 'industry-leadership',
    title: 'Industry Thought Leadership',
    svgPath: '/img/undraw_docusaurus_react.svg',
    description: (
      <>
        Learn from our experience using AI agents in production. Discover patterns,
        best practices, and real-world insights for agent-driven development.
      </>
    ),
  },
];

// Lazy load SVG components
const SvgComponents: Record<string, React.LazyExoticComponent<React.ComponentType<React.ComponentProps<'svg'>>>> = {
  '/img/undraw_docusaurus_mountain.svg': lazy(() => import('@site/static/img/undraw_docusaurus_mountain.svg')),
  '/img/undraw_docusaurus_tree.svg': lazy(() => import('@site/static/img/undraw_docusaurus_tree.svg')),
  '/img/undraw_docusaurus_react.svg': lazy(() => import('@site/static/img/undraw_docusaurus_react.svg')),
};

function Feature({title, svgPath, description}: FeatureItem) {
  const SvgComponent = SvgComponents[svgPath];
  
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Suspense fallback={<div className={styles.svgPlaceholder} />}>
          <SvgComponent className={styles.featureSvg} role="img" />
        </Suspense>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.id} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
