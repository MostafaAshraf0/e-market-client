"use client";
import ProductList from '@/components/ProductList';
import UsersList from '@/components/UsersList';
import axios from 'axios';
import { useEffect, useState } from "react";

export default function AdminDashboard(){
    
    return(
        <>
        <h1>AdminDashboard</h1>
        <UsersList/>
        </>
    );
}