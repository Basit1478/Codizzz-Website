---
name: Codizzz Digital Pattern Room
description: A measured, fabrication-led system for digital products built around each business need.
colors:
  accent-light: "#FF8800"
  accent-dark: "#E72700"
  paper: "#F5F2EB"
  paper-deep: "#EBE6DC"
  ink: "#12100E"
  muted: "#5C574F"
  line: "#CFC8BD"
  dark-paper: "#100F0E"
  dark-paper-deep: "#181614"
  dark-muted: "#BBB4AA"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(4rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3rem, 5.8vw, 5.6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(1.55rem, 2.2vw, 2.2rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.04em"
rounded:
  square: "0px"
spacing:
  control-x: "20px"
  control-y: "12.8px"
  touch-target: "44px"
  section-y: "clamp(5rem, 10vw, 10rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "12.8px 20px"
    height: "48px"
  button-primary-dark:
    backgroundColor: "{colors.accent-dark}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "12.8px 20px"
    height: "48px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "14.4px 0"
---

# Design System: Codizzz Digital Pattern Room

## Overview

**Creative North Star: "The Digital Pattern Room"**

Codizzz looks and behaves like a modern fabrication studio for digital systems. Warm paper, graphite surfaces, cutting-table photography, measured contours and registration marks express that each product is shaped around a real operational need. The system is experimental enough to be memorable, but its hierarchy, copy and controls remain direct and trustworthy.

The interface is editorial rather than dashboard-like. Large compressed statements establish the point of view, neutral body copy explains the work, and thin rules organize information without turning every section into a card. Physical material appears through real raster photography and the clipped intake ticket, not simulated bevels or decorative technical noise.

**Key Characteristics:**

- Theme-aware identity with the exact orange mark in light mode and exact red mark in dark mode.
- Condensed industrial display typography paired with neutral, highly readable body text.
- Square controls, clipped paper silhouettes, measured rules and restrained registration marks.
- One active accent per theme and no fabricated proof devices.
- Physical, purposeful motion that draws relationships rather than decorating sections.

## Colors

The palette uses warm paper and graphite neutrals, with a single high-energy registration color that changes with the theme.

### Primary

- **Registration Orange** (`accent-light`): the only active light-theme accent, used for primary actions, linework, focus, service icons and small registration marks.
- **Registration Red** (`accent-dark`): the exact dark-theme counterpart used in the same roles without mixing orange into the dark surface.

### Neutral

- **Pattern Paper** (`paper`): the main light-theme ground and warm text color in dark mode.
- **Cutting Paper** (`paper-deep`): section separation and large secondary surfaces.
- **Graphite Ink** (`ink`): light-theme text, icons and structural contrast.
- **Workshop Black** (`dark-paper`): the dark-theme ground.
- **Measured Gray** (`muted`, `dark-muted`): supporting copy that still meets readable contrast.
- **Rule Line** (`line`): dividers, field strokes and measurement structure.

**The One Registration Color Rule.** Orange belongs only to light mode and red only to dark mode. Never show both active accents in the same interface state.

**The Proof Is Content Rule.** Do not introduce client marks, ratings, awards, metrics or testimonial color treatments unless verified content is supplied.

## Typography

**Display Font:** Barlow Condensed (with sans-serif fallback)

**Body Font:** Manrope (with sans-serif fallback)

**Character:** The display voice is compressed, direct and industrial without becoming mechanical body copy. Manrope provides calm contrast for navigation, explanations, forms and controls.

### Hierarchy

- **Display** (800, fluid up to 6rem, 0.84 line-height): hero and interior-page statements, normally uppercase and never tracked tighter than -0.03em.
- **Headline** (700, fluid up to 5.6rem, 0.9 line-height): major section statements with clear space above and a tighter relationship to supporting copy below.
- **Title** (700, fluid up to 2.2rem, 0.95 line-height): services, process entries and work names.
- **Body** (400, 1rem, 1.65 line-height): explanations and form content, generally constrained to 65–75 characters per line.
- **Label** (800, 0.75rem, 0.04em tracking): short uppercase controls, navigation and measurement labels.

**The Two-Voice Rule.** Barlow Condensed carries statements; Manrope carries meaning and action. Do not introduce a third display or technical costume font.

**The Heading Carries It Rule.** Sections begin with their actual heading. Do not add eyebrow or kicker text above it.

## Layout

Desktop composition uses wide editorial fields divided by single-pixel rules. The homepage first viewport layers an oversized left-anchored statement over the quiet edge of an immersive fabrication image, overlaps a clipped intake ticket at the lower edge, and closes with a six-service ribbon. Interior pages reuse the measured field through contour fragments, registration squares and ruled indexes rather than copying the hero composition.

Primary sections use fluid vertical spacing (`section-y`) and horizontal insets that grow from 4vw toward a centered 1440px boundary. Information lists are rows rather than same-size cards. At 1100px the navigation becomes a menu and the hero returns to a two-column reading order. At 760px the page becomes a deliberate vertical sequence with 20px side insets, two-column service cells, and no horizontal overflow.

**The Fitted Sequence Rule.** Responsive layouts preserve the reading order: statement, material, requirement, service options, then supporting narrative. Reflow the composition; do not shrink the desktop canvas into a miniature.

## Elevation & Depth

The system is flat by default. Depth comes from photographic material, tonal surface changes and physical overlap. The clipped requirement ticket is the only persistent lifted surface and uses one soft, downward drop shadow to separate warm paper stocks. Buttons use movement rather than decorative shadows.

**The Material Before Shadow Rule.** Prefer overlap, rules and surface temperature. Add a shadow only when it clarifies a real foreground layer.

## Shapes

Controls, fields and navigation are square. The signature silhouette is the asymmetrically clipped requirement ticket, supported by paper-pattern contours, plotter rails, dashed measurement arcs and small square registration marks. Lines are normally one pixel; the active requirement path may be slightly heavier to remain legible across photography.

**The Cut, Not Rounded Rule.** Use clipped or ruled geometry when a surface needs character. Do not replace the system with rounded SaaS cards or pill-shaped containers.

## Components

### Buttons

- **Shape:** square and rectangular (`0px` radius), with a minimum 44px target.
- **Primary:** solid theme accent, high-contrast theme text, uppercase label and a directional arrow.
- **Hover / Focus:** a restrained 2px upward movement on hover and a 2px theme-accent focus ring with 4px offset.
- **Text action:** transparent, underlined with the active accent, with the arrow moving horizontally on hover.

### Inputs / Fields

- **Style:** transparent surface, square geometry and a single bottom rule.
- **Focus:** the global theme-accent focus ring remains visible; the caret also uses the active accent.
- **States:** required fields retain native semantics; loading disables the submit control; errors name the recovery route.

### Navigation

The header is a warm, nearly opaque theme surface divided by a single bottom rule. Labels are compact uppercase Manrope. Active and hover states draw a short accent registration line beneath the label. Mobile navigation opens as a full-width ruled field below the header.

### Requirement Ticket

The signature intake component uses a clipped right edge, a distinct warm paper stock, one soft drop shadow and three plain-language questions separated by rules. It is semantic HTML and remains usable as a vertical block on mobile.

### Service Ribbon

Six exact service names appear in a ruled horizontal index with consistent 1.6px authored SVG icons. It closes the desktop first viewport and becomes a two-column matrix on mobile.

## Do's and Don'ts

### Do:

- **Do** use the exact supplied orange logo asset in light mode and exact supplied red logo asset in dark mode.
- **Do** use real photography when physical material is part of the concept.
- **Do** keep service language limited to the confirmed six offerings.
- **Do** preserve square controls, single rules and plain-language actions.
- **Do** respect reduced-motion preferences and keep the default content visible without JavaScript.

### Don't:

- **Don't** mix orange and red accents in one theme state or recolor the supplied logo geometry.
- **Don't** add fake statistics, testimonials, client logos, awards, ratings or availability claims.
- **Don't** use emoji, Unicode glyphs, generic glow, glass cards, gradient text or purple AI palettes.
- **Don't** turn sections into same-size rounded icon cards or bento scaffolds.
- **Don't** imitate physical material with bevels, embossing or decorative technical noise.
