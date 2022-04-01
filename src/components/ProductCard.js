import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function ProductCard({productProp}) {
  const { productName, description, price } = productProp
  return (
    <Grid item>
      <Card sx={{m: 1, maxWidth: 350}}>
        <CardMedia
          component="img"
          image="/img/B450.jpg"
          sx={{ padding: 2}}
        />
        <CardContent>
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
          <Typography
            sx={{mt: 1, fontSize: "1.2rem", fontWeight: 700 }}
            color="primary"
          >
            ${price}
          </Typography>
        </CardContent>
        <CardActions>
            <Button variant='contained' size='small' sx={{mr: "auto"}}>View</Button>
            <IconButton color='primary'><RemoveCircleOutlineIcon fontSize="large" /></IconButton>
            <Typography sx={{ml: "1"}}>1</Typography>
            <IconButton color='primary'><AddCircleOutlineIcon fontSize="large" /></IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}
