import { FC } from "react";
import { Box, Fade } from "@mui/material";

export type ImageDisplayProps = Partial<
  Pick<HTMLImageElement, "src" | "alt" | "height">
> & {
  width?: number | string;
};

export const ImageDisplay: FC<ImageDisplayProps> = ({
  children,
  height,
  width,
  ...rest
}) => {
  return (
    <Box bgcolor={"black"} height={height}>
      <Fade in={true} appear={true} timeout={500}>
        <img
          {...rest}
          width={"100%"}
          height={height}
          style={{ objectFit: "contain" }}
          loading={"lazy"}
        />
      </Fade>
    </Box>
  );
};
