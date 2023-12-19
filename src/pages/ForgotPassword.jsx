import React,{ useState } from 'react';
import { Container,Form,Button } from "react-bootstrap";
import '../styles/Login.css';
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/global";
import "../styles/ForgotPassword.css"



const ForgotPassword = () => {

     const [formData,setFormData] = useState({
            email:""
           
    });

    const navigate = useNavigate(); 
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value });
              };
              const handleSubmit = async(e)=>{
                e.preventDefault();
               
                    const response = await axios.post(`${API_URL}/forgot/forgot-password`,formData);
                    console.log(response);
                   if(response?.status){
                    alert("Message send to your mail id , chech and verify to set new password")
                    navigate("/login")
                   }  else if(response.data === "server Busy"){
                    alert("verify your email id")
                   } 
                    else  if(response.data === true){
                    alert("link send to your email id for Reset")
                    navigate("/login")
                    }

                  }
                    
                
            
        
                
    



  return (
    <div className="sin">
    <img id="" src="/img/forgot.jpg" alt="image" />
<Container id="forgot">
    
      
        <h2> Forgot password</h2>
        <Form onSubmit={handleSubmit}>
             
         
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                 type="email" 
                 name="email" 
                 value={formData.email} 
                 onChange={handleChange} 
                 required /> 
            </Form.Group>
         
            
            <Button variant="primary" type="submit">Send</Button>
            
            <p>Ahh.. Now I remember my password  <Link to="/login">Login</Link> </p>
          
        </Form>
     </Container>
     </div>
  )
}

export default ForgotPassword;