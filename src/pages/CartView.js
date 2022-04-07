import { Grid } from '@mui/material'
import React from 'react'
import Cart from '../components/Cart'

export default function CartView() {
  return (
    <>
      <Grid
      container
      id="cart"
      sx={{paddingTop: "6rem", minHeight: "100vh"}}
      >
        <Grid
        item
        xs={12}
        md={4}
        sx={{mx: "auto", height: "80vh"}}
        >
          <Cart/>
        </Grid>
      </Grid>
    </>
  )
}
