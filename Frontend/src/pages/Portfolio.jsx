import { useEffect,useState } from 'react';
import LineGraph from '../components/lineGraph.jsx'
import {useAuth} from '../context/AuthContext.jsx'
import Card from '../components/Card.jsx'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
export default function Portfolio(){
    const { user }=useAuth();
    const [data,setData]=useState([]);
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
    }
    
    useEffect(() => {
        if (user?.id) {
          getUserData(); // Only fetch data if user.id is available
        }
      }, [user?.id]);

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
            {user? <h3 style={{color:"lightBlue"}}>Welcome <u>{user.username}</u> On PortFolio Page...</h3>:
            <h3 style={{color:"blue"}}>Welcome Guest  On PortFolio Page...</h3>}
     
     {data.map((stock)=>(
        <div className="Outer" key={stock._id}>
        <div className="inner" >
        <Card item={stock}/>
        <Button variant="primary">Buy</Button>
        </div>
        </div>
))}
       
        </div>
    );
}