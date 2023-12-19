import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../config/global';
import '../styles/UserUrl.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const UserUrl = ( {  userurl, setUserurl}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/Url/userurl`, {
          headers: {
            'x-auth-token': localStorage.getItem('logtoken'),
          },
        });

        if (response && response.data && response.data.longUrl) {
          setUserurl(response.data.longUrl);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/Url/user/delete/${id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('logtoken'),
        },
      });

      const data = response.data;
      if (data) {
        const newUserurl = userurl.filter((item) => item._id !== id);
        setUserurl([...newUserurl]);
        setAlertVariant('success');
        setAlertMessage('URL deleted successfully');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error deleting URL:', error);
      setAlertVariant('danger');
      setAlertMessage('Error deleting URL. Please try again.');
      setShowAlert(true);
    }
  };
  return (
    <>
     {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}


      {loading ? (
        <div id="padding">Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>LongUrl</th>
              <th>ShortURL</th>
              <th>Clicks</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userurl?.map((data) => (
              <tr key={data._id}>
                <td>{data.creationDate}</td>
                <td>{data.userId.name}</td>
                <td>{data.userId.email}</td>
                <td id="padding">
                  <a href={data.shortener} target="_blank" rel="noopener noreferrer">
                    {data.shortener}
                  </a>
                </td>
                <td>
                  <a href={`${API_URL}/shorturlRedirect/${data.shortId}`} target="_blank" rel="noopener noreferrer">
                    {data.shortId}
                  </a>
                </td>
                <td>{data.clicks}</td>
                <td><Button variant="outline-primary"  onClick={() => navigate(`/edit/${data._id}`)}>Edit</Button></td>
               <td> <Button variant="outline-danger" onClick={() => handleDelete(data._id)}>Delete</Button></td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserUrl;
