'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { commodities } from '@/lib/content';
import { fadeUpInView } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';

export function CommodityPortfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = !!useReducedMotion();
  const { locale } = useLocale();
  const label = pick(commodities.label, locale);
  const title = pick(commodities.title, locale);
  const items = pick(commodities.items, locale);

  return (
    <section id="commodities" className="commodities-section" ref={ref}>
      <div className="commodities-header">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="commodities-grid commodities-grid-4">
        {items.map((item, i) => (
          <motion.article
            key={item.id}
            className="commodity-card-outer"
            {...fadeUpInView(inView, reduce ? 0 : i * 0.08, reduce ? 0 : 24)}
          >
            <Link href={commodities.href} className="commodity-card">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 600px"
                className="commodity-card-img"
              />
              <span className="commodity-scrim" aria-hidden />
              <span className="commodity-blob" aria-hidden />
              <div className="commodity-content">
                <div className="commodity-top">
                  <span className="commodity-eyebrow">{item.tag}</span>
                  <span className="commodity-arrow" aria-hidden>
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
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
                </div>
                <div className="commodity-bottom">
                  <h3 className="commodity-title">{item.title}</h3>
                  <div className="commodity-desc-wrap">
                    <p className="commodity-desc">{item.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
