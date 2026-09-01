'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';

type RevealWordsProps = {
  text: string;
  ready: boolean;
  delay?: number;
  /** Words rendered as <em> (brand in-heading highlight); match ignores case + trailing punctuation. */
  emphasize?: readonly string[];
};

export function RevealWords({
  text,
  ready,
  delay = 0,
  emphasize,
}: RevealWordsProps) {
  const words = text.split(' ');
  const emSet = new Set((emphasize ?? []).map((w) => w.toLowerCase()));
  const isEm = (word: string) =>
    emSet.has(word.replace(/[.,;:!?]+$/, '').toLowerCase());

  return (
    <span className="reveal-words">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="reveal-word-wrap">
            <motion.span
              className="reveal-word"
              initial={{ opacity: 0, y: '0.7em' }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: '0.7em' }}
              transition={{
                duration: 0.7,
                ease: EASE_OUT,
                delay: delay + i * 0.06,
              }}
            >
              {isEm(word) ? <em>{word}</em> : word}
            </motion.span>
          </span>
          {/* real space between word wrappers — trailing space inside an
              overflow:hidden inline-block gets clipped, so it lives out here */}
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </span>
  );
}
