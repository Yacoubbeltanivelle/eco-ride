---
description: Use this skill to apply the global ECO RIDE visual identity by merging mobile car app UI, cinematic automotive landing pages, dark premium SaaS design, electric vehicle storytelling and marketplace dashboard patterns.
---

# ECO RIDE Visual Fusion System

## Mission

Create a unique premium visual system for ECO RIDE.

The design must feel like:

- a high-end mobile car rental app;
- a trusted automotive marketplace;
- a cinematic premium vehicle brand;
- a modern electric mobility platform;
- a conversion-focused business website.

Do not copy the reference designs directly. Extract patterns only.

## Core design concept

ECO RIDE should feel like:

> "A premium mobility OS for buying, renting and sourcing reliable vehicles."

Keywords:

- premium
- mobile-first
- cinematic
- clean
- ecological
- trustworthy
- professional
- fast
- app-like
- conversion-oriented

## Visual DNA

Use a hybrid identity:

### 1. Cinematic dark mode

Inspired by black automotive landing pages.

Use for:

- hero sections;
- premium storytelling;
- footer;
- high-impact sections;
- vehicle showcase banners.

Style:

- black / deep charcoal backgrounds;
- thin grid lines;
- very large typography;
- soft glow;
- dramatic vehicle images;
- editorial spacing.

### 2. Soft electric app UI

Inspired by mobile car rental apps and electric dashboard interfaces.

Use for:

- mobile app shell;
- catalogue;
- vehicle cards;
- filters;
- simulator;
- customer area.

Style:

- pale mint backgrounds;
- white rounded cards;
- blue/green accents;
- soft shadows;
- high-radius cards;
- floating controls;
- touch-friendly UI.

### 3. Marketplace dashboard

Inspired by desktop car rental dashboards.

Use for:

- catalogue desktop;
- admin demo;
- comparison page;
- advanced filters.

Style:

- sidebar filters;
- vehicle list;
- map/availability placeholder;
- right-side detail drawer;
- dense but clean information.

## Color palette

Use CSS variables.

```css
:root {
  --eco-black: #050706;
  --eco-ink: #0B0F0D;
  --eco-charcoal: #111715;
  --eco-graphite: #1B211F;

  --eco-mint-bg: #EFF7F1;
  --eco-mint-soft: #DDEFE4;
  --eco-mint-card: #F7FBF8;

  --eco-green: #0F6B3A;
  --eco-green-deep: #073B22;
  --eco-green-neon: #49E58C;

  --eco-blue: #39BDEB;
  --eco-blue-soft: #BFEFFF;

  --eco-white: #FFFFFF;
  --eco-muted: #8A938E;
  --eco-border: rgba(255,255,255,0.12);
}
```

## Typography

Use:

- Primary: Inter, Sora or Geist Sans.
- Display: Space Grotesk or Sora.
- Fallback: system sans-serif.

Rules:

- Big editorial titles on landing pages.
- Compact, readable labels on app screens.
- Avoid decorative fonts.
- Use strong hierarchy:
  - Hero: 48–96px desktop.
  - Mobile hero: 36–48px.
  - Section title: 28–48px.
  - Card title: 16–22px.
  - Label: 11–13px.

## Border radius system

Use:

- Small chip: 999px
- Card: 24px
- Premium panel: 32px
- Mobile screen container: 36px
- Hero image: 32px
- Bottom navigation dock: 28px

## Shadows and glass

Use subtle glassmorphism only when useful.

```css
.eco-glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

Do not overuse glass effects. They should support clarity, not destroy readability.

## Layout principles

### Mobile

- App-like layout.
- Sticky bottom nav.
- Sticky CTA bar.
- Large vehicle visuals.
- Cards stacked vertically.
- Horizontal category chips.
- Full-width search input.
- Bottom sheets for filters.

### Desktop

- Hero cinematic.
- Catalogue as dashboard.
- Sidebar filters.
- Vehicle list/grid.
- Right detail panel or map placeholder.
- Generous spacing.
- Strong editorial sections.

## Component mood

Buttons:

- Rounded pill.
- High contrast.
- Primary: green or electric blue.
- Secondary: glass/dark.

Cards:

- Rounded.
- Photo-first.
- Price visible.
- CTA clear.
- Status badges.

Vehicle imagery:

- Large.
- Clean background when possible.
- Avoid cluttered images.
- Use gradient overlays for text readability.

## Avoid

- Copying Porsche/BMW/Tesla brand logos unless assets are licensed.
- Using fake manufacturer logos as UI icons.
- Overloading the homepage.
- Too many colors.
- Tiny mobile text.
- Desktop-first layouts.
- Popups that block conversion.
- Dark sections with poor contrast.

## Acceptance criteria

The UI is successful if:

- It feels premium in the first 3 seconds.
- It feels like a mobile app on smartphone.
- The user always knows what action to take.
- Vehicle price and availability are visible quickly.
- The brand feels ecological without looking cheap.
- The design is original and not a clone of the references.
