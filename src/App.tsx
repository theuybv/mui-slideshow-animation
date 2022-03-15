import { ImageCarousel } from './components/ImageCarousel'
import { Grid, CssBaseline, Typography, Box } from '@mui/material'
import { AspectRatios, fakeImages } from './utils'
import { FC, useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash'

export const App: FC<{}> = () => {
  const componentRef = useRef<HTMLElement>(null)
  const getDimensions = (): { width: number | undefined; height: number | undefined } => {
    const outsideHeight = componentRef.current?.clientHeight
    const outsideWidth = outsideHeight && outsideHeight * AspectRatios['3/2']

    return {
      width: outsideWidth, // for backwards compatibility
      height: outsideHeight,
    }
  }

  const [{ width, height }, setDimensions] = useState(getDimensions())

  useEffect(() => {
    const onResize = throttle(() => {
      setDimensions(getDimensions())
    }, 500)
    setDimensions(getDimensions())
    console.log(width, height)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const maxImageHeight: number | string = 400 // or maybe '100%'

  return (
    <Box p={2}>
      <CssBaseline />
      <Grid container wrap={'nowrap'} spacing={4}>
        <Grid item xs={4}>
          <Typography variant={'h3'}>My cool slideshow</Typography>
          <Typography variant={'body1'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ad adipisci aut beatae
            delectus doloribus eveniet, laudantium minus nemo neque nobis odit officiis placeat quam
            repudiandae rerum unde vel veritatis.
          </Typography>
        </Grid>
        <Grid item xs={8}>
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
