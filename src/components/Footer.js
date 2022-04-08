import { Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { setUserData } from '../redux/userSlice';

export default function Footer() {
    const user = useSelector(state => state.user.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const handleClickLogo = () => {
        if(user.isAdmin){
          navigate(`/admin`)
        }else{
          navigate(`/`)
        }
    }

    const handleSecretPass = () => {
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: "admin@admin.com",
                password: "123123123"
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response.token !== undefined){
                localStorage.setItem(`token`, response.token)
                const {token} = response
  
                fetch(`https://mysterious-ocean-63835.herokuapp.com/api/users/profile`, {
                  method: "GET",
                  headers: {
                    "Authorization": `Bearer ${token}`
                  }
                })
                .then(response => response.json())
                .then(userData => {
                    dispatch(setUserData(userData))
                    alert(`Admin access granted.`)
                    navigate(`/admin`)
                })
            }
        })
    }
  return (
    <Grid
    container
    sx={{backgroundColor: "#232629", height: "auto"}}
    >
        <Grid
        item
        container
        xs={12}
        sx={{p: "1rem 3rem", mx: "auto", gap: "2rem", justifyContent: "space-evenly"}}
        >
            <Grid
            item
            xs={12}
            lg={1.5}
            >
                <Typography
                variant="h3"
                component="a"
                sx={{textDecoration: "none", cursor: "pointer", color: "#edededce", }}
                onClick={(e) => handleClickLogo(e)}
                >
                    iBuiltit
                </Typography>
                <Typography
                variant="body1"
                component="p"
                sx={{color: "#edededce"}}
                >
                    Build your dream PC.
                </Typography>
            </Grid>
            <Grid
            item
            xs={12}
            lg={7}
            >
                <Typography
                variant="h5"
                component="h3"
                sx={{color: "#edededce"}}
                >
                    ABOUT:
                </Typography>
                <Typography
                variant="body1"
                component="p"
                sx={{color: "#edededce"}}
                >
                    This website is my 3rd Project during our Zuitt Full-stack coding bootcamp. I used MERN (MongoDB, ExpressJS, ReactJS, NodeJS) stack in making this project. Along with Material-UI, Redux/toolkit, REST and Fetch API. I do not sell anything and this website serve only for the demonstration of my skills. 
                </Typography>
                <Typography
                variant="body1"
                component="p"
                sx={{color: "#edededce"}}
                >
                    No copyrigth intended.
                </Typography>
                <Typography
                variant="body1"
                component="p"
                sx={{color: "#edededce"}}
                >
                    *Click my name on the right to access admin features.
                </Typography>
            </Grid>
            <Grid
            item
            xs={12}
            lg={2}
            sx={{display: "flex", flexDirection: "column"}}
            >
                <Box
                sx={{display: "flex", justifyContent: "center", gap: "1rem"}}
                >
                    <IconButton
                    color="primary"
                    href='https://www.linkedin.com/in/marc-allen-nanong-73baa2232/'
                    target="_blank"
                    >
                        <LinkedInIcon fontSize='large'/>
                    </IconButton>
                    <IconButton
                    color="primary"
                    href='https://github.com/nanong11'
                    target="_blank"
                    >
                        <GitHubIcon fontSize='large'/>
                    </IconButton>
                </Box>
               
                <Typography
                variant="h3"
                component="a"
                sx={{fontSize: "1.5rem", textDecoration: "none", cursor: "pointer", color: "#edededce", textAlign: "center"}}
                onClick={(e) => handleSecretPass(e)}
                >
                    Marc Allen Nanong | 2022
                </Typography>
                
            </Grid>
        </Grid>
    </Grid>
  )
}
