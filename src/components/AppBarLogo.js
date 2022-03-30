import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function AppBarLogo() {
  return (
    <>
    <AppBar>
        <Container maxWidth="lg">
            <Toolbar>
                <Typography
                variant="h3"
                component="a"
                href="/"
                color="white"
                sx={{ m: "auto", display: { xs: 'none', md: 'flex' }, textDecoration: "none" }}
                >
                iBuiltit
                </Typography>
            </Toolbar>
        </Container>
    </AppBar>
    </>
  )
}
