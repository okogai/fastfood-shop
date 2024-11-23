import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            color="inherit"
            component={NavLink}
            to="/"
            sx={{ textDecoration: 'none' }}
          >
            Pizza shop
          </Typography>
          {isAdminRoute && (
            <Box sx={{ ml: 'auto', display: 'flex' }}>
              <Button
                color="inherit"
                variant="text"
                sx={{ mb: 1, borderRight: '1px solid white', paddingRight: 2 }}
                component={NavLink}
                to="/admin"
              >
                Dishes
              </Button>
              <Button
                color="inherit"
                variant="text"
                sx={{ mb: 1, borderRight: '1px solid white', paddingRight: 2 }}
                component={NavLink}
                to="/admin/orders"
              >
                Orders
              </Button>
              <Button
                color="inherit"
                variant="text"
                sx={{ mb: 1 }}
                component={NavLink}
                to="/admin/add-dish"
              >
                Add new dish
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
