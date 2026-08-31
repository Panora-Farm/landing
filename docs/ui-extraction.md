# Panora Landing — UI Extraction

Pure UI/design inventory pulled from the two previous landing builds. **No code here** —
this is the reference for rebuilding. Two sources:

| Source | Path | Character |
|---|---|---|
| **A — "Panora Labs" landing** | `panora-v2-old/landing/` | English only. Solana / EUDR "digital product passport" traceability angle. Animation-heavy: framer-motion + a react-bits kit (Magnet, GlareHover, LogoLoop, ScrollReveal, CountUp, SplitText, Parallax). Tailwind + shadcn button/card. |
| **B — "Panora Farm" (Q3)** | `panora-v2-old/Panorafarm-Q3/` | Bilingual ID/EN with a runtime toggle. Commodity-aggregator + trade-finance angle, PT Jaga Dita Center. Lighter motion (plain framer-motion, no react-bits). Hand-rolled CSS, no shadcn. Has a mobile drawer nav and a fake-browser "console preview". |

Both share **one identical design system** (tokens, type ramp, section-header pattern, loading
screen, nav shell, footer shell, easing). Differences are in section content and motion richness.

---

## 1. Design tokens (identical across A and B)

### Color

| Token | Hex | Role |
|---|---|---|
| `--bone` | `#f3eee4` | Page background (warm off-white) |
| `--bone-dim` | `#e9e2d2` | Alt section background, muted surfaces, donut track |
| `--white` | `#fdfcf9` | Card surface (warm white) |
| `--olive-950` | `#1e2611` | Primary text, darkest drench, footer bg |
| `--olive-800` | `#404f1d` | Primary brand / dark section drench ("olive drench" bands) |
| `--olive-700` | `#4d5f26` | Secondary olive (chart segment, hover) |
| `--sage` | `#8fa36c` | Accent / focus ring / eyebrow dot alternate / selection bg |
| `--sage-light` | `#a9bf87` | Eyebrow text on dark, sage statement text |
| `--stone` | `#7c7f6a` | Muted / secondary body text |
| `--harvest` | `#d9822b` | **The one action + emphasis accent** (turmeric/palm-sugar amber). Buttons, eyebrow dot, scroll-progress bar, chart segment |
| `--harvest-deep` | `#b5641e` | Accent hover, emphasized `<em>` words in headlines |

shadcn semantic mapping (source A only, but values match): `--background` = bone,
`--foreground` = olive-950, `--card` = white, `--primary` = olive-800,
`--muted-foreground` = stone, `--ring` = sage, `--radius` = `0.5rem`.

Recurring alpha values (not tokenized — candidates to tokenize on rebuild):
- Borders on light: `rgba(30, 38, 17, 0.07–0.12)`
- Text on olive drench: `rgba(243, 238, 228, 0.4 / 0.55 / 0.6)`
- Nav glass: `rgba(243, 238, 228, 0.82)` + `backdrop-filter: blur(14px)`

### Typography

- **Family:** `Hanken Grotesk` via `next/font` (weights 300/400/500/600/700), var `--font-hanken`.
  Fallback `system-ui, sans-serif`. `font-feature-settings: "ss01"` on body.
- **No separate display face.** Personality comes from size + negative tracking + weight 400 on
  huge headings (the "Aeonik look" per the source comments).

