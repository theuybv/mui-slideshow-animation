import { forwardRef } from "react";
import { Box, BoxProps, ButtonBase, ButtonBaseProps } from "@mui/material";
import { ASPECT_RATIOS } from "../utils";

export type ImageThumbProps = {
  src: HTMLImageElement["src"];
  width: HTMLImageElement["width"];
  onClick: ButtonBaseProps["onClick"];
} & Omit<BoxProps, "width" | "onClick">;

export const ImageThumb = forwardRef<HTMLElement, ImageThumbProps>(
  ({ width, src, onClick, tabIndex, ...rest }, ref) => {
    const aspectRatio = ASPECT_RATIOS["4/3"];
    return (
      <Box
        width={width}
        height={width / aspectRatio}
        ref={ref}
        style={{
          aspectRatio: aspectRatio.toString(),
        }}
        {...rest}
      >
        <ButtonBase onClick={onClick} focusRipple={true} tabIndex={tabIndex}>
          <img
            width={"100%"}
            height={"100%"}
            src={src}
            style={{
              objectFit: "cover",
              aspectRatio: aspectRatio.toString(),
            }}
            loading={"lazy"}
          />
        </ButtonBase>
      </Box>
    );
  }
);
