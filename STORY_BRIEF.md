# LEVEL UP: Story Brief for the Landing Website

READ THIS FILE FIRST. Then produce an implementation-plan Artifact and wait for approval before coding.

## 1. The one-line concept
A nutrition-RPG fitness app for Indian lifters. The website tells the story of ONE person going from a weak E-rank body to an S-rank Hunter, and the visitor lives that story while scrolling. They are not reading a brochure; they are being "awakened".

## 2. The story arc (scroll = time)
The page is a short film in 9 chapters. The COLOR TEMPERATURE tells the story:

| Phase | Chapters | Color grade | Feeling |
|---|---|---|---|
| Weak | 1-2 | cold desaturated blue (#0B1A33, cyan #38BDF8 accents) | lonely, small, doubt |
| Awakening | 3-5 | blue slowly warming into violet | effort, routine, discipline |
| Power | 6-8 | deep purple #8B5CF6 + glow #A78BFA | strength, aura |
| Ascension | 9 | purple + gold #F5C542 (gold ONLY for rank/reward) | S-rank, arrival |

Base: background #07060D, panels #120F24 at 70% opacity, 1px neon border, corner brackets, text #EDE9FE. Fonts: Rajdhani/Orbitron headings (uppercase, wide tracking), Inter body.
Animate the grade itself: as the user scrolls, tween CSS variables (--accent, --bg-tint) from blue to purple to gold. One system, no hard cuts.

## 3. Chapters, assets and motion
All paths are under `/public/assets/`. Use next/image.

### Intro: SYSTEM NOTICE (overlay)
- Asset: `02-system/system-grin.webp`
- Full-screen dark overlay, grin appears behind the notice box with a glitch/RGB-split flicker. Text: "A SYSTEM HAS BEEN ASSIGNED TO YOU. ACCEPT?" [YES] [NO]. NO shakes the box and re-asks (playful). YES: glitch, fade into the site. Store choice in sessionStorage with try/catch.

### Ch1: "THIS IS YOU. RANK E."
- Asset: `01-weak/weak-hunter.webp`, background texture `03-gym/gym-abandoned.webp` at 15% opacity, slow parallax.
- Cold blue, desaturated, vignette. Weak hunter centered, small in frame, lots of empty dark space (emptiness = weakness). Subtle dust particles. As user scrolls, the vignette closes in and the headline fades.

### Ch2: "THE SYSTEM CHOSE YOU"
- Asset: `02-system/weak-meets-system.webp`
- Pinned. On scroll the huge grin scales in slowly from behind the boy, red eyes pulse. Then a System window builds in HTML (not an image): typewriter "DAILY QUEST HAS ARRIVED", quest rows slide in (protein 150g, 3 meals logged, 10k steps), XP and HP bars fill. This is where the app is first explained.

### Ch3: "THE GYM IS YOUR DUNGEON"
- Assets, in this order: `03-gym/gym-abandoned.webp` -> `gym-wide-day.webp` -> `gym-bright-tall.webp` -> `gym-neon.webp`; `gym-dumbbells.webp` as a parallax divider texture.
- Pinned scrubbed crossfade: the gym "gets cleared" from ruined and grey to bright to neon-lit. Color grade shifts blue to violet along the way. Caption counter: DUNGEON CLEARED 1/4 ... 4/4.
- Mobile: no pin. Each image full-width, sticky captions, scale-in on scroll.

### Ch4: "DISCIPLINE BEATS MOTIVATION"
- Assets: `04-discipline/mentor-milk-basics.webp` (boring basics build monsters: "Carry the milk. Every day."), `train-handstand.webp` (extreme effort), `mentor-suit-rain.webp` and `mentor-rooftop-rain.webp` (the Coach / mentor figure).
- Horizontal pinned scroll (desktop), 3 cards. The mentor cards introduce THE AI COACH: "A coach that gives you numbers, not speeches." Mobile = vertical cards.

### Ch5: "FOOD IS YOUR WEAPON" (core USP: nutrition)
- Assets: everything in `05-nutrition/`.
- Hero: `needs-carbs.webp` big ("Not just protein"). Around it, food images float at different parallax speeds. On hover/tap each food card shows a glowing macro badge (e.g. "38g PROTEIN") with count-up. `food-chicken-roti-sticker.webp` and `protein-mascot.webp` behave like stickers: slight rotation, bounce on hover. Frame every photo in a System window.
- IMPORTANT: these images come from different styles. Unify them with the same overlay: `linear-gradient(to top, rgba(7,6,13,.55), transparent)` + a faint purple `mix-blend-mode: soft-light` layer + 1px violet border. Never show them raw next to each other.
- Add an "Indian food" row (dal, paneer, misal, poha). Only chaat and chicken-roti exist now; list the missing ones in the README.

### Ch6: "THE ENEMIES"
- Assets: `06-enemies/chained-distraction.webp`, `recovery-tank.webp`, `rage-mindset.webp`, `peak-physique-back.webp`.
- Chained hero = Distraction. Scroll scrubs the chains: image shakes (small x jitter), then flashes white at the "break" point; labels pop: JUNK FOOD / SKIPPED DAYS / NO SLEEP. Message: "Miss a day and your streak breaks."
- Then `recovery-tank.webp`: blue glow, rising bubble particles. "RECOVERY IS A QUEST TOO" (sleep, rest day XP).
- `rage-mindset.webp` = streak 30+ "Rage Mode". `peak-physique-back.webp` revealed through a clip-path/mask wipe: "THE BODY YOU ARE BUILDING."

### Ch7: "RANK UP" (the signature section)
- Assets: `07-ranks/rank-e-d-alone.webp` -> `rank-a-aura.webp` -> `rank-s-max.webp`. Reference only: `_reference-only/rank-badges-ref.webp`.
- Sticky character on the left or center. As the user scrolls, E to S letters step up on the right with a gold badge and XP bar filling; the image crossfades: ALONE (cold blue, rooftop) -> AURA (shadows awakening) -> MAX (full violet power). Color grade follows. Rank badges E-D-C-B-A-S: build as inline SVG (hexagon + letter + glow), original design.

### Ch8: "YOUR AI COACH" + APP SCREENS
- Chat bubbles type in System style on scroll. Phone mockup (use the assets in `/public/assets/app/`, see README) slides in with parallax. Features row: Food Grimoire, Daily Quests, Recipes, Gym Map.

### Ch9: "ARISE."
- Asset: `07-ranks/rank-s-max.webp` full-screen, slow violet lightning pulse, gold "ARISE." Big glowing CTA + waitlist email + store badges. This is the emotional payoff of the cold-blue-to-gold journey.

### Skins strip (before the CTA)
- 3D tilt cards (hover desktop, tap/gyro mobile) for unlockable themes. `08-skins/skin-saiyan-red-ref.webp` is a placeholder; see copyright note.

## 4. Responsive and sync rules
- Mobile-first, test 390 / 768 / 1440. Same story and same order on every device; only the layout adapts.
- Desktop pins/horizontal scroll; mobile uses vertical stacks with slide/scale-in. No sideways page scroll.
- 100svh not 100vh, clamp() for type and spacing, touch targets 44px+.
- Heavy effects (particles, multi-layer parallax) reduced on mobile; animate transform/opacity only; keep 60fps.
- Lenis smooth scroll + GSAP ScrollTrigger (lenis.on('scroll', ScrollTrigger.update)). Framer Motion for hover/tilt. Respect prefers-reduced-motion.
- Many source images have DARK backgrounds. Use `mix-blend-mode: screen` or soft edge masks (radial-gradient mask-image) so they melt into the page instead of looking like rectangles.
- Keep every duration/ease/scroll-length in `src/config/motion.ts`.

## 5. Image notes (quality issues to handle)
- Watermarks present: `food-chicken-plate` (corner AI watermark), `gym-neon` (top-left watermark), `food-rice-beans` (mug text). Crop them out with object-position/overflow clipping in the layout.
- `_reference-only/` files are for design reference, NOT to ship: `status-ui-ref` (screenshot of someone else's UI), `rank-badges-ref` (another game's badges), `creatine-jar-tiny` (236px, too small).
- Low-res: `mentor-milk-basics` is an anime screenshot; use small and with grain.
- Cutouts (transparent background) still needed for a premium hero: weak-hunter, rank-s-max, rank-a-aura. Until then use gradient masks.

## 6. Copyright note (IMPORTANT)
Most of these images show characters from existing franchises (Solo Leveling, Dragon Ball, Naruto-style mentor, Baki-style physique) and a game's rank badges. That is fine for a private mood board and local prototype. Do NOT publish them on a public site or the store. Before launch, replace them with original art in the same composition (original hunter, original mentor, original badges). Build the layout so every image is a swappable file path.

## 7. Missing assets (generate a tasteful placeholder for each and list in README.md)
- `app/screen-food.webp`, `screen-quests.webp`, `screen-coach.webp`, `screen-recipes.webp`, `screen-map.webp` (export from Stitch)
- Indian foods: dal, paneer, misal, poha
- `ranks/badge-e.svg` to `badge-s.svg`
- Transparent hunter cutouts, particles/grain texture

## 8. Definition of done
Open the site at 390px and 1440px, scroll every chapter, fix jank/overflow/overlap, and show screenshots as Artifacts. Then wait for my feedback; I will tune one chapter at a time.
