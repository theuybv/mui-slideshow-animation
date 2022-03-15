import { forwardRef } from "react";
import { Box, BoxProps } from "@mui/material";
import { ASPECT_RATIO } from "../utils";

export type ImageThumbProps = {
  src: HTMLImageElement["src"];
  width: HTMLImageElement["width"];
} & Omit<BoxProps, "width">;

export const ImageThumb = forwardRef<HTMLElement, ImageThumbProps>(
  ({ width, src, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        style={{ aspectRatio: ASPECT_RATIO["4/3"].toString() }}
        {...rest}
      >
        <img
          width={width}
          height={"100%"}
          src={src}
          style={{
            objectFit: "cover",
            aspectRatio: ASPECT_RATIO["4/3"].toString(),
          }}
          loading={"lazy"}
        />
      </Box>
    );
  }
);
