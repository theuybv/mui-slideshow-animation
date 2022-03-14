import { createRef, FC, RefObject, useEffect, useRef, useState } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
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
  const [imageRefs, setImageRefs] = useState<RefObject<HTMLElement>[]>([]);

  useEffect(() => {
    setImageRefs(
      images.map((item, index) => {
        return createRef<HTMLElement>();
      })
    );
  }, [images]);
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box position={"relative"} zIndex={1}>
        <Box
          height={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box position={"absolute"} id={"left"} top={14} left={0}>
            <IconButton
              style={{ background: "white" }}
              onClick={(event) => {
                const offsets =
                  imageRefs
                    ?.map((ref, index) => {
                      const scrollLeft =
                        ref.current?.offsetParent?.scrollLeft || 0;
                      const offsetLeft = ref.current?.offsetLeft || 0;
                      return scrollLeft - offsetLeft;
                    })
                    .filter((value) => value > 0) || [];

                const offsetIndex = offsets.findIndex(
                  (value) => value === Math.min.apply(null, offsets)
                );

                const prevIndex = offsetIndex === -1 ? 0 : offsetIndex;

                imageRefs[prevIndex]?.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <ChevronLeft />
            </IconButton>
          </Box>
          <Box position={"absolute"} id={"right"} top={14} right={0}>
            <IconButton
              style={{ background: "white" }}
              onClick={(event) => {
                const offsets =
                  imageRefs.map((ref) => {
                    const scrollLeft =
                      ref.current?.offsetParent?.scrollLeft || 0;
                    const offsetLeft = ref.current?.offsetLeft || 0;

                    return (
                      thumbsContainerRef.current.getBoundingClientRect().width -
                      scrollLeft -
                      offsetLeft
                    );
                  }) || [];

                const offsetIndex = offsets.findIndex(
                  (offset) => Number(offset) < 0
                );

                const nextIndex = images.length - offsetIndex + 1;

                imageRefs[nextIndex]?.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>
      </Box>
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
    </Box>
  );
};
