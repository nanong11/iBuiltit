import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Dialog } from '@mui/material';
import Login from '../pages/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';


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

const useStyles = makeStyles({
    banner: {
        backgroundImage: "url('/img/banner1.jpg')",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        paddingTop: "10rem"
    },
    bannerNav: {
        backgroundColor: "#7027A0",
        borderRadius: "5px",
        maxHeight: "4rem",
        paddingLeft: "1rem",
        paddingRight: "1rem"
    }
})

export default function Banner() {
    const classes = useStyles()
    const navigate = useNavigate()
    const token = localStorage.getItem(`token`)
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
      }else{
        dispatch(setUserData({}))
      }
    }, [dispatch, token])
  
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
      
      if(token && user.isAdmin === false){
        return(
            <Box sx={{ flexGrow: 0 }}>
                {
                 token ?
                 <Typography
                 component="span"
                 color="white"
                 >{user.firstName}</Typography>
                 :
                 null
                }
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
            </Box>
        )
      }else{
        return(
          <Box sx={{ flexGrow: 0 }}>
            <Typography
                component="span"
                color="white"
                onClick={(e) => handleOpenDialog(e)}
                >Login
            </Typography>
            <IconButton style={{ backgroundColor: 'transparent' }} onClick={(e) => handleOpenDialog(e)}>
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
          </Box>
        )
      }
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
            size="small"
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
                mt: 3,
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
    
  return (
    <Grid
    container
    className={classes.banner}
    >
        <Grid
        item
        className={classes.bannerNav}
        xs={10}
        md={8}
        >
          <Toolbar disableGutters>
            {/* Large screen LOGO */}
            <Typography
              variant="h6"
              component="div"
              color="white"
              sx={{ mr: 2, display: { xs: 'none', md: 'block'} }}
            >
              iBuiltit
            </Typography>

            {/* Small screen category */}
            <Catergories />
            
            {/* Small screen logo */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{ mr: 'auto', display: { md: 'none' } }}
              color="white"
            >
              iBuiltit
            </Typography>
            
            <UserLinks />

          </Toolbar>
        </Grid>
    </Grid>
  )
}
