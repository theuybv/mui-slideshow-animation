import { forwardRef } from 'react'
import { Box, BoxProps } from '@mui/material'
import { CarouselDefaults } from './config'

export type ImageThumbProps = {
  src: HTMLImageElement['src']
  width: HTMLImageElement['width']
} & Omit<BoxProps, 'width'>

export const ImageThumb = forwardRef<HTMLElement, ImageThumbProps>(
  ({ src, width, ...rest }, ref) => {
    const aspectRatio = CarouselDefaults.thumbImageRatio

    return (
      <Box
        width={width}
        height={width / aspectRatio}
        ref={ref}
        style={{
          aspectRatio: aspectRatio.toString(),
        }}
        {...rest}
      >
        <img
          width={'100%'}
          height={'100%'}
          src={src}
          style={{
            objectFit: 'cover',
          }}
          loading={'lazy'}
        />
      </Box>
    )
  }
)
