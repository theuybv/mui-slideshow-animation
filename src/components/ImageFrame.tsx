import { FC } from 'react'
import { Fade } from '@mui/material'

export type ImageFrameProps = Partial<Pick<HTMLImageElement, 'src' | 'alt' | 'height'>>

// width is not used
export const ImageFrame: FC<ImageFrameProps> = ({ src }) => {
  return (
    <Fade in appear timeout={500}>
      <img
        src={src}
        width={'100%'}
        height={'100%'}
        loading={'lazy'}
        style={{ objectFit: 'contain' }}
      />
    </Fade>
  )
}
