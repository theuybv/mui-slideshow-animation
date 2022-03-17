export enum AspectRatio {
  '16/9' = 16 / 9,
  '9/16' = 9 / 16,
  '3/2' = 3 / 2,
  '3/4' = 3 / 4,
  '4/3' = 4 / 3,
  '1/1' = 1,
}

export type CarouselImage = {
  imageSrc: string
  thumbSrc: string
  alt?: string
}

export const CarouselDefaults = {
  mainImageRatio: AspectRatio['4/3'],
  thumbImageRatio: AspectRatio['4/3'],
  imageMaxHeight: 400,
  stackGap: 1.2,
  resizeThrottleWait: 100,
}
