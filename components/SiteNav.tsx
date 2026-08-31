'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/content';
import { pick, useLocale } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import { LangToggle } from '@/components/LangToggle';

type SiteNavProps = {
  ready: boolean;
};

export function SiteNav({ ready }: SiteNavProps) {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const links = pick(nav.links, locale);
  const ctaLabel = pick(nav.cta, locale);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.nav
        className="site-nav"
        initial={{ opacity: 0, y: -16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        <div className="nav-left">
          <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
            <Image
              src="/logo.png"
              alt={site.fullName}
              width={1456}
              height={816}
              style={{ height: 44, width: 'auto' }}
              priority
            />
          </Link>
        </div>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <LangToggle />
          <div className="nav-cta-desktop">
            <Button href={nav.href} variant="primary" size="md">
              {ctaLabel}
            </Button>
          </div>
          <button
            type="button"
            className="nav-menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`nav-menu-icon${open ? ' is-open' : ''}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="nav-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="nav-drawer-lang">
              <LangToggle />
            </div>
            <ul className="nav-drawer-links">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <a href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <Button href={nav.href} variant="primary" size="lg">
              {ctaLabel}
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
