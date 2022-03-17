import { Box, CssBaseline, Grid, Stack, Typography } from '@mui/material'
import { getDemoImages } from './components/RfhCarousel/data'
import { RfhCarousel } from './components/RfhCarousel'
import { VFC } from 'react'
import { AspectRatio, CarouselDefaults } from './components/RfhCarousel/config'

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
            <Typography variant={'h6'}>
              image maxHeight (default): {CarouselDefaults.imageMaxHeight}, 20
              images, 1:1
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <RfhCarousel
              maxHeight={CarouselDefaults.imageMaxHeight}
              images={getDemoImages(20, AspectRatio['1/1'])}
              ratio={AspectRatio['3/2']}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant={'h6'}>
              image maxHeight 600, 4 images, 3:2
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <RfhCarousel
              maxHeight={600}
              images={getDemoImages(4, AspectRatio['3/2'])}
              ratio={AspectRatio['3/2']}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant={'h6'}>
              image maxHeight: 235, 10 images, 4:3
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <RfhCarousel
              maxHeight={235}
              images={getDemoImages(10, AspectRatio['4/3'])}
              ratio={AspectRatio['3/2']}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}

export default App
