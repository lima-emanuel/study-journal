import Heading from '@theme/Heading';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Programming Languages',
    Svg: require('@site/static/img/gopher.svg').default,
    description: (
      <>
        Current focus: Go and Rust.
      </>
    ),
  },
  {
    title: 'DevSecOps',
    Svg: require('@site/static/img/kubernetes.svg').default,
    description: (
      <>
        Current focus: Docker, and Kubernetes.
      </>
    ),
  },
  {
    title: 'Operating Systems',
    Svg: require('@site/static/img/tux.svg').default,
    description: (
      <>
        Current focus: Linux System Administration.
      </>
    ),
  },
  {
    title: 'LLMs',
    Svg: require('@site/static/img/claude.svg').default,
    description: (
      <>
        Current focus: Spec Driven Development.
      </>
    ),
  },
  {
    title: 'Security',
    Svg: require('@site/static/img/shai.svg').default,
    description: (
      <>
        Current focus: Supply Chain Security.
      </>
    ),
  },
  {
    title: 'Software Engineering',
    Svg: require('@site/static/img/engineer.svg').default,
    description: (
      <>
        Current focus: Agentic Software Engineering.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