| Style | Size | Tracking / weight | Notes |
|---|---|---|---|
| Hero title (A) | `clamp(52px, 8.2vw, 132px)` | `-0.04em`, 400, `line-height: 0.98` | `max-width: 12ch` |
| Hero title (B) | `clamp(38px, 5.8vw, 88px)` | `-0.035em`, 400, `line-height: 1.04` | line-by-line, `text-wrap: balance` |
| Section title | `clamp(34px, 4.5vw, 58px)` | `-0.03em`, 400 | `<em>` → not italic, colored `--harvest-deep` |
| Big statement (A) | `clamp(38px, 5.6vw, 76px)` | `-0.032em`, 400 | on olive drench, `max-width: 20ch` |
| "Better way" title (A) | `clamp(40px, 6vw, 84px)` | `-0.035em`, 400 | |
| Final CTA title | `clamp(40px, 6vw, 84px)` | `-0.035em`, 400 | bone on olive |
| Process step title | `clamp(34px, 3.5vw, 52px)` | `-0.03em`, 400 | |
| Stat value (B) | `clamp(40px, 5vw, 64px)` | `-0.03em`, 400 | bone on olive |
| Card / node title | 20–26px | `-0.02em`, 500 | |
| Section sub | 17px | 400, `line-height: 1.6`, `max-width: 52ch` | color stone |
| Body / desc | 14–16px | `line-height: 1.6–1.7` | color stone |
| Eyebrow (`.section-label`) | 12px | `0.14em`, uppercase, 600, stone | leading 7px `--harvest` dot |
| Nav link | 15px | `-0.01em`, 500 | `rgba(olive-950, .65)` → full on hover |
| Micro-label / tag | 11–13px | `0.08–0.16em`, uppercase, 600 | |

### Spacing / layout

- Section vertical rhythm: `clamp(100–120px, 14–18vh, 160–200px)` top/bottom.
- Section horizontal pad: `clamp(20px, 4–6vw, 56–80px)`.
- Content max-width: **1100px** (text-led sections) / **1200px** (grids).
- Section-header trio (`.section-label` → `.section-title` → `.section-sub`) precedes almost
  every section. `.section-sub` has `margin-bottom: 64px` acting as header→body gap.

### Radius

`14px` (small media / mobile) · `18px` (cards) · `20px` (large media frames, me-cards) ·
`9999px` (all buttons, pills, tags) · hero media top corners only in A (`20px 20px 0 0`).

### Shadow

- Card (A shadcn): `0 4px 32px rgba(13,43,26,0.08)`
- Harvest button rest: `0 4px 20px rgba(181,100,30,0.25)` → hover `0 6px 24px …0.35`
- Primary/olive button hover: `0 8px 24px rgba(30,38,17,0.2)`
- Console-preview frame (B): `0 24px 64px rgba(30,38,17,0.12)`

### Motion

- **Signature easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (`EASE_OUT`) — used everywhere.
- Loading-screen exit easings: `[0.76, 0, 0.24, 1]` (slide up) / `[0.16, 1, 0.3, 1]` (bar fill).
- Durations: micro 0.2s · reveals 0.6–0.9s · hero media 0.9–1s · slideshow crossfade 1.1–1.5s.
- Word-reveal stagger: `0.05–0.06s` per word, `y: 0.7em → 0` + fade, inside `overflow:hidden` wrap.
- Scroll parallax: hero photo drifts `0→140px` over `0→900` scroll, over-scaled `1.15`.
- Section entrances: `opacity 0 + y 24–40 → 0`, `whileInView` / `useInView`, `once: true`,
  `margin: "-60px"` (cards) or `-100px` (FAQ).
- **`prefers-reduced-motion`:** globally kills animation/transition duration; `SplitText` returns
  plain text; parallax/Ken-Burns disabled; loading screen skips straight to `onComplete`.

---

## 2. Shared primitives

### 2.1 Section header trio
`.section-label` (uppercase 12px + 7px harvest dot, `::before`) → `.section-title`
(`clamp(34–58px)`, `<em>` renders upright in harvest-deep) → `.section-sub` (17px stone, 52ch).
On olive-drench sections the label flips to `--sage-light`, dot stays harvest.

### 2.2 Buttons

**Source A** — `class-variance-authority`, all pill-shaped, `focus-visible:ring-2 ring-ring
ring-offset-2`, `transition-all 200ms`, hover `-translate-y-0.5`:

| variant | rest | hover |
|---|---|---|
| `hero-cta` **(the conversion action, same everywhere)** | `bg-harvest` / `text-olive-950` / harvest shadow / `gap-2` | `bg-harvest-deep` / `text-bone` / bigger shadow |
| `hero-ghost` | transparent / `text-olive-950/75` / `border-olive-950/25` | border & text → full olive |
| `cta-bone` (harvest pill on olive) | `bg-harvest` / `text-olive-950` | `bg-bone` |
| `cta-ghost-bone` | transparent / `text-bone/75` / `border-bone/30` | border & text → full bone |
| `primary` / `nav` | `bg-olive-800` / `text-bone` | `bg-olive-950` |
| plus stock shadcn `default/secondary/outline/ghost/link/destructive` |
| sizes | `default` = `px-8 py-[14px] text-[15px]`, `nav` = `px-6 py-[10px] text-sm`, `lg`, `full`, icon sizes |

