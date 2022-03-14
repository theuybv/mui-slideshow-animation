import { ImageCarousel } from "./components/ImageCarousel";
import { Box, Container, CssBaseline } from "@mui/material";
import {
  AspectRatio,
  getWidthHeightFromAspectRatio,
  randomImages,
} from "./utils";
import { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";

function App() {
  const containerRef = useRef<HTMLElement>();
  const getDimension = () =>
    getWidthHeightFromAspectRatio(
      AspectRatio["3/2"],
      containerRef.current?.getBoundingClientRect().width
    );

  const [{ width, height }, setDimension] = useState(getDimension());

  useEffect(() => {
    const onResize = throttle(() => {
      setDimension(getDimension());
    }, 500);

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box
        width={"100%"}
        ref={containerRef}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        <CssBaseline />
        <ImageCarousel images={randomImages} width={width} height={height} />
      </Box>
    </Container>
  );
}

export default App;
