import { forwardRef } from 'react'
import { Box, BoxProps } from '@mui/material'
import { ASPECT_RATIOS } from '../utils'

export type ImageThumbProps = {
  src: HTMLImageElement['src']
  width: HTMLImageElement['width']
} & Omit<BoxProps, 'width'>

export const ImageThumb = forwardRef<HTMLElement, ImageThumbProps>(
  ({ width, src, ...rest }, ref) => {
    return (
      <Box ref={ref} style={{ aspectRatio: ASPECT_RATIOS['4/3'].toString() }} {...rest}>
        <img
          width={width}
          src={src}
          style={{
            maxHeight: 80,
            objectFit: 'cover',
            aspectRatio: ASPECT_RATIOS['4/3'].toString(),
          }}
          loading={'lazy'}
        />
      </Box>
    )
  }
)
