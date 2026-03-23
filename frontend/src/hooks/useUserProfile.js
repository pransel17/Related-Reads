import { useState, useEffect } from 'react';
import { getMyProfile } from '../services/userService';

// this file will hold status ng nireques ko sa services. hook to nung mga database na tinawag from backend
// saves me time too, diko na need ng spaggethyyyy codes

export const useUserProfile = () => { // Removed UserName param
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const data = await getMyProfile(); // Just call it!
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // Runs once when the component mounts

  return { user, loading, error };
};