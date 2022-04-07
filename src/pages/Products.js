import { Backdrop, CircularProgress, Grid, Grow, Typography, useScrollTrigger } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { setProductsData } from '../redux/productSlice'
import { useNavigate } from 'react-router-dom'

function ShowProductOnScroll(props) {
  const { children, window } = props

  const onScrollDown = useScrollTrigger({
    disableHysteresis: true,
    threshold: 500,
    target: window ? window() : undefined
  })
  
  return(
    <Grow
    in={onScrollDown}
    {...(onScrollDown ? { timeout: 2000 } : {})}
    >
      {children}
    </Grow>
  )
}

export default function Products() {
  const token = localStorage.getItem(`token`)
  const [ products, setProducts ] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(user.isAdmin && token){
      navigate(`/admin`)
    }else{
      navigate(`/products#all`)
    }
  }, [user.isAdmin, navigate, token])

  useEffect(() => {
    fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products/isActive`)
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
      <ShowProductOnScroll>
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
      </ShowProductOnScroll>
    </>
  )
}
