import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Dialog, Slide} from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Login from '../pages/Login';

const pages = [
  {
    pageName: 'Processor',
    path: '#'
  },
  {
    pageName: 'GPU',
    path: '#'
  },
  {
    pageName: 'Motherboard',
    path: '#'
  },
  {
    pageName: 'Ram',
    path: '#'
  },
  {
    pageName: 'Storage',
    path: '#'
  },
  {
    pageName: 'PSU',
    path: '#'
  },
  {
    pageName: 'Case',
    path: '#'
  },
  {
    pageName: 'Peripherals',
    path: '#'
  },
  {
    pageName: 'Accessories',
    path: '#'
  },
];

const settings = ['Profile', 'Dashboard', 'Logout'];

  
export default function AppNavBar(props) {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  /* NavMenu */
  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  /* User Menu */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  /* Login Dialog */
  const handleOpenDialog = () => {
    setOpenLoginDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenLoginDialog(false)
  }
  
  /* Show AppBar on scroll down */
  
  function ShowAppBarOnScroll(props) {
    const { children, window } = props

    const trigger = useScrollTrigger({
      target: window ? window() : undefined
    })
    
    return(
      <Slide appear={false} direction='down' in={!trigger}>
        {children}
      </Slide>
    )
  }
  return(
    <ShowAppBarOnScroll {...props}>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Large screen LOGO */}
            <Typography
              variant="h6"
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              iBuiltit
            </Typography>

            {/* Small screen category */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => handleOpenNavMenu(e)}
                color="inherit"
              >
                <CategoryRoundedIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={(e) => handleCloseNavMenu(e)}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.pageName} onClick={(e) => handleCloseNavMenu(e)}>
                    <Typography textAlign="center">{page.pageName}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            
            {/* Small screen logo */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              iBuiltit
            </Typography>
            
            {/* Categories Large Screen */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.pageName}
                  onClick={(e) => handleCloseNavMenu(e)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.pageName}
                </Button>
              ))}
            </Box>

            {/* Login Dialog*/}
            <Box sx={{ flexGrow: 0 }}>
              
              <Typography onClick={(e) => handleOpenDialog(e)} sx={{ p: 0 }}>
                LOGIN
              </Typography>
              
              <Dialog
              open={openLoginDialog}
              onClose={(e) => handleCloseDialog(e)}
              >
                <Login />

              </Dialog>
            </Box>


            {/* Profile button */}
            {/* <Box sx={{ flexGrow: 0 }}>
              
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}

          </Toolbar>
        </Container>
      </AppBar>
    </ShowAppBarOnScroll>
  )
}
