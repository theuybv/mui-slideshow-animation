import { FC, MouseEventHandler } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ArrowLinkLeft from '../../shared/icons/ArrowLinkLeft'
import ArrowLinkRight from '../../shared/icons/ArrowLinkRight'

export type NavigationArrowsProps = {
  positionXSpacing: number // px
  showNav: { prev: boolean; next: boolean }
  thumbsContainerHeight: number
  handleNext: MouseEventHandler
  handlePrev: MouseEventHandler
}

const NavigationArrows: FC<NavigationArrowsProps> = ({
  positionXSpacing,
  showNav,
  thumbsContainerHeight,
  handleNext,
  handlePrev,
}) => {
  type NavigationArrowProps = {
    spacingX: number
    prev?: boolean
  }

  const NavigationArrow: FC<NavigationArrowProps> = ({ spacingX, prev }) => {
    const positionX = prev ? { left: spacingX } : { right: spacingX }

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
        <NavigationArrow prev spacingX={positionXSpacing} />
        <NavigationArrow spacingX={positionXSpacing} />
      </Box>
    </Box>
  )
}

export default NavigationArrows
