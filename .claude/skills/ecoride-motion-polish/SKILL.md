---
description: Use this skill to add refined Framer Motion animations, micro-interactions, transitions, hover states, loading states and app-like polish to ECO RIDE without hurting performance or clarity.
---

# ECO RIDE Motion Polish

## Mission

Add premium motion without making the site heavy.

Motion should make the interface feel:

- smoother;
- more expensive;
- more app-like;
- clearer.

## Allowed animations

Use Framer Motion for:

- page fade-in;
- section reveal;
- card hover lift;
- bottom sheet slide;
- filter drawer opening;
- CTA hover/tap;
- active tab transitions;
- image gallery transitions.

## Timing

Use subtle timings:

```
Fast micro-interaction: 120–180ms
Card reveal: 250–400ms
Page transition: 300–500ms
Bottom sheet: spring but controlled
```

## Easing

Use:

- easeOut
- spring with low bounce

Avoid cartoonish bounce.

## Mobile motion

Mobile motion should be:

- quick;
- tactile;
- not distracting.

Recommended:

- cards slide up by 8–16px;
- CTA tap scale to 0.98;
- bottom sheet spring;
- chips active transition.

## Desktop motion

Desktop motion can include:

- subtle glow following mouse;
- card hover;
- image parallax very light;
- grid line reveal.

## Loading states

Create skeletons for:

- catalogue cards;
- vehicle detail;
- admin table.

## Empty states

Add polished empty states for:

- no vehicles found;
- no favorite vehicles;
- no admin leads.

## Avoid

- Animating every element.
- Long delays.
- Heavy parallax.
- Motion that blocks conversion.
- Layout shift.
- Complex scroll-jacking.

## Acceptance criteria

Motion is good if:

- The app feels premium.
- It remains fast.
- The user can still read easily.
- Animations support hierarchy.
- Nothing feels gimmicky.
