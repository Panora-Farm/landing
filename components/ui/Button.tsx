import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'secondary-light'
  | 'primary-on-dark';
type ButtonSize = 'md' | 'lg';

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
};

const ArrowIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 6L19 12L13 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'lg',
  className = '',
  external,
}: ButtonProps) {
  const isExternal =
    external ?? (href.startsWith('http') || href.startsWith('mailto:'));

  const classes = ['btn', `btn-${variant}`, `btn-${size}`, className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {children}
      {(variant === 'primary' || variant === 'primary-on-dark') && <ArrowIcon />}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
