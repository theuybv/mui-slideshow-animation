import { FC, MouseEvent as ReactMouseEvent } from "react";
import { Box, IconButton, Stack, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { CarouselImage } from "./ImageCarousel";
import { ImageThumb } from "./ImageThumb";
import { getThumbsIterator } from "../utils";
import { useThumbsContainer } from "./hooks/useThumbsContainer";

export type ThumbsContainerProps = {
  options: {
    maxThumbsCount: number;
    thumbsGap: number;
  };
  images: CarouselImage[];
  onThumbClick: (event: ReactMouseEvent<Element>, imageIndex: number) => void;
};

export const ThumbsContainer: FC<ThumbsContainerProps> = ({
  images,
  onThumbClick,
  options = {
    maxThumbsCount: 6,
    thumbsGap: 1.2,
  },
}) => {
  const theme = useTheme();

  const {
    thumbContainerHeight,
    thumbRefs,
    thumbsContainerRef,
    showNav,
    scrollIntoViewAndUpdate,
    calculateMaxThumbWidth,
  } = useThumbsContainer({ images, thumbContainerPropsOptions: options });

  return (
    <Box display={"flex"} flexDirection={"column"} px={options.thumbsGap}>
      <Box position={"relative"}>
        <Box
          position={"absolute"}
          width={"100%"}
          zIndex={1}
          style={{ pointerEvents: "none" }}
        >
          <Box
            display={"flex"}
            justifyContent={!showNav.prev ? "end" : "space-between"}
            alignItems={"center"}
            height={thumbContainerHeight}
          >
            <Box hidden={!showNav.prev}>
              <IconButton
                style={{ background: "white", padding: 0 }}
                onClick={(event) => {
                  event.stopPropagation();
                  const { prevThumb } = getThumbsIterator(
                    thumbRefs,
                    thumbsContainerRef
                  );

                  if (prevThumb) {
                    scrollIntoViewAndUpdate(event, prevThumb);
                  }
                }}
              >
                <ChevronLeft />
              </IconButton>
            </Box>
            <Box hidden={!showNav.next}>
              <IconButton
                style={{ background: "white", padding: 0 }}
                onClick={(event) => {
                  event.stopPropagation();
                  const { nextThumb } = getThumbsIterator(
                    thumbRefs,
                    thumbsContainerRef
                  );
                  if (nextThumb) {
                    scrollIntoViewAndUpdate(event, nextThumb);
                  }
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Stack
        position={"relative"}
        direction="row"
        gap={options.thumbsGap}
        overflow={"hidden"}
        ref={thumbsContainerRef}
      >
        {images.map((item, index) => {
          return (
            <ImageThumb
              src={item.thumbSrc}
              width={calculateMaxThumbWidth()}
              key={index}
              ref={thumbRefs[index]}
              onClick={(event) => {
                event.stopPropagation();
                const {
                  firstThumbInView,
                  lastThumbInView,
                  nextThumb,
                  prevThumb,
                } = getThumbsIterator(thumbRefs, thumbsContainerRef);

                if (
                  nextThumb &&
                  lastThumbInView &&
                  event.currentTarget === lastThumbInView.element
                ) {
                  scrollIntoViewAndUpdate(
                    event as ReactMouseEvent<HTMLElement, MouseEvent>,
                    nextThumb
                  );
                } else if (
                  prevThumb &&
                  firstThumbInView &&
                  event.currentTarget === firstThumbInView.element
                ) {
                  scrollIntoViewAndUpdate(
                    event as ReactMouseEvent<HTMLElement, MouseEvent>,
                    prevThumb
                  );
                }
                onThumbClick && onThumbClick(event, index);
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
