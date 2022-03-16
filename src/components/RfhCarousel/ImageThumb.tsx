import { forwardRef } from 'react'
import { Box, BoxProps } from '@mui/material'
import { ASPECT_RATIOS } from './config'

export type ImageThumbProps = {
  src: HTMLImageElement['src']
  width: HTMLImageElement['width']
} & Omit<BoxProps, 'width'>

export const ImageThumb = forwardRef<HTMLElement, ImageThumbProps>(
  ({ width, src, ...rest }, ref) => {
    const aspectRatio = ASPECT_RATIOS['4/3']
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
            aspectRatio: aspectRatio.toString(),
          }}
          loading={'lazy'}
        />
      </Box>
    )
  }
)
