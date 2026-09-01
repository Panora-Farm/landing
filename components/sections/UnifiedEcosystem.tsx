'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { unifiedEcosystem } from '@/lib/content';
import { EASE_OUT, fadeUpInView } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';

export function UnifiedEcosystem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = !!useReducedMotion();
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

      <div className="eco-panel">
        <motion.span
          className="eco-panel-line"
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: reduce ? 0 : 0.9,
            ease: EASE_OUT,
            delay: reduce ? 0 : 0.15,
          }}
        />
        <ol className="eco-flow">
          {nodes.map((node, i) => (
            <motion.li
              key={node.num}
              className={`eco-node${i === 1 ? ' eco-node--hub' : ''}`}
              {...fadeUpInView(inView, reduce ? 0 : i * 0.1, reduce ? 0 : 28)}
            >
              {i > 0 ? (
                <span className="eco-node-link" aria-hidden>
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </span>
              ) : null}
              <span className="eco-node-num">{node.num}</span>
              <h3 className="eco-node-title">{node.title}</h3>
              {'subtitle' in node && node.subtitle ? (
                <span className="eco-node-tag">{node.subtitle}</span>
              ) : null}
              <p className="eco-node-body">{node.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
