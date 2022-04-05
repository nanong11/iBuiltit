import { Backdrop, Button, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { makeStyles } from '@material-ui/styles'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderData } from '../redux/orderSlice';
import CartItemCard from './CartItemCard';

const useStyles = makeStyles({
    cart: {
        display: "flex",
        flexDirection: "column",
        width: 400,
        padding: "1rem", 
        backgroundColor: "#edededce"
    },
    cartItem: {
        display: "flex",
        justifyContent: "space-between"
    }
})

export default function Cart() {
    const token = localStorage.getItem(`token`)
    const orderProducts = useSelector(state=> state.orderProducts.value)
    const order = useSelector((state) => state.order.value)
    const [totalPrice, setTotalPrice] = useState(order.total)
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState()
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        let totalPrice = 0;
        orderProducts.forEach(orderProduct => {
          totalPrice += orderProduct.subTotal
        })
        setTotalPrice(totalPrice)
      }, [orderProducts])
    
    useEffect(() => {
        if(order._id){
            setLoading(true)
            fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orders/${order._id}/update`, {
                method: "PUT",
                headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                total: totalPrice
                })
            })
            .then(response => response.json())
            .then(response => {
                dispatch(setOrderData(response))
                setLoading(false)
            })
        }
    }, [order._id, totalPrice, token, dispatch])

    useEffect(() => {
        setProduct(orderProducts.map(orderProduct => {
            return <CartItemCard key={orderProduct._id} orderProductProp={orderProduct} />
        }))
    }, [orderProducts])
    
  return (
    <Grid
    container
    className={classes.cart}
    >
        <Grid
        item
        sx={{display: "flex", gap: 1, justifyContent: "center", my: 2}}
        >
            <ShoppingCartIcon color='primary' fontSize='large'/>
            <Typography
            variant='h5'
            >
                {orderProducts.length} items
            </Typography>
        </Grid>
        
        <Box
        sx={{display: "flex", flexDirection: "column", gap: 1}}
        >
            {product}
        </Box>
        
        <Box
        sx={{display: "flex", flexDirection: "column", gap: 2, p: 2}}
        >
            <Button variant='contained'>
                Checkout ${order.total}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="primary" />
                </Backdrop>
            </Button>
            <Button variant='outlined'>View Cart</Button>
        </Box>
    </Grid>
  )
}
