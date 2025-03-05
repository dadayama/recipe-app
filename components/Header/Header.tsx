import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <header>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            My Website
          </Typography>
          <Button color='inherit'>Home</Button>
          <Button color='inherit'>About</Button>
          <Button color='inherit'>Contact</Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
