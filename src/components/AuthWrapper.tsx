"use client"
import { useState, useEffect } from "react";
import { isAuthenticated } from '@/utils/auth';

type AuthWrapperProps = {
  children?: React.ReactNode;
  authenticated?: React.ReactNode;
  unauthenticated?: React.ReactNode;
  creator?: string;
  roles?: string[];
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ authenticated, unauthenticated, children, creator, roles }) => {
  const [isClient, setIsClient] = useState(false);
  const [authStatus, setAuthStatus] = useState<{ loggedIn: boolean, userId: string | null, role: string | null }>({ loggedIn: false, userId: null, role: null });

  useEffect(() => {
    setIsClient(true);
    setAuthStatus(isAuthenticated());
  }, []);

  if (!isClient) {
    return null;
  }

  const { loggedIn, userId, role  } = authStatus;

  if (creator && userId !== creator) {
    return null;
  }

  if (roles && (!role || !roles.includes(role))) {
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
