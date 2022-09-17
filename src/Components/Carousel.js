import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { TrendingCoins } from '../config/api';
import AliceCarousel from 'react-alice-carousel';

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const fetchTrending = async () => {
        const { data } = await axios.get(TrendingCoins('USD'))
        setTrending(data);
    };

    useEffect(() => {
        fetchTrending()
    }, ['USD'])

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link className="carousel-item" to={`/coins/${coin.id}`}>
                <img
                    src={coin.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}>
                </img>
                <span>
                    {coin.symbol}
                    &nbsp;
                    <span style={{ color: profit > 0 ? "rgb(14,203,129)" : "red" }}>
                        {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </span>

                <span>${coin.current_price}</span>


            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };
    return (
        <div className='carousel'>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel