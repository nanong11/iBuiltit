import { Grid, Grow, ImageList, ImageListItem, useScrollTrigger } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const imgData = [
  {
    img: "./img/rog-strix-z690-e.jpg",
    title: "rog-strix-z690-e"
  },
  {
    img: "./img/intel-ryzen1.jpg",
    title: "intel and ryzen"
  },
  {
    img: "./img/seasonic.jpg",
    title: "seasonic"
  },
  {
    img: "./img/rog-strix-3090-white.jpg",
    title: "rog-strix-3090-white"
  },
  {
    img: "./img/tridentZ.jpg",
    title: "tridentz"
  },
  {
    img: "./img/rog-strix-3090.jpg",
    title: "rog-strix-3090"
  },
]

function ShowImageOnScroll(props) {
  const { children, window } = props

  const onScrollDown = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
    target: window ? window() : undefined
  })
  
  return(
    <Grow 
    in={onScrollDown}
    {...(onScrollDown ? { timeout: 2000 } : {})}
    >
      {children}
    </Grow>
  )
}

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
        >

            <Grid
            item
            sx={{p: "1rem" }}
            xs={12}
            >
                <ImageList 
                cols={3}
                >
                  {imgData.map((item) => (
                    <ShowImageOnScroll
                    key={item.title}
                    >
                      <ImageListItem
                      key={item.title}
                      sx={{p: 2, display: "flex", justifyContent: "center", alignItems: "center"}}
                      >
                        <img
                        style={{borderRadius: "5px"}}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        />
                      </ImageListItem>
                    </ShowImageOnScroll>
                  ))}
                </ImageList>
            </Grid>
      </Grid>
    </>
  )
}
