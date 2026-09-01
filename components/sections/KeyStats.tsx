'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { metrics } from '@/lib/content';
import { EASE_OUT } from '@/lib/motion';
import { useCountUp } from '@/lib/useCountUp';
import { pick, useLocale } from '@/lib/i18n';

type Metric = { value: string; label: string; detail: string };

/** "3,500+" -> ["3,500", "+"] · "12,000 Ton" -> ["12,000", " Ton"] · "100%" -> ["100", "%"] */
function splitValue(value: string): [string, string] {
  const match = value.match(/^([\d.,\s]*\d)(.*)$/);
  return match ? [match[1], match[2]] : [value, ''];
}

function TargetRow({
  metric,
  index,
  total,
  reduce,
}: {
  metric: Metric;
  index: number;
  total: number;
  reduce: boolean;
}) {
  const rowRef = useRef<HTMLLIElement>(null);
  // Latches on first entry — a passed target stays "reached".
  const seen = useInView(rowRef, {
    once: true,
    margin: '-20% 0px -25% 0px',
  });
  const on = seen || reduce;

  const [num, unit] = splitValue(metric.value);
  const display = useCountUp(num, seen, reduce);

  return (
    <li ref={rowRef} className="target-row">
      <motion.div
        className="target-body"
        initial={reduce ? false : { opacity: 0, y: 22 }}
        animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <span className="target-index">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <div className="target-value-wrap">
          <span
            className="target-dot"
            data-dot
            data-on={on || undefined}
            aria-hidden="true"
          />
          <div className="target-value" aria-label={metric.value}>
            <span aria-hidden="true">{display}</span>
            <span className="target-unit" aria-hidden="true">
              {unit}
            </span>
          </div>
        </div>
        <div className="target-label">{metric.label}</div>
        <p className="target-detail">{metric.detail}</p>
      </motion.div>
    </li>
  );
}

export function KeyStats() {
  const { locale } = useLocale();
  const reduce = !!useReducedMotion();

  const sectionLabel = pick(metrics.sectionLabel, locale);
  const sectionTitle = pick(metrics.sectionTitle, locale);
  const items = pick(metrics.items, locale) as readonly Metric[];

  const listRef = useRef<HTMLOListElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  // Fill the rail from the first dot to the last as the list scrolls past centre.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start center', 'end center'],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  // Pin the rail's top/bottom to the outer dot centres (row heights vary by locale).
  const [rail, setRail] = useState({ top: 12, bottom: 12 });
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const dots = list.querySelectorAll<HTMLElement>('[data-dot]');
      if (dots.length < 2) return;
      const box = list.getBoundingClientRect();
      const first = dots[0].getBoundingClientRect();
      const last = dots[dots.length - 1].getBoundingClientRect();
      setRail({
        top: first.top + first.height / 2 - box.top,
        bottom: box.bottom - (last.top + last.height / 2),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [locale]);

  return (
    <section className="targets-section" aria-label={sectionTitle}>
      <div className="targets-panel">
        <div className="targets-inner">
          <motion.div
            ref={headRef}
            className="targets-head"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={
              headInView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
            }
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="section-label targets-eyebrow">{sectionLabel}</p>
            <h2 className="targets-title">{sectionTitle}</h2>
          </motion.div>

          <ol className="target-list" ref={listRef}>
            <div
              className="target-rail"
              aria-hidden="true"
              style={{ top: rail.top, bottom: rail.bottom }}
            >
              <motion.div
                className="target-rail-fill"
                style={{ scaleY: reduce ? 1 : fill }}
              />
            </div>
            {items.map((metric, i) => (
              <TargetRow
                key={metric.label}
                metric={metric}
                index={i}
                total={items.length}
                reduce={reduce}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
