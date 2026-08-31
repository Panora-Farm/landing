'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { commodities } from '@/lib/content';
import { fadeUpInView } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';

export function CommodityPortfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { locale } = useLocale();
  const title = pick(commodities.title, locale);
  const items = pick(commodities.items, locale);

  return (
    <section id="commodities" className="commodities-section" ref={ref}>
      <div className="commodities-header">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="commodities-grid commodities-grid-4">
        {items.map((item, i) => (
          <motion.article
            key={item.id}
            className="commodity-card"
            {...fadeUpInView(inView, i * 0.1)}
          >
            <div className="commodity-image">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
              />
            </div>
            <div className="commodity-info">
              <h3 className="commodity-title">{item.title}</h3>
              <p className="commodity-desc">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
