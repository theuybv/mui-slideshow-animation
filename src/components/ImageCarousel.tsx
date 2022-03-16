import { FC, useState } from 'react'
import { Box, Stack, StackProps } from '@mui/material'
import { ImageFrame } from './ImageFrame'
import { ThumbsContainer } from './ThumbsContainer'

export type CarouselImage = {
  imageSrc: string
  thumbSrc: string
  alt?: string
}

export type ImageCarouselProps = {
  images: CarouselImage[]
  ratio: number
} & StackProps

export const ImageCarousel: FC<ImageCarouselProps> = ({ images, ratio, ...rest }) => {
  const [currentImage, setCurrentImage] = useState<CarouselImage | undefined>(images[0])

  return (
    <Stack spacing={1.2} {...rest}>
      <ImageFrame key={currentImage?.imageSrc} src={currentImage?.imageSrc} ratio={ratio} />
      <ThumbsContainer
        options={{
          thumbsGap: 1.2,
          maxThumbsCount: 6,
        }}
        images={images}
        onThumbClick={(event, clickedImageIndex) => {
          setCurrentImage(prevState => {
            return images.find((item, index) => index === clickedImageIndex)
          })
        }}
      />
    </Stack>
  )
}
