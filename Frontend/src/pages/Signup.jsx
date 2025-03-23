import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
axios.defaults.withCredentials = true;

import {useNavigate} from 'react-router-dom'
import "./Signup.css"
import {useAuth} from '../context/AuthContext.jsx'
import {useFlash} from "../context/FlashContext.jsx"


export default function Signup()
{
  let [FormData,setFormData]=useState({
    username:"",
    email:"",
    password:""
  });

 const {flash,updateFlash}=useFlash();
    const navigate=useNavigate();
    const { login }=useAuth();

  let HandleFormData=(event)=>{
    setFormData((CurrData)=>{
      return {...CurrData,[event.target.name]:event.target.value};
    })};

    let HandleForm=async(event)=>{
      event.preventDefault();
      try{
        const response=await axios.post("http://localhost:8080/register",FormData);
      login(response.data.user);
        if(response.data.message==="Registration successful")
        {
          updateFlash({success:"Successfully Signed Up and LoggedIn"});
          setTimeout(()=>updateFlash({success:""}),4000);
          setTimeout(()=>navigate('/'),4000);
    
    setFormData({
      username:"",
      email:"",
      password:""});
        }
     

        }  
      catch(err)
      {
        console.error("Error:",err.response?err.response.data.message:"server error");
        updateFlash({error:"Username already exist."});
        setTimeout(()=>updateFlash({error:""}),4000);
      }
    
    };

  return (
    <div className="Form">
       {flash.success? <div style={{color:"green"}}>{flash.success}</div>
       :<div style={{color:"red"}}>{flash.error}</div>}

  <div className="Signup">
  <h3 style={{textAlign:"centre",color:"blue"}}>Signup Form</h3>
    <form onSubmit={HandleForm}>

        <TextField label="Username"
         variant="filled"
          color="primary" 
          type="text"
          name="username" 
          value={FormData.username}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Email"
         variant="filled"
          color="primary" 
          type="text"
          name="email" 
          value={FormData.email}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="password"
         variant="filled"
         color="primary"
         type="password" 
         name="password"
          value={FormData.password}
          onChange={HandleFormData}
          focused 
          required/>
          <br /><br />
          <Button variant="contained" color="primary" type="submit">Signup</Button>
      </form>
      </div>
      </div>
  )
}