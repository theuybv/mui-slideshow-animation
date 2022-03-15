import { FC, useState } from "react";
import { Stack, StackProps } from "@mui/material";
import { ImageDisplay } from "./ImageDisplay";
import { ThumbsContainer } from "./ThumbsContainer";

export type CarouselImage = {
  imageSrc: string;
  alt?: string;
  thumbSrc: string;
};
export type ImageCarouselProps = {
  images: CarouselImage[];
} & StackProps;

export const ImageCarousel: FC<ImageCarouselProps> = ({ images, ...rest }) => {
  const [currentImage, setCurrentImage] = useState<CarouselImage | undefined>(
    images[0]
  );

  return (
    <Stack spacing={1.2} {...rest}>
      <ImageDisplay key={currentImage?.imageSrc} src={currentImage?.imageSrc} />
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
