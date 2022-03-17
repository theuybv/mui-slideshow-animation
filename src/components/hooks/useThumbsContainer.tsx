import { CarouselImage } from '../ImageCarousel'
import {
  createRef,
  MouseEvent as ReactMouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { throttle } from 'lodash'
import { ThumbsContainerProps } from '../ThumbsContainer'
import { useTheme } from '@mui/material'
import { getThumbsIterator, ThumbElement } from '../../utils'

export type UseThumbsContainerProps = {
  images: CarouselImage[]
  thumbContainerPropsOptions: ThumbsContainerProps['options']
}

export const useThumbsContainer = ({
  images,
  thumbContainerPropsOptions,
}: UseThumbsContainerProps) => {
  const thumbsContainerRef = useRef<HTMLElement>(document.createElement('div'))
  const [thumbRefs, setThumbRefs] = useState<RefObject<HTMLButtonElement>[]>([])
  const theme = useTheme()

  useEffect(() => {
    setThumbRefs(
      images.map((item, index) => {
        return createRef()
      })
    )
  }, [images])

  const [thumbContainerHeight, setThumbContainerHeight] = useState<number>(0)
  const [thumbContainerWidth, setThumbContainerWidth] = useState<number>(0)

  useEffect(() => {
    const height = thumbsContainerRef.current.getBoundingClientRect().height
    const width = thumbsContainerRef.current.getBoundingClientRect().width
    setThumbContainerHeight(height)
    setThumbContainerWidth(width)
  }, [thumbsContainerRef.current])

  useEffect(() => {
    const onResize = throttle(() => {
      const height = thumbsContainerRef.current.getBoundingClientRect().height
      const width = thumbsContainerRef.current.getBoundingClientRect().width
      setThumbContainerHeight(height)
      setThumbContainerWidth(width)
    }, 250)

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const calculateMaxThumbWidth = (
    maxThumbs: number = thumbContainerPropsOptions.maxThumbsCount
  ) => {
    const singleGapPX = Number(theme.spacing(1).replace('px', ''))
    return Math.round(thumbContainerWidth / maxThumbs - singleGapPX)
  }

  const [showNav, setShowNav] = useState<{
    prev: boolean
    next: boolean
  }>({
    prev: false,
    next: true,
  })
  const scrollIntoViewAndUpdate = (
    event: ReactMouseEvent<HTMLElement, MouseEvent>,
    nextOrPrevThumb: ThumbElement
  ) => {
    nextOrPrevThumb.element?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })

    setShowNav({
      prev:
        nextOrPrevThumb.index > 0 && nextOrPrevThumb.index <= images.length - 1,
      next: nextOrPrevThumb.index !== images.length - 1,
    })
  }

  useEffect(() => {
    const { thumbsInView, nextThumb, prevThumb } = getThumbsIterator(
      thumbRefs,
      thumbsContainerRef
    )
    const showNav = images.length > thumbsInView.length
    setShowNav({
      prev: showNav && prevThumb !== undefined,
      next: showNav && nextThumb !== undefined,
    })
  }, [images, thumbsContainerRef, thumbRefs])

  return {
    thumbsContainerRef,
    thumbRefs,
    thumbContainerHeight,
    thumbContainerWidth,
    calculateMaxThumbWidth,
    showNav,
    scrollIntoViewAndUpdate,
  }
}
