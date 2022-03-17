import { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash'

export const useRfhCarousel = () => {
  const [imageContainerWidth, setImageContainerWidth] = useState<
    number | undefined
  >()

  const imageContainerRef = useRef<HTMLElement>(document.createElement('div'))

  useEffect(() => {
    const updateWidth = () => {
      setImageContainerWidth(
        imageContainerRef.current.getBoundingClientRect().width
      )
    }
    const onResize = throttle(() => {
      updateWidth()
    }, 100)

    updateWidth()

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return {
    imageContainerRef,
    imageContainerWidth,
  }
}
