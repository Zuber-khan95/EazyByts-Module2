import { createContext, useState, useContext} from 'react'

const stockContext=createContext();
export const StockProvider=({children})=>{
const [stocks,setStocks]=useState([]);

const updateStocks=(newStocks)=>{
    setStocks(newStocks);
}

return (
    <stockContext.Provider value={{stocks,updateStocks}}>
        {children}
    </stockContext.Provider>
);
};

export const useStock=()=>{
    return useContext(stockContext);
}