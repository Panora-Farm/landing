'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { problem } from '@/lib/content';
import { EASE_OUT, fadeUpInView } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { locale } = useLocale();
  const label = pick(problem.label, locale);
  const titleLines = pick(problem.titleLines, locale);
  const stakeholders = pick(problem.stakeholders, locale);

  return (
    <section id="why" className="problem-section-new" ref={ref}>
      <div className="problem-section-inner">
        <div className="section-label">{label}</div>
        <motion.h2
          className="problem-section-title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          {titleLines.map((line) => (
            <span key={line} className="problem-section-title-line">
              {line}
            </span>
          ))}
        </motion.h2>
        <div className="problem-stakeholders-grid">
          {stakeholders.map((item, i) => (
            <motion.article
              key={item.role}
              className="problem-stakeholder-card"
              {...fadeUpInView(inView, 0.1 + i * 0.1)}
            >
              <h3 className="problem-stakeholder-role">{item.role}</h3>
              <p className="problem-stakeholder-body">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
