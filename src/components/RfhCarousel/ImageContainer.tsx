import { forwardRef } from 'react'
import { Box, BoxProps, Fade } from '@mui/material'

export type ImageContainerProps = {
  src?: HTMLImageElement['src']
  maxHeight: number
  ratio: number
} & BoxProps

export const ImageContainer = forwardRef<HTMLElement, ImageContainerProps>(
  ({ src, maxHeight, ratio, ...rest }, ref) => {
    const ratioAsString = ratio.toString()

    return (
      <Box
        ref={ref}
        maxHeight={maxHeight}
        bgcolor={'black'}
        style={{
          aspectRatio: ratioAsString,
        }}
        {...rest}
      >
        <Fade in appear timeout={500}>
          <img
            src={src}
            width={'100%'}
            height={'100%'}
            style={{
              objectFit: 'contain',
              aspectRatio: ratioAsString,
            }}
            loading={'lazy'}
          />
        </Fade>
      </Box>
    )
  }
)
