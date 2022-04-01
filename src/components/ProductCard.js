import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function ProductCard({productProp}) {
  const { productName, description, price } = productProp
  return (
    <Grid item>
      <Card 
      sx={{m: 3, maxWidth: 350, height: 650, display: "flex", flexDirection: "column"}}
      >
        <CardMedia
          component="img"
          image="/img/B450.jpg"
          sx={{ padding: 2}}
        />
        
        <CardContent
        sx={{flexGrow: 1}}
        >
          <Typography
            variant="h6"
            component="h2"
            fontWeight= "700"
          >
            {productName}
          </Typography>
          <Typography
            variant="body2"
          >
            {description}
          </Typography>
          
        </CardContent>

        <CardContent>
          <Typography
            component="div"
            sx={{fontSize: "1.2rem", fontWeight: 700 }}
            color="primary"
          >
            ${price}
          </Typography>
        </CardContent>
        
        <CardActions
          sx={{paddingLeft: "1rem", paddingRight: "1rem"}}
        >
          <Button variant='contained' size='small' sx={{mr: "auto"}}>View</Button>
          <IconButton color='primary'><RemoveCircleOutlineIcon fontSize="large" /></IconButton>
          <Typography sx={{m: "auto .5rem"}}>1</Typography>
          <IconButton color='primary'><AddCircleOutlineIcon fontSize="large" /></IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}
