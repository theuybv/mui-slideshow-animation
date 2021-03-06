import { forwardRef } from 'react'
import Box from '@mui/material/Box'
import type { BoxProps } from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import type { ButtonBaseProps } from '@mui/material/ButtonBase'
import { CarouselDefaults } from './config'

export type ImageThumbProps = {
  src: HTMLImageElement['src']
  width: HTMLImageElement['width']
  onClick: ButtonBaseProps['onClick']
} & Omit<BoxProps, 'width' | 'onClick'>

export const ImageThumb = forwardRef<HTMLButtonElement, ImageThumbProps>(
  ({ src, tabIndex, width, onClick, ...rest }, ref) => {
    const aspectRatio = CarouselDefaults.thumbImageRatio

    return (
      <Box
        width={width}
        height={width / aspectRatio}
        style={{
          aspectRatio: aspectRatio.toString(),
        }}
        {...rest}
      >
        <ButtonBase onClick={onClick} focusRipple={true} ref={ref}>
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
        </ButtonBase>
      </Box>
    )
  }
)
