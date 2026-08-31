import type { Metadata } from 'next';
import { StubPage } from '@/components/StubPage';

export const metadata: Metadata = { title: 'Marketplace — Panora Farm' };

export default function MarketplacePage() {
  return <StubPage page="marketplace" />;
}
