import {useEffect} from 'react';
import axios from 'axios';
import LineGraph from '../components/lineGraph.jsx';
import Card from '../components/Card.jsx';
import { useStock } from '../context/StockContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import Button from 'react-bootstrap/Button'
import './Home.css'
import { useFlash } from '../context/FlashContext.jsx';
import { useNavigate } from 'react-router-dom'
export default function Home(){
    const { flash , updateFlash }=useFlash();
const navigate=useNavigate();
    const { user }=useAuth();

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

let addStockwithUser=async(id,userId)=>{
    try{
const response=await axios.post(`http://localhost:8080/portfolio/${id}/new/${userId}`);
if(response.data.state==="success")
{
    updateFlash({success:"Successfully invested in stock."});
    setTimeout(()=>{updateFlash({success:""});},4000);
    setTimeout(()=>{navigate('/portfolio');},4000);
}
    }
    catch(err){
        updateFlash({error:"Unable to invest in stock. Need to login first."});
        setTimeout(()=>{updateFlash({faiure:""});},4000);
        setTimeout(()=>{navigate ('/login');},4000);
        console.error("Error:",err.response?err.response.message:"server error");
      
    }
};

    return(
    <div>
          {flash? <div style={{color:"green"}}>{flash.success}</div>:<div style={{color:"red"}}>{flash.error}</div>}
    <div className='Outer'>  
     {stocks.map((item,index)=>(
    <div className="inner" key={index}>
      <Card  item={item} /> 
      <Button variant="primary">Buy</Button> &nbsp;
      {user?<Button variant='primary' onClick={()=>{addStockwithUser(item._id,user.id);}}>Add to Cart</Button>
      :<Button>Logged in to use this</Button>}
       </div>
        ))}
        </div>
        </div>
    );
}