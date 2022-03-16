import { StackProps } from '@mui/material/Stack'

export enum ASPECT_RATIOS {
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

export type RfhCarouselProps = {
  images: CarouselImage[]
  ratio: number
} & StackProps
