import { FC, useState } from 'react'
import { Stack, StackProps, useMediaQuery, useTheme } from '@mui/material'
import { ImageFrame } from './ImageFrame'
import { ThumbsContainer } from './ThumbsContainer'
import { ASPECT_RATIOS } from '../utils'

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
  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Stack
      spacing={1.2}
      {...rest}
      style={{ aspectRatio: ASPECT_RATIOS['3/2'].toString(), maxHeight: 400 }}
    >
      <ImageFrame key={currentImage?.imageSrc} src={currentImage?.imageSrc} ratio={ratio} />
      <ThumbsContainer
        options={{
          thumbsGap: 1.2,
          maxThumbsCount: isXS ? 5 : 6,
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
