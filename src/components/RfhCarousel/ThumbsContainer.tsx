import { FC, MouseEvent as ReactMouseEvent, MouseEventHandler } from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { CarouselDefaults, CarouselImage } from './config'
import { ImageThumb } from './ImageThumb'
import { getThumbsIterator } from './utils'
import { useThumbsContainer } from './hooks/useThumbsContainer'
import NavigationArrows from './NavigationArrows'

export type ThumbsContainerProps = {
  images: CarouselImage[]
  options: {
    maxThumbsCount: number
  }
  onThumbClick: (event: ReactMouseEvent<Element>, imageIndex: number) => void
} & BoxProps

export const ThumbsContainer: FC<ThumbsContainerProps> = ({
  images,
  options = {
    maxThumbsCount: 6,
  },
  onThumbClick,
  ...rest
}) => {
  const thumbsGap = CarouselDefaults.stackGap
  const {
    calculateMaxThumbWidth,
    scrollIntoViewAndUpdate,
    showNav,
    thumbsContainerHeight,
    thumbsRefs,
    thumbsContainerRef,
  } = useThumbsContainer({
    images,
    thumbsContainerPropsOptions: options,
  })

  const handleNext: MouseEventHandler = event => {
    event.stopPropagation()
    const { nextThumb } = getThumbsIterator(thumbsRefs, thumbsContainerRef)
    if (nextThumb) {
      scrollIntoViewAndUpdate(event, nextThumb)
    }
  }

  const handlePrev: MouseEventHandler = event => {
    event.stopPropagation()
    const { prevThumb } = getThumbsIterator(thumbsRefs, thumbsContainerRef)

    if (prevThumb) {
      scrollIntoViewAndUpdate(event, prevThumb)
    }
  }

  const handleClick = (event: ReactMouseEvent, index: number) => {
    event.stopPropagation()
    const { firstThumbInView, lastThumbInView, nextThumb, prevThumb } =
      getThumbsIterator(thumbsRefs, thumbsContainerRef)

    if (
      nextThumb &&
      lastThumbInView &&
      event.currentTarget === lastThumbInView.element
    ) {
      scrollIntoViewAndUpdate(
        event as ReactMouseEvent<HTMLElement, MouseEvent>,
        nextThumb
      )
    } else if (
      prevThumb &&
      firstThumbInView &&
      event.currentTarget === firstThumbInView.element
    ) {
      scrollIntoViewAndUpdate(
        event as ReactMouseEvent<HTMLElement, MouseEvent>,
        prevThumb
      )
    }
    onThumbClick && onThumbClick(event, index)
  }

  return (
    <Box display={'flex'} flexDirection={'column'} {...rest}>
      <NavigationArrows
        showNav={showNav}
        thumbsContainerHeight={thumbsContainerHeight}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <Box px={thumbsGap}>
        <Stack
          position={'relative'}
          direction="row"
          gap={thumbsGap}
          overflow={'hidden'}
          ref={thumbsContainerRef}
        >
          {images.map((item, index) => {
            return (
              <ImageThumb
                src={item.thumbSrc}
                width={calculateMaxThumbWidth()}
                key={index}
                ref={thumbsRefs[index]}
                onClick={event => handleClick(event, index)}
              />
            )
          })}
        </Stack>
      </Box>
    </Box>
  )
}
