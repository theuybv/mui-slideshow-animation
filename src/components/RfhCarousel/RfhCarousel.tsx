import { FC, useState } from 'react'
import Stack, { StackProps } from '@mui/material/Stack'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { ImageContainer } from './ImageContainer'
import { ThumbsContainer } from './ThumbsContainer'
import type { CarouselImage } from './config'
import { AspectRatio, CarouselDefaults } from './config'
import { useRfhCarousel } from './hooks/useRfhCarousel'

export type RfhCarouselProps = {
  images: CarouselImage[]
  ratio: AspectRatio
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
    <Box>
      <ImageContainer
        key={currentImage?.imageSrc}
        ref={imageContainerRef}
        src={currentImage?.imageSrc}
        maxHeight={maxHeight}
        ratio={ratio}
      />
      <Box mt={CarouselDefaults.stackGap}>
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
      </Box>
    </Box>
  )
}

export default RfhCarousel
