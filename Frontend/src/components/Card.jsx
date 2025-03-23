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
import { useFlash } from '../context/FlashContext.jsx';

export default function Card({ item }){

const {user}=useAuth();
const { flash , updateFlash }=useFlash();

const navigate=useNavigate();

    let handleDelete=async(id)=>{
        try{
let response=await axios.delete(`http://localhost:8080/stock/${id}`);
if(response.data.state==="success")
{
    updateFlash({success:"Successfully Deleted the stock"});
    setTimeout(()=>updateFlash({success:""}),4000); 
        };
    }
        catch(err){
            console.error("Error:",err.response?err.response.data.message:"Server Error");
            updateFlash({ error:"Unable to delete the stock"});      
            setTimeout(()=>updateFlash({error:""}),4000);
        }
    };

    let handleEdit=(id)=>{
        navigate(`/edit/${id}`);
    };
    return (
        <>
      
        <div>
                <div key={item._id}>
                {item.previousPrice<=item.currentPrice?<div style={{color:"green",textAlign:"right", }}><FaArrowTrendUp/></div>:
                <div style={{color:"red",textAlign:"right"}}><FaArrowTrendDown/></div>}
           <h3 style={{color:"lightblue"}}>{item.symbol}</h3>
           <p>{item.companyName}</p>
           {item.previousPrice-item.currentPrice>=0?<h3 style={{color:"red"}}>${item.currentPrice-item.previousPrice}<FaArrowDown/></h3>
           :<h3 style={{color:"green"}}>${item.currentPrice-item.previousPrice}<FaArrowUp/></h3>}
           <h6>Share Available:{item.totalVolume}</h6>
           <div style={{color:"green",textAlign:"right"}}>
             <span onClick={()=>{handleEdit(item._id);}}><MdEdit/></span> &nbsp;
             <span onClick={()=>{handleDelete(item._id);}}style={{color:"red"}}><MdDelete /></span>
          </div>
            </div> 
        
    </div>
    </>
    )
}