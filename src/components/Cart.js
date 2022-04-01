import { Button, Grid, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { makeStyles } from '@material-ui/styles'
import { Box } from '@mui/system';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const useStyles = makeStyles({
    cart: {
        display: "flex",
        flexDirection: "column",
        width: 400,
        height: "100vh", 
        padding: "1rem", 
        backgroundColor: "#edededce"
    },
    cartItem: {
        display: "flex",
        justifyContent: "space-between"
    }
})

export default function Cart() {
    const classes = useStyles()
  return (
    <Grid
    container
    className={classes.cart}
    >
        <Grid
        item
        sx={{display: "flex", gap: 1, justifyContent: "center", my: 2}}
        >
            <ShoppingCartIcon color='primary' fontSize='large'/>
            <Typography
            variant='h5'
            >
                3 items
            </Typography>
        </Grid>
        
        <Box
        sx={{flexGrow: 1, display: "flex", flexDirection: "column", gap: 1}}
        >
            <Grid
            item
            className={classes.cartItem}
            >
                <Paper
                elevation={0}
                sx={{padding: 1, flexGrow: 1}}
                >
                    <Typography
                    variant='h6'
                    sx={{fontSize: "1.2rem", textAlign: "center"}}
                    >
                        ROG STRIX B660-G GAMING WIFI
                    </Typography>
                    <Box
                    sx={{display: "flex", px: 5}}
                    >
                        <Box sx={{flexGrow: 1, display: "flex"}}>
                            <IconButton color='primary'><RemoveCircleOutlineIcon fontSize="medium" /></IconButton>
                            <Typography sx={{m: "auto .5rem", fontSize: "1.3rem"}}>1</Typography>
                            <IconButton color='primary'><AddCircleOutlineIcon fontSize="medium" /></IconButton>
                        </Box>
                        <Box>
                            <Typography
                            sx={{fontSize: ".8rem"}}
                            >
                                $374.99 x 1
                            </Typography>
                            
                            <Typography
                            variant='h6'
                            sx={{fontSize: "1rem"}}
                            >
                                    $374.99
                            </Typography>
                        </Box>
                    </Box>
                    
                    
                </Paper>
            </Grid>
            <Grid
            item
            className={classes.cartItem}
            >
                <Paper
                elevation={0}
                sx={{padding: 1, flexGrow: 1}}
                >
                    <Typography
                    variant='h6'
                    sx={{fontSize: "1.2rem", textAlign: "center"}}
                    >
                        ROG STRIX B660-G GAMING WIFI
                    </Typography>
                    <Box
                    sx={{display: "flex", px: 5}}
                    >
                        <Box sx={{flexGrow: 1, display: "flex"}}>
                            <IconButton color='primary'><RemoveCircleOutlineIcon fontSize="medium" /></IconButton>
                            <Typography sx={{m: "auto .5rem", fontSize: "1.3rem"}}>1</Typography>
                            <IconButton color='primary'><AddCircleOutlineIcon fontSize="medium" /></IconButton>
                        </Box>
                        <Box>
                            <Typography
                            sx={{fontSize: ".8rem"}}
                            >
                                $374.99 x 1
                            </Typography>
                            
                            <Typography
                            variant='h6'
                            sx={{fontSize: "1rem"}}
                            >
                                    $374.99
                            </Typography>
                        </Box>
                    </Box>
                    
                    
                </Paper>
            </Grid>
        </Box>
        
        <Box
        sx={{display: "flex", flexDirection: "column", gap: 2, p: 2}}
        >
            <Button variant='contained'>Checkout $374.99</Button>
            <Button variant='outlined'>View Cart</Button>
        </Box>
    </Grid>
  )
}
