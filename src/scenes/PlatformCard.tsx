import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const PLATFORMS = ["ChatGPT", "Gemini", "Perplexity", "Claude"];

export const PlatformCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #1a1030 0%, #0f0f13 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 42,
          fontWeight: 700,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          color: "#e2e2ec",
          letterSpacing: "-0.5px",
        }}
      >
        Works on every major AI platform
      </div>

      <div style={{ display: "flex", gap: 32 }}>
        {PLATFORMS.map((name, i) => {
          const itemSpring = spring({
            fps,
            frame: frame - i * 8,
            config: { damping: 14, stiffness: 140, mass: 0.7 },
            durationInFrames: 30,
          });

          return (
            <div
              key={name}
              style={{
                transform: `scale(${itemSpring}) translateY(${interpolate(itemSpring, [0, 1], [30, 0])}px)`,
                background: "rgba(167,139,250,0.08)",
                border: "1px solid rgba(167,139,250,0.25)",
                borderRadius: 16,
                padding: "20px 36px",
                fontSize: 28,
                fontWeight: 600,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                color: "#e2e2ec",
              }}
            >
              {name}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
