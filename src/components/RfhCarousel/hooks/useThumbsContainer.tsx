import type { CarouselImage } from '../config'
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
import { getThumbsIterator, ThumbElement } from '../utils'

export type UseThumbsContainerProps = {
  images: CarouselImage[]
  thumbsContainerPropsOptions: ThumbsContainerProps['options']
}

export const useThumbsContainer = ({
  images,
  thumbsContainerPropsOptions,
}: UseThumbsContainerProps) => {
  const thumbsContainerRef = useRef<HTMLElement>(document.createElement('div'))
  const [thumbsRefs, setThumbsRefs] = useState<RefObject<HTMLButtonElement>[]>(
    []
  )
  const theme = useTheme()

  useEffect(() => {
    setThumbsRefs(
      images.map((item, index) => {
        return createRef()
      })
    )
  }, [images])

  const [thumbsContainerHeight, setThumbsContainerHeight] = useState<number>(0)
  const [thumbsContainerWidth, setThumbsContainerWidth] = useState<number>(0)
  const setHeightWidth = () => {
    const height = thumbsContainerRef.current.getBoundingClientRect().height
    const width = thumbsContainerRef.current.getBoundingClientRect().width
    setThumbsContainerHeight(height)
    setThumbsContainerWidth(width)
  }

  useEffect(() => {
    setHeightWidth()
  }, [thumbsContainerRef.current.offsetHeight])

  useEffect(() => {
    const onResize = throttle(() => {
      setHeightWidth()
    }, 250)

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const calculateMaxThumbWidth = (
    maxThumbs: number = thumbsContainerPropsOptions.maxThumbsCount
  ) => {
    const singleGapPX = Number(theme.spacing(1).replace('px', ''))
    return Math.round(thumbsContainerWidth / maxThumbs - singleGapPX)
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
      thumbsRefs,
      thumbsContainerRef
    )
    const moreToShow = images.length > thumbsInView.length
    setShowNav({
      prev: moreToShow && prevThumb !== undefined,
      next: moreToShow && nextThumb !== undefined,
    })
  }, [images, thumbsContainerRef, thumbsRefs])

  return {
    calculateMaxThumbWidth,
    scrollIntoViewAndUpdate,
    showNav,
    thumbsContainerRef,
    thumbsContainerHeight,
    thumbsContainerWidth,
    thumbsRefs,
  }
}
