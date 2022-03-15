import { forwardRef, MouseEventHandler } from 'react'
import { Box } from '@mui/material'
import { CarouselImage, ImageCarouselProps } from './ImageCarousel'
import { AspectRatios } from '../utils'

export type ImageThumbProps = {
  images: ImageCarouselProps['images']
  imageIndex: number
  image: CarouselImage
  onThumbClick?: MouseEventHandler
  maxWidth: number
}
export const ImageThumb = forwardRef<HTMLElement, ImageThumbProps>(
  ({ image, onThumbClick, maxWidth = 100 }, ref) => {
    const height = maxWidth / AspectRatios['4/3']
    return (
      <Box ref={ref} onClick={onThumbClick}>
        <img
          width={maxWidth}
          height={height}
          src={image.thumbSrc}
          alt={image.alt || ''}
          style={{ objectFit: 'cover' }}
          loading={'lazy'}
        />
      </Box>
    )
  }
)
