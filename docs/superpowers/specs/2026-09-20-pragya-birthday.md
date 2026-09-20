# Every lifetime, you.

Birthday website proposal · September 22, 2026

Recipient: Pragya. Confirmed language: Hinglish. Working title: “Har janam, tum.” The English visual concept title is an art-direction placeholder; production copy will use the personalized text below.

Personalized opening: “Pragya, tumhare saath har pal meri favourite kahaani hai.”

Invitation: “Tumhare liye ek chhoti si duniya banayi hai. Chalo?” Button: “Chalo, shuru karein.”

Letter draft: “Pragya, tumhare saath ordinary days bhi special lagte hain. Aaj tumhara birthday hai, aur main bas tumhe yaad dilana chahta hoon ki tum mere liye kitni special ho. Meri wish hai ki aane wala saal tumhare liye bahut saari khushiyaan laaye, aur hum saath mein aur khoobsurat yaadein banayein. Happy birthday, meri jaan.” This is proposed copy for review, not a claim about specific shared events.

Wish: “Aankhein band karo, ek wish maango.” Button: “Meri wish ready hai.” Finale: “Happy birthday, Pragya! Har janam, tum.”

Status: design proposal, not an implemented or deployed website. The generated visual is a concept. Video below is a storyboard, not a rendered film.

## Creative direction

A personal, three-to-five-minute journey from the sunset in your real photograph into a midnight birthday celebration. The signature interaction: three floating photographs become a constellation; touching its brightest star opens your letter. The final wish sends that constellation across the sky as fireworks.

Three possible directions:
- Recommended: Every lifetime, you. An ocean-at-dusk cinematic journey, grounded in the supplied sunset photograph. Strong emotional narrative with manageable mobile performance.
- A museum of us. An editorial gallery of framed memories and handwritten notes. Easier to navigate, less cinematic.
- A tiny universe for you. A fully 3D explorable star world. Playful, but adds loading time and navigation complexity on phones.

## Story and screens

1. Invitation. A small glowing seal over the sunset: “I made a little world for you.” Tap “Open your surprise.” Offer sound on or silent entry. No forced audio or microphone permission.
2. Golden hour. Reveal the real couple photograph with a slow camera-like scale and restrained foreground particles. Title: “Every lifetime, you.” Subtitle: “My favourite place is beside you.”
3. Our constellation. Three photographs float at different depths. Drag or use previous/next controls to focus a frame. Tap opens a short personal message. Use the three actual photos as three deliberate chapters; do not pretend there are more memories than supplied.
4. A letter from me. Husband’s portrait introduces an unfolding letter, followed by a spacious, readable message. An optional supplied voice recording can accompany it; no fabricated voice.
5. Make a wish. A candle responds to “Make my wish.” A short hold gesture is optional, with an ordinary accessible button equivalent. Flame becomes a star, rises, and triggers gold and blush fireworks. Birthday greeting uses her confirmed nickname.
6. Stay a little longer. Couple photograph returns beneath the night sky. Replay the celebration, reread the letter, or save a birthday postcard. Add a future-date invitation only once its real content is supplied.

## Visual system

- Midnight plum: #211526, night backgrounds.
- Dusk rose: #D6A1AD, atmosphere and small accents.
- Champagne: #E9C690, constellation and fireworks.
- Warm ivory: #FFF5E9, primary text.
- Sea blue: #667F91, photo-derived secondary atmosphere.
- Typography proposal: Cormorant Garamond for cinematic titles; a restrained sans-serif such as Manrope for controls and reading text. Self-host licensed font files.
- Large photographs, asymmetric framing, generous space. Centered titles for reveal moments; left-aligned long-form letter. No standard marketing navigation, feature grid, or pricing-style cards.
- Phone: one photograph in focus, large tap areas, content inside safe-area insets. Desktop: perspective gallery with modest pointer tilt.

## Photo and media plan

