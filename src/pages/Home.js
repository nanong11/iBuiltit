import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const token = localStorage.getItem(`token`)
  const user = useSelector(state => state.user.value)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(user.isAdmin && token){
      navigate(`/admin`)
    }else if(user.isAdmin === false){
      navigate(`/`)
    }
  }, [user.isAdmin, token, navigate])

  return (
    <>
      <Grid 
        container
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
        >
            <Grid item>
                

            </Grid>
      </Grid>
    </>
  )
}
