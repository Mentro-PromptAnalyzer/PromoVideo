import { AbsoluteFill, Series } from "remotion";
import { IntroCard } from "../scenes/IntroCard";
import { ClipScene } from "../scenes/ClipScene";
import { PlatformCard } from "../scenes/PlatformCard";
import { ScreenshotShowcase } from "../scenes/ScreenshotShowcase";
import { OutroCard } from "../scenes/OutroCard";

// ---------------------------------------------------------------------------
// Clip 2 strategy:
//   - The clip is ~35s total. Typing takes 0–30s, hover/pills in the last ~5s.
//   - We play the first 25s at 4× speed (= ~7.5s = 225 frames) to show
//     the score climbing as text is typed.
//   - Then we continue from second 25 at 1× speed for 8s (240 frames) to
//     show the hover and pills clearly.
//   - Total Clip 2 screen time: ~15s (465 frames).
// ---------------------------------------------------------------------------

// Claude's page background — sampled via Digital Color Meter: RGB 0.121, 0.121, 0.118 → #1f1f1e
// Cover rect hides the "Eli Schiffler returns!" greeting centered on screen.
const CLAUDE_COVER = [
  {
    top: 255,
    left: 420,
    width: 1080,
    height: 110,
    color: "#1f1f1e",
  },
];

export const MentroPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0f0f13" }}>
      <Series>
        {/* Intro: logo + tagline — 3s */}
        <Series.Sequence durationInFrames={90}>
          <IntroCard />
        </Series.Sequence>

        {/* Clip 1: weak prompt, low score, red pills — 9s */}
        <Series.Sequence durationInFrames={270}>
          <ClipScene
            clipSrc="clips/Clip1.mov"
            label="Type a prompt..."
            sublabel="Mentro scores it instantly"
          />
        </Series.Sequence>

        {/* Clip 2a: fast-forward through typing (0–25s at 4×) — ~7.5s */}
        <Series.Sequence durationInFrames={225}>
          <ClipScene
            clipSrc="clips/Clip2.mov"
            label="Add context and detail..."
            sublabel="Watch your score climb"
            playbackRate={4}
            startFrom={0}
          />
        </Series.Sequence>

        {/* Clip 2b: normal speed from second 30 — show hover + pills — 5s */}
        <Series.Sequence durationInFrames={150}>
          <ClipScene
            clipSrc="clips/Clip2.mov"
            label="Hover to see suggestions"
            sublabel="Actionable tips, right when you need them"
            playbackRate={1}
            startFrom={30}
          />
        </Series.Sequence>

        {/* Clip 3: metric circles hover — 5s */}
        <Series.Sequence durationInFrames={150}>
          <ClipScene
            clipSrc="clips/Clip3.mov"
            label="4 dimensions scored"
            sublabel="Ownership · Depth · Critical · Clarity"
          />
        </Series.Sequence>

        {/* Platform card — 3s */}
        <Series.Sequence durationInFrames={90}>
          <PlatformCard />
        </Series.Sequence>

        {/* Clip 4a: Gemini — 4s */}
        <Series.Sequence durationInFrames={120}>
          <ClipScene
            clipSrc="clips/Clip4a.mov"
            label="Works on Gemini"
            sublabel=""
          />
        </Series.Sequence>

        {/* Clip 4b: Claude — 4s, greeting covered */}
        <Series.Sequence durationInFrames={120}>
          <ClipScene
            clipSrc="clips/Clip4b.mov"
            label="Works on Claude"
            sublabel=""
            coverRects={CLAUDE_COVER}
          />
        </Series.Sequence>

        {/* Screenshot showcase — 3 shots, 2s each */}
        <Series.Sequence durationInFrames={180}>
          <ScreenshotShowcase />
        </Series.Sequence>

        {/* Outro: logo + CTA — 5s */}
        <Series.Sequence durationInFrames={150}>
          <OutroCard />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
