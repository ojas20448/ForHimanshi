---
name: ui-ux-pro-max
description: Master-level UI/UX design system, visual aesthetics, glassmorphism, micro-animations, color palette curation, responsive layout engineering, accessibility (WCAG), and modern typography. Activate when designing or building user interfaces, visual components, landing pages, or web apps to deliver a WOW-factor user experience.
---

# UI/UX Pro Max Skill: Design Systems & Aesthetic Excellence

The `ui-ux-pro-max` skill guarantees state-of-the-art web application design, rich visual aesthetics, fluid responsiveness, accessible typography, and delightful interactive micro-animations—incorporating the official Anthropic Frontend Design & UI.sh principles.

---

## 1. Studio-Grade Design Principles

### A. The Hero is a Thesis
- **Distinctive Point of View**: Make deliberate, opinionated choices about palette, typography, and layout specific to the brief.
- **Avoid AI Clichés & Generic Templates**: Avoid default looks (e.g. generic #F4F1EA cream + serif + terracotta, generic near-black + acid green, or plain broadsheet tables) unless explicitly requested.
- **Signature Element**: Create one memorable signature visual moment (e.g. ambient gradient mesh overlay, interactive hero canvas, or glassmorphic floating header) that anchors the brand identity.

### B. Rich Curated Color Palettes & Glassmorphism
- **Curated Palette**: Use 4-6 named color tokens tailored to the brand domain (e.g., Rose `#E0C7CD`, Sage `#2F5730`, Warm Cream `#FCFBF9`, Slate Dark).
- **Depth & Blur Layering**: Layer `backdrop-blur-md` / `backdrop-blur-lg` with subtle translucent borders (`border-white/60` or `border-primary/10`) and multi-stage box shadows (`shadow-premium`).

### C. Purposeful Motion & Micro-Animations
- **Framer Motion & Micro-interactions**: Smooth page-load entrances (`initial={{ opacity: 0, y: 20 }}` -> `animate={{ opacity: 1, y: 0 }}`), dynamic hover lifts (`whileHover={{ scale: 1.02, y: -4 }}`), and active click dynamics (`whileTap={{ scale: 0.98 }}`).
- **Restraint & Orchestration**: Ensure motion serves the content rather than cluttering it.

---

## 2. Layout & Accessibility Engineering

- **Responsive Container Math**: Flex & Grid layouts (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`), container constraints (`max-w-7xl mx-auto px-4 md:px-6`).
- **Typography Pairings**: Pair characterful display faces with legible body faces (e.g., Cormorant Garamond / Lora with Poppins / Inter). Use `text-wrap: balance` on headings.
- **Accessibility & Touch Standards**:
  - Touch targets minimum $44\text{px} \times 44\text{px}$.
  - Visible focus rings (`:focus-visible`).
  - High contrast ratio compliance (WCAG AA).
  - Semantic HTML5 structure (`<header>`, `<main>`, `<section>`, `<footer>`).

---

## 3. Component Quality Checklist

- [ ] **Sticky/Glass Navigation**: Responsive mobile menu drawer, clean CTA buttons, and ambient blur.
- [ ] **Hero Showcase**: High-impact typography, crisp value proposition, primary/secondary action buttons, and trust badges.
- [ ] **Interactive Cards**: Smooth hover border transitions, rounded corners (`rounded-2xl` / `rounded-[2rem]`), and shadow elevations.
- [ ] **Form Ergonomics**: Label clarity, focus highlights, real-time validation, and accessible feedback toasts.
