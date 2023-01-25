import { AppBar, Box, CssBaseline, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Typography, Button } from '@mui/material';
import React from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { roles } from "../constants";
import userPic from "../assets/user.svg";
import { getTokenUser, userInRole } from '../utils/user';
import { useAuthStore } from '../contexts/AuthContex';
import { useUserStore } from '../contexts/UserContext';
import { useEffect } from 'react';
import authorizedAxios from '../api/authorizedAxios';
import { Observer } from 'mobx-react';
import DomainAddIcon from '@mui/icons-material/DomainAdd';

const drawerWidth = 360;

const Navbar = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    authorizedAxios
      .get(`users/${getTokenUser().user_id}`)
      .then((response) => {
        userStore.setUser(JSON.parse(JSON.stringify(response.data)))
      })
  }, [userStore])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate()

  const menuButton = (
    <IconButton
      color="inherit"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
  )
  const drawer = (
    <Box sx={{ bgcolor: '#72A276', height: '100%' }}>
      <Toolbar >

        {mobileOpen ? menuButton :
          <IconButton onClick={() => navigate('/')} sx={{ width: "100%", mt: '30px', mb: '30px' }}>
            <Typography variant="h3" color={"white"} fontFamily={"Consolas"}>
              eSchool
            </Typography>
          </IconButton>
        }
      </Toolbar>
      <List >
        {userInRole(roles.admin) &&
          <>
            <ListItem key={"schools"} disablePadding sx={{ mb: '10px' }}>
              <ListItemButton onClick={() => navigate('schools')}>
                <ListItemIcon >
                  <MenuBookIcon sx={{ fill: "black" }} fontSize="large" />
                </ListItemIcon>
                <Typography variant="h5" noWrap component="div">
                  Schools
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem key={"create-school"} disablePadding sx={{ mb: '10px' }}>
              <ListItemButton onClick={() => navigate('create-school')}>
                <ListItemIcon>
                  <DomainAddIcon sx={{ fill: "black" }} fontSize="large" />
                </ListItemIcon>
                <Typography variant="h5" noWrap component="div">
                  Create School
                </Typography>
              </ListItemButton>
            </ListItem>
          </>
        }
        {!userInRole(roles.admin) &&
          <>
            <ListItem key={"profile"} disablePadding sx={{ mb: '10px' }}>
              <ListItemButton onClick={() => navigate('profile')}>
                <ListItemIcon >
                  <PersonIcon sx={{ fill: "black" }} fontSize="large" />
                </ListItemIcon>
                <Typography variant="h5" noWrap component="div">
                  Profile
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem key={"catalog"} disablePadding sx={{ mb: '10px' }}>
              <ListItemButton onClick={() => navigate('catalog')}>
                <ListItemIcon>
                  <MenuBookIcon sx={{ fill: "black" }} fontSize="large" />
                </ListItemIcon>
                <Typography variant="h5" noWrap component="div">
                  Catalog
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem key={"schedule"} disablePadding sx={{ mb: '10px' }}>
              <ListItemButton onClick={() => navigate('schedule')}>
                <ListItemIcon>
                  <CalendarTodayIcon sx={{ fill: "black" }} fontSize="large" />
                </ListItemIcon>
                <Typography variant="h5" noWrap component="div">
                  Schedule
                </Typography>
              </ListItemButton>
            </ListItem>
          </>
        }
        {!userInRole(roles.student) &&
          <ListItem key={"create"} disablePadding sx={{ mb: '10px' }}>
            <ListItemButton onClick={() => navigate('create')}>
              <ListItemIcon>
                <GroupAddIcon sx={{ fill: "black" }} fontSize="large" />
              </ListItemIcon>
              <Typography variant="h5" noWrap component="div">
                {"Create account"}
              </Typography>
            </ListItemButton>
          </ListItem>
        }
      </List>
    </Box>
  );

  return (
    <Observer>
      {() =>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              {menuButton}
              <Grid container direction={"row"} justifyContent={"right"} alignItems={"center"} sx={{ width: '100%' }} columnSpacing={4}>
                <Grid item >
                  <img src={userPic} alt="user" style={{ height: '64px' }} />
                </Grid>
                <Grid item >
                  <Typography variant="h6" noWrap component="div">
                    {userStore.user && userStore.user?.firstName + " " + userStore.user?.lastName}
                  </Typography>
                </Grid>
                <Grid item >
                  <Button variant="contained" color="primary" onClick={() => { localStorage.clear(); authStore.setLoggedIn(false) }}>
                    Logout
                  </Button>
                </Grid>
              </Grid>

            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      }
    </Observer>
  )
}

export default Navbar