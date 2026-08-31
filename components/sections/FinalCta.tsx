'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { finalCta } from '@/lib/content';
import { EASE_OUT } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { locale } = useLocale();
  const title = pick(finalCta.title, locale);
  const description = pick(finalCta.description, locale);
  const primaryLabel = pick(finalCta.primaryCta.label, locale);
  const secondaryLabel = pick(finalCta.secondaryCta.label, locale);

  return (
    <section className="cta-final" ref={ref}>
      <div className="cta-final-inner">
        <motion.h2
          className="cta-final-title cta-final-title-wide"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="cta-final-sub"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
        >
          {description}
        </motion.p>
        <motion.div
          className="cta-final-buttons"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
        >
          <Button
            href={finalCta.primaryCta.href}
            variant="primary-on-dark"
            size="lg"
          >
            {primaryLabel}
          </Button>
          <Button
            href={finalCta.secondaryCta.href}
            variant="secondary-light"
            size="lg"
            external
          >
            {secondaryLabel}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
