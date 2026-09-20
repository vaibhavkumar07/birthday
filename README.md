# Har janam, tum.

A cinematic Hinglish birthday experience for Pragya, September 22, 2026.

Built with React, TypeScript, Motion for React, and the Sites Vinext/Vite starter. The photo constellation uses CSS perspective and Motion transforms; the celebration uses a lightweight Canvas particle system. No database or WebGL is needed.

## Run locally

```sh
npm install
npm run dev
```

## Validate and build

```sh
npx tsc --noEmit
npm run build
```

Edit `app/content.ts` for the three photo notes and the personal letter. The experience is composed in `app/page.tsx`. The isolated audio, photo-film, and fireworks components live in `app/components/`.

## Media

`public/images/together`, `pragya`, and `vaibhav` are user-supplied photographs. JPEG originals are retained alongside optimized WebP copies. `sunset.webp` is an AI-assisted cinematic extension of the couple photograph; `moonlight.webp` is generated scenery. Production uses the original couple photo on phones to keep both faces visible.

The film is a 24-second interactive browser photo sequence, not an MP4 or generated live-action video. Sound is an original synthesized ambient melody activated only by the sound button. It stops when the browser is hidden. Replay and a downloadable postcard are included in the birthday finale.

There is no date lock. Search indexing is discouraged with metadata; privacy must be enforced by hosting access settings. The initial hosted version is owner-private.
