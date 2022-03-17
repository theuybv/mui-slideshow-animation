import { FC, useState } from 'react'
import Stack, { StackProps } from '@mui/material/Stack'
import { useMediaQuery, useTheme } from '@mui/material'
import { ImageContainer } from './ImageContainer'
import { ThumbsContainer } from './ThumbsContainer'
import type { CarouselImage } from './config'
import { ASPECT_RATIOS, CarouselDefaults } from './config'
import { useRfhCarousel } from './hooks/useRfhCarousel'

export type RfhCarouselProps = {
  images: CarouselImage[]
  ratio: ASPECT_RATIOS
  maxHeight: number
} & StackProps

const RfhCarousel: FC<RfhCarouselProps> = ({
  images,
  maxHeight = CarouselDefaults.imageMaxHeight,
  ratio = CarouselDefaults.mainImageRatio,
  ...rest
}) => {
  const [currentImage, setCurrentImage] = useState<CarouselImage | undefined>(
    images[0]
  )
  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  const { imageContainerRef, imageContainerWidth } = useRfhCarousel()

  return (
    <Stack spacing={CarouselDefaults.stackGap} {...rest}>
      <ImageContainer
        ref={imageContainerRef}
        src={currentImage?.imageSrc}
        maxHeight={maxHeight}
        ratio={ratio}
      />
      <ThumbsContainer
        width={imageContainerWidth}
        images={images}
        options={{
          maxThumbsCount: isXS ? 5 : 6,
        }}
        onThumbClick={(event, clickedImageIndex) => {
          setCurrentImage(prevState => {
            return images.find((_, index) => index === clickedImageIndex)
          })
        }}
      />
    </Stack>
  )
}

export default RfhCarousel
