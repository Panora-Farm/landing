import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { site, stubPages } from '@/lib/content';

type StubKey = 'marketplace' | 'console' | 'logistics';

/** Placeholder route shell. Uses the default (id) copy — these pages ship
 *  before the localized product surfaces they stand in for. */
export function StubPage({ page }: { page: StubKey }) {
  const content = stubPages[page];

  return (
    <div className="stub-page">
      <p className="stub-page-eyebrow">{content.eyebrow.id}</p>
      <h1>{content.title.id}</h1>
      <p>{content.body.id}</p>
      <div className="stub-page-actions">
        <Button href={site.urls.console} variant="primary" size="lg">
          {stubPages.launchConsole.id}
        </Button>
        <Link href="/" className="btn btn-secondary btn-lg">
          {stubPages.backHome.id}
        </Link>
      </div>
    </div>
  );
}
