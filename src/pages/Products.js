import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { setProductsData } from '../redux/productSlice'

const token = localStorage.getItem(`token`)

export default function Products() {
  
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
  }, [user.isAdmin, dispatch])

  return (
    <>
      <Grid
        id="products"
        container
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
        >
          
            {products}
      </Grid>
    </>
  )
}
