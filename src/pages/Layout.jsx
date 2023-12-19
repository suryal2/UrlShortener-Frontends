import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link,useNavigate } from "react-router-dom";
import "../styles/Layout.css"
 
function Layout({ userNotes, setUserNotes, res  }) {
  const Navigate = useNavigate();

  const logOut = () => {

    localStorage.removeItem("logtoken")
    setUserNotes("");
    Navigate("/login");
  };
  return (
    <div>
      <Navbar id="back">
        <Container>
          <Navbar.Brand>FlipURL</Navbar.Brand>
         {  userNotes ?   <nav className="navUrl">
           <ul className="ul1" >
           <li>
                <Link to="/home" className='li1' > Home</Link>
                </li>
               <li  >
               <Link to="/Url" className='li1'>User Url</Link>
               </li>
               <li >
               <Link to="/publicurl" className='li1'>Public Url</Link>
               </li>
              
           
           </ul>
       </nav>: ""}
 
          <div>
          {   userNotes ?  
          
          <div>
          <button id="logout" type="button" onClick={logOut}>

                Logout
              </button> <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>{res.name} 
              </div> :
             <div>
                <Link id="mar" to="/login">
                  Login
                </Link>
                <Link id="mar" to="/signup">
                  Signup
                </Link>
            
         </div>
}
          </div>
        </Container>
      </Navbar>
  
    </div>
  );
}

export default Layout;