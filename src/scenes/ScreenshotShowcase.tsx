import {
  AbsoluteFill,
  Img,
  Series,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface CoverRect {
  top: number;
  left: number;
  width: number;
  height: number;
  color?: string;
}

interface ShotConfig {
  src: string;
  caption: string;
  coverRects?: CoverRect[];
}

const SHOTS: ShotConfig[] = [
  {
    src: "screenshots/Shot1.png",
    caption: "Live score badge + metric circles",
  },
  {
    src: "screenshots/Shot2.png",
    caption: "Actionable feedback pills on hover",
  },
  {
    src: "screenshots/Shot3.png",
    caption: "Consistent across platforms",
    // Shot3 is on Claude — cover the "Eli Schiffler returns!" greeting.
    // The screenshot is displayed scaled inside a max-width:1400 container.
    // These coords target the greeting in the center of the image.
    coverRects: [
      { top: 255, left: 420, width: 1080, height: 110, color: "#1f1f1e" },
    ],
  },
];

const SingleShot: React.FC<ShotConfig> = ({ src, caption, coverRects = [] }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 100, mass: 1 },
    durationInFrames: 25,
    from: 0.92,
    to: 1,
  });

  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionY = interpolate(frame, [10, 28], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(opacity, fadeOut),
        background: "#0f0f13",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}
    >
      {/* Screenshot + cover rects in a relative container */}
      <div
        style={{
          position: "relative",
          transform: `scale(${scale})`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 0 80px rgba(167,139,250,0.18), 0 24px 64px rgba(0,0,0,0.6)",
          maxWidth: 1400,
          maxHeight: 820,
        }}
      >
        <Img src={staticFile(src)} style={{ width: "100%", display: "block" }} />

        {/* Paint cover rects over the image */}
        {coverRects.map((rect, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              background: rect.color ?? "#1f1f1e",
            }}
          />
        ))}
      </div>

      {/* Caption */}
      <div
        style={{
          transform: `translateY(${captionY}px)`,
          fontSize: 28,
          fontWeight: 500,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          color: "#a78bfa",
        }}
      >
        {caption}
      </div>
    </AbsoluteFill>
  );
};

export const ScreenshotShowcase: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        {SHOTS.map((shot) => (
          <Series.Sequence key={shot.src} durationInFrames={60}>
            <SingleShot {...shot} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
