import React,{ useState  } from 'react';
import { Container,Form,Button } from "react-bootstrap";
import '../styles/Login.css';
import { Link,useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/global";
import "../styles/ResetPassword.css"


const ResetPassword = () => {

     const [formData,setFormData] = useState({
        password:""
           
    });
    const {email, token} = useParams();

    const navigate = useNavigate(); 
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value });
              };
              const handleSubmit = async(e)=>{
                e.preventDefault();
               
                    const response = await axios.post(`${API_URL}/forgot/reset-password/${email}/${token}`,formData);
                    console.log(response);
                   if(response.data === true){
                    alert("success  update new password")
                    navigate("/login")
                   }  else if(response.data === false){
                    alert("verify your email id")
                   } 
                    

                  }
                    
                
            
        
                
    



  return (
    <div className="sin">
      <img id="" src="/img/forgot.jpg" alt="image" />

     <Container id="cslog">
        <h2> Reset password</h2>
        <Form onSubmit={handleSubmit}>
             
         
            <Form.Group>
                <Form.Label >New Password</Form.Label>
                <Form.Control
              
                 type="password" 
                 name="password" 
                 placeholder="Enter password"
                 autoComplete="off"
                 value={formData.password} 
                 onChange={handleChange} 
                 required /> 
            </Form.Group>
         
            
            <Button variant="primary" type="submit">Update</Button>
            
            <p> redirect to <Link to="/login">Login</Link> </p>
          
        </Form>
     </Container>
     </div>
  )
}

export default ResetPassword;