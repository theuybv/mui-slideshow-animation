import { FC } from "react";
import { Box, BoxProps, Fade } from "@mui/material";
import { ASPECT_RATIO } from "../utils";

export type ImageDisplayProps = {
  src?: HTMLImageElement["src"];
} & BoxProps;

export const ImageDisplay: FC<ImageDisplayProps> = ({ src, ...rest }) => {
  const aspectRatio = ASPECT_RATIO["3/2"].toString();
  return (
    <Box bgcolor={"black"} {...rest}>
      <Fade in={true} appear={true} timeout={500}>
        <img
          width={"100%"}
          height={"100%"}
          src={src}
          style={{
            objectFit: "contain",
            aspectRatio,
          }}
          loading={"lazy"}
        />
      </Fade>
    </Box>
  );
};
