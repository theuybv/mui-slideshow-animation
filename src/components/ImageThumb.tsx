import { forwardRef, MouseEventHandler } from "react";
import { Box } from "@mui/material";
import { CarouselImage, ImageCarouselProps } from "./ImageCarousel";
import { AspectRatio, getWidthHeightFromAspectRatio } from "../utils";

export type ImageThumbProps = {
  images: ImageCarouselProps["images"];
  imageIndex: number;
  image: CarouselImage;
  onThumbClick?: MouseEventHandler;
};
export const ImageThumb = forwardRef<HTMLElement, ImageThumbProps>(
  ({ image, images, onThumbClick, imageIndex }, ref) => {
    const { width, height } = getWidthHeightFromAspectRatio(
      AspectRatio["1/1"],
      80
    );
    return (
      <Box ref={ref} onClick={onThumbClick}>
        <img
          width={width}
          height={height}
          src={image.thumbSrc}
          alt={image.alt || ""}
          style={{ objectFit: "cover" }}
        />
      </Box>
    );
  }
);
