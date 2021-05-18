 import './App.css';
 import axios from 'axios';
 import React, {useState, useEffect} from 'react';
 import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=NZD&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error));
  });  

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoin = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="crypto-coin">
      <div className="coin-search">
        <h1 className="coinText">Search a Currency</h1>
        <form>
          <input 
          type="text" 
          placeholder="enter cryptocurrency"
          className="coin-input" 
          onChange={handleChange}/>
        </form>
      </div>
      <div>
        <h1 className="currency">Currency</h1>
        <h1 className="currency">Symbol</h1>
        <h1 className="currency">Price</h1>
        <h1 className="currency">Volume</h1>
        <h1 className="currency">24hr</h1>
        <h1 className="currency">Market Cap</h1>
      </div>
      {filteredCoin.map(coin => {
        return <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />;
      })}
    </div>

  );
}

export default App;
