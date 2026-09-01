'use client';

import { motion, useInView } from 'framer-motion';
import { Fragment, useRef } from 'react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { problem } from '@/lib/content';
import { EASE_OUT } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';

type Frame = {
  url: string;
  title: string;
  export: string;
  nav: readonly string[];
  rows: readonly { party: string; item: string; status: string }[];
  stats: readonly string[];
};

/** Render a line that may carry a single <em>…</em> highlight. */
function withEm(text: string) {
  return text
    .split(/<em>|<\/em>/)
    .map((part, i) =>
      i % 2 === 1 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>
    );
}

/** Static dashboard mock that rides inside the roll-up frame. Decorative. */
function ConsoleMock({ frame }: { frame: Frame }) {
  return (
    <div className="pconsole" aria-hidden>
      <div className="pconsole-chrome">
        <span className="pconsole-dot" />
        <span className="pconsole-dot" />
        <span className="pconsole-dot" />
        <span className="pconsole-url">{frame.url}</span>
      </div>
      <div className="pconsole-body">
        <aside className="pconsole-nav">
          {frame.nav.map((item, i) => (
            <span
              key={item}
              className={`pconsole-nav-item${i === 1 ? ' is-active' : ''}`}
            >
              {item}
            </span>
          ))}
        </aside>
        <div className="pconsole-main">
          <div className="pconsole-main-head">
            <h4>{frame.title}</h4>
            <span className="pconsole-pill">{frame.export}</span>
          </div>
          <div className="pconsole-rows">
            {frame.rows.map((row) => (
              <div key={row.party} className="pconsole-row">
                <span className="pconsole-party">{row.party}</span>
                <span className="pconsole-item">{row.item}</span>
                <span className="pconsole-status">{row.status}</span>
              </div>
            ))}
          </div>
          <div className="pconsole-stats">
            {frame.stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** One stakeholder row — reveals itself as it scrolls into view. */
function StakeRow({
  index,
  role,
  body,
}: {
  index: string;
  role: string;
  body: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });

  return (
    <li ref={ref} className={`pstake${inView ? ' is-in' : ''}`}>
      <motion.span
        className="pstake-index"
        initial={{ opacity: 0, x: -28 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        {index}
      </motion.span>
      <div className="pstake-text">
        <motion.h3
          className="pstake-role"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
        >
          {role}
        </motion.h3>
        <motion.p
          className="pstake-body"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE_OUT }}
        >
          {body}
        </motion.p>
      </div>
    </li>
  );
}

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { locale } = useLocale();
  const label = pick(problem.label, locale);
  const titleLines = pick(problem.titleLines, locale);
  const intro = pick(problem.intro, locale);
  const stakeholders = pick(problem.stakeholders, locale);
  const frame = pick(problem.frame, locale);

  return (
    <section id="why" className="problem-section-new" ref={ref}>
      <div className="problem-bridge">
        <ContainerScroll
          titleComponent={
            <>
              <div className="section-label">{label}</div>
              <h2 className="problem-section-title problem-bridge-title">
                {titleLines.map((line) => (
                  <span key={line} className="problem-section-title-line">
                    {line}
                  </span>
                ))}
              </h2>
            </>
          }
        >
          <ConsoleMock frame={frame} />
        </ContainerScroll>
      </div>

      <div className="problem-section-inner">
        <p className={`problem-intro${inView ? ' is-in' : ''}`}>
          {intro.map((line, i) => (
            <motion.span
              key={line}
              className="problem-intro-line"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE_OUT }}
            >
              {withEm(line)}
            </motion.span>
          ))}
        </p>

        <ol className="problem-stakeholders">
          {stakeholders.map((item, i) => (
            <StakeRow
              key={item.role}
              index={String(i + 1).padStart(2, '0')}
              role={item.role}
              body={item.body}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
