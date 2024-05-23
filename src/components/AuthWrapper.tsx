"use client"
import { useState, useEffect } from "react";
import { isAuthenticated } from '@/utils/auth';

type AuthWrapperProps = {
  children?: React.ReactNode;
  authenticated?: React.ReactNode;
  unauthenticated?: React.ReactNode;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ authenticated, unauthenticated, children }) => {
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return null; // or a loading spinner if you want
    }
  
    const loggedIn = isAuthenticated();
  
    return (
      <>
        {loggedIn ? authenticated : unauthenticated}
        {children}
      </>
    );
  };
  
  export default AuthWrapper;
