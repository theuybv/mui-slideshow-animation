import { ImageCarouselProps } from '../components/ImageCarousel'
import { faker } from '@faker-js/faker'
import { RefObject } from 'react'
import { images } from '../data'

export enum ASPECT_RATIOS {
  '16/9' = 16 / 9,
  '9/16' = 9 / 16,
  '3/2' = 3 / 2,
  '3/4' = 3 / 4,
  '4/3' = 4 / 3,
  '1/1' = 1,
}

export const fakeImages: ImageCarouselProps['images'] = [
  ...Array(images.length),
].map((_value, index) => ({
  imageSrc: images[index].image,
  thumbSrc: images[index].thumbnail,
  alt: faker.name.lastName(),
}))
export const intersectRect = (aElement: HTMLElement, bElement: HTMLElement) => {
  const a = aElement.getBoundingClientRect()
  const b = bElement.getBoundingClientRect()
  return (
    a.left <= b.right &&
    b.left <= a.right &&
    a.top <= b.bottom &&
    b.top <= a.bottom
  )
}

export type ThumbElement = {
  index: number
  element: HTMLElement
  isInView: boolean
}

export const getThumbsIterator = (
  thumbRefs: RefObject<HTMLElement>[],
  thumbsContainerRef: RefObject<HTMLElement>
) => {
  const thumbElements = thumbRefs.map((value, thumbElementIndex) => {
    return {
      index: thumbElementIndex,
      element: value.current,
      isInView: intersectRect(
        value.current as HTMLElement,
        thumbsContainerRef.current as HTMLElement
      ),
    } as ThumbElement
  })

  const thumbsInView = thumbElements.filter(value => value.isInView)
  const lastThumbInView = thumbsInView[thumbsInView.length - 1]
  const firstThumbInView = thumbsInView[0]
  const nextThumb = lastThumbInView && thumbElements[lastThumbInView.index + 1]
  const prevThumb =
    firstThumbInView && thumbElements[firstThumbInView.index - 1]

  return {
    lastThumbInView,
    firstThumbInView,
    nextThumb,
    prevThumb,
    thumbsInView,
  }
}
