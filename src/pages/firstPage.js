import Axios from "axios";
import { useEffect, useState } from "react";
import '../App.css';
import { Coin } from "../helpers/Coin"
import { useNavigate } from "react-router-dom";
export function FirstPage() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchedCoin, setSearchedCoin] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=100").then((response) => {
      setListOfCoins(response.data.coins);
    
    })
  }, [])
  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchedCoin.toLowerCase())
  }
  )
  return (
    <div className="firstPage">
      <div className="cryptoLeftGroup">

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>24%</th>
              <th>7d</th>
              <th>Market Cap</th>
              <th>Volume(24h)</th>
              <th>Circulating Supply</th>
            </tr>
          </thead>

          <tbody>
            {filteredCoins.map((coin) => {
              return (
                <tr>
                  <td>{coin.rank}</td>
                  <td><img style={{height:25,width:25}} src={coin.icon}/>{coin.name}</td>
                  <td>{coin.price.toFixed(2)}$</td>
                  <td style={{color:coin.priceChange1h>0 ?"green":"red"}}>{coin.priceChange1h}%</td>
                  <td style={{color:coin.priceChange1d>0 ?"green":"red"}}>{coin.priceChange1d}%</td>
                  <td style={{color:coin.priceChange1w>0?"green":"red"}}>{coin.priceChange1w}%</td>
                  <td>{parseInt(coin.marketCap,10)}</td>
                  <td>{parseInt(coin.volume,10)}</td>
                  <td>{parseInt(coin.availableSupply,10)}</td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </div>
      <div className="cryptoRightGroup">
        <div className="cryptoHeader">
          <input type="text" placeholder="Bitcoin..." onChange={(event) => { setSearchedCoin(event.target.value) }} />
        </div>
        <div className="cryptoDisplay">
          {filteredCoins.map((coin) => {
            return (
              <div onClick={() => {
               
                navigate(`/coins/${coin.id}`)
              }}>

                <Coin name={coin.name} icon={coin.icon} price={coin.price.toFixed(2)} symbol={coin.symbol} />
              </div>
            )

          })}
        </div>
      </div>
    </div>


  )
}

