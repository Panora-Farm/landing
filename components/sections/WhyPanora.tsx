'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { whyPanora } from '@/lib/content';
import { fadeUpInView } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';

export function WhyPanora() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { locale } = useLocale();
  const label = pick(whyPanora.label, locale);
  const title = pick(whyPanora.title, locale);
  const items = pick(whyPanora.items, locale);

  return (
    <section id="advantage" className="why-section" ref={ref}>
      <div className="why-header">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="why-grid">
        {items.map((item, i) => (
          <motion.article
            key={item.title}
            className="why-card"
            {...fadeUpInView(inView, i * 0.08)}
          >
            <div className="why-check" aria-hidden>
              ✓
            </div>
            <h3 className="why-card-title">{item.title}</h3>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
