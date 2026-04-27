import "./index.css";
import { Composition } from "remotion";
import { CodizzzVideo } from "./CodizzzVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CodizzzVideo"
        component={CodizzzVideo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
