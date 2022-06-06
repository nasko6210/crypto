import "../App.css"
import Axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

export function SingleCoin() {
    const { coinId } = useParams()
    const [coinData, setCoinData] = useState([])
    const [inputValue, setInputValue] = useState();
    let titleName = "";
    let price1h = 5;
    let price1d = 5;
    let price1w = 5;
    useEffect(() => {

        Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then((response) => {
            setCoinData(response.data.coins)

        })
        
    }, [])
    coinData.map((coin) => {
        if (coin.id.toLowerCase() === coinId.toLowerCase()) {
            console.log(coin)
            price1h = (Number(coin.price) + (Number(coin.price) * (Number(coin.priceChange1h) / 100))).toFixed(2);
            price1d = (Number(coin.price) + (Number(coin.price) * (Number(coin.priceChange1d) / 100))).toFixed(2);
            price1w = (Number(coin.price) + (Number(coin.price) * (Number(coin.priceChange1w) / 100))).toFixed(2);
            titleName = coin.name
            console.log(price1d, price1h, price1w)
        }
    })
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: `${titleName} to USD Char`,
            },
        },
    };
    const labels = ["Price  1 H", "Price 1 day", "Price 1 week"];
    const data = {
        labels,
        datasets: [
            {
                label: "Price 1 H",
                data: price1h,
                backgroundColor: 'rgba(53,162,235,0.5)',
            },
            {
                label: 'Price 1 day',
                data: price1d,
                backgroundColor: 'rgba(255,99,132,0.5)'
            },
            {
                label: "Price 1 week",
                data: price1w,
                backgroundColor: 'green'
            }
        ]
    };


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
                                    <p style={{ color: coin.priceChange1h > 0 ? "green" : "red" }} id="fortuneNet">{Number(inputValue) + (inputValue * (coin.priceChange1h / 100))}USD</p>
                                    <p style={{ color: coin.priceChange1d > 0 ? "green" : "red" }} id="fortuneNet">{Number(inputValue) + (inputValue * (coin.priceChange1d / 100))}USD</p>
                                    <p style={{ color: coin.priceChange1w > 0 ? "green" : "red" }} id="fortuneNet">{Number(inputValue) + (inputValue * (coin.priceChange1w / 100))}US</p>
                                </div>
                            </div>

                        </>
                    )
                }
            })}
        </div>
        <div className="chart">
            <Bar data={data} options={options} />

        </div>
            
    </>

    )
}
