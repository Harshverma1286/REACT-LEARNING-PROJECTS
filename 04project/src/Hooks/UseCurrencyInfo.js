import React, { useEffect, useState } from "react";

function UseCurrencyInfo(currency){
    const [data,setdata] = useState({});

    useEffect(()=>{
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`).
        then((data)=>data.json()).
        then((data)=> setdata(data));
    },[currency]);
    return data;
}

export default UseCurrencyInfo;