'use client';

import { useEffect, useRef, useState } from 'react';

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Counts from 0 up to the numeric portion of `target` once `run` flips true.
 * `target` may carry thousands separators ("12,000"); grouping is re-applied to
 * the tween so the digits match the source string. A non-numeric `target` is
 * returned untouched. When `reduce` is set, the final value renders immediately.
 */
export function useCountUp(
  target: string,
  run: boolean,
  reduce: boolean,
  duration = 1100,
) {
  const digits = target.replace(/,/g, '');
  const end = Number(digits);
  const finite = digits !== '' && Number.isFinite(end);
  const fractionDigits = digits.includes('.') ? digits.split('.')[1].length : 0;

  const [tween, setTween] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!finite || reduce || !run) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setTween(end * easeOut(p));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [run, reduce, finite, end, duration]);

  if (!finite) return target;
  const shown = reduce ? end : run ? tween : 0;
  return shown.toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}
