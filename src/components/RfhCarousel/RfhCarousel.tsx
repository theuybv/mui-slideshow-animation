import { FC, useState } from 'react'
import Stack, { StackProps } from '@mui/material/Stack'
import { useMediaQuery, useTheme } from '@mui/material'
import { ImageFrame } from './ImageFrame'
import { ThumbsContainer } from './ThumbsContainer'
import { CarouselImage, CarouselDefaults } from './config'

export type RfhCarouselProps = {
  images: CarouselImage[]
  ratio?: number
  maxHeight?: number
} & StackProps

const RfhCarousel: FC<RfhCarouselProps> = ({ images, maxHeight, ratio, ...rest }) => {
  const [currentImage, setCurrentImage] = useState<CarouselImage | undefined>(images[0])
  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const aspectRatio = ratio || CarouselDefaults.ratio
  const carouselImageMaxHeight = maxHeight || CarouselDefaults.maxHeight

  return (
    <Stack
      spacing={1.2}
      {...rest}
      style={{ aspectRatio: aspectRatio.toString(), maxHeight: carouselImageMaxHeight }}
    >
      <ImageFrame key={currentImage?.imageSrc} src={currentImage?.imageSrc} ratio={aspectRatio} />
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

export default RfhCarousel
