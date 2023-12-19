import React,{ useEffect, useState } from 'react';
import { Container,Form,Button } from "react-bootstrap";
import '../styles/Login.css';
import { Link,useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/global";
// import {CopyToClipboard} from 'react-copy-to-clipboard';

const EditNotes = ({userNotes,userurl, setUserurl }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({shortener:""});
  const [err,setErr] = useState("");
  
  const [msg, setmsg] = useState("");
  const {id} = useParams();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(()=>{
    if (!localStorage.getItem("logtoken")) {
      navigate("/login", { replace: true });
    }
  
    if (userurl ) {
      const data  = userurl.find((note) => note._id === id);
    
      if (data) {
        setFormData( {shortener:data.shortener})
        
      }
     
    }
  },[id,userurl,navigate]);
 
 //api integration
 async function editNewNotes (e){
  e.preventDefault();

 
      try{
        const response = await axios.put(`${API_URL}/Url/user/edit/${id}`, formData ,{
          headers: {
            "x-auth-token":   localStorage.getItem("logtoken"),
          },
          });
       
        
      const data = response.data;
      
      if (data === "clint error") {
        setErr("clint error");
       
      } else if(data ===  "connot contain only spaces"){
        setErr("connot contain only spaces");
       
      }
      else if(data.data){
        const editableIndex = userurl?.findIndex((data) => data._id === id);
        userurl[editableIndex] = data.data;
        await setUserurl([...userurl]);
        
        setmsg(data.message);
       
      navigate("/Url")
       
         
      }
      } catch (error){
        console.log(error)
      }
  


 }


  return (

    <div>
      <Container className="formdetail">
        <div id="msg"> {msg ? "" : msg}</div>
    
        <Form >
          <Form.Group>
            <Form.Label>Shortener  </Form.Label>
           <div id="err">  {err ? err : ""}</div>  
            <Form.Control
              className="shortener"
              type="text"
              name="shortener"
              // ref={formRef} 
              autoComplete="off"
              value={formData.shortener}
              onChange={handleChange}
              required
            />
           
          </Form.Group>
          <Button id="det" variant="primary" type="button" onClick={editNewNotes}  >
            EditShort
          </Button>
        </Form>
        
        
        <div>
  {/* <p id="copy"> copy: {copied ? copy : ""}</p>
  <CopyToClipboard text={copy}  >
    <button onClick={() => setCopied(false)} id="copbutton">
      Copy to clipboard
    </button>
  </CopyToClipboard> */}
</div>
        
       

 
         

      </Container>
  </div>
  )
}

export default EditNotes