**Source B** — plain `.btn` + `.btn-{variant}` + `.btn-{md|lg}`:
`btn-primary` (harvest, olive text, → harvest-deep + bone text + `translateY(-2px)`),
`btn-secondary` (olive outline), `btn-secondary-light` (bone outline, for dark bg),
`btn-primary-on-dark` (harvest → bone on hover). `md` = `10px 24px / 14px`, `lg` = `14px 32px / 15px`.
Focus: `box-shadow: 0 0 0 2px var(--bone), 0 0 0 4px var(--ring)`.

**Arrow icon** (identical both sources): inline 15×15 SVG, two `stroke="currentColor"` paths
(`M5 12H19` + chevron `M13 6L19 12L13 18`), `strokeWidth 2`, round caps, class `-mr-1`.
Auto-appended to primary/CTA buttons in B; hand-placed in A.

**Text link button** (A, `.text-btn`): 15px 600, `border-bottom: 1px solid rgba(olive,.3)`,
6px bottom pad; hover darkens border + `gap: 10px → 16px` (arrow slides out).

### 2.3 Loading screen
Fixed `inset:0`, z-9999, bone bg, centered column `gap:32px`: logo (`height:48px`) + 120×2px
track with an olive-800 `scaleX 0→1` fill. Hold ~1.4–1.8s, then whole panel slides up
`y: -100%` (`0.9s`, ease `[0.76,0,0.24,1]`) and calls `onComplete`. Gates hero entrance via a
`ready`/`loading` boolean lifted to the page. Reduced-motion → immediate complete.

### 2.4 Scroll progress bar
Fixed top, full width, `height: 2px`, `transform-origin: left`, `bg: --harvest`, z ~101.
A uses framer `useScroll().scrollYProgress` bound to `scaleX`; B is a hand-rolled scroll
listener writing `scaleX(progress)`. `aria-hidden`.

### 2.5 Nav shell
Fixed, glass: `rgba(243,238,228,0.82)` + `blur(14px)`, `border-bottom 1px rgba(olive,.07)`,
pad `18px 40px` (→ `14px 20px` mobile). Three-column flex: logo left (`min 44×44`, `/logo.png`
at `height:44`), centered `.nav-links` (`gap:36px`), right slot.
- **A right slot:** single `Launch console` button (`hero-cta`-ish `nav` variant) + arrow.
- **B right slot:** `LangToggle` + desktop CTA button + hamburger (`.nav-menu-btn`, 44×44,
  CSS-drawn icon that morphs to an X). Links hidden < 900px.
- **B mobile drawer:** fixed full-screen `rgba(bone,0.98)` + `blur(16px)`, pad `110px 28px 40px`,
  column: lang toggle → big links (`clamp(28–40px)`, staggered fade-in `y:12`) → full-width CTA.
  Body scroll locked while open. `AnimatePresence` fade.
- Nav enters on load: `opacity 0, y -16 → 0`, 0.6–0.8s.

### 2.6 Footer shell
`bg: --olive-950`, pad `64px … 32px`. `.footer-top` = flex (brand block + 3 link columns),
`gap:60px`, bottom border `rgba(bone,.1)`, `padding-bottom:40px`.
- Brand: name (`22px/500` bone) + desc (`14px` `rgba(bone,.4)`, `max-width:280px`).
  B adds `.footer-legal` (PT Jaga Dita Center) + `.footer-social` (`@officialpanora_`).
- Columns: `.footer-col-title` (uppercase 12px `rgba(bone,.4)`) + `.footer-links` (14px
  `rgba(bone,.6)` → bone on hover, `gap:12px`).
- `.footer-bottom`: space-between; `.footer-copy` `13px rgba(bone,.3)`.
- Grid collapses `repeat(3, auto)` → `repeat(3, 1fr)` @900 → `1fr` @480 (B).

