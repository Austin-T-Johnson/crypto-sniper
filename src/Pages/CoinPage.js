import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../Components/CoinInfo';
import { Typography, LinearProgress } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';

const CoinPage = () => {

    const { id } = useParams();
    const [coin, setCoin] = useState();
    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data)
    }
   
    useEffect(() => {
        fetchCoin();
    }, []);

    const numbersWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (!coin) return <LinearProgress style={{backgroundColor: "gold"}} />

    return (
        <div className='coin-page-left-container'>
            <div className='coin-page-sidebar'>
                <img
                    src={coin && coin.image.large}
                    alt={coin && coin.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />
                <Typography variant="h3" className="coin-page-btcHeader">
                    {coin && coin.name}
                </Typography>
                <div className='coin-page-desc-cont'>
                     <Typography variant="subtitle1" className="coin-page-desc">
                    {ReactHtmlParser(coin && coin.description.en.split(". ")[0])}
                </Typography>
                </div>
               
                <div className='coin-page-market-data'>
                    <span style={{display:"flex"}}>
                        <Typography variant="h5" className='coin-page-btcHeader'>
                            Rank: {coin && coin.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{display:"flex"}}>
                        <Typography variant="h5" className='coin-page-btcHeader'>
                            Current Price: ${numbersWithCommas(coin && coin.market_data.current_price.usd)}
                        </Typography>
                    </span>
                    <span style={{display:"flex"}}>
                        <Typography variant="h5" className='coin-page-btcHeader'>
                            Market Cap: ${numbersWithCommas(coin && coin.market_data.market_cap.usd)}
                        </Typography>
                    </span>
                </div>
        </div>

            {/* chart */}
            <CoinInfo coin={coin} />
        </div>
    )
}

export default CoinPage