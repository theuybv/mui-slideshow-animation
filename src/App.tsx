import { ImageCarousel } from "./components/ImageCarousel";
import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import { randomImages } from "./utils";
import { useRef } from "react";

function App() {
  return (
    <Box p={2}>
      <CssBaseline />
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant={"h3"}>My cool slideshow</Typography>
          <Typography variant={"body1"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ad
            adipisci aut beatae delectus doloribus eveniet, laudantium minus
            nemo neque nobis odit officiis placeat quam repudiandae rerum unde
            vel veritatis.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <ImageCarousel
            images={fakeImages}
            ratio={AspectRatios['3/2']}
            maxImageHeight={maxImageHeight}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
