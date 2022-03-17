import { faker } from '@faker-js/faker'
import { AspectRatio, CarouselImage } from '../config'

export const getDemoImages = (
  numberOfImages: number,
  aspectRatio: AspectRatio
): CarouselImage[] => {
  return [...Array(numberOfImages)].map((_value, index) => {
    const maxWidth = 1024
    // const height = Math.round(aspectRatio * maxWidth)
    // const width = Math.round(height * aspectRatio)
    const height = aspectRatio * maxWidth
    const width = height * aspectRatio

    const image = `https://picsum.photos/${width}/${height}?random=${index}`
    return {
      thumbSrc: image,
      imageSrc: image,
      alt: faker.name.lastName(),
    }
  })
}
