import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { makeStyles } from '@material-ui/styles'

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
    const {productId, quantity, subTotal} = orderProductProp
    const token = localStorage.getItem(`token`)
    const [product, setProduct] = useState({})
    const classes = useStyles()

    useEffect(() => {
        fetch(`/api/products/${productId}/`, {
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`,}
        })
        .then(response => response.json())
        .then(response => {
            setProduct(response)
        })
    }, [productId, token])
            
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
                    color='primary'
                    >
                        <RemoveCircleOutlineIcon fontSize="medium" />
                    </IconButton>
                    <Typography sx={{m: "auto .5rem", fontSize: "1.3rem"}}>{quantity}</Typography>
                    <IconButton 
                    color='primary'
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
