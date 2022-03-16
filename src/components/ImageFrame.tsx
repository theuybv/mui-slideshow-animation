import { FC } from 'react'
import { Box, BoxProps, Fade } from '@mui/material'

export type ImageFrameProps = {
  src?: HTMLImageElement['src']
  ratio: number
} & BoxProps

export const ImageFrame: FC<ImageFrameProps> = ({ src, ratio, ...rest }) => {
  const maxHeight = 400
  const maxWidth = maxHeight * ratio

  return (
    <Box maxHeight={400} bgcolor={'black'} {...rest}>
      <Fade in appear timeout={500}>
        <img
          src={src}
          width={'100%'}
          height={'100%'}
          style={{
            maxHeight: 400,
            objectFit: 'contain',
            aspectRatio: ratio.toString(),
          }}
          loading={'lazy'}
        />
      </Fade>
    </Box>
  )
}
