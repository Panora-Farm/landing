'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { faq } from '@/lib/content';
import { EASE_OUT } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';

type FaqItem = { question: string; answer: string };

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="faq-accordion-item">
      <h3>
        <button
          className="faq-accordion-button"
          aria-expanded={isOpen}
          aria-controls={`faq-content-${index}`}
          type="button"
          onClick={onToggle}
        >
          <span className="faq-accordion-question">{item.question}</span>
          <span className="faq-icon-container" aria-hidden>
            <svg viewBox="0 0 32 32" className="faq-icon faq-icon-h">
              <path d="M25.33,17.33H6.66v-2.67h18.67v2.67Z" />
            </svg>
            <svg
              viewBox="0 0 32 32"
              className={`faq-icon faq-icon-v${isOpen ? ' faq-icon-v-open' : ''}`}
            >
              <path d="M25.33,17.33H6.66v-2.67h18.67v2.67Z" />
            </svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-content-${index}`}
            className="faq-accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="faq-accordion-body">
              <p>{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { locale } = useLocale();
  const label = pick(faq.label, locale);
  const title = pick(faq.title, locale);
  const items = pick(faq.items, locale);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="faq-section" ref={ref}>
      <motion.div
        className="faq-container"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <div className="faq-header">
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
        </div>

        <div className="faq-accordion-list">
          {items.map((item, index) => (
            <AccordionItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
