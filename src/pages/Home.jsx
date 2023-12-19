import React, { useEffect, useState } from 'react';
import { Container,Button } from "react-bootstrap";
import "../styles/Home.css";
import axios from "axios";
import API_URL from "../../config/global";
import { useNavigate } from 'react-router-dom';
import ShortUrl from './ShortUrl.jsx';
 

 



const Home = ( {userNotes,setUserNotes,res,setRes}) => {
 
const navigate = useNavigate();

    
    useEffect(() => {
        const user =  userNotes;  
        if (user) {
            getData(user.token);
        }
    }, []);
    
    
const getData = async (token)=>{
try{
    const config = {
        headers:{
            Authorization:token
        },
    }

    const response = await axios.get(`${API_URL}/home`,config);
    console.log(response);
    if(response.data === "Invalid Token"){
        alert("login again")
    }else if(response.data === "server Busy"){
        alert("unuthorised access")
    }
     else if (response?.status){
        setRes(response.data)
    }

} catch(e){
    console.log(e);
}
};

return(
    <ShortUrl userNotes={userNotes}
    setUserNotes={setUserNotes}/> 
 
  )
}

export default Home 