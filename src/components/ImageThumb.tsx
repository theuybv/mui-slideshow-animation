import { forwardRef, MouseEventHandler } from "react";
import { Box } from "@mui/material";
import { CarouselImage, ImageCarouselProps } from "./ImageCarousel";
import { AspectRatio, getMaxDimensionFromAspectRatio } from "../utils";

export type ImageThumbProps = {
  images: ImageCarouselProps["images"];
  imageIndex: number;
  image: CarouselImage;
  onThumbClick?: MouseEventHandler;
};
export const ImageThumb = forwardRef<HTMLElement, ImageThumbProps>(
  ({ image, images, onThumbClick, imageIndex }, ref) => {
    const { width, height } = getMaxDimensionFromAspectRatio(
      AspectRatio["4/3"],
      100
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
