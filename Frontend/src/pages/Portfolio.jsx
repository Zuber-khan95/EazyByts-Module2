import { useEffect,useState } from 'react';
import LineGraph from '../components/lineGraph.jsx'
import {useAuth} from '../context/AuthContext.jsx'
import Card from '../components/Card.jsx'
import axios from 'axios'
export default function Portfolio(){
    const { user }=useAuth();
    const [data,setData]=useState([]);
    let getUserData=async()=>{
        try{
const response=await axios.get(`http://localhost:8080/portfolio/${user.id}`);
setData(response.data.user.Stocks);

        }
        catch(err)
        {
console.error("Error:",err.response?err.response.data.message:"server error");
        }
    }
    useEffect(()=>{
getUserData();
    },[]);
    return (
        <>
            {user? <h3 style={{color:"lightBlue"}}>Welcome <u>{user.username}</u> On PortFolio Page...</h3>:<h3 style={{color:"blue"}}>Welcome Guest  On PortFolio Page...</h3>}
        <Card data={data}/>
        <LineGraph data={data}/>
    
        
        </>
    )
}