### 2.7 Word-reveal (`SplitText` / `RevealWords`)
Split on spaces; each word in `display:inline-block; overflow:hidden` wrapper; inner span
animates `y: 0.7em → 0` + `opacity 0 → 1`, `0.7s`, `EASE_OUT`, `delay + i*0.05..0.06`.
A version can be scroll-triggered (`whileInView`, `margin:-15%`) or `ready`-gated; B version is
always `ready`-gated. Non-breaking space between words in B.

### 2.8 react-bits kit (Source A only)
| Component | Use on page | Behavior |
|---|---|---|
| `Magnet` | wraps hero + final-CTA primary button | button eases toward cursor within `padding:60`, `magnetStrength:6` |
| `GlareHover` | infrastructure card images | diagonal white glare sweep on hover, `glareOpacity 0.35`, `900ms`; z-index bumped above `next/image` |
| `Parallax` | infrastructure card images | scroll drift `±18px`, over-scale `1.12`, inside `overflow:hidden` frame |
| `LogoLoop` | Proof strip | infinite marquee of partner logos, `speed 60`, `gap 110`, `pauseOnHover`, edge `fadeOut` (color = olive-800) |
| `ScrollReveal` | AboutPanora big statements | per-word reveal tied to scroll position |
| `CountUp` | "90 days" timeline numbers | counts to target, `duration 1.4` |

---

## 3. Page section inventory

Order below = actual render order. **[A]** / **[B]** marks the source. Sections that exist in
both are merged with notes.

### 3.1 Hero — [A] + [B]
Full-viewport (`min-height: 100svh`), flex column, top pad `clamp(120px,16vh,180px)`.

- **Headline:** giant, weight 400, tight tracking, word-reveal animated.
  - A: two lines, "Supply chains," / "made bulletproof." (2nd line `--harvest-deep`).
  - B: 3 content-driven lines, last line accented; `text-wrap: balance`.
- **`.hero-row`** (flex, `align-items: flex-end`, space-between, wraps to column < 900px):
  - `.hero-description` — `clamp(16–19px)` stone, `max-width: 44ch`.
  - `.hero-buttons` — primary + secondary.
    - A: `Request enterprise demo` (mailto, Magnet-wrapped `hero-cta`) + `Launch console` (`hero-ghost`).
    - B: `Explore Digital Marketplace` (`primary`) + `Start B2B Partnership` (`secondary`, external mailto).
- **`.hero-trust`** — [B only] row of uppercase micro-badges w/ 5px harvest dots
  ("Aligned with UN SDG 12…", "EUDR-Ready DPP").
