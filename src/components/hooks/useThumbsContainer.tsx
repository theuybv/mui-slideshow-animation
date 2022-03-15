import { CarouselImage } from "../ImageCarousel";
import {
  createRef,
  MouseEvent as ReactMouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { throttle } from "lodash";
import { ThumbsContainerProps } from "../ThumbsContainer";
import { useTheme } from "@mui/material";
import { ThumbElement } from "../../utils";

export type UseThumbsContainerProps = {
  images: CarouselImage[];
  thumbContainerPropsOptions: ThumbsContainerProps["options"];
};

export const useThumbsContainer = ({
  images,
  thumbContainerPropsOptions,
}: UseThumbsContainerProps) => {
  const thumbsContainerRef = useRef<HTMLElement>(document.createElement("div"));
  const [thumbRefs, setThumbRefs] = useState<RefObject<HTMLElement>[]>([]);
  const theme = useTheme();

  useEffect(() => {
    setThumbRefs(
      images.map((item, index) => {
        return createRef<HTMLElement>();
      })
    );
  }, [images]);

  const [thumbContainerHeight, setThumbContainerHeight] = useState<number>(0);
  const [thumbContainerWidth, setThumbContainerWidth] = useState<number>(0);

  useEffect(() => {
    setThumbContainerHeight(thumbsContainerRef.current.offsetHeight);
    setThumbContainerWidth(thumbsContainerRef.current.offsetWidth);
  }, [thumbsContainerRef.current]);

  useEffect(() => {
    const onResize = throttle(() => {
      setThumbContainerHeight(thumbsContainerRef.current.offsetHeight);
      setThumbContainerWidth(thumbsContainerRef.current.offsetWidth);
    }, 80);

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const calculateMaxThumbWidth = (
    maxThumbs: number = thumbContainerPropsOptions.maxThumbsCount
  ) => {
    const singleGapPX = Number(theme.spacing(1).replace("px", ""));
    return Math.round(thumbContainerWidth / maxThumbs - singleGapPX);
  };

  const [showNav, setShowNav] = useState<{
    prev: boolean;
    next: boolean;
  }>({
    prev: false,
    next: true,
  });
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

  return {
    thumbsContainerRef,
    thumbRefs,
    thumbContainerHeight,
    thumbContainerWidth,
    calculateMaxThumbWidth,
    showNav,
    scrollIntoViewAndUpdate,
  };
};
