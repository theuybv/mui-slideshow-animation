import { SvgIcon, SvgIconProps } from '@mui/material'
import { FC } from 'react'

const ArrowLinkLeft: FC<SvgIconProps> = props => (
  <SvgIcon {...props} style={{ transform: 'scaleX(-1)' }}>
    <svg viewBox="0 0 16 8">
      <polygon points="8 0 8 0.54 12.27 3 0 3 0 5 12.27 5 8 7.46 8 8 11.07 8 16 5.15 16 2.84 11.07 0 8 0" />
    </svg>
  </SvgIcon>
)

export default ArrowLinkLeft
