import { FC } from 'react'
import { BoxProps, Fade } from '@mui/material'
import { ASPECT_RATIOS } from '../utils'

export type ImageFrameProps = {
  src?: HTMLImageElement['src']
} & BoxProps

export const ImageFrame: FC<ImageFrameProps> = ({ src }) => {
  return (
    <Fade in appear timeout={500}>
      <img
        width={'100%'}
        height={'100%'}
        src={src}
        style={{
          objectFit: 'contain',
          aspectRatio: ASPECT_RATIOS['3/2'].toString(),
        }}
        loading={'lazy'}
      />
    </Fade>
  )
}
