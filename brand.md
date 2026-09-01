# Brand — Panora Farm

_Status: active_

Source of truth for color, typography, motion, and voice on the Panora Farm landing site.
Palette and type are lifted verbatim from the previous production build
(`panora-v2-old/Panorafarm-Q3/`). Every color, font, radius, and easing decision on this site
derives from this file — do not introduce values that aren't here without updating this file first.

**One-line identity:** Tech-enabled Indonesian commodity aggregator + transparent, verifiable
supply-chain infrastructure. Warm, agricultural, institutional — bone paper, olive fields,
turmeric accent.

---

## 1. Color

### Palette

| Token | Hex | Role |
|---|---|---|
| `--bone` | `#f3eee4` | Page background (warm off-white). Also `html, body` background. |
| `--bone-dim` | `#e9e2d2` | Alternate section background, muted surfaces, chart tracks. |
| `--white` | `#fdfcf9` | Card / panel surface (warm white, never pure `#fff`). |
| `--olive-950` | `#1e2611` | Primary body text. Footer background. Darkest drench. |
| `--olive-800` | `#404f1d` | Brand primary. The "olive drench" band background for emphasis sections. |
| `--olive-700` | `#4d5f26` | Secondary olive — hover deepening, chart segment. Use sparingly. |
| `--sage` | `#8fa36c` | Eyebrow numerals, focus ring, `::selection` background. |
| `--sage-light` | `#a9bf87` | Eyebrow text on dark drench, status-pill text on dark. |
| `--stone` | `#7c7f6a` | Muted / secondary text on light backgrounds. |
| `--harvest` | `#d9822b` | **The single action + emphasis accent.** Buttons, eyebrow dot, scroll-progress bar, stat labels, active nav/tab states. |
| `--harvest-deep` | `#b5641e` | Accent hover state; emphasized `<em>` words inside headings. |

### Semantic aliases

Set alongside the palette so shadcn-style utilities resolve correctly:

| Token | Value |
|---|---|
| `--background` | `#f3eee4` |
| `--foreground` | `#1e2611` |
| `--card` / `--popover` | `#fdfcf9` |
| `--card-foreground` / `--popover-foreground` | `#1e2611` |
| `--primary` | `#404f1d` |
| `--primary-foreground` | `#f3eee4` |
| `--secondary` / `--muted` / `--accent` | `#e9e2d2` |
| `--secondary-foreground` / `--accent-foreground` | `#404f1d` |
| `--muted-foreground` | `#7c7f6a` |
| `--border` / `--input` | `rgba(30, 38, 17, 0.12)` |
| `--ring` | `#8fa36c` |
| `--destructive` | `#ef4444` |
| `--destructive-foreground` | `#ffffff` |

### Recurring alpha values

Not standalone tokens today — reuse these exact values rather than inventing new ones:

- Hairline borders on light surfaces: `rgba(30, 38, 17, 0.07 / 0.08 / 0.10 / 0.12)`
- Text on olive drench: `rgba(243, 238, 228, 0.35 / 0.40 / 0.55 / 0.60)`
- Nav glass: `rgba(243, 238, 228, 0.82)` + `backdrop-filter: blur(14px)`
- Mobile nav drawer: `rgba(243, 238, 228, 0.98)` + `blur(16px)`
- Card fill on dark drench: `rgba(253, 252, 249, 0.06)` with `border: rgba(243, 238, 228, 0.10)`
- Harvest button shadow: `0 4px 20px rgba(181, 100, 30, 0.25)` → hover `0 6px 24px rgba(181, 100, 30, 0.35)`

### Usage rules

1. **`--harvest` is the only accent that signals action or emphasis.** Every primary button is
   harvest. Nothing else competes with it — no secondary bright color. If two things on screen
   are harvest, one of them is wrong.
2. **Backgrounds alternate `--bone` and `--olive-800` (drench).** Drench bands are for emphasis
   moments (key stats, the problem framing, the final CTA). Text on drench is `--bone` /
   `rgba(bone, .55)`; eyebrow text flips to `--sage-light` but the eyebrow dot stays `--harvest`.
3. **Cards are `--white` on `--bone`**, `radius: 18px`, `1px` border at `rgba(30,38,17,0.08)`.
   On drench, cards are the `rgba(white, .06)` fill instead.
4. **Body text is `--olive-950`; secondary text is `--stone`.** Never mid-gray.
5. **Focus ring is `--sage`** (`--ring`), 2px, with a 2px background-colored offset.
6. Pure black and pure white are never used. Warm neutrals only.

### Light / dark

The site is **light-only by design** (`darkMode: "class"` is configured but unused). The
olive-drench sections are an emphasis device, not a dark theme. Do not build a dark-mode toggle
unless the brief changes.

---

## 2. Typography

