# Mentro Promo Video

## Purpose
Remotion-based promotional video for the Mentro Chrome extension Chrome Web Store listing.
The rendered MP4 is uploaded to YouTube (unlisted) and linked in the CWS Developer Dashboard.

## Tech Stack
- **Remotion 4.0.290** — React-based video composition
- **TypeScript ~5.8** strict mode, `skipLibCheck: true` (required — Remotion CJS types conflict with TS 5.8 DOM types)
- **React 19**
- Output: 1920×1080, 30fps, H.264 MP4

## Project Structure
```
src/
  index.ts              # Remotion entry point (registerRoot)
  Root.tsx              # Registers MentroPromo composition (1545 frames total)
  compositions/
    MentroPromo.tsx     # Master composition — sequences all scenes
  scenes/
    IntroCard.tsx       # 3s animated logo + tagline intro
    ClipScene.tsx       # Reusable screen recording wrapper
                        #   Props: clipSrc, label, sublabel, playbackRate?, startFrom?, coverRects?
                        #   startFrom is in SECONDS (converted to frames internally)
                        #   coverRects positioned relative to 1920×1080 canvas
    PlatformCard.tsx    # 3s animated card listing 4 supported platforms
    ScreenshotShowcase.tsx  # 3 screenshots (2s each), spring zoom-in
                            #   coverRects positioned relative to the image element itself
    OutroCard.tsx       # 5s logo + CTA + platform list outro
remotion.config.ts      # Sets publicDir to ./public (required for staticFile() to resolve)
public/
  Icon.svg              # Mentro icon (used in IntroCard and OutroCard)
  clips/
    Clip1.mov           # ChatGPT — weak prompt typing → low score → red pills on hover
    Clip2.mov           # ChatGPT — strong prompt typing (35s total: 0–30s typing, 30–35s pill hover)
    Clip3.mov           # ChatGPT — metric circles hover (continuation of Clip2 session)
    Clip4a.mov          # Gemini — badge visible with score
    Clip4b.mov          # Claude — badge visible with score (has "Eli Schiffler returns!" greeting)
  screenshots/
    Shot1.png           # Badge + metric circles open on ChatGPT
    Shot2.png           # Feedback pills expanded on ChatGPT
    Shot3.png           # Badge on Claude (has "Eli Schiffler returns!" greeting — covered)
out/
  mentro-promo.mp4      # Rendered output (gitignored)
```

## Video Structure (1545 frames @ 30fps = 51.5s)
| Scene | Component | Frames | Duration | Notes |
|---|---|---|---|---|
| Intro | IntroCard | 90 | 3s | Logo spring-in + tagline fade |
| Clip 1 | ClipScene | 270 | 9s | Weak prompt, red pills |
| Clip 2a | ClipScene | 225 | 7.5s | Clip2 at 4× speed (0–30s of source) |
| Clip 2b | ClipScene | 150 | 5s | Clip2 at 1× from startFrom=30 (pill hover) |
| Clip 3 | ClipScene | 150 | 5s | Metric circles hover |
| Platform card | PlatformCard | 90 | 3s | 4 platform pills animate in |
| Clip 4a | ClipScene | 120 | 4s | Gemini badge |
| Clip 4b | ClipScene | 120 | 4s | Claude badge — CLAUDE_COVER applied |
| Screenshots | ScreenshotShowcase | 180 | 6s | 3 shots × 2s — Shot3 has CLAUDE_COVER |
| Outro | OutroCard | 150 | 5s | Logo + CTA + platform list |

## Claude Cover Rect
Claude's welcome screen shows "Eli Schiffler returns!" which must be hidden.

```ts
const CLAUDE_COVER = [
  { top: 255, left: 420, width: 1080, height: 110, color: "#1f1f1e" }
];
```

- Color `#1f1f1e` matches Claude's page background (sampled via Digital Color Meter: RGB 0.121, 0.121, 0.118)
- Applied to: Clip 4b (`ClipScene` — coords relative to 1920×1080 canvas)
- Applied to: Shot 3 (`ScreenshotShowcase` — coords relative to the image element itself, may need different values)
- NOT applied to Clips 1, 2, 3 (recorded on ChatGPT)

## Common Commands
```bash
npm install           # Install Remotion + deps
npm run start         # Open Remotion Studio at localhost:3000 (live preview)
npm run build         # Render to out/mentro-promo.mp4
npx tsc --noEmit      # Type-check only
```

## Design Language
- Background: `#0f0f13`
- Accent / labels: `#a78bfa` (purple — matches extension badge)
- Text: `#ffffff` (headings), `#e2e2ec` (body), `#8888a4` (muted)
- Font: system sans-serif (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
- Clip transitions: 15-frame fade in/out
- Card animations: spring-based (Remotion `spring()`)

## Known Tuning Points
- **Clip 2 speed**: `playbackRate={4}` on Clip 2a. Adjust if typing looks too fast/slow.
- **Claude cover rect position**: The `top/left/width/height` values are estimates. Fine-tune by scrubbing to Clip 4b and Shot 3 in Remotion Studio.
- **Shot 3 cover rect**: Positioned relative to the image element (not the canvas), so coordinates will differ from the clip cover rect.

## After Rendering
1. Upload `out/mentro-promo.mp4` to YouTube as **Unlisted**
2. Copy the YouTube URL
3. Paste into Chrome Web Store Developer Dashboard → Store listing → Promotional video
