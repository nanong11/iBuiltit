import { Grid, IconButton, Paper, Snackbar, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from '../components/AdminDashboard'
import CloseIcon from '@mui/icons-material/Close';

export default function AdminOrders() {
    const token = localStorage.getItem(`token`)
    const user = useSelector(state => state.user.value)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    const [snackbarNotif, setSnackbarNotif] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    useEffect(() => {
        if(user.isAdmin && token){
          fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orders`, {
            headers: {"Authorization": `Bearer ${token}`}
          })
          .then(response => response.json())
          .then(response => setOrders(response))
        }else{
          navigate(`/`)
        }
      }, [user.isAdmin, token, navigate])

    const handleOrderEdit = (oldData, newData) => {
        let complete = oldData.row.complete
        let total = oldData.row.total

        switch (oldData.field) {
            case "complete":
                complete = newData.target.value
                break;
            case "total":
                total = newData.target.value
                break;
            default:
                break;
        }
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/orders/${oldData.id}/update`, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                complete, total
            })
        })
        .then(response => response.json())
        .then(response => {
          if(response){
            setSnackbarMessage("Order Data updated")
            setSnackbarNotif(true)
            navigate(`/admin/orders`)
          }
        })
    }

    const columns = [
      { field: "_id", headerName: "OrderProductId", width: 250 },
      { field: "userId", headerName: 'UserId', width: 250 },
      { field: "transactionDate", headerName: 'Transaction Date', width: 200 },
      { field: "complete", headerName: "Complete", width: 100, editable: true },
      { field: "total", headerName: "Total", width: 100, editable: true },
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
                        ORDERS TABLE
                    </Typography>
                </Paper>
            </Grid>

            <Grid
            item
            sx={{ ml: "310px", mr: "10px", mt: "1rem", flexGrow: 1}}
            >
                <DataGrid
                getRowId={(row) => row._id}
                rows={orders}
                columns={columns}
                pagination
                experimentalFeatures={{ newEditingApi: true }}
                onCellEditStop={(oldData, newData) => handleOrderEdit(oldData, newData)}
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