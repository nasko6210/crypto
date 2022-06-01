import "../App.css"
import Axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import React from "react";
import {BarChart} from "../helpers/Chart";
export function SingleCoin() {
    const { coinId } = useParams()
    const [coinData, setCoinData] = useState([])
    const [inputValue, setInputValue] = useState();
    useEffect(() => {
        Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then((response) => {
            setCoinData(response.data.coins)

        })
    }, [])
    return (<>
       
            <div className="cryptoCoin">
                {coinData.map((coin) => {
                    if (coin.id.toLowerCase() === coinId.toLowerCase()) {
                        return (
                            <>
                                <div className="singleCoin">
                                    <img src={coin.icon} />
                                    <h1>{coin.name} /{coin.symbol}/</h1>
                                    <h3>Rank : {coin.rank}</h3>
                                    <h2>Current Price: {coin.price.toFixed(2)} $</h2>
                                    <h3>Volume: {coin.volume}</h3>
                                    <h3>Market Cap:{coin.marketCap}</h3>
                                    <h3>Available Supply:{coin.availableSupply}</h3>
                                    <h3>Total Supply:{coin.totalSupply}</h3>
                                    <h4 style={{ color: coin.priceChange1h > 0 ? "green" : "red" }}>PriceChange 1h: {coin.priceChange1h}%</h4>
                                    <h4 style={{ color: coin.priceChange1d > 0 ? "green" : "red" }}>PriceChange 1d: {coin.priceChange1d}%</h4>
                                    <h4 style={{ color: coin.priceChange1w > 0 ? "green" : "red" }}>PriceChange 1w: {coin.priceChange1w}%</h4>
                                    <a href={coin.websiteUrl}>Official Website</a>
                                </div>
    
                                <div className="calculator">
    
                                    <input type="number" placeholder="Enter value in USD" onChange={(e) => { setInputValue(e.target.value) }} />
                                    <div className="pastCalculatorStyle">
                                        <p id="fortune">Hour fortune</p>
                                        <p id="fortune">Day fortune</p>
                                        <p id="fortune">Week fortune</p>
                                    </div>
                                    <div className="pastFortune">
                                        <p style={{color:coin.priceChange1h>0 ?"green":"red"}}id="fortuneNet">{Number(inputValue)+(inputValue*(coin.priceChange1h/100))}USD</p>
                                        <p style={{color:coin.priceChange1d>0 ?"green":"red"}} id="fortuneNet">{Number(inputValue)+(inputValue*(coin.priceChange1d/100))}USD</p>
                                        <p style={{color:coin.priceChange1w>0 ?"green":"red"}} id="fortuneNet">{Number(inputValue)+(inputValue*(coin.priceChange1w/100))}US</p>
                                    </div>
                                </div>
                                
                            </>
                        )
                    }
                })}
            </div>
             <div className="chart">

               <BarChart />
             </div>
                 
        
        </>

    )
}
