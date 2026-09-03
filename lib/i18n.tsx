'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Locale = 'id' | 'en';
export type Localized<TId, TEn = TId> = {
  readonly id: TId;
  readonly en: TEn;
};

const STORAGE_KEY = 'panora-locale';

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
} | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === 'id' || stored === 'en') {
        setLocaleState(stored);
      }
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, mounted]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return ctx;
}

export function pick<TId, TEn>(
  value: Localized<TId, TEn>,
  locale: Locale
): TId | TEn {
  return value[locale];
}

export function pickLines<
  TId extends readonly { text: string; accent?: boolean }[],
  TEn extends readonly { text: string; accent?: boolean }[],
>(lines: Localized<TId, TEn>, locale: Locale): TId | TEn {
  return lines[locale];
}
