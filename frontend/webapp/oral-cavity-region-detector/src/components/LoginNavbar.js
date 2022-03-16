import * as React from 'react';
import { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function LoginNavbar({role}) {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (role) => {
    // setAnchorEl(event.currentTarget);
    if(role==1){
      navigate('/user/profile')
    }else{
      navigate('/admin/profile')
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if(sessionStorage.getItem("info")){
      setAuth(true)
    }else{
      setAuth(false)
    }
  },[])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: "#74BDDC" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , display: { md: 'flex', justifyContent: 'flex-end' } }}>
            {role===1?<Link to="/user/login">Login as User</Link>:<Link to="/admin/login">Login as Admin</Link>}
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              <AccountCircle />
              </IconButton>
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Menu> */}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
