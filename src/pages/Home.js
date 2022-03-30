import { Grid } from '@mui/material'
import React from 'react'
import Banner from '../components/Banner'

export default function Home() {
  return (
    <Grid 
      container
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
      >
          <Grid item>
              <Banner />

          </Grid>
    </Grid>
  )
}
