import { Backdrop, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch } from 'react-redux'
import { setProductsData } from '../redux/productSlice'

export default function Products() {
  const [ products, setProducts ] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(() => {
    setLoading(true)
    fetch(`/api/products/isActive`)
    .then(response => response.json())
    .then(response => {
      dispatch(setProductsData(response))
      setProducts(response.map(product => {
        return <ProductCard key={product._id} productProp={product} />
      }))
      setLoading(false)
    })
  }, [dispatch])

  return (
    <>
      <Grid
      container
      id="all"
      sx={{paddingTop: "6rem"}}
      >
        <Typography
          variant='h5'
          component='div'
          textAlign="center"
          sx={{m: "auto", width: "10%"}}
        >
          All Products
        </Typography>
      </Grid>
      
      <Grid
        container
        justifyContent="center"
      > 
        {products}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      </Grid>
    </>
  )
}
