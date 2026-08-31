'use client';

import { footer, site } from '@/lib/content';
import { pick, useLocale } from '@/lib/i18n';

export function Footer() {
  const { locale } = useLocale();
  const brandDesc = pick(footer.brandDesc, locale);
  const columns = pick(footer.columns, locale);
  const copy = pick(footer.copy, locale);

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-brand-name">{site.fullName}</div>
          <p className="footer-brand-desc">{brandDesc}</p>
          <p className="footer-legal">{site.legalEntity}</p>
          <div className="footer-social">
            <a href={site.urls.twitter} target="_blank" rel="noopener noreferrer">
              {site.socialHandle}
            </a>
          </div>
        </div>
        <div className="footer-columns">
          {columns.map((col) => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map((link) => {
                  const isExternal =
                    link.href.startsWith('http') ||
                    link.href.startsWith('mailto:');
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(isExternal
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">{copy}</span>
      </div>
    </footer>
  );
}
