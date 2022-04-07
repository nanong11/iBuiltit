import { Grid, IconButton, Paper, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AdminDashboard from '../components/AdminDashboard'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function AdminUsers() {
  const token = localStorage.getItem(`token`)
  const [users, setUsers] = useState([])
  const user = useSelector(state => state.user.value)
  const navigate = useNavigate()

  const [snackbarNotif, setSnackbarNotif] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  useEffect(() => {
    if(user.isAdmin && token){
      fetch(`https://mysterious-ocean-63835.herokuapp.com/api/users`, {
        headers: {"Authorization": `Bearer ${token}`}
      })
      .then(response => response.json())
      .then(response => setUsers(response))
    }else{
      navigate(`/`)
    }
  }, [user.isAdmin, token, navigate])

  const handleUserEdit = (oldData, newData) => {
    let firstName = oldData.row.firstName;
    let lastName = oldData.row.lastName;
    let email = oldData.row.email;
    let isAdmin = oldData.row.isAdmin;

    if(oldData.field === "firstName"){
      firstName = newData.target.value
    }else if(oldData.field === "lastName"){
      lastName = newData.target.value
    }else if(oldData.field === "email"){
      email = newData.target.value
    }else if(oldData.field === "isAdmin"){
      isAdmin = newData.target.value
    }

    fetch(`https://mysterious-ocean-63835.herokuapp.com/api/users/${oldData.id}/updateByAdmin`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName, lastName, isAdmin, email
      })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          setSnackbarMessage("User data updated")
          setSnackbarNotif(true)
          navigate(`/admin/users`)
        }
      })
    } 

  const columns = [
    { field: '_id', headerName: 'UserId', width: 150 },
    { field: "firstName", headerName: 'First Name', width: 150, editable: true },
    { field: "lastName", headerName: 'Last Name', width: 150, editable: true },
    { field: "email", headerName: 'Email', width: 150, editable: true },
    { field: "isAdmin", headerName: 'isAdmin', width: 100, editable: true},
    { field: "createdAt", headerName: 'Date Created', width: 200 },
    { field: "updatedAt", headerName: 'Date Updated', width: 200 },
    { field: "lastLoginDate", headerName: 'Last Login', width: 200 },
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
        <AdminDashboard />
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
                        USERS TABLE
                    </Typography>
                </Paper>
            </Grid>
            <Grid
            item
            sx={{ ml: "310px", mr: "10px", mt: "1rem", flexGrow: 1}}
            >
              <DataGrid
              getRowId={(row) => row._id}
              rows={users}
              columns={columns}
              pagination
              experimentalFeatures={{ newEditingApi: true }}
              onCellEditStop={(oldData, newData) => handleUserEdit(oldData, newData)}
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
