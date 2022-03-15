import { ImageCarouselProps } from "../components/ImageCarousel";
import { faker } from "@faker-js/faker";
import { RefObject } from "react";

export enum AspectRatio {
  "16/9" = 16 / 9,
  "9/16" = 9 / 16,
  "3/2" = 3 / 2,
  "3/4" = 3 / 4,
  "4/3" = 4 / 3,
  "1/1" = 1,
}

export const getMaxDimensionFromAspectRatio = (
  aspectRatio: AspectRatio,
  maxWidth: number = 800
): { width: number; height: number } => {
  return {
    width: maxWidth,
    height: Math.round(maxWidth / aspectRatio),
  };
};

export const randomImages: ImageCarouselProps["images"] = [...Array(10)].map(
  (_value, index) => {
    const { width, height } = getMaxDimensionFromAspectRatio(
      AspectRatio["3/2"],
      800
    );
    const imageURL = `https://via.placeholder.com/${width}x${height}?text=${index}`;
    return {
      imageSrc: imageURL,
      thumbSrc: imageURL,
      alt: faker.name.lastName(),
      id: faker.random.alphaNumeric(),
    };
  }
);

export const intersectRect = (aElement: HTMLElement, bElement: HTMLElement) => {
  const a = aElement.getBoundingClientRect();
  const b = bElement.getBoundingClientRect();
  return (
    a.left <= b.right &&
    b.left <= a.right &&
    a.top <= b.bottom &&
    b.top <= a.bottom
  );
};

export type ThumbElement = {
  index: number;
  element: HTMLElement;
  isInView: boolean;
};

export const getThumbsIterator = (
  thumbRefs: RefObject<HTMLElement>[],
  thumbsContainerRef: RefObject<HTMLElement>
) => {
  const thumbElements = thumbRefs.map((value, thumbElementIndex) => {
    return {
      index: thumbElementIndex,
      element: value.current,
      isInView: intersectRect(
        value.current as HTMLElement,
        thumbsContainerRef.current as HTMLElement
      ),
    } as ThumbElement;
  });

  const thumbsInView = thumbElements.filter((value) => value.isInView);

  const lastThumbInView = thumbsInView[thumbsInView.length - 1];
  const firstThumbInView = thumbsInView[0];
  const nextThumb = lastThumbInView && thumbElements[lastThumbInView.index + 1];
  const prevThumb =
    firstThumbInView && thumbElements[firstThumbInView.index - 1];

  return {
    lastThumbInView,
    firstThumbInView,
    nextThumb,
    prevThumb,
  };
};
