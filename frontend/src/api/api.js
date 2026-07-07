import axios from 'axios';

// This grabs the URL from your Vercel Environment Variables
// If VITE_API_URL isn't set (like when you're working locally), 
// it defaults to your laptop's localhost
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:2001';

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Always send cookies with requests
});

export default api;