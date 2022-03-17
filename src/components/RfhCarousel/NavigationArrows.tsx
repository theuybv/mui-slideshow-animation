import { FC, MouseEvent as ReactMouseEvent } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import useTheme from '@mui/material/styles/useTheme'
import ArrowLinkLeft from '../../shared/icons/ArrowLinkLeft'
import ArrowLinkRight from '../../shared/icons/ArrowLinkRight'
import { CarouselDefaults } from './config'

export type NavigationArrowsProps = {
  thumbsContainerHeight: number
  showNav: { prev: boolean; next: boolean }
  handleNext: (event: ReactMouseEvent<HTMLElement, MouseEvent>) => void
  handlePrev: (event: ReactMouseEvent<HTMLElement, MouseEvent>) => void
}

type NavigationArrowProps = {
  prev?: boolean
}

const NavigationArrows: FC<NavigationArrowsProps> = ({
  thumbsContainerHeight,
  showNav,
  handleNext,
  handlePrev,
}) => {
  const theme = useTheme()
  const thumbsGap = CarouselDefaults.stackGap

  const NavigationArrow: FC<NavigationArrowProps> = ({ prev }) => {
    const positionXSpacing = theme.spacing(thumbsGap)
    const positionX = prev
      ? { left: positionXSpacing }
      : { right: positionXSpacing }

    return (
      <Box
        position={'absolute'}
        {...positionX}
        /**
            the arrow button is 24x24 width
            we divide it by 2 to get the top offset of (12px) but
            we need extra offset of 2 pixels = 14px
        */
        top={thumbsContainerHeight / 2 - 14}
        height={'100%'}
        hidden={prev ? !showNav.prev : !showNav.next}
      >
        <IconButton
          style={{
            color: 'black',
            backgroundColor: 'white',
            padding: 0,
            opacity: 0.8,
            borderRadius: 0,
          }}
          onClick={prev ? handlePrev : handleNext}
        >
          {prev ? <ArrowLinkLeft /> : <ArrowLinkRight />}
        </IconButton>
      </Box>
    )
  }

  return (
    <Box position={'relative'} zIndex={1}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <NavigationArrow prev />
        <NavigationArrow />
      </Box>
    </Box>
  )
}

export default NavigationArrows
