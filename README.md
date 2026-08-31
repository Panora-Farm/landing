# Panora landing page

Landing page scaffold for Panora, built with Next.js App Router, TypeScript, and a section-based component architecture.

## Run locally

```bash
npm install
npm run dev
```

## Structure

```text
app/                    App Router entrypoint, metadata, and global styles
components/
  layout/               Shared site chrome such as the responsive header
  react-bits/           Local React Bits-compatible visual primitives
  sections/             Composable landing-page sections
lib/content.ts          Navigation, feature, and workflow content
```

The visual primitives in `components/react-bits` intentionally live in the repo. React Bits supports copy-in components and registry-installed variants; keeping these call sites local means the landing page does not require a license key or a runtime service. They can be replaced with the corresponding React Bits registry components without changing the section API.

## Checks

```bash
npm run lint
npm run build
```
