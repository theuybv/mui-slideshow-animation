import { FC, useState } from 'react'
import Stack, { StackProps } from '@mui/material/Stack'
import { useMediaQuery, useTheme } from '@mui/material'
import { ImageContainer } from './ImageContainer'
import { ThumbsContainer } from './ThumbsContainer'
import { CarouselDefaults } from './config'
import type { CarouselImage } from './config'

export type RfhCarouselProps = {
  images: CarouselImage[]
  ratio?: number
  maxHeight?: number
} & StackProps

const RfhCarousel: FC<RfhCarouselProps> = ({ images, maxHeight, ratio, ...rest }) => {
  const [currentImage, setCurrentImage] = useState<CarouselImage | undefined>(images[0])
  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Stack spacing={CarouselDefaults.spacing} {...rest}>
      <ImageContainer
        src={currentImage?.imageSrc}
        maxHeight={maxHeight || CarouselDefaults.maxHeight}
        ratio={ratio || CarouselDefaults.mainImageRatio}
      />
      <ThumbsContainer
        images={images}
        options={{
          thumbsGap: CarouselDefaults.spacing,
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
