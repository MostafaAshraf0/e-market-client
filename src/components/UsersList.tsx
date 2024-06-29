"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import Navbar from "@/components/ui/Navbar";
import { EditUserDialog } from './EditUserDialog';

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ users: User[] }>(`${process.env.NEXT_PUBLIC_API_URL}/user/list`);
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      setError('Error fetching users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    fetchUsers();
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
    handleCloseDialog();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1>Users List</h1>
      <div className="flex justify-center p-5">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {users.map(user => (
              <Card key={user._id} className="p-5" onClick={() => handleEditClick(user)}>
                <div><strong>Email:</strong> {user.email}</div>
                <div><strong>Name:</strong> {user.name}</div>
                <div><strong>Role:</strong> {user.role}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {selectedUser && (
        <EditUserDialog user={selectedUser} onClose={handleCloseDialog} onUserUpdated={handleUserUpdated} />
      )}
    </>
  );
}
