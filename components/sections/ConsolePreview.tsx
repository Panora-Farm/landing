'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { consolePreview } from '@/lib/content';
import { EASE_OUT } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';

export function ConsolePreview() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { locale } = useLocale();
  const label = pick(consolePreview.label, locale);
  const title = pick(consolePreview.title, locale);
  const subtitle = pick(consolePreview.subtitle, locale);
  const exportLabel = pick(consolePreview.exportLabel, locale);
  const headers = pick(consolePreview.tableHeaders, locale);
  const batches = pick(consolePreview.batches, locale);
  const sidebar = pick(consolePreview.sidebar, locale);

  return (
    <section className="console-preview-section" ref={ref}>
      <div className="console-preview-header">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{title}</h2>
        <p className="section-sub console-preview-sub">{subtitle}</p>
      </div>
      <motion.div
        className="console-preview-frame"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <div className="console-preview-chrome" aria-hidden>
          <span className="console-dot console-dot-red" />
          <span className="console-dot console-dot-yellow" />
          <span className="console-dot console-dot-green" />
          <span className="console-preview-url">app.panora.farm</span>
        </div>
        <div className="console-preview-body">
          <aside className="console-sidebar" aria-hidden>
            {sidebar.map((item, i) => (
              <div
                key={item}
                className={`console-sidebar-item${i === 2 ? ' is-active' : ''}`}
              >
                {item}
              </div>
            ))}
          </aside>
          <div className="console-main">
            <div className="console-main-header">
              <h3>{title}</h3>
              <span className="console-export-btn">{exportLabel}</span>
            </div>
            <table className="console-table">
              <thead>
                <tr>
                  {headers.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch.id}>
                    <td>{batch.id}</td>
                    <td>{batch.commodity}</td>
                    <td>
                      <span className="console-status">{batch.status}</span>
                    </td>
                    <td>{batch.origin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
