import axios from 'axios';

const API_BASE_URL = 'http://localhost:2001/api/user';

// so di ko need i manually write everytime magccall ako sa backend

// services/userService.js
export const getMyProfile = async () => {  
  try {
    const response = await axios.get(`${API_BASE_URL}/ProfileInfo/me`, {  
      withCredentials: true 
    });
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || err.message;
  }
};
