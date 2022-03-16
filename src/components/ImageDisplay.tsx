import { FC } from 'react'
import { Box, BoxProps, Fade } from '@mui/material'
import { ASPECT_RATIOS } from '../utils'

export type ImageDisplayProps = {
  src?: HTMLImageElement['src']
} & BoxProps

export const ImageDisplay: FC<ImageDisplayProps> = ({ src, ...rest }) => {
  const aspectRatio = ASPECT_RATIOS['3/2'].toString()
  return (
    <Box bgcolor={'black'} {...rest} maxHeight={400}>
      <Fade in={true} appear={true} timeout={500}>
        <img
          width={'100%'}
          height={'100%'}
          src={src}
          style={{
            maxHeight: 400,
            objectFit: 'contain',
            aspectRatio,
          }}
          loading={'lazy'}
        />
      </Fade>
    </Box>
  )
}
