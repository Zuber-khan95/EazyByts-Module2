import { useNavigate } from 'react-router-dom';
import './Card.css'
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { FaArrowDown, FaArrowUp} from "react-icons/fa6"
import { FaArrowTrendDown, FaArrowTrendUp} from "react-icons/fa6"
import { MdEdit, MdDelete } from 'react-icons/md'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useState } from 'react';
import {useAuth} from '../context/AuthContext.jsx'

export default function Card({ data }){

const {user}=useAuth();

const navigate=useNavigate();
const [flashMessage,setFlashMessage]=useState({
    success:"",                                                                             
    failure:""
});
let addStockwithUser=async(id,userId)=>{
    try{
const response=await axios.post(`http://localhost:8080/portfolio/${id}/new/${userId}`);
if(response.data.state==="success")
{
    setFlashMessage({success:"Successfully invested in stock."});
    setTimeout(()=>{setFlashMessage({success:""});},4000);
    setTimeout(()=>{navigate('/portfolio');},4000);
}
    }
    catch(err){
  
        console.error("Error:",err.response?err.response.message:"server error");
        setFlashMessage({success:"Unable to invest in stock. Need to login first."});
        setTimeout(()=>{setFlashMessage({faiure:""});},4000);
        setTimeout(()=>{navigate('/login');},4000);
    }
};

    let handleDelete=async(id)=>{
        try{
let response=await axios.delete(`http://localhost:8080/stock/${id}`);
if(response.data.state==="success")
{
    setFlashMessage({success:"Successfully Deleted the stock"});
    setTimeout(()=>setFlashMessage({success:""}),4000); 
        };
    }
        catch(err){
            console.error("Error:",err.response?err.response.data.message:"Server Error");
            setFlashMessage({error:"Unable to delete the stock"});      
            setTimeout(()=>setFlashMessage({error:""}),4000);
        }
    };

    let handleEdit=(id)=>{
        navigate(`/edit/${id}`);
    };
    return (
        <>
        {flashMessage.success? <div style={{color:"green"}}>{flashMessage.success}</div>:<div style={{color:"red"}}>{flashMessage.error}</div>}
        <div className='Outer'>
         {data.map((item,index)=>(
                <div className="Card" key={item._id}>
                {item.previousPrice<=item.currentPrice?<div style={{color:"green",textAlign:"right", }}><FaArrowTrendUp/></div>:
                <div style={{color:"red",textAlign:"right"}}><FaArrowTrendDown/></div>}
           <h3 style={{color:"lightblue"}}>{item.symbol}</h3>
           <p>{item.companyName}</p>
           {item.previousPrice-item.currentPrice>=0?<h3 style={{color:"red"}}>${item.currentPrice-item.previousPrice}<FaArrowDown/></h3>
           :<h3 style={{color:"green"}}>${item.currentPrice-item.previousPrice}<FaArrowUp/></h3>}
           <h6>Share Available:{item.totalVolume}</h6>
           <Button variant="primary">Buy</Button> &nbsp;
            <Button variant='primary' onClick={()=>{addStockwithUser(item._id,user.id);}}>Add to Cart</Button>
           
           <div style={{color:"green",textAlign:"right"}}>
             <span onClick={()=>{handleEdit(item._id);}}><MdEdit/></span> 
             <span onClick={()=>{handleDelete(item._id);}}style={{color:"red"}}><MdDelete /></span>
          </div>
            </div> 
            ))
        }
    </div>
    </>
    )
}