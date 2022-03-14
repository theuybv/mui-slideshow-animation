import { ImageCarouselProps } from "../components/ImageCarousel";
import { faker } from "@faker-js/faker";

export enum AspectRatio {
  "16/9" = 16 / 9,
  "3/2" = 3 / 2,
  "3/4" = 3 / 4,
  "1/1" = 1,
}

export const getWidthHeightFromAspectRatio = (
  aspectRatio: AspectRatio,
  maxWidth: number = 800
): { width: number; height: number } => {
  const getHeight = (length: number, ratio: number) => {
    const height = length / Math.sqrt(Math.pow(ratio, 2) + 1);
    return Math.round(height);
  };
  const getWidth = (length: number, ratio: number) => {
    const width = length / Math.sqrt(1 / (Math.pow(ratio, 2) + 1));
    return Math.round(width);
  };

  const height = getHeight(maxWidth, aspectRatio);
  const width =
    aspectRatio === AspectRatio["1/1"] ? height : getWidth(height, aspectRatio);

  return {
    width,
    height,
  };
};

export const randomImages: ImageCarouselProps["images"] = [...Array(20)].map(
  () => {
    const { width, height } = getWidthHeightFromAspectRatio(
      AspectRatio["3/2"],
      800
    );
    const image = faker.image.image(width, height, true);
    return {
      imageSrc: image,
      thumbSrc: image,
      alt: faker.name.lastName(),
      id: faker.random.alphaNumeric(),
    };
  }
);
