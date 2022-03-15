import { FC, useState } from 'react'
import { Box, Stack } from '@mui/material'
import { ImageFrame } from './ImageFrame'
import { ThumbsContainer } from './ThumbsContainer'

export type CarouselImage = {
  imageSrc: string
  thumbSrc: string
  alt?: string
}

export type ImageCarouselProps = {
  images: CarouselImage[]
  ratio: number
  maxImageHeight: number
} & StackProps;

export const ImageCarousel: FC<ImageCarouselProps> = ({ images, ratio, maxImageHeight }) => {
  const [currentImage, setCurrentImage] = useState<CarouselImage | undefined>(images[0])
  console.log(ratio, maxImageHeight)

  return (
    <Stack spacing={1.2} {...rest}>
        <Box position={'relative'} height={0} paddingBottom={`${100 / ratio}%`}>
          <Box position={'absolute'} top={0} right={0} bottom={0} left={0} bgcolor={'black'}>
            <ImageFrame key={currentImage?.imageSrc} src={currentImage?.imageSrc} />
          </Box>
        </Box>
      <ThumbsContainer
        options={{
          thumbsGap: 1.2,
          maxThumbsCount: 6,
        }}
        images={images}
        onThumbClick={(event, clickedImageIndex) => {
          setCurrentImage((prevState) => {
            return images.find((item, index) => index === clickedImageIndex);
          });
        }}
      />
    </Stack>
  );
};
