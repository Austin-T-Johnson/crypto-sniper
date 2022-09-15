import React from 'react';
import { Container, Typography } from "@mui/material";
import './Banner.css';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <div className='banner'>
        <Container className='banner-content'>
            <div className='tagline'>
                <Typography variant="h2" className="typography-h2">Crypto Sniper</Typography>
                <Typography variant="subtitle2" className="typography-p">Get all the info regarding your favorite Crypto Currency</Typography>
            </div>
            <Carousel />
        </Container>
    </div>
  )
}

export default Banner