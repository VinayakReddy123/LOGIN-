import { Box,TextField,Button, Typography,styled } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
const URL='http://localhost:9000';

const  StyledInput = styled(TextField)`
     margin:2px;
     height:60px;
     width:350px;
`;

export const Login=()=>{
   const navigate=useNavigate();
   const [inputs,setInputs]=useState({
       email:"",
       password:""
   });

   const handleChange=(e)=>{
       setInputs({
           ...inputs,
           [e.target.name]:e.target.value
       });
   }
   const handleSubmit=(e)=>{
       e.preventDefault();
       const res=axios.post(`${URL}/login`,{
           email: inputs.email,
           password: inputs.password
       }).catch(err=>console.log(err));
       const data=res.data;
       navigate('/user');
       console.log(inputs);
   }
    return(
        <>
            <form onSubmit={(e)=>handleSubmit(e)}>
             <Box display={"flex"}  flexDirection={"column"}  justifyContent={"center"} alignItems={"center"} margin={10}>
                <Typography variant="h4" marginTop={-5}>Login</Typography> 
                  
                <StyledInput variant="outlined" label="Email"
                   value={inputs.email} type="email" name="email"
                   onChange={(e)=>{handleChange(e)}}
                /> 
                <StyledInput variant="outlined" label="Password" 
                   value={inputs.password} type='password' name="password"
                   onChange={(e)=>{handleChange(e)}}
                />
                <Button variant="contained" type="submit">Login</Button>
             </Box>
          </form>
        </>
    )
}