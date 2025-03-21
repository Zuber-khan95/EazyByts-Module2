import {useEffect} from 'react';
import axios from 'axios';
import LineGraph from '../components/lineGraph.jsx';
import Card from '../components/Card.jsx';
import { useStock } from '../context/StockContext.jsx';
export default function Home(){
const {stocks,updateStocks}=useStock();
useEffect(()=>{
    async function getStocks(){
        try{
            const response=await axios.get('http://localhost:8080/stock');
            updateStocks(response.data.data);
        }
        catch(err){
            console.error("Error:",err.response?err.response.data.message:"Server Error");
        }
    }
    getStocks();
},[updateStocks]);
    return(
        <div>
            <Card data={stocks}/> 
        </div>
    )
}