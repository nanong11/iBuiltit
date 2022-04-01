import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { setProductsData } from '../redux/productSlice'

export default function Products() {
  const token = localStorage.getItem(`token`)
  const user = useSelector((state => state.user.value))
  const [ products, setProducts ] = useState([])
 
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(user.isAdmin === false){
      fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products`, {
        headers: {"Authorization": `Bearer ${token}`}
      })
      .then(response => response.json())
      .then(response => {
        dispatch(setProductsData(response))
        setProducts(response.map(product => {
          return <ProductCard key={product._id} productProp={product} />
        }))
      })
    }
  }, [user.isAdmin, dispatch, token])

  return (
    <>
      <Grid
      id="products"
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
      </Grid>
    </>
  )
}
