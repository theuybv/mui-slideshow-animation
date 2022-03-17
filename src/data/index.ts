import { ASPECT_RATIOS } from '../utils'
import { CarouselImage } from '../components/ImageCarousel'
import { faker } from '@faker-js/faker'

export const getDemoImages = (
  numberOfImages: number,
  aspectRatio: ASPECT_RATIOS
): CarouselImage[] => {
  return [...Array(numberOfImages)].map((_value, index) => {
    const maxWidth = 1024
    const height = Math.round(aspectRatio * maxWidth)
    const width = Math.round(height * aspectRatio)

    const image = `https://picsum.photos/${width}/${height}?random=${index}`
    return {
      thumbSrc: image,
      imageSrc: image,
      alt: faker.name.lastName(),
    }
  })
}
