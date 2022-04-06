import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { makeStyles } from '@material-ui/styles'
import { setOrderProductData } from '../redux/orderProductsSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
    cart: {
        display: "flex",
        flexDirection: "column",
        width: 400,
        height: "100vh", 
        padding: "1rem", 
        backgroundColor: "#edededce"
    },
    cartItem: {
        display: "flex",
        justifyContent: "space-between"
    }
})

export default function CartItemCard({orderProductProp}) {
    const {_id, productId, quantity, subTotal} = orderProductProp
    const token = localStorage.getItem(`token`)
    const [product, setProduct] = useState({})
    const classes = useStyles()
    const dispatch = useDispatch()
    const order = useSelector(state => state.order.value)
    const [deductIconIsDisabled, setDeductIconIsDisabled] = useState(true)

    const fetchOrderProducts = () =>{
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts`, {
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(response => {
          response.forEach(orderProduct => {
            if(orderProduct.orderId === order._id){
              dispatch(setOrderProductData(response))
            }
            if(orderProduct.quantity === 0){
              fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts/${orderProduct._id}/delete`, {
              method: "DELETE",
              headers: {"Authorization": `Bearer ${token}`}
              })
              .then(response => response.json())
              .then(response => {
              fetchOrderProducts()
              })
            }
          })
        })
      }
      
    useEffect(() => {
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products/${productId}/`, {
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`,}
        })
        .then(response => response.json())
        .then(response => {
            setProduct(response)
        })
    }, [productId, token])

    useEffect(() => {
        if(quantity > 0){
          setDeductIconIsDisabled(false)
        }else{
          setDeductIconIsDisabled(true)
        }
      }, [quantity])

    const handleAddQuantity = () => {
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts/${_id}/addQuantity`, {
            method: "PUT",
            headers: {"Authorization": `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(response => {
            fetchOrderProducts()
        })
    }
    
    const handleDeductQuantity = () => {
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts/${_id}/deductQuantity`, {
            method: "PUT",
            headers: {"Authorization": `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(response => {
            fetchOrderProducts()
        })
    }
            
  return (
    <Grid
    item
    className={classes.cartItem}
    >
        <Paper
        elevation={0}
        sx={{padding: 1, flexGrow: 1}}
        >
            <Typography
            variant='h6'
            sx={{fontSize: "1.2rem", textAlign: "center"}}
            >
                {product.productName}
            </Typography>
            <Box
            sx={{display: "flex", px: 5}}
            >
                <Box sx={{flexGrow: 1, display: "flex"}}>
                    <IconButton
                    disabled={deductIconIsDisabled}
                    color='primary'
                    onClick={(e) => handleDeductQuantity(e)}
                    >
                        <RemoveCircleOutlineIcon fontSize="medium" />
                    </IconButton>
                    <Typography sx={{m: "auto .5rem", fontSize: "1.3rem"}}>{quantity}</Typography>
                    <IconButton 
                    color='primary'
                    onClick={(e) => handleAddQuantity(e)}
                    >
                        <AddCircleOutlineIcon fontSize="medium" />
                    </IconButton>
                </Box>
                <Box>
                    <Typography
                    sx={{fontSize: ".8rem"}}
                    >
                        {product.price} x {quantity}
                    </Typography>
                    
                    <Typography
                    variant='h6'
                    sx={{fontSize: "1rem"}}
                    >
                            {subTotal}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    </Grid>
  )
}
