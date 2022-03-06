import {AppBar, Toolbar, Typography, IconButton}  from '@mui/material';
import MenuIcon from '@mui/material/Menu';

const NavBar = () => {
    return (
        <AppBar position="sticky" style= {{background: "#00897b"}}>
        <Toolbar>
          <IconButton edge="start" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Lorem Ipsum
          </Typography>
        </Toolbar>
      </AppBar>
    )
}

export default NavBar