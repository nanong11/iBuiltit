import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Backdrop, Badge, Button, CircularProgress, Dialog, Drawer, Slide} from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Login from '../pages/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { setOrderData } from '../redux/orderSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from './Cart';
import { setOrderProductData } from '../redux/orderProductsSlice';

const pages = [
  {
    pageName: "All Products",
    path: "/products",
    hashPath: "#products"
  },
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

const userSettings = [
  {
    name: "Profile",
    path: "#"
  },
  {
    name: "Logout",
    path: "/logout"
  }
];

function ShowAppBarOnScroll(props) {
  const { children, window } = props

  const onScrollDown = useScrollTrigger({
    disableHysteresis: true,
    threshold: 150,
    target: window ? window() : undefined
  })
  
  return(
    <Slide appear={true} direction='down' in={onScrollDown}>
      {children}
    </Slide>
  )
}

export default function AppNavBar(props) {
  const token = localStorage.getItem(`token`)
  const user = useSelector(state => state.user.value)
  const orderProducts = useSelector(state=> state.orderProducts.value)
  const [loading, setLoading] = useState(false)
  const [cartDrawer, setCartDrawer] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const order = useSelector(state => state.order.value)

  useEffect(() => {
    fetch(`/api/orderProducts`, {
      headers: {"Authorization": `Bearer ${token}`}
    })
    .then(response => response.json())
    .then(response => {
      response.forEach(orderProduct => {
        if(orderProduct.orderId === order._id){
          dispatch(setOrderProductData(response))
          setLoading(false)
        }
        if(orderProduct.quantity === 0){
          fetch(`/api/orderProducts/${orderProduct._id}/delete`, {
          method: "DELETE",
          headers: {"Authorization": `Bearer ${token}`}
          })
          .then(response => response.json())
          .then(response => {
            setLoading(false)
          })
        }
      })
    })
  }, [loading, token, dispatch, order._id])

  useEffect(() => {
    if(token){
      setLoading(true)
      fetch(`/api/users/profile`, {
        headers: {"Authorization": `Bearer ${token}`}
      })
      .then(response => response.json())
      .then(response => {
        dispatch(setUserData(response))
        setLoading(false)
      })
    }
  }, [token, dispatch])

  useEffect(() => {
    if(user.isAdmin === false){
      setLoading(true)
      fetch(`/api/orders`, {
        headers: {"Authorization": `Bearer ${token}`}
      })
      .then(response => response.json())
      .then(response => {
        let userOrder = response.map(order => {
          if(order.userId === user._id && order.complete === false){
            dispatch(setOrderData(order))
            setLoading(false)
            return order
          }
        })
        if(userOrder.length === 0){
          fetch(`/api/orders/create`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: user._id,
            })
          })
          .then(response => response.json())
          .then(response => {
            dispatch(setOrderData(response))
            setLoading(false)
          }) 
        }
      })
    }
  }, [user._id, user.isAdmin, token, dispatch])

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
    
    return(
      <Box sx={{ flexGrow: 0 }}>
          {
            user.isAdmin === false && token
            ?
            <>
              <Typography
                component="span"
              >
                {user.firstName}
              </Typography>
              <IconButton
                onClick={(e) => handleOpenUserMenu(e)}
                aria-controls={Boolean(anchorElUser) ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElUser) ? 'true' : undefined}
              >
                <AccountCircleIcon
                  fontSize='large'
                  color='secondary'
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
                {userSettings.map((link) => (
                  <MenuItem 
                    key={link.name} 
                    onClick={(e) => handleCloseUserMenu(e)}
                  >
                    <Typography
                      variant="a"
                      component="a"
                      textAlign="center"
                      href={link.path}
                      style={{ textDecoration: 'none', color: "grey" }}
                    >
                      {link.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
            :
            <>
              <Typography
                component="span"
                color="white"
                onClick={(e) => handleOpenDialog(e)}
              >
                Login
              </Typography>
              <IconButton onClick={(e) => handleOpenDialog(e)}>
                <AccountCircleIcon
                  fontSize='large'
                  color='inherit'
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
            </>
          }
      </Box>
    )
  }
  
  const Catergories = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [arrowTurn, setArrowTurn] = useState("")
    const handleOpenNavMenu = (e) => {
      setAnchorElNav(e.currentTarget);
      setArrowTurn(".25turn")
    };
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
      setArrowTurn("")
    };
    const handleCategoryLink = (pageLink) => {
      navigate(pageLink)
    }

    return(
      <Box sx={{ mr: 'auto' }}>
        <Button
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={(e) => handleOpenNavMenu(e)}
          color="secondary"
        >
          <CategoryRoundedIcon />
          <Typography sx={{ ml: 1, textTransform: 'none' }}>
              Categories
          </Typography>
          <ArrowForwardIosIcon sx={{ ml: 1, fontSize: 15, transition: "all 0.5s ease", transform: `rotate(${arrowTurn})` }} />
        </Button>

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
            display: { xs: 'block' },
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 2,
              ml: 1,
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
                left: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page.pageName} onClick={(e) => handleCloseNavMenu(e)}>
              <Typography
                variant="a"
                component="a"
                textAlign="center"
                onClick={() => handleCategoryLink(page.path)}
                href={page.hashPath}
                style={{ textDecoration: 'none', color: "grey" }}
              >
                {page.pageName}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    )
  }

  const toggleCart = () => {
    setCartDrawer(!cartDrawer)
  }
  const handleLogoClick = () => {
    navigate("/")
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
              sx={{ mr: 2, cursor: "pointer", display: { xs: 'none', md: 'block'} }}
              onClick={(e) => handleLogoClick(e)}
            >
              iBuiltit
            </Typography>
            <Catergories />
            {/* Small screen logo */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 'auto', cursor: "pointer", display: { md: 'none' } }}
              onClick={(e) => handleLogoClick(e)}
            >
              iBuiltit
            </Typography>
            <UserLinks />
            <IconButton 
            aria-label="cart"
            onClick={(e) => toggleCart(e)}
            >
              <Badge 
              badgeContent={orderProducts.length} 
              color="secondary"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              >
                <ShoppingCartIcon />
              </Badge>
              <Drawer
                anchor="right"
                open={cartDrawer}
                onClose={(e) => toggleCart(e)}
              >
                <Cart />
              </Drawer>
            </IconButton>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="primary" />
            </Backdrop>            
          </Toolbar>
        </Container>
      </AppBar>
    </ShowAppBarOnScroll>
  )
}
