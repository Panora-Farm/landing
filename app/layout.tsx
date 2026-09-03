import type { Metadata } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import { metadataContent } from '@/lib/content';
import './globals.css';

const hanken = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: metadataContent.title.id,
  description: metadataContent.description.id,
  icons: { icon: '/icon.png', apple: '/icon.png' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={hanken.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
