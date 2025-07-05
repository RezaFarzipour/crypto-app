import React, { useEffect, useState } from "react";
import Tablecoin from "../modules/Tablecoin";
import { getCoinList } from "../../services/cryptoapi";
import Pagination from "../modules/pagination";
import Search from "../modules/Search";

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading,setIsloading] = useState(true)
  const [page, setPage] = useState(1);
  const [currency,setCurrency] = useState("usd")


  useEffect(() => {
    setIsloading(true)
    
    const getdata = async()=>{

      try {
        const res= await fetch(getCoinList(page,currency))
        const data= await res.json()
        setCoins(data)
        setIsloading(false)
      } catch (error) {
        console.log(error);
        
      }

    }

     
     getdata()

  }, [page,currency]);


  

  return (
    <div>
      <Search setCurrency={setCurrency} currency={currency}/>
      <Tablecoin coins={coins} isLoading={isLoading} />
      <Pagination page={page} setPage={setPage}/>
    </div>
  );
};

export default HomePage;
