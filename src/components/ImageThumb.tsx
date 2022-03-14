import {
  FC,
  MouseEvent as ReactMouseEvent,
  MutableRefObject,
  RefObject,
} from "react";
import { Box } from "@mui/material";
import { CarouselImage, ImageCarouselProps } from "./ImageCarousel";
import { AspectRatio, getWidthHeightFromAspectRatio } from "../utils";

export type ImageThumbProps = {
  imageRefs: RefObject<HTMLElement>[] | undefined;
  thumbsContainerRef: MutableRefObject<HTMLElement>;
  images: ImageCarouselProps["images"];
  imageIndex: number;
  image: CarouselImage;
  onImageClick?: (
    event: ReactMouseEvent<HTMLElement, MouseEvent>,
    imageIndex: number,
    image: CarouselImage
  ) => void;
};
export const ImageThumb: FC<ImageThumbProps> = ({
  image,
  images,
  onImageClick,
  imageIndex,
  thumbsContainerRef,
  imageRefs,
}) => {
  const { width, height } = getWidthHeightFromAspectRatio(
    AspectRatio["1/1"],
    100
  );
  return (
    <Box
      ref={imageRefs && imageRefs[imageIndex]}
      onClick={(event) => {
        const nextIndex =
          imageIndex === images.length - 1 ? images.length - 1 : imageIndex + 1;
        const prevIndex = imageIndex === 0 ? imageIndex : imageIndex - 1;

        const scrollPosOffset =
          event.currentTarget?.offsetLeft -
          thumbsContainerRef?.current?.scrollLeft -
          event.currentTarget?.getBoundingClientRect().width;

        const firstItem = scrollPosOffset < 0;
        const lastItem = !firstItem;

        if (lastItem && imageRefs && imageRefs[nextIndex]) {
          imageRefs[nextIndex].current?.scrollIntoView({
            behavior: "smooth",
          });
        }

        if (firstItem && imageRefs && imageRefs[prevIndex]) {
          imageRefs[prevIndex].current?.scrollIntoView({
            behavior: "smooth",
          });
        }
        onImageClick && onImageClick(event, imageIndex, images[imageIndex]);
      }}
    >
      <img
        width={width}
        height={height}
        src={image.thumbSrc}
        alt={image.alt || ""}
        style={{ objectFit: "cover" }}
      />
    </Box>
  );
};
