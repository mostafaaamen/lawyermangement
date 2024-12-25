import axios from 'axios';
import { apiUrl } from './api';
export const postData = async (endpoint,data) => {
  // URL of your API endpoint
  const url = `${apiUrl}${endpoint}`;
  // Data to send in the request body
  // Custom headers (e.g., authorization token, content type)
  const headers = {
    'Authorization': 'Bearer YOUR_AUTH_TOKEN',  // Example of adding an auth token
    'Content-Type': 'application/json',         // Specify content type
    'X-Custom-Header': 'Your custom header value' // Example of a custom header
  };
  try {
    const response = await axios.post(url, data, { headers });
    // Handle the response data
    console.log('Response:', response.data);
  } catch (error) {
    // Handle errors (e.g., network error, 4xx/5xx response)
    console.error('Error posting data:', error);
  }
};

