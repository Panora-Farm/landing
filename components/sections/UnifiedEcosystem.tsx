'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { unifiedEcosystem } from '@/lib/content';
import { fadeUpInView } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';

export function UnifiedEcosystem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { locale } = useLocale();
  const label = pick(unifiedEcosystem.label, locale);
  const title = pick(unifiedEcosystem.title, locale);
  const nodes = pick(unifiedEcosystem.nodes, locale);

  return (
    <section className="ecosystem-flow-section" ref={ref}>
      <div className="ecosystem-flow-header">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="ecosystem-flow">
        {nodes.map((node, i) => (
          <motion.div
            key={node.num}
            className="ecosystem-flow-node"
            {...fadeUpInView(inView, i * 0.1, 32)}
          >
            <div className="ecosystem-flow-num">{node.num}</div>
            <h3 className="ecosystem-flow-title">{node.title}</h3>
            {'subtitle' in node && node.subtitle ? (
              <div className="ecosystem-flow-subtitle">{node.subtitle}</div>
            ) : null}
            <p className="ecosystem-flow-body">{node.body}</p>
            {i < nodes.length - 1 ? (
              <span className="ecosystem-flow-arrow" aria-hidden>
                →
              </span>
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
