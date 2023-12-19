import { useRef, useState } from 'react';
import { Container,Form,Button } from "react-bootstrap";
import '../styles/ShortUrl.css'; 
import {    Link , Route, useNavigate} from 'react-router-dom'
import axios from "axios";
import API_URL from "../../config/global";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ShortUrl = ({ userNotes }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shortener: "",
  });
  const [copy, setCopy] = useState("");
  const [dailyCount, setDailyCount] = useState();
  const [monthlyCount, setMonthlyCount] = useState();
  const [copied, setCopied] = useState(true);
const [err, setError] = useState();
const [ errcon, setErrcon] = useState(true);

const formRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async ( e) => {
    e.preventDefault();
     
    const user = userNotes;
    if (user && user.token) {
      try {
        const response = await axios.post(`${API_URL}/Url/urls`, formData,  {
          headers: {
            "x-auth-token": user.token || localStorage.getItem("logtoken"),
          },
        });
       
        if (response&& response.data.shortUrl&&response.data.dailyCount&& response.data.monthlyCount) {
          setCopy(response.data.shortUrl);
          setFormData(formData.shortener="");
          setCopied(true);
          setErrcon(false);
          setDailyCount(response.data.dailyCount);
          setMonthlyCount(response.data.monthlyCount);
          formRef.current.value = "";
        } else if(response.data === "clint error"){
          setError("fill the form first")
          setErrcon(true)
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  
  return (
    <  >

<div className="detail">
  <div id="detail">
    <h1>wellcome to our URLwebsite</h1>
    <div>Bio Link & Link Shortener For Business Needs </div>
    <div>on a single platform, you'll find all the tools you need to connect audiences worldwide,manage link and  QR Codes and creat brand relationships</div>
  </div>
         <div id="detail1">
        <h2  id="detail3">Daily Count: {dailyCount}</h2>
   
        <h2 id="detail2">Monthly Count: {monthlyCount}</h2>
      </div>
</div>
    <div>
      <Container className="formdetail">
   
        <Form  >
          <Form.Group>
            <Form.Label>Shortener  </Form.Label>
           <div id="err"> {errcon ? err : ""}</div>  
            <Form.Control
              className="shortener"
              type="text"
              name="shortener"
              ref={formRef} 
              autoComplete="off"
              value={formData.shortener}
              onChange={handleChange}
              required
            />
           
          </Form.Group>

          <Button id="det" variant="primary" type="submit" onClick={handleSubmit}>
            Shorten
          </Button>
        </Form>
        <div>
  <p id="copy"> copy: {copied ? copy : ""}</p>
  <CopyToClipboard text={copy}  >
    <button onClick={() => setCopied(false)} id="copbutton">
      Copy to clipboard
    </button>
  </CopyToClipboard>
</div>
        
       

 
         

      </Container>
  </div>

  <div className="base">
    <h5>UNLEASH THE POWER OF THE LINK</h5>
    <div>THe link is the invisible thread that connects every customer interaction to tell a greater story Drive seamless experiences across every device with Bitly Enterprise</div>
  </div>
 
  
  </>
  );
}


export default ShortUrl


// {copy ?"":{err}}