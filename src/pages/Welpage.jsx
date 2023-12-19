import React from 'react'
 
import { Button } from "react-bootstrap";
import'../styles/Welpage.css'
import { useNavigate } from 'react-router-dom';
const Welpage = () => {
  const navigator = useNavigate();
  return (
 <div id="flex">
       <div className="box">
        <h1>More then just shorter links</h1>
        
          <div> Build your brand's recognition and detailed 
           insights on how your links are performing</div>
          <Button id="prim" onClick={()=>navigator("/signup")}>GetStarted</Button>
        
         
        {/* id="wel" */}
         
       </div>
       <img id="pinimg" src="https://i.pinimg.com/564x/ae/4b/2b/ae4b2bc21d359d00acfd496f5cd015e5.jpg" alt="imag"></img>
       </div>
  )
}

export default Welpage