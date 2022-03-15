import { FC } from "react";
import { Box, BoxProps, Fade } from "@mui/material";
import { ASPECT_RATIO } from "../utils";

export type ImageDisplayProps = {
  src?: HTMLImageElement["src"];
} & BoxProps;

export const ImageDisplay: FC<ImageDisplayProps> = ({ src, ...rest }) => {
  return (
    <Box
      bgcolor={"black"}
      style={{ aspectRatio: ASPECT_RATIO["3/2"].toString() }}
      {...rest}
    >
      <Fade in={true} appear={true} timeout={500}>
        <img
          width={"100%"}
          height={"100%"}
          src={src}
          style={{
            objectFit: "contain",
            aspectRatio: ASPECT_RATIO["3/2"].toString(),
          }}
          loading={"lazy"}
        />
      </Fade>
    </Box>
  );
};
