import { useState, useEffect } from 'react';
import { apiUrl } from '../backend/api';
const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}${endpoint}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        setData(data)
    })
    .catch(error => {
      console.error('Fetch error:', error); // Handle errors
    });
  
  }, [data]);
  return data; 
};

export default useFetch;





