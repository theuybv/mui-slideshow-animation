import { Box, CssBaseline, Grid, Stack, Typography } from '@mui/material'
import { getDemoImages } from './components/RfhCarousel/data'
import {
  ASPECT_RATIOS,
  CarouselDefaults,
} from './components/RfhCarousel/config'
import { RfhCarousel } from './components/RfhCarousel'
import { VFC } from 'react'

const App: VFC = () => {
  return (
    <Box p={2}>
      <CssBaseline />
      <Stack gap={4}>
        <Typography variant={'h3'}>
          xs: 5 thumbs, {'>'} xs: 6 thumbs, carousel 3:2 (contain), thumb 4:3
          (cover)
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant={'h6'}>20 images 1:1</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <RfhCarousel
              maxHeight={CarouselDefaults.imageMaxHeight}
              images={getDemoImages(20, ASPECT_RATIOS['1/1'])}
              ratio={ASPECT_RATIOS['3/2']}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant={'h6'}>4 images image 3:2</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <RfhCarousel
              maxHeight={CarouselDefaults.imageMaxHeight}
              images={getDemoImages(4, ASPECT_RATIOS['3/2'])}
              ratio={ASPECT_RATIOS['3/2']}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant={'h6'}>10 images image 4:3</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <RfhCarousel
              maxHeight={CarouselDefaults.imageMaxHeight}
              images={getDemoImages(10, ASPECT_RATIOS['4/3'])}
              ratio={ASPECT_RATIOS['3/2']}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}

export default App
