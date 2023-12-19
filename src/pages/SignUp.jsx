import React,{ useRef, useState } from 'react';
import { Container,Form,Button } from "react-bootstrap";
import '../styles/SignUp.css';
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/global";


const SignUp = () => {
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:""
});

     
const nameRef = useRef(null);
const emailRef = useRef(null);
const passwordRef = useRef(null);

      const handleChange = (e)=>{
const {name, value} = e.target;
setFormData({...formData, [name]: value });
      };

      const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(`${API_URL}/signin/verify`,formData);
            console.log(response);
            if(response.data === true){
                alert("Registeration link send to your email id");
                nameRef.current.value="";
                emailRef.current.value="";
                passwordRef.current.value="";
            } else if (response.data === false){
                alert("user already exists")
                nameRef.current.value="";
                emailRef.current.value="";
                passwordRef.current.value="";
            };


        }catch(e){
            console.log("Error during registeration",e)
        }

      }






  return (
    <div className="sin">
         <img id="sinImg" src="./img/sign.jpeg" alt="sign imag"></img>
     <Container id="cslog">
    
  
        <h3>  Welcome!</h3>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                ref={nameRef} 
                required /> 
            </Form.Group>
         
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                 type="email" 
                 name="email" 
                 value={formData.email} 
                 onChange={handleChange} 
                 ref={emailRef} 
                 required /> 
            </Form.Group>
         
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                ref={passwordRef} 
                required /> 
            </Form.Group>
            <Button variant="primary" type="submit"> Sign Up</Button>
            <p>Don't have an account? <Link to="/login">Login</Link> </p>
          
        </Form>
      
     </Container>
     </div>
  )
}

export default SignUp;