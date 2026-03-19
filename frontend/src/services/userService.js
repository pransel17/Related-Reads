import axios from 'axios';

const API_BASE_URL = 'http://localhost:2001/api/user';

// so di ko need i manually write everytime magccall ako sa backend

export const getMyProfile = async (UserName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/MyProfile/${UserName}`, {
      withCredentials: true 
    });
    // Return the user data to the caller
    return response.data.user || response.data;
  } catch (err) {
    // Catch the error and pass the message up
    throw err.response?.data?.error || err.message;
  }
};