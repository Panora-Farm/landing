'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { chainOfCustody } from '@/lib/content';
import { pick, useLocale } from '@/lib/i18n';

/** Render a heading string that may contain a single <em>…</em> highlight. */
function Heading({ text }: { text: string }) {
  const parts = text.split(/<em>|<\/em>/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}

export function ChainOfCustody() {
  const { locale } = useLocale();
  const label = pick(chainOfCustody.label, locale);
  const title = pick(chainOfCustody.title, locale);
  const sub = pick(chainOfCustody.sub, locale);
  const steps = pick(chainOfCustody.steps, locale);

  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      // a step becomes active as it crosses the vertical center of the viewport
      { rootMargin: '-45% 0px -45% 0px' }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <section id="how" className="process">
      <div className="process-header">
        <div className="section-label">{label}</div>
        <h2 className="section-title">
          <Heading text={title} />
        </h2>
        <p className="section-sub">{sub}</p>
      </div>

      <div className="process-grid">
        <div className="process-media" aria-hidden="true">
          <div className="process-media-frame">
            {steps.map((step, i) => (
              <Image
                key={step.n}
                src={step.image}
                alt=""
                fill
                sizes="(max-width: 900px) 0px, 45vw"
                className="process-media-photo"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            ))}
            <div className="process-media-count">
              {steps[active].n} / {steps[steps.length - 1].n}
            </div>
          </div>
        </div>

        <ol className="process-steps">
          {steps.map((step, i) => (
            <li
              key={step.n}
              data-index={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className={`process-step${i === active ? ' process-step--active' : ''}`}
            >
              <div className="process-step-photo">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 0px"
                  className="process-media-photo"
                />
              </div>
              <div className="process-step-head">
                <span className="process-step-num">{step.n}</span>
                <h3 className="process-step-title">{step.title}</h3>
              </div>
              <p className="process-step-desc">{step.desc}</p>
              <span className="process-step-tag">{step.tag}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
