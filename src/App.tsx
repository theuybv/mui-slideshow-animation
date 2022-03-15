import { ImageCarousel } from "./components/ImageCarousel";
import { Grid, Container, CssBaseline, Typography, Box } from "@mui/material";
import {
  AspectRatio,
  getMaxDimensionFromAspectRatio,
  randomImages,
} from "./utils";
import { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";

function App() {
  const containerRef = useRef<HTMLElement>();
  const getDimension = () =>
    getMaxDimensionFromAspectRatio(
      AspectRatio["3/2"],
      containerRef.current?.getBoundingClientRect().width
    );

  const [{ width, height }, setDimension] = useState(getDimension());

  useEffect(() => {
    const onResize = throttle(() => {
      setDimension(getDimension());
    }, 500);

    setDimension(getDimension());

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Box p={2}>
      <CssBaseline />
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography variant={"h3"}>My cool slideshow</Typography>
          <Typography variant={"body1"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ad
            adipisci aut beatae delectus doloribus eveniet, laudantium minus
            nemo neque nobis odit officiis placeat quam repudiandae rerum unde
            vel veritatis.
          </Typography>
        </Grid>

        <Grid item xs={8}>
          <ImageCarousel images={randomImages} width={width} height={height} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
