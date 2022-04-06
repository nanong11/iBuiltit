import React from 'react'
import Drawer from '@mui/material/Drawer';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const user = useSelector(state => state.user.value)
    const drawerWidth = 300;
    const navigate = useNavigate()

    const handleClickSummary =() => {
        navigate(`/admin`)
    }
    const handleClickUser = () => {
        navigate(`/admin/users`)
    }

    const handleClickProducts = () => {
        navigate(`/admin/products`)
    }
    
  return (
    <>
        <Drawer
        ModalProps={{
            keepMounted: true
        }}
        variant='permanent'
        sx={{width: drawerWidth, 
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            display: "flex",
            flexDirection: "column",
        }}
        >
            <Box
            sx={{mt: "5rem", mx: "auto", display: "flex", flexDirection: "column", gap: ".5rem"}}
            >
                <Typography
                variant='h2'
                sx={{fontSize: "1.8rem", fontWeight: "700", textAlign: "center"}}
                >
                    {user.firstName} {user.lastName}
                </Typography>
                <Typography
                variant='h6'
                sx={{fontSize: "1rem", textAlign: "center"}}
                >
                    {user.email}
                </Typography>
            </Box>
            <Box
            sx={{mt: "1rem", mx: "2rem", display: "flex", flexDirection: "column", gap: "1rem", flexGrow: 1}}
            >
                <Typography
                variant='h6'
                component="a"
                sx={{fontSize: "1.3rem", cursor: "pointer"}}
                onClick={(e) => handleClickSummary(e)}
                >
                    SUMMARY
                </Typography>

                <Typography
                variant='h6'
                component="a"
                sx={{fontSize: "1.3rem", cursor: "pointer"}}
                onClick={(e) => handleClickUser(e)}
                >
                    Users
                </Typography>
                <Typography
                variant='h6'
                component="a"
                sx={{fontSize: "1.3rem", cursor: "pointer"}}
                onClick={(e) => handleClickProducts(e)}
                >
                    Products
                </Typography>
                <Typography
                variant='h6'
                component="a"
                sx={{fontSize: "1.3rem", cursor: "pointer"}}
                >
                    Order Products
                </Typography>
                <Typography
                variant='h6'
                component="a"
                sx={{fontSize: "1.3rem", cursor: "pointer"}}
                >
                    Orders
                </Typography>
            </Box>
            <Box
            sx={{my: "1rem", mx: "auto"}}
            >
                <Typography
                component="a"
                sx={{fontSize: "1.3rem", textDecoration: "none"}}
                href="/logout"
                >
                    Logout
                </Typography>
            </Box>
        </Drawer>
    </>
  )
}
