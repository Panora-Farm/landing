'use client';

import { motion } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';

type RevealWordsProps = {
  text: string;
  ready: boolean;
  delay?: number;
};

export function RevealWords({ text, ready, delay = 0 }: RevealWordsProps) {
  const words = text.split(' ');

  return (
    <span className="reveal-words">
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="reveal-word-wrap">
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
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
