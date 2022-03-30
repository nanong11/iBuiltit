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
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const token = localStorage.getItem(`token`)

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

const settings = [
  {
    linkName: "Profile",
    path: "#"
  },
  {
    linkName: "Logout",
    path: "#"
  }
];

export default function AppNavBar(props) {

  const user = useSelector( (state) => state.user.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if(token){
      fetch(`https://mysterious-ocean-63835.herokuapp.com/api/users/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(response => {
        dispatch(setUserData(response))
      })
    }
  }, [dispatch])

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

  const UserLinks = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);

    const handleOpenUserMenu = (e) => {
      setAnchorElUser(e.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleOpenDialog = () => {
      setOpenLoginDialog(true)
    }
    const handleCloseDialog = () => {
      setOpenLoginDialog(false)
    }

    if(user.isAdmin === false){
      return(
          <Box sx={{ flexGrow: 0 }}>
              <IconButton
                onClick={(e) => handleOpenUserMenu(e)}
                aria-controls={Boolean(anchorElUser) ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElUser) ? 'true' : undefined}
              >
                <FaceTwoToneIcon
                fontSize='large'
                />
              </IconButton>
              
              <Menu
                anchorEl={anchorElUser}
                id="account-menu"
                open={Boolean(anchorElUser)}
                onClose={(e) => handleCloseUserMenu(e)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
              >
                {settings.map((link) => (
                  <MenuItem key={link.linkName} onClick={(e) => handleCloseUserMenu(e)}>
                    <Typography textAlign="center">{link.linkName}</Typography>
                  </MenuItem>
                ))}
              </Menu>
          </Box>
      )
    }else{
      return(
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={(e) => handleOpenDialog(e)}>
            <FaceTwoToneIcon
              fontSize='large'
            />
          </IconButton>
              
          <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={openLoginDialog}
            onClose={(e) => handleCloseDialog(e)}
          >
            <Login />
          </Dialog>
        </Box>
      )
    }
  }

  const CatergorySmallScreen = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (e) => {
      setAnchorElNav(e.currentTarget);
    };
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    return(
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
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
            <CatergorySmallScreen />
            
            
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
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.pageName}
                </Button>
              ))}
            </Box>

            <UserLinks />

          </Toolbar>
        </Container>
      </AppBar>
    </ShowAppBarOnScroll>
  )
}
