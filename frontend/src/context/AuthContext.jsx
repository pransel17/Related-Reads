import { createContext, useContext } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Use your hook here! It will fetch the user ONCE when the app starts.
  const auth = useUserProfile(); 

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to make it easy to use in components
export const useAuth = () => useContext(AuthContext);