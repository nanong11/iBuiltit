import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from '../components/AdminDashboard'

export default function AdminSummary() {
    const token = localStorage.getItem(`token`)
    const user = useSelector(state => state.user.value)
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

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


    useEffect(() => {
        if(user.isAdmin && token){
          fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products`, {
            headers: {"Authorization": `Bearer ${token}`}
          })
          .then(response => response.json())
          .then(response => setProducts(response))
        }else{
          navigate(`/`)
        }
    }, [user.isAdmin, token, navigate])

    const handleClickUser = () => {
        navigate(`/admin/users`)
    }

    const handleClickProducts = () => {
        navigate(`/admin/products`)
    }

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
                >
                    <Typography
                    variant='h2'
                    component="div"
                    sx={{fontSize: "2rem", fontWeight: 700, textAlign: "center", pt: "1rem"}}
                    >
                        DASHBOARD SUMMARY
                    </Typography>
                </Paper>
            </Grid>

            <Grid
            item
            sx={{ ml: "310px", mr: "10px", mt: "1rem", p: "5rem", flexGrow: 1, display: "flex", gap: "1rem"}}
            >
                <Grid
                item
                xs={12}
                md={8}
                >
                    <Paper
                    sx={{cursor: "pointer"}}
                    onClick={(e) => handleClickUser(e)}
                    >
                        <Typography
                        variant='h3'
                        component="h3"
                        sx={{fontSize: "2rem", textAlign: "center"}}
                        >
                            USERS
                        </Typography>
                        <Typography
                        variant='body1'
                        component="p"
                        sx={{fontSize: "2rem", textAlign: "center"}}
                        >
                            {users.length}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid
                item
                xs={12}
                md={8}
                >
                    <Paper>
                        <Typography
                        variant='h3'
                        component="h3"
                        sx={{fontSize: "2rem", textAlign: "center"}}
                        >
                            PRODUCTS
                        </Typography>
                        <Typography
                        variant='body1'
                        component="p"
                        sx={{fontSize: "2rem", textAlign: "center"}}
                        >
                            {products.length}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid
                item
                xs={12}
                md={8}
                >
                    <Paper>
                        <Typography
                        variant='h3'
                        component="h3"
                        sx={{fontSize: "2rem", textAlign: "center"}}
                        >
                            ORDER PRODUCTS
                        </Typography>
                        <Typography
                        variant='body1'
                        component="p"
                        sx={{fontSize: "2rem", textAlign: "center"}}
                        >
                            1
                        </Typography>
                    </Paper>
                </Grid>

                <Grid
                item
                xs={12}
                md={8}
                >
                    <Paper>
                        <Typography
                        variant='h3'
                        component="h3"
                        sx={{fontSize: "2rem", textAlign: "center"}}
                        >
                            ORDERS
                        </Typography>
                        <Typography
                        variant='body1'
                        component="p"
                        sx={{fontSize: "2rem", textAlign: "center"}}
                        >
                            1
                        </Typography>
                    </Paper>
                </Grid>
                
                
            </Grid>

        </Grid>
    </>
  )
}
