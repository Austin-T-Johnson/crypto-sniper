import React from 'react'
import './Carousel.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {TrendingCoins} from '../config/api';

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const fetchTrending = async () => {
        const { data } = await axios.get(TrendingCoins('USD'))
        setTrending(data);
        console.log(data)
    };

    useEffect(() => {
        fetchTrending()
    }, ['USD'])


  return (
    <div className='carousel'>Carousel</div>
  )
}

export default Carousel