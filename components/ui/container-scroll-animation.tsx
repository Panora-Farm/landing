'use client';

import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

type ContainerScrollProps = {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Scroll-linked "roll-up" frame. The card starts tilted back on its X axis and
 * rotates flat as the section scrolls through the viewport while the title
 * drifts upward — used to bridge the hero into the Problem section.
 *
 * Adapted from the Aceternity `ContainerScroll` to the Panora brand: olive-950
 * bezel, bone screen, soft low-contrast shadow, `EASE_OUT` motion feel. Honors
 * `prefers-reduced-motion` — the card renders flat and static.
 */
export function ContainerScroll({
  titleComponent,
  children,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Do the roll between the section entering (~8%) and reaching centre (~44%);
  // it stays flat while the reader moves on to the copy below.
  const rotate = useTransform(scrollYProgress, [0.08, 0.44], [18, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0.08, 0.44],
    isMobile ? [0.86, 1] : [1.06, 1]
  );
  const translate = useTransform(scrollYProgress, [0.08, 0.44], [0, -80]);

  return (
    <div className="container-scroll" ref={containerRef}>
      <div className="container-scroll-viewport">
        <Header translate={translate} reduce={!!reduce}>
          {titleComponent}
        </Header>
        <Card rotate={rotate} scale={scale} reduce={!!reduce}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({
  translate,
  reduce,
  children,
}: {
  translate: MotionValue<number>;
  reduce: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="container-scroll-header"
      style={reduce ? undefined : { y: translate }}
    >
      {children}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  reduce,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  reduce: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="container-scroll-card"
      style={reduce ? undefined : { rotateX: rotate, scale }}
    >
      <div className="container-scroll-inner">{children}</div>
    </motion.div>
  );
}
