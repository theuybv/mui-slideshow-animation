import { forwardRef } from 'react'
import { Box, BoxProps } from '@mui/material'
import { ASPECT_RATIOS } from '../utils'

export type ImageThumbProps = {
  src: HTMLImageElement['src']
  width: HTMLImageElement['width']
} & Omit<BoxProps, 'width'>

export const ImageThumb = forwardRef<HTMLElement, ImageThumbProps>(
  ({ width, src, ...rest }, ref) => {
    const aspectRatio = ASPECT_RATIOS['4/3'].toString()
    return (
      <Box
        width={width}
        ref={ref}
        style={{
          aspectRatio,
        }}
        {...rest}
      >
        <img
          width={width}
          height={'100%'}
          src={src}
          style={{
            objectFit: 'cover',
            aspectRatio,
          }}
          loading={'lazy'}
        />
      </Box>
    )
  }
)
