import {
  createRef,
  FC,
  MouseEvent as ReactMouseEvent,
  RefObject,
  useEffect,
  useState,
} from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { CarouselImage } from "./ImageCarousel";
import { ImageThumb } from "./ImageThumb";
import { getThumbsIterator } from "../utils";

export type ThumbsContainerProps = {
  images: CarouselImage[];
  onThumbClick: (event: ReactMouseEvent<Element>, imageIndex: number) => void;
};

export const ThumbsContainer: FC<ThumbsContainerProps> = ({
  images,
  onThumbClick,
}) => {
  const thumbsContainerRef = createRef<HTMLElement>();
  const [thumbRefs, setThumbRefs] = useState<RefObject<HTMLElement>[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    setThumbRefs(
      images.map((item, index) => {
        return createRef<HTMLElement>();
      })
    );
  }, [images]);

  useEffect(() => {
    if (thumbsContainerRef && thumbsContainerRef.current) {
      setContainerHeight(thumbsContainerRef.current.offsetHeight);
    }
  }, [thumbsContainerRef]);

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
            left={0}
            top={containerHeight / 2 - 24}
            height={"100%"}
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
                  prevThumb.element?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setCurrentIndex(prevThumb.index);
                  onThumbClick && onThumbClick(event, prevThumb.index);
                }
              }}
            >
              <ChevronLeft />
            </IconButton>
          </Box>
          <Box
            position={"absolute"}
            right={0}
            top={containerHeight / 2 - 24}
            height={"100%"}
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
                  nextThumb.element?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setCurrentIndex(nextThumb.index);
                  onThumbClick && onThumbClick(event, nextThumb.index);
                }
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
                  nextThumb.element?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setCurrentIndex(nextThumb.index);
                  onThumbClick && onThumbClick(event, nextThumb.index);
                } else if (
                  prevThumb &&
                  firstThumbInView &&
                  event.currentTarget === firstThumbInView.element
                ) {
                  prevThumb.element?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setCurrentIndex(prevThumb.index);
                  onThumbClick && onThumbClick(event, prevThumb.index);
                } else {
                  setCurrentIndex(index);
                  onThumbClick && onThumbClick(event, index);
                }
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
