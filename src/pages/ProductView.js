import { Backdrop, Button, CircularProgress, Dialog, Grid, IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderProductData } from '../redux/orderProductsSlice';
import Login from './Login';

export default function ProductView() {
    const token = localStorage.getItem(`token`)
    const { productId } =  useParams()
    const [deductIconIsDisabled, setDeductIconIsDisabled] = useState(true)
    const [quantity, setQuantity] = useState(0)
    const [productData, setProductData] = useState({})
    const [loading, setLoading] = useState(false)
    const orderProducts = useSelector(state=> state.orderProducts.value)
    const order = useSelector(state => state.order.value)
    const dispatch = useDispatch()
    const [orderProductIdArr, setOrderProductIdArr] = useState([])
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const user = useSelector(state => state.user.value)
    const navigate = useNavigate()

    useEffect(() => {
      if(user.isAdmin){
        navigate(`/admin`)
      }
    }, [user.isAdmin, navigate])

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
          dispatch(setOrderProductData(response))
        })
    }

    useEffect(() =>{
        if(productId){
            fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products/${productId}`, {
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`}
            })
            .then(response => response.json())
            .then(response => {
                setProductData(response)
                setLoading(false)
            })
        }
    }, [productId, token])

    useEffect(() => {
        let itemQuantity = 0;
        let orderProductIdArr = []
        for (let i = 0; i < orderProducts.length; i++) {
          orderProductIdArr.push(orderProducts[i].productId)
          if(productId === orderProducts[i].productId){
            itemQuantity = orderProducts[i].quantity
          }
        }
        setQuantity(itemQuantity)
        setOrderProductIdArr(orderProductIdArr)
    }, [orderProducts, productId])

    const handleAddQuantity = () => {
        if(token){
            let orderProductId = orderProducts.filter(orderProduct => orderProduct.productId === productId ? orderProduct : null)
            if(orderProductIdArr.indexOf(productId) !== -1){
              setLoading(true)
              fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts/${orderProductId[0]._id}/addQuantity`, {
                method: "PUT",
                headers: {"Authorization": `Bearer ${token}`}
                })
                .then(response => response.json())
                .then(response => {
                  fetchOrderProducts()
                })        
            }else if(orderProductIdArr.indexOf(productId) === -1){
              setLoading(true)
              fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts/create`, {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  orderId: order._id,
                  productId: productId,
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
        let orderProduct = orderProducts.filter(orderProduct => orderProduct.productId === productId ? orderProduct : null)
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts/${orderProduct[0]._id}/deductQuantity`, {
          method: "PUT",
          headers: {"Authorization": `Bearer ${token}`}
          })
          .then(response => response.json())
          .then(response => {
            fetchOrderProducts()
            setLoading(false)
          })        
    }

    const handleCloseDialog = () => {
        setOpenLoginDialog(false)
    }

    useEffect(() => {
      if(quantity > 0){
        setDeductIconIsDisabled(false)
      }else{
        setDeductIconIsDisabled(true)
      }
    }, [quantity])
    
  return (
    <Grid
    id='productView'
    container
    sx={{ minHeight: "100vh", width: "80vw", m: "auto", pt: "6rem"}}
    >
        <Grid
        item
        xs={12}
        md={6}
        sx={{p: "2rem"}}
        > 
            <Paper
            sx={{p: "2rem", height: "auto"}}
            >
                <img src='/img/B450.jpg' style={{ width: "100%", height: "auto"}} alt=""/>
            </Paper>
        </Grid>
        <Grid
        item
        xs={12}
        md={6}
        sx={{ p: "2rem", display: "flex", flexDirection: "column", gap: "1rem"}}
        >   
            <Box
            sx={{ textAlign: "center"}}
            >
                <Typography
                variant="h4"
                component="h1"
                sx={{fontWeight: 700}}
                >
                    {productData.productName}
                </Typography>
            </Box>
            
            <Box
            sx={{ textAlign: "justify"}}
            >
                <Typography
                variant="body1"
                component="p"
                
                >
                    {productData.description}
                </Typography>
                
            </Box>
            <Box
            sx={{px: "1rem"}}
            >
                <Typography
                component="div"
                sx={{fontSize: "2rem", fontWeight: 700}}
                color="primary"
                >
                    ${productData.price}
                </Typography>
            </Box>
            <Box
            sx={{display: "flex", px: ".5rem"}}
            >
                {
                    quantity > 0
                    ?
                    <>
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
                    </>
                    :
                    <>
                    <Button
                    variant='contained'
                    size='large'
                    onClick={(e) => handleAddQuantity(e)} 
                    >
                        Add to cart
                    </Button>
                    </>
                }
            </Box>
        </Grid>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        >
            <CircularProgress color="primary" />
        </Backdrop>
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
