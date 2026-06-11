import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const OutroCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoSpring = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
    durationInFrames: 35,
  });

  const ctaOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaY = interpolate(frame, [35, 55], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtextOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out entire card at the very end
  const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeOut,
        background: "radial-gradient(ellipse at 50% 40%, #1e1230 0%, #0f0f13 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}
    >
      {/* Logo + name */}
      <div
        style={{
          transform: `scale(${logoSpring})`,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Img
          src={staticFile("Icon.svg")}
          style={{ width: 64, height: 64, borderRadius: 14 }}
        />
        <span
          style={{
            fontSize: 64,
            fontWeight: 800,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            color: "#ffffff",
            letterSpacing: "-1px",
          }}
        >
          Mentro
        </span>
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          fontSize: 38,
          fontWeight: 700,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          color: "#a78bfa",
        }}
      >
        Install free on the Chrome Web Store
      </div>

      {/* Subtext */}
      <div
        style={{
          opacity: subtextOpacity,
          fontSize: 24,
          fontWeight: 400,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          color: "#8888a4",
        }}
      >
        ChatGPT · Gemini · Perplexity · Claude
      </div>
    </AbsoluteFill>
  );
};
