---
description: Use this skill to browse, select, adapt and integrate 21st.dev community components into the ECO RIDE prototype without breaking the visual direction or overloading the project.
---

# ECO RIDE 21st.dev Component Scout

## Mission

Use 21st.dev community components as acceleration blocks for ECO RIDE.

Do not blindly copy components. Select, adapt and integrate only components that support the ECO RIDE product vision.

## ECO RIDE direction

The UI must feel like:

- premium automotive platform;
- mobile-first car rental app;
- cinematic landing page;
- clean marketplace catalogue;
- ecological mobility brand;
- conversion-focused business website.

## Component categories to search

Priority P0:

- mobile bottom navigation;
- vehicle/product cards;
- search bars;
- filter chips;
- drawers/sheets;
- hero sections;
- CTA buttons;
- image galleries;
- feature cards;
- FAQ accordions.

Priority P1:

- bento grids;
- testimonial carousels;
- pricing cards;
- dashboards;
- sidebar filters;
- stats cards;
- comparison tables;
- animated tabs.

Priority P2:

- decorative backgrounds;
- complex animations;
- abstract SaaS sections;
- experimental interactions.

## Selection rules

For each candidate component, evaluate:

1. Does it support mobile-first UX?
2. Does it feel premium?
3. Can it be adapted to automotive?
4. Is it readable and conversion-friendly?
5. Does it avoid unnecessary complexity?
6. Does it work with Next.js, TypeScript and Tailwind?
7. Does it add heavy dependencies?

Reject components that:

- look too playful;
- look too generic SaaS;
- are desktop-only;
- use too many animations;
- hurt accessibility;
- require too many dependencies;
- conflict with the ECO RIDE design system.

## Adaptation rules

When integrating a 21st.dev component:

- replace colors with ECO RIDE CSS variables;
- replace generic copy with ECO RIDE copy;
- replace generic icons with Lucide icons;
- ensure mobile responsiveness;
- ensure accessibility;
- extract reusable components;
- remove unnecessary effects;
- keep code readable.

## Output expected

For every selected component, return:

```
Component:
Source:
Use case:
Target page:
Priority:
Why it fits:
Changes required:
Dependencies:
Risks:
```

## Final integration plan

Always end with:

1. Components to install first
2. Components to adapt
3. Components to avoid
4. Files to modify
5. Visual risks
6. Next implementation step
