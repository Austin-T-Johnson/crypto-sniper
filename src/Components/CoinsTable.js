import React from 'react';
import { useState, useEffect } from 'react';
import { CoinList } from '../config/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    ThemeProvider,
    createTheme,
    TableContainer,
    LinearProgress,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import { Pagination } from '@mui/material';

const CoinsTable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList("USD"))
        setCoins(data)
        setLoading(false)
        console.log(coins)
    };

   
    const handleSearch = () => {
       return coins.filter((coin) => {
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        })
    }

    const numbersWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    useEffect(() => {
        fetchCoins();
    }, ["USD"])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#ffff",
            },
            secondary: {
                main: "#808080"
            },
        },
    });

    
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center", color: "white"}}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    Cryptocurrency Prices By Market Cap
                </Typography>
                <TextField
                    label="Search For a Crypto Currency"
                    variant="outlined"
                    color="primary"
                    style={{ marginBottom: 20, width: "100%", color: "white" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: "gold" }} />
                    ) : (<Table>
                        <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <TableCell
                                        style={{
                                            color: "black",
                                            fontWeight: "700",
                                            fontFamily: "Montserrat"
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "inherit" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        
                            {coins.slice((page - 1) * 10, (page - 1) * 10 + 10).map((coin) => {
                                 const profit = coin.price_change_percentage_24h > 0;
                                 return (
                                      <TableRow onClick={() => navigate(`/coins/${coin.id}`)}
                                          className="table-row"
                                          key={coin.name}
                                      >
                                          <TableCell
                                              component="th"
                                              scope="row"
                                              styles={{
                                                  display: "flex",
                                                  gap: 15,
                                              }}
                                          >
                                              <img
                                                  src={coin.image}
                                                  alt={coin.name}
                                                  height="50"
                                                  style={{ marginBottom: 10, cursor: "pointer" }}
                                              />
                                              <div style={{display: "flex", flexDirection: "column", cursor: "pointer"}}>
                                                <span style={{textTransform: "uppercase", fontSize: 22, color: "white", cursor: "pointer"}}>
                                                    {coin.symbol}
                                                </span>
                                                <span style={{color: "darkgrey", cursor: "pointer"}}>{coin.name}</span>
                                              </div>
                                          </TableCell>
                                          <TableCell
                                          align="right"
                                          style={{
                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                            fontWeight: 500
                                          }}
                                          >
                                            {numbersWithCommas(coin.current_price)}
                                            <br></br>
                                            {profit && "+"}
                                            {numbersWithCommas(coin.price_change_percentage_24h.toFixed(2))}%
                                          </TableCell>
                                          <TableCell
                                          align="right"
                                          style={{
                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                            fontWeight: 500
                                          }}
                                          >
                                            {profit && "+"}
                                            ${coin.price_change_24h.toFixed(2)}
                                          </TableCell>
                                          <TableCell
                                          align="right"
                                          style={{
                                            color: "white"
                                          }}
                                          >
                                            ${numbersWithCommas(coin.market_cap.toFixed(2))}
                                          </TableCell>
                                      </TableRow>
                                  )
                            })}
                        </TableBody>
                    </Table>)
                    }
                </TableContainer>
                <Pagination
                color="secondary"
                count={10}
                size="small"
                style={{
                    padding:20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                }}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable