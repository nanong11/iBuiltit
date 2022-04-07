import { Grid, IconButton, Paper, Snackbar, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from '../components/AdminDashboard'
import CloseIcon from '@mui/icons-material/Close';

export default function AdminOrderProducts() {
    const token = localStorage.getItem(`token`)
    const user = useSelector(state => state.user.value)
    const [orderProducts, setOrderProducts] = useState([])
    const navigate = useNavigate()

    const [snackbarNotif, setSnackbarNotif] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    useEffect(() => {
      if(user.isAdmin){
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts`, {
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(response => {
          response.forEach(orderProduct => {
            if(orderProduct.quantity === 0){
              fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts/${orderProduct._id}/delete`, {
              method: "DELETE",
              headers: {"Authorization": `Bearer ${token}`}
              })
              .then(response => response.json())
              .then(response => {
                if(response){
                  setSnackbarMessage("Order Product deleted")
                  setSnackbarNotif(true)
                }
              })
            }
          })
        })
      }
    }, [token, user.isAdmin])

    useEffect(() => {
        if(user.isAdmin && token){
          fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts`, {
            headers: {"Authorization": `Bearer ${token}`}
          })
          .then(response => response.json())
          .then(response => setOrderProducts(response))
        }else{
          navigate(`/`)
        }
      }, [user.isAdmin, token, navigate])

    const handleOrderProductEdit = (oldData, newData) => {
        let quantity = oldData.row.quantity

        switch (oldData.field) {
            case "quantity":
                quantity = newData.target.value
                break;
            default:
                break;
        }
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orderProducts/${oldData.id}/update`, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantity
            })
        })
        .then(response => response.json())
        .then(response => {
          if(response){
            setSnackbarMessage("Order Product updated")
            setSnackbarNotif(true)
            navigate(`/admin/orderProducts`)
          }
        })
    }

    const columns = [
      { field: "_id", headerName: "OrderProductId", width: 250 },
      { field: "productId", headerName: 'ProductId', width: 250 },
      { field: "price", headerName: 'Price', width: 100, },
      { field: "quantity", headerName: "Quantity", width: 100, editable: true },
      { field: "subTotal", headerName: "SubTotal", width: 100 },
      { field: "createdAt", headerName: 'Date Created', width: 200 },
      { field: "updatedAt", headerName: 'Date Updated', width: 200 },
    ];

    const handleCloseSnackbarNotif = (event, reason) => {
      if(reason === 'clickaway'){
        return;
      }
      setSnackbarNotif(false)
    }
  
    const saveSnackbarNotifAction = (
      <>
        <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(e) => handleCloseSnackbarNotif(e)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </>
    )

  return (
    <>
        <AdminDashboard/>
        
        <Grid
        container
        sx={{ height: "100vh", display: "flex", flexDirection: "column"}}
        >
            <Grid
            item
            sx={{ ml: "310px", mr: "10px", mt: "5rem"}}
            >
                <Paper
                sx={{height: "5rem", width: "80%", mx: "auto"}}
                elevation={0}
                >
                    <Typography
                    variant='h2'
                    component="div"
                    sx={{fontSize: "2rem", fontWeight: 700, textAlign: "center", pt: "1rem"}}
                    >
                        ORDER PRODUCTS TABLE
                    </Typography>
                </Paper>
            </Grid>

            <Grid
            item
            sx={{ ml: "310px", mr: "10px", mt: "1rem", flexGrow: 1}}
            >
                <DataGrid
                getRowId={(row) => row._id}
                rows={orderProducts}
                columns={columns}
                pagination
                experimentalFeatures={{ newEditingApi: true }}
                onCellEditStop={(oldData, newData) => handleOrderProductEdit(oldData, newData)}
                />
            </Grid>
        </Grid>
        <Snackbar
          open={snackbarNotif}
          autoHideDuration={6000}
          onClose={(event, reason) => handleCloseSnackbarNotif(event, reason)}
          message={snackbarMessage}
          action={saveSnackbarNotifAction}
        />
    </>
  )
}
