"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useToast } from "@/components/ui/use-toast";
import AuthWrapper from './AuthWrapper';

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}

interface EditUserDialogProps {
  user: User;
  onClose: () => void;
  onUserUpdated: (user: User) => void;
}

export function EditUserDialog({ user, onClose, onUserUpdated }: EditUserDialogProps) {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast()

  const handleSave = async () => {
    setIsLoading(true);
    const token = Cookies.get('token');

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/edit/${user._id}`,
        { email, name, role },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      onUserUpdated(response.data);
      toast({
        description: response.data.message || "User Updated successfully.",
      });
    } catch (error) {
      setError('Error updating user');
      console.error("Update Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to the user&apos;s profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <AuthWrapper
          authenticated={
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="col-span-3"
            />
          </div>
          }
          roles={['admin']}
          >
          </AuthWrapper>
          
          {error && (
            <div className="col-span-4 text-red-500">{error}</div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
