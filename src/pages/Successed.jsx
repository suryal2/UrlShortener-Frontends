import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../config/global';
import { Button } from "react-bootstrap";

const Successed = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/signin/succ/${token}`);
        // Handle the response or update the state accordingly
      } catch (error) {
        setError(error.message || 'An error occurred'); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup logic if needed
    };
  }, [token]);

  if (loading) {
    return <div className="box">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="flex">
          <div className="box">
           <h1> Regisation is successfull..</h1>
           
             <div> Build your brand's recognition and detailed 
              insights on how your links are performing</div>
              <div>Click belowe and go to the login</div>
             <Button id="prim"  onClick={()=>navigate("/login")}>Login</Button>
           
            
           {/* id="wel" */}
            
          </div>
          
          </div>
     )
};

export default Successed;
