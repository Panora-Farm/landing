'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { metrics } from '@/lib/content';
import { fadeUpInView } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';

export function KeyStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { locale } = useLocale();
  const sectionLabel = pick(metrics.sectionLabel, locale);
  const sectionTitle = pick(metrics.sectionTitle, locale);
  const sectionSubtitle = pick(metrics.sectionSubtitle, locale);
  const items = pick(metrics.items, locale);

  return (
    <section className="stats-section" ref={ref} aria-label={sectionTitle}>
      <div className="stats-header">
        <div className="section-label section-label-light">{sectionLabel}</div>
        <h2 className="stats-section-title">{sectionTitle}</h2>
        <p className="stats-section-subtitle">{sectionSubtitle}</p>
      </div>
      <div className="stats-grid">
        {items.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stat-item"
            {...fadeUpInView(inView, i * 0.1, 28)}
          >
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <p className="stat-detail">{stat.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
