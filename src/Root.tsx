import { Composition } from "remotion";
import { MentroPromo } from "./compositions/MentroPromo";

// Total duration: ~47s @ 30fps = 1410 frames
// Breakdown:
//   0–90    Intro card (3s)
//   90–360  Clip1: weak prompt + pills (9s)
//   360–390 Transition (1s)
//   390–660 Clip2+3: strong prompt typing + metric circles (9s)
//   660–750 Platform card (3s)
//   750–990 Screenshot showcase (8s)
//   990–1140 Outro card (5s)

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MentroPromo"
        component={MentroPromo}
        durationInFrames={1545}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
