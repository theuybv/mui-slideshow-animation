import { FC, useState } from "react";
import { Box, Stack } from "@mui/material";
import { ImageDisplay } from "./ImageDisplay";
import { ThumbsContainer } from "./ThumbsContainer";

export type CarouselImage = {
  imageSrc: string;
  alt?: string;
  thumbSrc: string;
  id?: string;
};
export type ImageCarouselProps = {
  images: CarouselImage[];
  width: number;
  height: number;
};

export const ImageCarousel: FC<ImageCarouselProps> = ({
  images,
  width,
  height,
}) => {
  const [currentImage, setCurrentImage] = useState<CarouselImage | undefined>(
    images[0]
  );

  return (
    <Box width={width} height={height}>
      <Stack spacing={1.2}>
        <ImageDisplay
          key={currentImage?.imageSrc}
          src={currentImage?.imageSrc}
          height={height}
        />
        <ThumbsContainer
          images={images}
          onThumbClick={(event, clickedImageIndex) => {
            setCurrentImage((prevState) => {
              return images.find((item, index) => index === clickedImageIndex);
            });
          }}
        />
      </Stack>
    </Box>
  );
};
