import React from "react";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import styles from "./tableCoin.module.css";
import { RotatingLines } from "react-loader-spinner";
import { marketChart } from "../../services/cryptoapi";
const Tablecoin = ({ coins, isLoading ,setChart}) => {
  return (
    <div className={styles.container}>
      {isLoading ? (
     <RotatingLines
     width="50px"
     height="50px"
     strokeWidth="2"
     strokeColor="#3874ff"
   />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>coin</th>
              <th>name</th>
              <th>price</th>
              <th>24h</th>
              <th>total volume</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {coins.map((coin) => (
              <TableRow coin={coin} key={coin.id} setChart={setChart}/>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tablecoin;

const TableRow = ({ coin ,setChart}) => {

const showHandler =async()=>{
  try {
    const res = await fetch(marketChart(coin.id))
    const json = await res.json()
    console.log(json)
    setChart({...json,coin})
  } catch (error) {
    console.log(error)
    setChart(null)
  }
}

  return (
    <tr>
      <td>
        <div onClick={showHandler} className={styles.symbol}>
          <img src={coin.image} alt="" />
          <span>{coin.symbol.toUpperCase()}</span>
        </div>
      </td>

      <td>{coin.name}</td>
      <td>{coin.current_price.toLocaleString()}</td>
      <td
        className={
          coin.price_change_percentage_24h > 0 ? styles.success : styles.error
        }
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>{coin.total_volume.toLocaleString()}</td>

      <td>
        <img src={coin.price_change_percentage_24h > 0 ? chartUp : chartDown} />
      </td>
    </tr>
  );
};
