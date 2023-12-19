import { useState } from 'react';
 import './App.css';
 import SignUp from "./pages/SignUp";
 import Login from "./pages/Login";
 import { Route,Routes, Navigate} from "react-router-dom";
import Home from './pages/Home.jsx';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Layout from './pages/Layout.jsx';
import ShortUrl from './pages/ShortUrl.jsx';
import Welpage from './pages/Welpage.jsx';
import Successed from './pages/Successed.jsx';
import PublicUrl from './pages/PublicUrl.jsx';
import UserUrl from './pages/UserUrl.jsx';
import EditNotes from './pages/EditNotes.jsx';



function App() {
  const [userurl, setUserurl] = useState([]);
  const [userurlpub, setUserurlpub] = useState();
  const [userNotes, setUserNotes] = useState( );
  const [res,setRes]=useState( {})
  return (
    <>
    <Layout   userNotes={userNotes}
           setUserNotes={setUserNotes} res={res} setRes={setRes}></Layout>
    <Routes >
    <Route path="/" element={<Welpage/>} /> 
      <Route path="/signup" element={<SignUp/>} /> 
      <Route path="/login" element={<Login  userNotes={userNotes}
            setUserNotes={setUserNotes}/>} />
  
      <Route  
            path="/home" 
            element={ userNotes ? <Home  userNotes={userNotes}
            setUserNotes={setUserNotes} res={res} setRes={setRes}/> : <Navigate to='/login'></Navigate>}/> 
      <Route path="/forgot/forgot-password" element={<ForgotPassword/>} /> 
      <Route path="/short" element={ userNotes ? <ShortUrl userNotes={userNotes}
            setUserNotes={setUserNotes}/>  : <Navigate to='/login'></Navigate>} /> 
      <Route path="/forgot/reset-password/:id/:token" element={<ResetPassword/>} /> 
      <Route path="/signin/succ/:token" element={<Successed/>} /> 
      <Route path="/Url" element={userNotes ? <UserUrl  userNotes={userNotes} setUserNotes={setUserNotes} userurl={userurl} setUserurl={setUserurl}/>  : <Navigate to='/login'></Navigate>} />
  <Route path="/publicurl" element={userNotes ?<PublicUrl  userurlpub={userurlpub} setUserurlpub={setUserurlpub}/> : <Navigate to='/login'></Navigate>}  />
  <Route path="/edit/:id" 
         element={userNotes ?<EditNotes  userurl={userurl} setUserurl={setUserurl}/> : <Navigate to='/login'></Navigate>}/>
    </Routes>
    
        
    </>
  )
}

export default App
