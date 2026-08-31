'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { site } from '@/lib/content';

type LoadingScreenProps = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      onComplete();
      return;
    }

    const start = performance.now();
    const duration = 1400;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setExit(true);
        window.setTimeout(onComplete, 420);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: exit ? 0 : 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ pointerEvents: exit ? 'none' : 'auto' }}
      aria-hidden={exit}
    >
      <div className="loading-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/logo.png"
            alt={site.fullName}
            width={1456}
            height={816}
            className="loading-logo"
            priority
          />
        </motion.div>
        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
