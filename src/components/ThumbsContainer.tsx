import { createRef, FC, RefObject, useEffect, useRef, useState } from "react";
import { Stack } from "@mui/material";
import { ImageCarouselProps } from "./ImageCarousel";
import { ImageThumb, ImageThumbProps } from "./ImageThumb";

export type ThumbsContainerProps = {
  images: ImageCarouselProps["images"];
  onImageClick: ImageThumbProps["onImageClick"];
};

export const ThumbsContainer: FC<ThumbsContainerProps> = ({
  images,
  onImageClick,
}) => {
  const thumbsContainerRef = useRef<HTMLElement>(document.createElement("div"));
  const [imageRefs, setImageRefs] = useState<RefObject<HTMLElement>[]>();

  useEffect(() => {
    setImageRefs(
      images.map((item, index) => {
        return createRef<HTMLElement>();
      })
    );
  }, [images]);
  return (
    <Stack
      position={"relative"}
      direction="row"
      gap={1.2}
      overflow={"hidden"}
      ref={thumbsContainerRef}
    >
      {images.map((item, index) => {
        return (
          <ImageThumb
            key={index}
            imageRefs={imageRefs}
            thumbsContainerRef={thumbsContainerRef}
            imageIndex={index}
            images={images}
            image={item}
            onImageClick={onImageClick}
          />
        );
      })}
    </Stack>
  );
};
