import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
import './Login.css'

export default function Login()
{
  let [FormData,setFormData]=useState({
    username:"",
    password:""
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
        const response=await axios.post("http://localhost:8080/login",FormData);
        console.log(response.data);
          setFlashMessage({success:"Successfully signedIn"});
          setTimeout(()=>setFlashMessage({success:""}),4000);
          setTimeout(()=>navigate('/'),4000);
    
    setFormData({
      username:"",
      password:""});
        }  
      catch(err)
      {
        console.error("Error:",err.response?err.response.data.message:"Server Error");
        setFlashMessage({error:"Username or password is incorrect"});
        setTimeout(()=>setFlashMessage({error:""}),4000);
    };
  }
  return (
    <div className="Form">
       {flashMessage.success? <div style={{color:"green"}}>{flashMessage.success}</div>:<div style={{color:"red"}}>{flashMessage.error}</div>}

       <div className="login">
  <h3 style={{textAlign:"centre",color:"blue"}}>Login Form</h3>
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
          <Button variant="contained" color="primary" type="submit">LogIn</Button>
      </form>
      </div>
      </div>
  )
}