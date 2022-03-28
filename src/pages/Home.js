import { Grid } from '@mui/material'
import React from 'react'

export default function Home() {
  return (
    <Grid 
      container
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
      >
          <Grid item>
              <h1>Hello World</h1>

          </Grid>
    </Grid>
  )
}
