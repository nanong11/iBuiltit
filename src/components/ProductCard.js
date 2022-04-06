import React, { useEffect, useState } from 'react'
import { Backdrop, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Dialog, Grid, IconButton, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderProductData } from '../redux/orderProductsSlice';
import Login from '../pages/Login';

export default function ProductCard({productProp}) {
  const token = localStorage.getItem(`token`)
  const { _id, productName, productImg, description, price } = productProp
  const order = useSelector(state => state.order.value)
  const orderProducts = useSelector(state=> state.orderProducts.value)
  const [quantity, setQuantity] = useState(0)
  const [orderProductIdArr, setOrderProductIdArr] = useState([])
  const [loading, setLoading] = useState(false)
  const [deductIconIsDisabled, setDeductIconIsDisabled] = useState(true)
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const dispatch = useDispatch()
  
  const fetchOrderProducts = () =>{
    fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts`, {
      headers: {"Authorization": `Bearer ${token}`}
    })
    .then(response => response.json())
    .then(response => {
      response.forEach(orderProduct => {
        if(orderProduct.orderId === order._id){
          dispatch(setOrderProductData(response))
          setLoading(false)
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
    let itemQuantity = 0;
    let orderProductIdArr = []
    for (let i = 0; i < orderProducts.length; i++) {
      orderProductIdArr.push(orderProducts[i].productId)
      if(_id === orderProducts[i].productId){
        itemQuantity = orderProducts[i].quantity
      }
    }
    setQuantity(itemQuantity)
    setOrderProductIdArr(orderProductIdArr)
  }, [orderProducts, _id])
  
  useEffect(() => {
    if(quantity > 0){
      setDeductIconIsDisabled(false)
    }else{
      setDeductIconIsDisabled(true)
    }
  }, [quantity])

  const handleAddQuantity = () => {
    if(token){
      let orderProductId = orderProducts.filter(orderProduct => orderProduct.productId === _id ? orderProduct : null)
      if(orderProductIdArr.indexOf(_id) !== -1){
        setLoading(true)
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts/${orderProductId[0]._id}/addQuantity`, {
          method: "PUT",
          headers: {"Authorization": `Bearer ${token}`}
          })
          .then(response => response.json())
          .then(response => {
            fetchOrderProducts()
          })        
      }else if(orderProductIdArr.indexOf(_id) === -1){
        setLoading(true)
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts/create`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            orderId: order._id,
            productId: _id,
            quantity: 1
          })
        })
        .then(response => response.json())
        .then(response => {
          fetchOrderProducts()
        })
      }
    }else{
      setOpenLoginDialog(true)
    }
  }
  
  const handleDeductQuantity = () => {
    setLoading(true)
    let orderProduct = orderProducts.filter(orderProduct => orderProduct.productId === _id ? orderProduct : null)
    fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts/${orderProduct[0]._id}/deductQuantity`, {
      method: "PUT",
      headers: {"Authorization": `Bearer ${token}`}
      })
      .then(response => response.json())
      .then(response => {
        fetchOrderProducts()
      })
  }

  const handleCloseDialog = () => {
    setOpenLoginDialog(false)
  }

  return (
    <Grid item>
      <Card 
      sx={{m: 3, maxWidth: 350, height: 650, display: "flex", flexDirection: "column"}}
      >
        <CardMedia
          component="img"
          image="/img/B450.jpg"
          sx={{ padding: 2}}
        />
        
        <CardContent
        sx={{flexGrow: 1}}
        >
          <Typography
            variant="h6"
            component="h2"
            fontWeight= "700"
          >
            {productName}
          </Typography>
          <Typography
            variant="body2"
          >
            {description}
          </Typography>
          
        </CardContent>

        <CardContent>
          <Typography
            component="div"
            sx={{fontSize: "1.2rem", fontWeight: 700 }}
            color="primary"
          >
            ${price}
          </Typography>
        </CardContent>
        
        <CardActions
          sx={{paddingLeft: "1rem", paddingRight: "1rem"}}
        >
          <Button
          variant='contained'
          size='small' 
          sx={{mr: "auto"}}
          href={`/${_id}#productView`}
          >
            View
          </Button>
          <IconButton
          disabled={deductIconIsDisabled}
          color='primary'
          onClick={(e) => handleDeductQuantity(e)}
          >
            <RemoveCircleOutlineIcon fontSize="large" />
          </IconButton>
          <Typography sx={{m: "auto .5rem"}}>{quantity}</Typography>
          <IconButton
          color='primary'
          onClick={(e) => handleAddQuantity(e)}
          >
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </CardActions>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      </Card>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={openLoginDialog}
        onClose={(e) => handleCloseDialog(e)}
      >
        <Login />
      </Dialog>
    </Grid>
  )
}
