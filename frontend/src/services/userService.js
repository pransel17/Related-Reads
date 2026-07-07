import api from '../api/api';

// so di ko need i manually write everytime magccall ako sa backend

// services/userService.js
export const getMyProfile = async () => {  
  try {
    const response = await api.get(`/user/ProfileInfo/me`, {  
      withCredentials: true 
    });
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || err.message;
  }
};
