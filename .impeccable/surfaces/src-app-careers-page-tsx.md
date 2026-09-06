---
primary: src/app/careers/page.tsx
related:
  - src/components/CareerApplicationForm.tsx
  - src/app/globals.css
mode: persuade
---

# Careers surface brief

## Job

Let a prospective intern understand the offer immediately, compare the three open disciplines, choose one, and complete a credible application without leaving the page.

## Direction contract

- OWN-WORLD: Extend the Codizzz Digital Pattern Room as an editorial recruitment sheet. Warm paper or graphite grounds, Barlow Condensed statements, Manrope working copy, square controls and thin measured rules carry the existing identity.
- AVOID-WORLD: Job-board cards, rounded recruiting widgets, playful benefit badges, invented culture claims, compensation ambiguity, or a separate visual system for hiring.
- PALETTE: Use only the active theme registration color: exact orange `#FF8800` in light mode and exact red `#E72700` in dark mode.
- TYPE: Barlow Condensed carries the recruitment statement and role titles; Manrope carries facts, explanations, labels, fields and actions.
- MOTION: Role selection is the signature interaction. It navigates to the inline application section with the chosen role preselected. Shared GSAP and Lenis infrastructure supplies restrained section reveals and smooth scrolling; reduced-motion users retain native scrolling and fully visible content.

## Approved composition

The first viewport pairs a large careers statement with a ruled definition list that makes `Internship`, `3 months` and `Unpaid` visible without interaction. Openings follow as three wide ruled rows rather than cards. Each row combines the role, focus, short description and one direct apply action. A concise expectations section precedes the application area.

Before selection, the application area asks the visitor to choose a role. Selecting a role reloads the Careers route with that role in the query, anchors to the inline application section and opens the complete form with the selected role already chosen. The applicant can return to the unselected role list through a plain text action.

## Role and form grammar

- Roles are full-width editorial rows separated by single rules. Do not box them into independent cards or add decorative benefit metadata.
- The role title is the dominant scan target; focus, description and action remain subordinate and aligned to the shared row grid.
- The application uses native labels, inputs, select, textareas and file input semantics styled as transparent ruled fields with square geometry.
- The CV control clearly communicates accepted PDF, DOC and DOCX formats, the 3 MB maximum and the selected filename.
- Submission disables the fieldset and changes the action label while loading. Errors appear inline as an alert with a direct email recovery route. Success appears in a focused native dialog with a single Done action.
- Recruitment data language stays narrowly scoped to application review. Do not add product, culture, hiring-volume or outcome claims.

## Responsive behavior

Desktop retains the paired hero facts, wide role-row grid and paired form fields. On mobile, every composition becomes one deliberate column: headline, internship facts, role content, action, expectations and form fields. Preserve source order, full-width tap targets and readable filenames; never force the desktop row geometry into horizontal scrolling.

## Accessibility and motion

The three internship facts remain semantic definition-list content, role actions remain links, and form controls retain native required, autocomplete, input-type and file-accept behavior. Loading prevents duplicate submission; error messaging is announced; success uses a labelled dialog. Focus indicators use the active theme accent.

Only meaningful editorial sections opt into the root-level reveal. The form itself remains stable while entering data. When `prefers-reduced-motion: reduce` is active, no smooth-scroll or reveal engine initializes and all content is immediately visible in its final position.
