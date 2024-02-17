"use client"
import Head from 'next/head';
import UserData from '@/app/components/user-data';
import { User } from '@/app/models/user';
import React from 'react'
import { useState, useEffect } from 'react';
import "../../app/globals.css"

const index: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('/api/server-api'); // Make request to API route
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData: User[] = await response.json();
        
        // Update the state with the fetched users
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="container mx-auto px-5 py-8">
      <Head>
        <title>User Profiles Home</title>
      </Head>

      <header className='text-center mb-5'>
        <h1 className="text-3xl font-bold mb-4">User Profiles Home</h1>
        <h2>A next app to provide several user profiles along with their details fetched from https://jsonplaceholder.typicode.com/users!</h2>
      </header>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {users.map((user: User) => (
          <UserData key={user.id} user={user} />
        ))}
      </div>
    </div>

  )
}

export default index