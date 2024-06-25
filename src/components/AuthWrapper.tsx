"use client"
import { useState, useEffect } from "react";
import { isAuthenticated } from '@/utils/auth';

type AuthWrapperProps = {
  children?: React.ReactNode;
  authenticated?: React.ReactNode;
  unauthenticated?: React.ReactNode;
  creator?: string;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ authenticated, unauthenticated, children, creator }) => {
  const [isClient, setIsClient] = useState(false);
  const [authStatus, setAuthStatus] = useState<{ loggedIn: boolean, userId: string | null }>({ loggedIn: false, userId: null });

  useEffect(() => {
    setIsClient(true);
    setAuthStatus(isAuthenticated());
  }, []);

  if (!isClient) {
    return null;
  }

  const { loggedIn, userId } = authStatus;

  if (creator && userId !== creator) {
    return null;
  }

  return (
    <>
      {loggedIn ? authenticated : unauthenticated}
      {children}
    </>
  );
};

export default AuthWrapper;