Supplied couple sunset photo: main opening and closing image. Preserve original faces and expressions. Use a separate background layer or cinematic framing when additional landscape width is needed; never stretch people.

Supplied wife portrait in green: her own hero moment within the constellation. Respect portrait framing; a cropped preview should still open the complete photograph.

Supplied husband portrait: introduce the personal letter or voice message.

Generated assets: website concept board first. During production, optionally generate an empty dusk-to-night seascape and transparent atmospheric overlays. Any imagined couple portraits belong in an explicitly dreamlike chapter, not among real memories. Retain originals separately.

## Film storyboard: 24 seconds

0–4 s: sunset horizon, ambient ocean, slow reveal of “Some moments become home.”
4–10 s: real couple photograph, gentle 4–6% camera push; separate light particles create depth without animating faces.
10–15 s: dissolve to wife’s portrait; “And then there is you.”
15–19 s: her portrait recedes into a gold-edged frame; points of light connect to the couple photograph.
19–24 s: transition to midnight ocean, controlled fireworks, “Happy birthday, my love. September 22.”

Deliverables planned: landscape 1920×1080 and portrait 1080×1920 MP4, poster image, and silent version. No video-generation tool is available in this session. The initial website can reproduce the camera moves and transitions in the browser; exporting a motion-photo film is a separate production step. AI image-to-video would need an available service and review for facial consistency. Music must be supplied with usable rights or sourced with an appropriate licence.

## Architecture

React + TypeScript + Vite for a small static application. Motion for React (Framer Motion) handles chapter transitions, scroll-linked transforms, drag gestures, letter opening and CSS perspective. A lazily loaded React Three Fiber / Three.js scene handles the constellation and finale where true spatial depth adds value. Text and navigation remain ordinary HTML.

App → Experience controller → Invitation / GoldenHour / Constellation / Letter / Wish / Closing

Shared layers: MediaLoader, AudioController, MotionPreferences, SceneFallback, ReplayControls.

A typed content file contains names, copy, photo paths, captions, birthday display date and optional audio. The application reads this file and loads optimized local assets; no account system or database is necessary. Session state tracks current chapter and sound preference. A replay action resets animations and fireworks cleanly.

Prefer an immediately available surprise over a date lock. If a midnight unlock is requested, first confirm her timezone; enforce any real restriction at the server, not solely with the visitor's clock. No-index metadata discourages search indexing but is not access control. If privacy protection is wanted, use host-level authentication and protect the media too.

Motion technical references:
- https://motion.dev/docs/react-use-scroll
- https://motion.dev/docs/react-use-transform
- https://www.motion.dev/docs/react-motion-config
- https://r3f.docs.pmnd.rs/advanced/scaling-performance

## Build sequence and acceptance

1. Personalize: confirm nickname, language, a short letter or three personal details, birthday timezone if scheduling matters, and optional music/voice note.
2. Prepare assets: retain original photos, make responsive optimized copies, create poster frames and any selected generated backdrops.
3. Build the complete readable experience and mobile layout; add a content file and visible sound/replay controls.
4. Add Motion transitions, perspective photo frames, then the optional 3D scene and wish-triggered fireworks.
5. Review on phone and desktop. Verify keyboard navigation, touch gestures, sound after deliberate activation, missing-image fallback, reduced-motion view, WebGL failure fallback, and repeatable finale.
6. Prepare a shareable deployment and check the actual shared URL on a phone before handing it over.

Performance targets to measure during production: readable opening within about 2.5 seconds on representative mobile connectivity; first-view assets around 1.5 MB or less; lazy-load heavy scenes and any video; cap particle count and pixel density on mobile. These are targets, not measured results. Avoid excessive flashes and remove camera travel in reduced-motion mode. Keep a static illustrated fallback if WebGL is unavailable.

## Personalization still needed

Confirmed: Pragya; Hinglish. Still optional: a few true details or a letter; favourite song/voice recording; and birthday timezone only if a timed reveal is desired. Draft affectionate copy is provided above, but dates and shared memories should not be invented.
