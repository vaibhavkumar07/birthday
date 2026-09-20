# Pragya birthday experience implementation plan

**Goal:** Build the approved Hinglish birthday journey with real photos, generated scenery, 3D photo motion and a repeatable fireworks finale.
**Architecture:** React client experience in the Sites Vinext/Vite starter, typed content, isolated canvas effects and audio. Static content needs no database. Preserve the approved visual concept while keeping HTML text and controls accessible.
**Spec:** docs/superpowers/specs/2026-09-20-pragya-birthday.md
**Global constraints:** Pragya; Hinglish; September 22, 2026; preserve original photos; no invented memories; no date lock; sound opt-in; reduced-motion support.

- [x] Scaffold project and implement the sunset opening with real photo, birthday metadata, and favicon.
- [x] Add Motion dependency, typed memory content and gallery. Previous/next controls and touch drag change selected photo; opening a photo uses a native modal dialog and restores focus when closed.
- [x] Add the letter, optional synthesized ambient sound, and a 24-second browser film with play/pause and replay. Pause on close and hide.
- [x] Generate and integrate a faithful extended sunset hero and an empty moonlit ocean; optimize as WebP while retaining originals.
- [x] Implement wish button and Canvas fireworks with a bounded animation lifecycle; replay restarts it, reduced motion shows a still celebratory result.
- [x] Verify TypeScript/build, desktop and mobile layouts, image loading, photo dialog keyboard behavior, sound toggle, film controls and repeated wish. Publication follows these successful local checks; deployment status is tracked by Sites.

Files: app/page.tsx owns story composition and interactions; app/globals.css owns responsive visual design; app/content.ts owns editable copy; app/components/Fireworks.tsx owns canvas particles; app/components/Ambience.tsx owns opt-in Web Audio; app/components/MemoryFilm.tsx owns the browser-film sequence; public/images holds photographic assets. No additional pages or persistence.
