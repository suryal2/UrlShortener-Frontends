import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../config/global';
// import '../styles/PublicUrl.css';
 
 const PublicUrl = ({userurlpub, setUserurlpub}) => {
  // const [userurlpub, setUserurlpub] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/Url/publicurl`, {
          headers: {
            'x-auth-token': localStorage.getItem('logtoken'),
          },
        });


        if (response  && response.data.longUrls) {
          setUserurlpub(response.data.longUrls);
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error fetching data. Please try again.'); // Set an error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  

  return (
    <>    {loading ? (
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
            <th>ShortUrl</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {userurlpub?.map((data) => (
            <tr key={data._id}>
              <td>{data.creationDate}</td>
              <td>{data.userId.name}</td>
              <td>{data.userId.email}</td>
              <td ><a href={data.shortener} target="_blank">{data.shortener}</a></td>
              <td><a href={`${API_URL}/shorturlRedirect/${data.shortId}`}target="_blank">{data.shortId}</a></td>
              <td>{data.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
       )}
    </>
  );
};
 
 export default PublicUrl