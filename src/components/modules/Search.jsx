import React, { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoapi";
import { RotatingLines } from "react-loader-spinner";
import styles from './search.module.css'
const Search = ({ currency, setCurrency }) => {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    setIsLoading(false)
    if (!text) return;
    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const data = await res.json();
        console.log("data", data);
        if (data.coins) {
          setIsLoading(false)
          setCoins(data.coins);
        } else {
          alert(data.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
setIsLoading(true)
    search();

    return () => controller.abort();
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>

{(!!coins.length || isLoading) && (
        <div className={styles.searchResult}>
        {isLoading && (
          <RotatingLines
            width="50px"
            height="50px"
            strokeWidth="2"
            strokeColor="#3874ff"
          />
        )}
        <ul>
          {coins.map((coin) => (
            <li key={coin.id}>
              <img src={coin.thumb} alt={coin.name} />
              <p>{coin.name}</p>
            </li>
          ))}
        </ul>
      </div>
)}
    </div>
  );
};

export default Search;
