'use client';

import { useLocale } from '@/lib/i18n';

export function LangToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={`lang-toggle-btn${locale === 'id' ? ' is-active' : ''}`}
        onClick={() => setLocale('id')}
        aria-pressed={locale === 'id'}
      >
        ID
      </button>
      <button
        type="button"
        className={`lang-toggle-btn${locale === 'en' ? ' is-active' : ''}`}
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}
