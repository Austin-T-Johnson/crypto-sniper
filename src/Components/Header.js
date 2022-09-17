import React from 'react'
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
  return (
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <Typography className="header-text" onClick={() => navigate('/')}>
                Crypto Sniper
                </Typography>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Header