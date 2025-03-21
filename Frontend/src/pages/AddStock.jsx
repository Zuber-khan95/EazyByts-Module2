import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
import DatePicker from 'react-date-picker'
import './AddStock.css'

export default function AddStock()
{
  let [FormData,setFormData]=useState({
    symbol:"",
    companyName:"",
    previousPrice:"",
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
       const response= await axios.post("http://localhost:8080/stock/new",FormData);
          if(response.data.state==="success") {
      
          setFlashMessage({success:"Successfully Added the stock"});
          setTimeout(()=>setFlashMessage({success:""}),4000);
          setTimeout(()=>navigate('/'),4000);
    
    setFormData({
      symbol:"",
      companyName:"",
      previousPrice:"",
      currentPrice:"",
      totalVolume:"",
      date:""
    });}
  }
      catch(err)
      {
        console.error("Error:",err.response?err.response.data.message:"Server Error");
        setFlashMessage({error:"Unable to add the stock"});
        setTimeout(()=>setFlashMessage({error:""}),4000);
      }
    };

  return (
    <div className="Form">
       {flashMessage.success? <div style={{color:"green"}}>{flashMessage.success}</div>:<div style={{color:"red"}}>{flashMessage.error}</div>}

  <div className="AddStock">
  <h3 style={{textAlign:"centre",color:"blue"}}>Add a New Stock</h3>
    <form onSubmit={HandleForm}>
        <TextField label="Symbol"
         variant="filled"
          color="primary" 
          type="text"
          name="symbol" 
          value={FormData.symbol}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Company Name"
         variant="filled"
         color="primary"
         type="text" 
         name="companyName"
          value={FormData.companyName}
          onChange={HandleFormData}
          focused 
          required/>
          <br /><br />
          <TextField label="Previous Price"
         variant="filled"
          color="primary" 
          type="text"
          name="previousPrice" 
          value={FormData.previousPrice}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
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
          <Button variant="contained" color="primary" type="submit">Add new Stock</Button>
      </form>
      </div>
      </div>
  )
}