- **`.hero-media`** — big rounded photo panel, `flex:1`, `min-height: clamp(320px,44vh,560px)`.
  - A: 4 images (`/hero.jpg…hero3.jpg`) cross-fading every 5s (`1.5s` fade), parallax drift +
    over-scale, single caption bottom-left ("First-mile origins. Smallholder partner farms,
    Indonesia"). Radius top-only (`20px 20px 0 0`) so it bleeds into next section.
  - B: 4 slides, auto-advance 4.2s, `opacity` crossfade `1.1s` + slow Ken-Burns
    (`scale 1 → 1.06` over `8s`). Bottom gradient scrim
    (`transparent → rgba(olive,0.72)`). `.hero-media-footer`: animated caption (swap
    `AnimatePresence mode="wait"`) + clickable dot nav (`role="tablist"`, active dot = harvest,
    `scale 1.15`).
- Entrance: title words stagger → description (`delay .45–.55`) → buttons → trust → media
  (`delay .5–.75`, `y 40`).

### 3.2 AboutPanora / "statements + better way" — [A]
Two stacked sub-sections:
1. **`.statements`** — olive-800 drench, `padding: clamp(120px,18vh,200px) …`. Inner column
   `max-width:1100px`, `gap: clamp(72px,12vh,140px)`. Eyebrow "The compliance imperative"
   (sage-light) then 3 giant `.statement` blocks (`clamp(38–76px)`, bone; middle one
   `--sage-light`), each a `ScrollReveal` per-word. One `.statement-note` (`rgba(bone,.55)`,
   46ch) under the middle statement.
2. **`.better-way`** — bone. `.better-way-title` `clamp(40–84px)` with `<em>provable.</em>`
   in harvest-deep, word-reveal. `.better-way-text` `clamp(18–24px)` stone with `<strong>`
   in olive-950/500. `.text-btn` link "See the chain of custody" + arrow.

*(B's equivalent = `ProblemSection`, see 3.7.)*

### 3.3 Proof strip — [A]
`.proof-section` olive-800, `padding: clamp(56–88px) 0`, `overflow:hidden`.
Centered `.proof-label` ("Built on enterprise-grade infrastructure", `rgba(bone,.45)` uppercase)
then `LogoLoop` marquee: Solana (white PNG), Metaplex (`invert(1)` filter → bone), Superteam
(JPG rendered as `48px` rounded badge). `logoHeight 52`, `gap 110`, pause-on-hover, edge fade
to olive-800. `.proof-logo` hover `opacity .85 → 1`.

### 3.4 HowItWorks / "chain of custody" — [A]
`.process` bone section. Header trio ("Chain of custody" / "From farm gate to *boardroom.*" /
"Five verified handoffs…").
- **`.process-grid`** = 2 cols `1fr 1fr`, `gap: clamp(40–96px)`, `align-items:start`.
- **Left `.process-media`** — `position: sticky; top: clamp(90–130px)`. `4/5` aspect rounded
  frame; all 5 step photos stacked, only `active` at `opacity:1` (`0.7s` fade). Pill counter
  bottom-left ("02 / 05", `rgba(olive,.35)` + blur).
- **Right `.process-steps`** — `<ol>`; each `.process-step` has top hairline border,
  `padding: clamp(32–56px) 0`, `opacity: 0.35` → `1` when active. Head = num (`13px` sage) +
  title (`clamp(34–52px)`); then desc (`16px` stone, 46ch); then `.process-step-tag`
  (pill outline, uppercase 12px olive-800).
- **Active tracking:** `IntersectionObserver`, `rootMargin: "-45% 0px -45% 0px"` (step crossing
  viewport center becomes active).
- **< 900px:** grid → 1 col, sticky panel hidden, each step shows its own `16/10` photo above it,
  all steps full opacity.
- Steps: 01 Capture / 02 Verify / 03 Mint / 04 Move / 05 Report (each: title, desc, tag, image).

### 3.5 Vaults / "three nodes" (Infrastructure) — [A]
`.vault-mobile-section` on `--bone-dim`, `padding: 120px …`. Header trio ("Infrastructure" /
"Three nodes. One *unbreakable* chain." / sub).
`.vault-mobile-list` = `repeat(3, 1fr)` grid, `gap:28px` (→ 1 col < 900px).
`.vault-mobile-card` — white, `radius:18px`, `border rgba(olive,.08)`, `overflow:hidden`:
- `.vault-mobile-image` `16/10`, wrapped in `GlareHover` + `Parallax`, `next/image` fill.
- `.vault-mobile-info` pad 24px: `.vault-name` (uppercase 12px sage, "Node 01"),
  `.vault-mobile-title` (`26px/500`), `.vault-mobile-desc` (`14px` stone),
  `.vault-meta` (flex `gap:32px`, each = `.vm-label` uppercase 12px + `.vm-val` `18px/500` olive-800).
- Cards enter staggered `y 32`, `delay i*0.1`.
Nodes: 01 Field Agent Network · 02 Enterprise Console · 03 Logistical Nodes.

### 3.6 MarketEconomics / "security + timeline" (Technology) — [A]
`.me-section` bone, `padding: 120px …`. `.me-grid` = 2 cols `1fr 1fr` `gap:32px` (→ 1 col < 900px).
Two `.me-card`s (white, `radius:20px`, `padding:48px`, flex column `gap:32px`, enter `y 32`):
1. **"Enterprise-grade security. *Zero* blockchain complexity."** + `.me-checklist`:
   4 rows, each `✓` (sage, 20px) + `17px` stone text (sub-second finality / <$0.001 per record /
   REST APIs & webhooks / email-or-Google login via Web3Auth).
2. **"Deployed and audit-ready in *90 days.*"** + `.me-split-row`:
   - `.me-donut` — 280×280 SVG, 3 equal segments (`strokeWidth 28`) harvest / olive-700 / stone
     on a `--bone-dim` track, rotated `-90deg`; center label "Deployment" / "Blueprint".
   - `.me-pct-col` — 3 `CountUp` items "Day 30 / 60 / 90" (`36px/400`, colored per segment) +
     label ("Infrastructure deployed" / "Batches traced end-to-end" / "Audit-ready EUDR reports").
   - < 900px: donut shrinks to 180→140px, pct-col becomes a wrapping row.

### 3.7 ProblemSection — [B]  *(B's "why", analogous to A's 3.2)*
`.problem-section-new` olive-800 drench. Eyebrow (sage-light) + `.problem-section-title`
(`clamp(34–64px)` bone, line-by-line, `text-wrap:balance`). `.problem-stakeholders-grid` =
`repeat(3, 1fr)` `gap:28px` (→ 1 col < 900px). `.problem-stakeholder-card` —
`rgba(white,0.06)` + `border rgba(bone,.1)`, `radius:18px`, `padding:32px 28px`:
`.problem-stakeholder-role` (`18px/500` harvest) + `.problem-stakeholder-body` (`15px`
`rgba(bone,.6)`). Cards stagger in. Roles: Smallholder Farmers (Upstream) / Global B2B Buyers
(Downstream) / Liquidity Providers / Investors.

### 3.8 KeyStats — [B]
`.stats-section` olive-800, `padding: clamp(72–120px) …`. Centered header: `.section-label-light`
(sage-light, centered) + `.stats-section-title` (`clamp(22–32px)` bone, 28ch) +
`.stats-section-subtitle` (`rgba(bone,.55)`, 42ch).
`.stats-grid` = `repeat(4, 1fr)` `gap: clamp(28–48px)` (→ `1fr 1fr` @900 → `1fr` @480).
`.stat-item` column `gap:12px`: `.stat-value` (`clamp(40–64px)/400` bone) +
`.stat-label` (uppercase 14px **harvest**) + `.stat-detail` (`15px` `rgba(bone,.55)`, 28ch).
Enter via `fadeUpInView`, `y 28`, `delay i*0.1`.
Stats: 3,500+ farmers · 2,800 Ha mapped · 12,000 tons/yr · 100% first-mile verified
(all framed as "Phase 1 targets").

### 3.9 UnifiedEcosystem / "how it works" — [B]
`.ecosystem-flow-section` bone. Header (eyebrow + `.section-title` only).
`.ecosystem-flow` = `repeat(4, 1fr)` `gap:20px` (→ 1 col < 900px, with a rotated `→`
`.ecosystem-flow-arrow` appearing bottom-right of each node in harvest).
`.ecosystem-flow-node` — white, `border rgba(olive,.08)`, `radius:18px`, `padding:28px 24px`:
`.ecosystem-flow-num` (uppercase 12px sage, "01") + `.ecosystem-flow-title` (`20px/500`) +
optional `.ecosystem-flow-subtitle` (uppercase 12px harvest-deep, e.g. "Aggregation &
Verification") + `.ecosystem-flow-body` (`14px` stone). Nodes: Farmers → Panora Farm →
B2B Buyers → Liquidity Providers.

### 3.10 ConsolePreview — [B]
`.console-preview-section` on `--bone-dim`. Header trio.
`.console-preview-frame` — `max-width:1100px`, `radius:16px`, `border rgba(olive,.12)`,
big soft shadow, `bg: --olive-950`, enters `y 40`:
- **`.console-preview-chrome`** — fake browser bar: 3 traffic-light dots (`#ff5f57 / #febc2e /
  #28c840`, 10px) + `.console-preview-url` "app.panora.farm" (`12px rgba(bone,.45)`).
- **`.console-preview-body`** — grid `200px 1fr` (→ 1 col < 900px, sidebar hidden):
  - `.console-sidebar` — 5 items ("Dashboard / Batch Tracking / EUDR Reports / ESG Metrics /
    Settings"); active item = bone text + `rgba(harvest,.15)` bg + `2px` harvest left border.
  - `.console-main` — header row (`h3` `18px` bone + `.console-export-btn` harvest pill
    "Export EUDR Report") then `.console-table`: uppercase 11px header row, rows with
    `rgba(bone,.75)` cells, `.console-status` pill (`rgba(sage,.2)` bg / sage-light text).
    Sample batches PAN-2841 / 2840 / 2839, statuses Verified / In Transit / Warehouse, origin "GPS ✓".

### 3.11 CommodityPortfolio — [B]
`.commodities-section` bone, `padding: 120px …`. Header = `.section-title` only.
`.commodities-grid.commodities-grid-4` = `repeat(4, 1fr)` `gap:28px`
(→ `1fr 1fr` @900 → `1fr` @480).
`.commodity-card` — white, `border rgba(olive,.08)`, `radius:18px`, flex column:
`.commodity-image` (`4/3`, `next/image` fill cover) + `.commodity-info` (`padding:28px 24px 32px`):
`.commodity-title` (`24px/500`) + `.commodity-desc` (`14px` stone). Stagger `delay i*0.1`.
Items: Coffee Beans · Cocoa Beans · Coconut Derivatives · Greenhouse Horticulture.

### 3.12 WhyPanora / "advantages" — [B]
`.why-section` bone. Header (eyebrow + `.section-title`).
`.why-grid` = `repeat(2, 1fr)` `gap:24px` (→ 1 col < 900px).
`.why-card` — white, `border rgba(olive,.08)`, `radius:18px`, `padding:32px 28px`,
grid `36px 1fr`: `.why-check` (36px circle, `rgba(olive-800,.1)` bg, `✓` olive-800) +
`.why-card-title` (`18px/500`, grid-col 2) + `.why-card-body` (`14px` stone, grid-col 2).
Items: 100% Automated GPS Geotagging · Built-in Digital Product Passport · Zero Friction B2B
Integration · Corporate Trade Finance Access.

### 3.13 FAQ — [A]
`.faq-section` bone, `padding: 120px …`, `.faq-container` `max-width:900px`.
Header trio ("Got Questions?" / "Frequently Asked *Questions*"). Whole block enters `y 40`.
`.faq-accordion-list` — column of `.faq-accordion-item`, each with top/bottom hairline borders.
`.faq-accordion-button` — full-width flex space-between, `padding:28px 0`, hover `opacity .7`.
`.faq-accordion-question` (`clamp(18–22px)/500`). Icon = `.faq-icon-container` 28px holding two
overlaid minus-bar SVGs (olive-800): one static horizontal, one rotated `90deg` (vertical) that
rotates to `0deg` when open → plus becomes minus. Body height-animates
(`AnimatePresence`, `height 0 → auto`, `0.3s`), `.faq-accordion-body` `15px` stone, 68ch,
`<strong>` olive-950. `aria-expanded` / `aria-controls` wired. 6 Q&As (What is Panora / EUDR
requirements / blockchain knowledge / systems integration / working-capital protection /
field-proven).

### 3.14 Final CTA — [A] + [B]
`.cta-final` olive-800 drench, `padding: clamp(120px,18vh,200px) …`, inner `max-width:1100px`.
- A: eyebrow "Get started" (sage-light) + `.cta-final-title` (`clamp(40–84px)` bone, 16ch,
  word-reveal) + `.cta-final-sub` (`rgba(bone,.55)`, 46ch) + buttons `cta-bone` (Magnet) +
  `cta-ghost-bone`. Copy: "Ready to make your supply chain bulletproof?"
- B: `.cta-final-title.cta-final-title-wide` (22ch), no eyebrow, `y 32` entrance + staggered
  sub + buttons `primary-on-dark` + `secondary-light`. Copy: "Build a Transparent and
  Sustainable Future for Commodity Trade Together".

### 3.15 Footer — [A] + [B]
See §2.6. A: 3 columns Platform / Resources / Contact, copy "© 2026 Panora. All rights
reserved." B: adds legal line + social handle; columns Products / Company / Contact; bilingual copy.

### 3.16 Stub pages — [B]
`/marketplace`, `/logistics`, `/console` → `.stub-page` centered column: `.stub-page-eyebrow`
(uppercase sage) + `h1` (`clamp(3–5rem)/400` olive-800) + `p` (`1.125rem` stone, 28rem) +
`.stub-page-actions` (primary "Launch console" + secondary "Back to Home").

### 3.17 `/app` route — [A]
Full-screen fixed `#F2EFE8` container hosting the Enterprise Console in an `<iframe>`
(`http://127.0.0.1:5173/` in dev, `/app/index.html` in prod), `allow="clipboard-read;
clipboard-write"`. Not a landing section — just noting it exists.

---

## 4. Bilingual system (Source B)

- `LocaleProvider` (React context) + `useLocale()` + `pick(localized, locale)` / `pickLines(...)`.
- Locales `"id" | "en"`, default **`id`**, persisted to `localStorage["panora-locale"]`,
  writes `document.documentElement.lang`. Mount-guarded to avoid hydration mismatch.
- All copy lives in `lib/content.ts` as `{ id, en }` objects (nav, hero, metrics, problem,
  ecosystem, console preview, commodities, whyPanora, finalCta, footer, metadata…).
- `LangToggle` — pill segmented control, `rgba(olive,.08)` track, active segment = olive-800 bg
  + bone text; `role="group"`, `aria-pressed`. Appears in nav (desktop) and drawer top (mobile).

---

## 5. Responsive breakpoints

| Width | Changes |
|---|---|
| **≤ 900px** | Nav pad shrinks; desktop nav links hidden (B shows hamburger, hides desktop CTA); logo → 38px; hero-row → column; all multi-col grids → 1 col (process, vaults, me-grid, problem, ecosystem, why, console body); process sticky panel hidden → per-step photos; console sidebar hidden; stats-grid → 2 col; footer-top → column; section pads → ~80–90px. |
| **≤ 768px** | FAQ pads/gaps shrink, FAQ icon → 22px. |
| **≤ 480px** | Nav pad `12px 16px`; logo → 32px; hero side pad 16px; hero-media radius → 14px (A: `14px 14px 0 0`); B hero-media-footer → column, hero-buttons → full-width stacked; stats-grid → 1 col; commodities-grid-4 → 1 col; section titles → `clamp(28px,8vw,40px)`; section-sub → 15px; footer pads/cols compress; me-donut → 140px. |

Test widths per the design guidelines: **375 / 768 / 1280**.

---

## 6. Assets present

`public/`: `logo.png` (1456×816 wordmark), `hero.jpg` `hero1–3.jpg`, `coffee.jpg` `chili.jpg`
`padi.jpg` (reused across commodities/process/vaults), `favicon.ico`.
`public/LOGO/`: `solana-white.png`, `metaplex.webp`, `superteam.jpg`.
`public/HowItWorks/`: `activate/claim/grow/harvest/stake.jpg` (present, **not referenced** by
current source — leftover from an earlier "vault/stake" concept).

---

## 7. Stack notes (for the rebuild decision, not prescriptive)

| | Source A | Source B |
|---|---|---|
| Next | 16.2.3 | 16.3.0 |
| Styling | Tailwind + shadcn tokens + a big hand-written `globals.css` | Tailwind v4 `@theme inline` + fully hand-written `globals.css` (no shadcn) |
| Components | shadcn `button` (cva) + `card`, `@radix-ui/react-slot`, `tailwind-merge`, `clsx` | none — plain `.tsx` + CSS classes |
| Motion | `framer-motion` + `motion` + custom react-bits kit | `framer-motion` only, `lib/motion.ts` helpers |
| Icons | `lucide-react` (installed; spar's use — mostly inline SVG) | inline SVG only |
| i18n | none | custom context in `lib/i18n.tsx`, copy in `lib/content.ts` |

**Recommendation for the extraction handoff:** the two builds already agree on a complete token
set — lift §1 verbatim into a `brand.md` at the landing root before any component work
(colors, `Hanken Grotesk`, the `EASE_OUT` curve, radius/shadow scales, the harvest-is-the-only-
action rule). Section structure to carry forward: the `.section-label → title → sub` trio, the
olive-drench alternating rhythm, the sticky-media process list (A) and the fake-console preview
(B) as the two "signature" moments.
