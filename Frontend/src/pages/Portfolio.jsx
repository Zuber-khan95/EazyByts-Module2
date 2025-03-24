import { useEffect,useState } from 'react';
import LineGraph from '../components/lineGraph.jsx'
import {useAuth} from '../context/AuthContext.jsx'
import Card from '../components/Card.jsx'
import Button from 'react-bootstrap/Button'
import {  MdDelete } from 'react-icons/md'
import './Portfolio.css'
import { useFlash } from '../context/FlashContext.jsx';
import axios from 'axios'
export default function Portfolio(){
    const { user }=useAuth();
    const [data,setData]=useState([]);
    const { flash, updateFlash }=useFlash();
    let getUserData=async()=>{  
        try{
          if (!user?.id) {
            console.error("User ID is not available.");
            return;
          }
const response=await axios.get(`http://localhost:8080/portfolio/${user.id}`);
setData(response.data.user.Stocks);

        }
        catch(err)
        {
console.error("Error:",err.response?err.response.data.message:"server error");
        }
    };

    let handleDelete=async(itemId)=>{
try{
let response=await axios.delete(`http://localhost:8080/portfolio/${itemId}/${user.id}`);
if(response.data.state==="success")
{
    updateFlash({success:"Stock Deleted Successfully"});
    setTimeout(()=>{
    updateFlash({success:""});},4000); 
}
}
catch(err)
{
    console.error(err.response?err.response.data.message:"Server Error");
    updateFlash({error:"Unable to delete stock."});
    setTimeout(()=>{
    updateFlash({error:""});},4000); 
}
    };
    
    useEffect(() => {
        if (user?.id) {
          getUserData(); 
        }
      }, [user?.id,data]);

   if(data.length===0)
   {
    return (
        <>
    <p>Loading...</p>
        </>
    );
   }
    return (
        <div>
            <div>
            {flash? <div style={{color:"green"}}>{flash.success}</div>:<div style={{color:"red"}}>{flash.error}</div>}
            {user? <h3 style={{color:"lightBlue"}}>Welcome <u>{user.username}</u> On PortFolio Page...</h3>:
            <h3 style={{color:"blue"}}>Welcome Guest  On PortFolio Page...</h3>}
            </div>
            <div className="Outer">
     {data.map((stock)=>(
       <div className="inner" key={stock._id}>
        <Card item={stock}/>
         <div style={{color:"green",textAlign:"right"}}>
                     <span onClick={()=>{handleDelete(stock._id);}}style={{color:"red"}}><MdDelete /></span>
                  </div>
        <Button variant="primary">Buy</Button>
        </div>
     ))}
        </div>
        <div>
            <LineGraph data={data}/>
        </div>
        </div>
     )
}