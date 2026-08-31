import type { Metadata } from 'next';
import { StubPage } from '@/components/StubPage';

export const metadata: Metadata = { title: 'Logistics — Panora Farm' };

export default function LogisticsPage() {
  return <StubPage page="logistics" />;
}
