import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserData } from '../redux/userSlice';

export default function AppBarLogo() {
  const token = localStorage.getItem(`token`)
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

  useEffect(() => {
    if(token){
      fetch(`https://mysterious-ocean-63835.herokuapp.com/api/users/profile`, {
        headers: {"Authorization": `Bearer ${token}`}
      })
      .then(response => response.json())
      .then(response => {
        dispatch(setUserData(response))
      })
    }
  }, [token, dispatch])

  return (
    <>
    <AppBar
    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
        <Container maxWidth="lg">
            <Toolbar>
                <Typography
                variant="h3"
                component="a"
                color="white"
                sx={{ m: "auto", textDecoration: "none", cursor: "pointer"}}
                onClick={(e) => handleClickLogo(e)}
                >
                iBuiltit
                </Typography>
            </Toolbar>
        </Container>
    </AppBar>
    </>
  )
}
