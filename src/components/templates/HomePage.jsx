import React, { useEffect, useState } from "react";
import Tablecoin from "../modules/Tablecoin";
import { getCoinList } from "../../services/cryptoapi";
import Pagination from "../modules/pagination";

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading,setIsloading] = useState(true)
  const [page, setPage] = useState(1);


  useEffect(() => {
    setIsloading(true)
    const getdata = async()=>{
     const res= await fetch(getCoinList(page))
     const data= await res.json()
     setCoins(data)
     setIsloading(false)
    }

     
     getdata()

  }, [page]);


  

  return (
    <div>
      <Tablecoin coins={coins} isLoading={isLoading} />
      <Pagination page={page} setPage={setPage}/>
    </div>
  );
};

export default HomePage;