- **Typeface:** `Hanken Grotesk` (Google Fonts, via `next/font`). Weights **300, 400, 500, 600, 700**.
  CSS var `--font-hanken`; stack `var(--font-hanken), system-ui, sans-serif`.
- **No separate display face.** Personality comes from scale + negative letter-spacing + keeping
  large headings at **weight 400**, not bold. Body copy is 400; UI labels/titles 500–600.
- `font-feature-settings: "ss01"` on `body`. `-webkit-font-smoothing: antialiased`.

### Type scale

| Style | Size | Tracking / weight / leading |
|---|---|---|
| Hero title | `clamp(36px, 8.2vw, 124px)` | `-0.045em` (`-0.035em` ≤900px) · 400 · `1.06` + `0.12em` between lines · line-by-line; keep the headline to 2 short lines with the payoff phrase in `<em>` |
| Section title (`.section-title`) | `clamp(34px, 4.5vw, 58px)` | `-0.03em` · 400 · `1.04` |
| Drench statement / problem title | `clamp(34px, 5vw, 64px)` | `-0.032em` · 400 · `1.08` |
| Final CTA title | `clamp(40px, 6vw, 84px)` | `-0.035em` · 400 · `1.02` · bone |
| Stat value | `clamp(40px, 5vw, 64px)` | `-0.03em` · 400 · `1` |
| Card / node title | 18–24px | `-0.02em` · 500 |
| Section sub (`.section-sub`) | 17px | 400 · `1.6` · `max-width: 52ch` · `--stone` |
| Body / card body | 14–15px | 400 · `1.6–1.7` · `--stone` |
| Eyebrow (`.section-label`) | 12px | `0.14em` · uppercase · 600 · `--stone` · leading 7px `--harvest` dot |
| Nav link | 15px | `-0.01em` · 500 · `rgba(olive-950, .65)` → full on hover |
| Micro-label / tag / status | 11–13px | `0.06–0.16em` · uppercase · 600 |

### Heading emphasis

`<em>` inside a heading renders **upright** (`font-style: normal`) and colored `--harvest-deep`.
That is the only in-heading highlight device.

---

## 3. Motion

- **Signature easing:** `cubic-bezier(0.22, 1, 0.36, 1)` — exported as `EASE_OUT`. Default for
  every entrance, reveal, and hover.
- Loading-screen exit: `cubic-bezier(0.76, 0, 0.24, 1)` (panel slides up `y: -100%`).
  Progress-bar fill: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Durations:** micro-interaction `0.2s` · content reveal `0.6–0.9s` · hero media `0.9–1s` ·
  hero-image crossfade `1.1s` · Ken-Burns drift `8s`.
- **Section entrances:** `opacity: 0, y: 24–40 → 0`, triggered by `useInView` / `whileInView`,
  `once: true`, root margin `-60px` (cards) / `-100px` (long blocks). Stagger children by
  `delay: i * 0.08–0.1`.
- **Word reveal:** split on spaces; each word in an `overflow: hidden` wrapper; inner span
  `y: 0.7em → 0` + fade, `0.7s`, `EASE_OUT`, `delay + i * 0.06`.
- Hover lift on buttons: `translateY(-2px)`.
- **`prefers-reduced-motion: reduce`** is honored globally — animation/transition durations
  collapse to `~0`, word-reveal falls back to plain text, Ken-Burns / parallax disabled, the
  loading screen skips straight to complete. Every new animation must respect it.

---

## 4. Shape, elevation, spacing

- **Radius:** `14px` (small / mobile media) · `16px` (framed preview) · `18px` (cards, nodes) ·
  `20px` (large media frames) · `clamp(24px, 3vw, 36px)` = `--radius-panel` (full-width drench
  panels inset from the page edge, e.g. the Targets section) · `9999px` (all buttons, pills,
  tags). `--radius` = `0.5rem` for shadcn-derived components.
- **Shadow:** card `0 4px 32px rgba(13, 43, 26, 0.08)` · framed preview `0 24px 64px
  rgba(30, 38, 17, 0.12)` · harvest button (see §1) · olive button hover `0 8px 24px
  rgba(30, 38, 17, 0.2)`. Shadows are soft and low-contrast; no hard drop shadows.
- **Section rhythm:** vertical `clamp(100–120px, 14–18vh, 160–200px)`; horizontal
  `clamp(20px, 4–6vw, 56–80px)`.
- **Content width:** `1100px` for text-led sections, `1200px` for grids.
- **Breakpoints:** `900px` (grids → 1 col, desktop nav → hamburger) · `768px` · `480px`.
  Design and test at **375 / 768 / 1280**.

---

## 5. Components — conventions

- **Section header trio, in order:** `.section-label` (eyebrow + harvest dot) → `.section-title`
  (with optional `<em>` highlight) → `.section-sub` (17px, `--stone`, `≤52ch`,
  `margin-bottom: 64px`). Precedes nearly every section. On drench, the label text is
  `--sage-light`.
