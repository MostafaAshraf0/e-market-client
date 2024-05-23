"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { handleLogout } from '@/utils/logout';

const LogoutButton: React.FC = () => {
    const handleLogout = () => {
      document.cookie = 'token=; Max-Age=0; path=/';
      document.cookie = 'userId=; Max-Age=0; path=/';
      window.location.reload();
    };
  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  );
};

export default LogoutButton;