import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { HistoricalChart } from '../config/api';
import { CircularProgress } from '@mui/material';
import Plot from 'react-plotly.js';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/data';
import SelectButton from '../Components/SelectButton';




const CoinInfo = ({ coin }) => {
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, "USD"))
        setHistoricalData(data.prices)
    }



    useEffect(() => {
        fetchHistoricalData();
    }, ["USD", days])


    return (
        <div className='coin-info-page-cointainer'>
            {
                !historicalData ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                    />
                )
                    :
                    (<>
                        <Line
                            data={{
                                labels: historicalData.map((coin) => {
                                    let date = new Date((coin[0]))
                                    let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()}PM` : `${date.getHours()}:${date.getMinutes()} AM`
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),
                                datasets: [
                                    {
                                        data: historicalData.map((coin) => coin[1]),
                                        label: `Price (Past ${days} Days ) in $USD`,
                                        borderColor: "#EEBC1D"
                                    }],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />

                        <div className='chart-data-btns'>
                            {chartDays.map(day => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => setDays(day.value)}
                                    selected={day.value === days}>
                                    {day.label}
                                    
                                </SelectButton>
                            ))}
                        </div>
                    </>
                    )
            }
        </div>
    )
}


export default CoinInfo