- **Buttons** — all pill-shaped, `gap: 8px`, `font-weight: 500`:
  | Variant | Rest | Hover |
  |---|---|---|
  | `primary` | `--harvest` bg / `--olive-950` text / harvest shadow | `--harvest-deep` bg / `--bone` text / lift |
  | `secondary` | transparent / `rgba(olive-950, .75)` / `1px rgba(olive-950, .25)` border | border + text → full `--olive-950` |
  | `secondary-light` (on drench) | transparent / `rgba(bone, .75)` / `rgba(bone, .30)` border | border + text → full `--bone` |
  | `primary-on-dark` (on drench) | `--harvest` bg / `--olive-950` text | `--bone` bg / lift |
  Sizes: `md` = `10px 24px / 14px`, `lg` = `14px 32px / 15px`. Focus:
  `box-shadow: 0 0 0 2px var(--bone), 0 0 0 4px var(--ring)`.
- **Arrow icon:** inline 15×15 SVG (`M5 12H19` + chevron `M13 6L19 12L13 18`, `currentColor`,
  `strokeWidth: 2`, round caps). Auto-appended to `primary` / `primary-on-dark` buttons.
- **Interactive elements are real `<button>` / `<a>`.** Visible focus ring on all of them.
  Hit targets ≥ 44×44 (nav logo and hamburger are explicitly `min 44×44`).

---

## 6. Voice & tone

**Audience:** institutional B2B — global commodity buyers, trade-finance providers, export
compliance teams — plus Indonesian smallholder partners. Write for someone deciding whether to
route real supply-chain volume and capital through Panora.

**Register:** plain, declarative, credible. Institutional without being corporate-stiff.
Agricultural specificity is a feature — name the commodity (Garut Arabica, fermented cocoa, VCO),
the corridor (Garut, South Sumatra), the regulation (EUDR), the artifact (Digital Product
Passport / DPP).

**Do:**
- Active voice. A control says what it does: "Explore Digital Marketplace", "Start B2B
  Partnership", "Export EUDR Report" — the same wording through the whole flow.
- Lead with the verifiable claim, then the mechanism. "Every harvest point recorded from point
  zero of production."
- Sentence case for everything except the uppercase eyebrow / micro-labels.
- Numbers with units and context ("2,800 Ha polygon-mapped", "under $0.001 per record"). When a
  figure is a target, say so ("Phase 1 targets").
- Treat empty / error / loading states as direction, not mood.

**Don't:**
- No hype adjectives ("revolutionary", "seamless", "cutting-edge"), no exclamation marks.
- Don't foreground blockchain — the product is verifiable supply-chain data; Solana / cNFT /
  wallet mechanics stay under the hood ("nobody ever sees a wallet address").
- No "click here". No filler sentences.

**Bilingual:** every user-facing string ships as `{ id, en }`. Default locale is **`id`**
(Bahasa Indonesia), persisted to `localStorage["panora-locale"]`, toggled via the `LangToggle`
pill in the nav. Copy lives in `lib/content.ts`, never inline in components. `<html lang>` tracks
the active locale.

**Names:** the entity is **Panora Farm** (legal: PT Jaga Dita Center / JDC Holding). Products:
**Field App**, **Enterprise Console**, **Digital Marketplace**. Domain `panora.farm`, contact
`panorafarm@gmail.com`, social `@officialpanora_`.

---

## 7. Drop-in CSS custom properties

For `app/globals.css` `:root` (mirror the palette + semantic aliases above):

```css
:root {
  --bone: #f3eee4;
  --bone-dim: #e9e2d2;
  --white: #fdfcf9;
  --olive-950: #1e2611;
  --olive-800: #404f1d;
  --olive-700: #4d5f26;
  --sage: #8fa36c;
  --sage-light: #a9bf87;
  --stone: #7c7f6a;
  --harvest: #d9822b;
  --harvest-deep: #b5641e;
  --sans: var(--font-hanken), system-ui, sans-serif;

  --background: #f3eee4;
  --foreground: #1e2611;
  --card: #fdfcf9;
  --card-foreground: #1e2611;
  --popover: #fdfcf9;
  --popover-foreground: #1e2611;
  --primary: #404f1d;
  --primary-foreground: #f3eee4;
  --secondary: #e9e2d2;
  --secondary-foreground: #404f1d;
  --muted: #e9e2d2;
  --muted-foreground: #7c7f6a;
  --accent: #e9e2d2;
  --accent-foreground: #404f1d;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: rgba(30, 38, 17, 0.12);
  --input: rgba(30, 38, 17, 0.12);
  --ring: #8fa36c;
  --radius: 0.5rem;
}
```

_Extracted 2026-08-31 from `panora-v2-old/Panorafarm-Q3/app/globals.css`. See
`docs/ui-extraction.md` for the full section-by-section UI inventory._
