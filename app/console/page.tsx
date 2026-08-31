import type { Metadata } from 'next';
import { StubPage } from '@/components/StubPage';

export const metadata: Metadata = { title: 'Enterprise Console — Panora Farm' };

export default function ConsolePage() {
  return <StubPage page="console" />;
}
