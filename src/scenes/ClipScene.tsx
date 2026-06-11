import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface CoverRect {
  /** px from top of the 1920×1080 canvas */
  top: number;
  /** px from left of the 1920×1080 canvas */
  left: number;
  width: number;
  height: number;
  /** fill color — defaults to Claude dark bg #1a1a1a */
  color?: string;
}

interface ClipSceneProps {
  clipSrc: string;
  label: string;
  sublabel: string;
  /** Playback speed multiplier. Default 1. */
  playbackRate?: number;
  /**
   * Start offset in SECONDS into the source video.
   * Combined with playbackRate to skip boring parts.
   * e.g. startFrom=25 skips the first 25s of the clip.
   */
  startFrom?: number;
  /** Rectangles painted over the video to hide private info. */
  coverRects?: CoverRect[];
}

export const ClipScene: React.FC<ClipSceneProps> = ({
  clipSrc,
  label,
  sublabel,
  playbackRate = 1,
  startFrom = 0,
  coverRects = [],
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  const labelY = interpolate(frame, [0, 20], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // startFrom in seconds → frames offset fed to OffthreadVideo
  const startFromFrame = Math.round(startFrom * 30);

  return (
    <AbsoluteFill style={{ opacity, background: "#0f0f13" }}>
      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile(clipSrc)}
          playbackRate={playbackRate}
          startFrom={startFromFrame}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </AbsoluteFill>

      {/* Cover rects — painted over video to hide usernames etc */}
      {coverRects.map((rect, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            // Default to Claude's actual page background color
            background: rect.color ?? "#1a1a1a",
          }}
        />
      ))}

      {/* Bottom gradient for label legibility */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to top, rgba(15,15,19,0.85) 0%, rgba(15,15,19,0) 35%)",
          pointerEvents: "none",
        }}
      />

      {label && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            transform: `translateY(${labelY}px)`,
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              color: "#ffffff",
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            {label}
          </span>
          {sublabel && (
            <span
              style={{
                fontSize: 22,
                fontWeight: 400,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                color: "#a78bfa",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              {sublabel}
            </span>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
