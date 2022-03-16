import { forwardRef } from "react";
import { Box, BoxProps } from "@mui/material";
import { ASPECT_RATIO } from "../utils";

export type ImageThumbProps = {
  src: HTMLImageElement["src"];
  width: HTMLImageElement["width"];
} & Omit<BoxProps, "width">;

export const ImageThumb = forwardRef<HTMLElement, ImageThumbProps>(
  ({ width, src, ...rest }, ref) => {
    const aspectRatio = ASPECT_RATIO["4/3"].toString();
    return (
      <Box
        width={width}
        height={width / ASPECT_RATIO["4/3"]}
        ref={ref}
        style={{
          aspectRatio,
        }}
        {...rest}
      >
        <img
          width={"100%"}
          height={"100%"}
          src={src}
          style={{
            objectFit: "cover",
            aspectRatio,
          }}
          loading={"lazy"}
        />
      </Box>
    );
  }
);
