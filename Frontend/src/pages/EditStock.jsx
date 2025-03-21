import {useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
axios.defaults.withCredentials = true;
import {useParams,useNavigate} from 'react-router-dom'
import './EditStock.css'

export default function EditStock()
{
    let { id }=useParams();
    const [FormData,setFormData]=useState({
        currentPrice:"",
        totalVolume:"",
        date:""

    });
    let [flashMessage,setFlashMessage]=useState({
      success:"",
      failure:""
    });
  
    const navigate=useNavigate();

  let HandleFormData=(event)=>{
    setFormData((CurrData)=>{
      return {...CurrData,[event.target.name]:event.target.value};
    })};

    let HandleForm=async(event)=>{
      event.preventDefault();
  
      try{
        const response=await axios.put(`http://localhost:8080/stock/${id}`,FormData);
        setFormData({
            currentPrice:"",
            totalVolume:"",
        })
    if(response.data.state==="success") {
setFlashMessage({success:"Successfully Updated the stock"});
setTimeout(()=>setFlashMessage({success:""}),4000);         
setTimeout(()=>navigate('/'),4000);
    }
      }
            catch(err)
            {
                console.error("Error:",err.response?err.response.data.message:"Server Error");
                setFlashMessage({error:"unable to update the stock"});
                setTimeout(()=>setFlashMessage({error:""}),4000);
            }
        }
     
 
  return (
    <div className="Form">
       {flashMessage.success? <div style={{color:"green"}}>{flashMessage.success}</div>:<div style={{color:"red"}}>{flashMessage.error}</div>}

  <div className="EditStock">
  <h3 style={{textAlign:"centre",color:"blue"}}>Update Stock from here..</h3>
    <form onSubmit={HandleForm}>
          <TextField label="Current Price"
         variant="filled"
          color="primary" 
          type="text"
          name="currentPrice" 
          value={FormData.currentPrice}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Stock's Volume"
         variant="filled"
          color="primary" 
          type="text"
          name="totalVolume" 
          value={FormData.totalVolume}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Created At"
         variant="filled"
          color="primary" 
          type="date"
          name="date" 
          value={FormData.date}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <Button variant="contained" color="primary" type="submit">Update the Stock</Button>
      </form>
      </div>
      </div>
  )
}