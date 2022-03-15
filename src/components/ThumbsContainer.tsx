import {
  createRef,
  FC,
  MouseEvent as ReactMouseEvent,
  RefObject,
  useEffect,
  useState,
} from "react";
import { Box, IconButton, Stack, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { CarouselImage } from "./ImageCarousel";
import { ImageThumb } from "./ImageThumb";
import { getThumbsIterator, ThumbElement } from "../utils";

export type ThumbsContainerProps = {
  images: CarouselImage[];
  onThumbClick: (event: ReactMouseEvent<Element>, imageIndex: number) => void;
};

const CAROUSEL_OPTIONS = {
  MAX_THUMBS: 6,
  GAP: 1.2,
};

export const ThumbsContainer: FC<ThumbsContainerProps> = ({
  images,
  onThumbClick,
}) => {
  const thumbsContainerRef = createRef<HTMLElement>();
  const [thumbRefs, setThumbRefs] = useState<RefObject<HTMLElement>[]>([]);

  const [thumbContainerHeight, setThumbContainerHeight] = useState<number>(0);
  const [thumbContainerWidth, setThumbContainerWidth] = useState<number>(0);

  const [showNav, setShowNav] = useState<{
    prev: boolean;
    next: boolean;
  }>({
    prev: false,
    next: true,
  });

  useEffect(() => {
    setThumbRefs(
      images.map((item, index) => {
        return createRef<HTMLElement>();
      })
    );
  }, [images]);

  useEffect(() => {
    if (thumbsContainerRef && thumbsContainerRef.current) {
      setThumbContainerHeight(thumbsContainerRef.current.offsetHeight);
      setThumbContainerWidth(thumbsContainerRef.current.offsetWidth);
    }
  }, [thumbsContainerRef]);

  const theme = useTheme();

  const calculateMaxThumbWidth = (
    maxThumbs: number = CAROUSEL_OPTIONS.MAX_THUMBS
  ) => {
    const singleGapPX = Number(theme.spacing(1).replace("px", ""));
    return Math.round(thumbContainerWidth / maxThumbs - singleGapPX);
  };

  const scrollIntoViewAndUpdate = (
    event: ReactMouseEvent<HTMLElement, MouseEvent>,
    nextOrPrevThumb: ThumbElement
  ) => {
    nextOrPrevThumb.element?.scrollIntoView({
      behavior: "smooth",
    });

    setShowNav({
      prev:
        nextOrPrevThumb.index > 0 && nextOrPrevThumb.index <= images.length - 1,
      next: nextOrPrevThumb.index !== images.length - 1,
    });
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box position={"relative"} zIndex={1}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            position={"absolute"}
            left={theme.spacing(CAROUSEL_OPTIONS.GAP)}
            top={thumbContainerHeight / 2 - 24}
            height={"100%"}
            hidden={!showNav.prev}
          >
            <IconButton
              style={{ background: "white" }}
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
          <Box
            position={"absolute"}
            right={theme.spacing(CAROUSEL_OPTIONS.GAP)}
            top={thumbContainerHeight / 2 - 24}
            height={"100%"}
            hidden={!showNav.next}
          >
            <IconButton
              style={{ background: "white" }}
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
      <Box px={CAROUSEL_OPTIONS.GAP}>
        <Stack
          position={"relative"}
          direction="row"
          gap={CAROUSEL_OPTIONS.GAP}
          overflow={"hidden"}
          ref={thumbsContainerRef}
        >
          {images.map((item, index) => {
            return (
              <ImageThumb
                maxWidth={calculateMaxThumbWidth()}
                key={index}
                ref={thumbRefs[index]}
                imageIndex={index}
                images={images}
                image={item}
                onThumbClick={(event) => {
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
    </Box>
  );
};
