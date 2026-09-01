'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RevealWords } from '@/components/RevealWords';
import { hero } from '@/lib/content';
import { EASE_OUT } from '@/lib/motion';
import { pick, pickLines, useLocale } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';

type HeroProps = {
  ready: boolean;
};

export function Hero({ ready }: HeroProps) {
  const { locale } = useLocale();
  const titleLines = pickLines(hero.titleLines, locale);
  const description = pick(hero.description, locale);
  const trustBadges = pick(hero.trustBadges, locale);
  const slides = pick(hero.slides, locale);
  const primaryLabel = pick(hero.primaryCta.label, locale);
  const secondaryLabel = pick(hero.secondaryCta.label, locale);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [ready, slides.length]);

  const activeSlide = slides[slide];

  return (
    <section id="hero" className="hero">
      <h1 className="hero-title">
        {titleLines.map((line, idx) => (
          <span
            key={line.text}
            className={`hero-title-line${line.accent ? ' hero-title-accent' : ''}`}
          >
            <RevealWords
              text={line.text}
              ready={ready}
              delay={0.1 + idx * 0.12}
              emphasize={line.emphasize}
            />
          </span>
        ))}
      </h1>

      <div className="hero-row">
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT }}
        >
          {description}
        </motion.p>
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE_OUT }}
        >
          <Button href={hero.primaryCta.href} variant="primary" size="lg">
            {primaryLabel}
          </Button>
          <Button
            href={hero.secondaryCta.href}
            variant="secondary"
            size="lg"
            external
          >
            {secondaryLabel}
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="hero-trust"
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, delay: 0.65, ease: EASE_OUT }}
      >
        {trustBadges.map((badge) => (
          <span key={badge}>{badge}</span>
        ))}
      </motion.div>

      <motion.div
        className="hero-media"
        initial={{ opacity: 0, y: 40 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT }}
      >
        <div className="hero-media-slides">
          {slides.map((item, i) => (
            <div
              key={item.src}
              className={`hero-media-slide${slide === i ? ' is-active' : ''}`}
              style={{ opacity: slide === i ? 1 : 0 }}
              aria-hidden={slide !== i}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="hero-bg-photo"
                style={{ objectPosition: item.objectPosition }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        <div className="hero-media-overlay" aria-hidden />

        <div className="hero-media-footer">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeSlide.caption}
              className="hero-media-caption"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {activeSlide.caption}
            </motion.p>
          </AnimatePresence>

          <div className="hero-media-dots" role="tablist" aria-label="Hero images">
            {slides.map((item, i) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                className={`hero-media-dot${slide === i ? ' is-active' : ''}`}
                aria-selected={slide === i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
