'use client';

import { useEffect, useRef, useState } from 'react';
import {
  cubicBezier,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
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

  // Pin the olive panel to the viewport and scroll its contents within it.
  // ponytail: transform-driven scroll-jack, not a nested scroll container —
  // avoids wheel-handoff jank. Disabled below 900px and for reduced-motion.
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    let raf = 0;
    const measure = () => {
      const inner = innerRef.current;
      const vp = viewportRef.current;
      if (!inner || !vp) return;
      if (!mq.matches || reduce) {
        setPinned(false);
        setDistance(0);
        return;
      }
      // Turn the pinned layout on so the viewport height is constrained,
      // then measure the overflow one frame later.
      setPinned(true);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const over = inner.scrollHeight - vp.clientHeight;
        setPinned(over > 24);
        setDistance(over > 24 ? over : 0);
      });
    };
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    mq.addEventListener('change', measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mq.removeEventListener('change', measure);
    };
  }, [reduce, locale]);

  const { scrollYProgress: pinProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  // Ease the travel in and out at the pin edges, then spring-smooth it so the
  // grab and release feel soft instead of snapping to scroll position.
  const easedY = useTransform(pinProgress, [0, 1], [0, -distance], {
    ease: cubicBezier(0.42, 0, 0.2, 1),
  });
  const contentY = useSpring(easedY, {
    stiffness: 170,
    damping: 34,
    mass: 0.5,
  });

  // Fill the rail from the first dot to the last as the list scrolls past centre.
  // Unpinned: driven by the list's own viewport scroll. Pinned: driven by the
  // section's pin progress, with lead-in/out so it settles inside the frame.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start center', 'end center'],
  });
  const pinFill = useTransform(pinProgress, [0.12, 0.92], [0, 1], {
    ease: cubicBezier(0.42, 0, 0.2, 1),
  });
  const fill = useSpring(pinned ? pinFill : scrollYProgress, {
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
    <section
      ref={sectionRef}
      className="targets-section"
      aria-label={sectionTitle}
      data-pinned={pinned || undefined}
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className="targets-panel">
        <div className="targets-viewport" ref={viewportRef}>
          <motion.div
            className="targets-inner"
            ref={innerRef}
            style={pinned ? { y: contentY } : undefined}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
